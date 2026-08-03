"""
Shared data models. These are the objects that get passed between agents
as state moves through the pipeline — think of this as the "contract"
each agent reads from and writes to.
"""
from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Optional
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class LeadSource(str, Enum):
    WEB_FORM = "web_form"
    FACEBOOK_AD = "facebook_ad"
    INSTAGRAM_DM = "instagram_dm"
    MANUAL = "manual"


class LeadTemperature(str, Enum):
    HOT = "hot"
    WARM = "warm"
    COLD = "cold"
    UNSCORED = "unscored"


class RawLeadPayload(BaseModel):
    """What arrives at the webhook, before we've done anything to it."""
    name: str
    contact: str  # phone or email, whichever the source gives us
    source: LeadSource
    initial_message: Optional[str] = None
    raw_metadata: dict = Field(default_factory=dict)


class Lead(BaseModel):
    """The canonical, structured lead record — what everything downstream operates on."""
    id: UUID = Field(default_factory=uuid4)
    name: str
    contact: str
    source: LeadSource
    initial_message: Optional[str] = None
    temperature: LeadTemperature = LeadTemperature.UNSCORED
    qualification_notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class ChatTurn(BaseModel):
    role: str  # "agent" | "lead"
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class QualificationResult(BaseModel):
    lead_id: UUID
    temperature: LeadTemperature
    budget_signal: Optional[str] = None
    timeline_signal: Optional[str] = None
    intent_summary: str
    transcript: list[ChatTurn]


class BookingResult(BaseModel):
    lead_id: UUID
    booked: bool
    slot_start: Optional[datetime] = None
    calcom_booking_uid: Optional[str] = None
    reason_if_not_booked: Optional[str] = None


class NotifyResult(BaseModel):
    lead_id: UUID
    alert_sent: bool
    channel: Optional[str] = None  # "whatsapp" | "sms"
