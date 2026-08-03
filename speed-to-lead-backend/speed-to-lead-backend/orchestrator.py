"""
The orchestrator. This is what makes it a *system* rather than four
separate scripts — it holds conversation state per lead, decides when a
conversation has enough signal to score, and routes hot/warm/cold leads
down different paths (book a call vs. just log for nurture).

Conversation state is in-memory here (a dict keyed by lead_id) because
this is a demo running as a single process. For a real client deployment,
swap ConversationStore for a Redis- or Supabase-backed session so state
survives restarts and works across multiple backend instances.
"""
import logging
from uuid import UUID

from agents.intake import IntakeAgent
from agents.notify import NotifyAgent
from agents.qualification import QualificationAgent
from agents.scheduling import SchedulingAgent
from models import (
    BookingResult,
    ChatTurn,
    Lead,
    LeadTemperature,
    QualificationResult,
    RawLeadPayload,
)

logger = logging.getLogger("orchestrator")

QUALIFICATION_TURNS_BEFORE_SCORING = 3  # lead messages before we attempt to score


class ConversationStore:
    """In-memory transcript + lead cache, keyed by lead_id. Demo-only — see module docstring."""

    def __init__(self) -> None:
        self._transcripts: dict[UUID, list[ChatTurn]] = {}
        self._leads: dict[UUID, Lead] = {}
        self._finalized: set[UUID] = set()
        self._outcomes: dict[UUID, dict] = {}

    def register(self, lead: Lead) -> None:
        self._leads[lead.id] = lead
        self._transcripts[lead.id] = []

    def get_lead(self, lead_id: UUID) -> Lead:
        return self._leads[lead_id]

    def transcript(self, lead_id: UUID) -> list[ChatTurn]:
        return self._transcripts[lead_id]

    def append(self, lead_id: UUID, turn: ChatTurn) -> None:
        self._transcripts[lead_id].append(turn)

    def lead_turn_count(self, lead_id: UUID) -> int:
        return sum(1 for t in self._transcripts[lead_id] if t.role == "lead")

    def is_finalized(self, lead_id: UUID) -> bool:
        return lead_id in self._finalized

    def mark_finalized(self, lead_id: UUID) -> None:
        self._finalized.add(lead_id)

    def set_outcome(self, lead_id: UUID, outcome: dict) -> None:
        self._outcomes[lead_id] = outcome

    def all_leads_with_outcomes(self) -> list[dict]:
        """Newest first — what the admin dashboard polls."""
        rows = []
        for lead_id, lead in self._leads.items():
            outcome = self._outcomes.get(lead_id, {})
            rows.append(
                {
                    "id": str(lead.id),
                    "name": lead.name,
                    "contact": lead.contact,
                    "source": lead.source.value,
                    "created_at": lead.created_at.isoformat(),
                    "temperature": outcome.get("temperature", "unscored"),
                    "intent_summary": outcome.get("intent_summary"),
                    "booked": outcome.get("booked", False),
                    "slot_start": outcome.get("slot_start"),
                    "owner_notified": outcome.get("owner_notified", False),
                }
            )
        return sorted(rows, key=lambda r: r["created_at"], reverse=True)


class LeadOrchestrator:
    def __init__(self) -> None:
        self.intake = IntakeAgent()
        self.qualification = QualificationAgent()
        self.scheduling = SchedulingAgent()
        self.notify = NotifyAgent()
        self.store = ConversationStore()

    def handle_new_lead(self, payload: RawLeadPayload) -> Lead:
        lead = self.intake.run(payload)
        self.store.register(lead)

        if payload.initial_message:
            self.store.append(lead.id, ChatTurn(role="lead", content=payload.initial_message))

        return lead

    async def handle_chat_turn(self, lead_id: UUID, lead_message: str) -> dict:
        """
        Called on every message the lead sends in the live chat widget.
        Returns the agent's reply, and — once enough signal is gathered —
        the qualification/booking/notify outcome too.
        """
        transcript = self.store.transcript(lead_id)
        reply_text = self.qualification.next_reply(transcript, lead_message)

        self.store.append(lead_id, ChatTurn(role="lead", content=lead_message))
        self.store.append(lead_id, ChatTurn(role="agent", content=reply_text))

        response = {"reply": reply_text, "finalized": False}

        already_done = self.store.is_finalized(lead_id)
        if not already_done and self.store.lead_turn_count(lead_id) >= QUALIFICATION_TURNS_BEFORE_SCORING:
            outcome = await self._finalize(lead_id)
            response["finalized"] = True
            response["outcome"] = outcome
        elif already_done:
            # Lead is chatting after qualification already completed (e.g. follow-up
            # questions) — just keep replying conversationally, don't re-run the pipeline.
            response["finalized"] = True

        return response

    async def _finalize(self, lead_id: UUID) -> dict:
        """Score the lead, then route based on temperature. Runs at most once per lead."""
        if self.store.is_finalized(lead_id):
            return {}
        self.store.mark_finalized(lead_id)

        lead = self.store.get_lead(lead_id)
        transcript = self.store.transcript(lead_id)

        qualification: QualificationResult = self.qualification.score(lead, transcript)

        booking: BookingResult = BookingResult(lead_id=lead_id, booked=False)
        if qualification.temperature in (LeadTemperature.HOT, LeadTemperature.WARM):
            booking = await self.scheduling.book_next_available(lead)
        else:
            logger.info("Lead %s scored cold, skipping booking, routing to nurture", lead_id)

        notified = False
        if qualification.temperature == LeadTemperature.HOT:
            self.notify.alert_hot_lead(lead, qualification, booking)
            notified = True

        outcome = {
            "temperature": qualification.temperature.value,
            "intent_summary": qualification.intent_summary,
            "booked": booking.booked,
            "slot_start": booking.slot_start.isoformat() if booking.slot_start else None,
            "owner_notified": notified,
        }
        self.store.set_outcome(lead_id, outcome)
        return outcome

    def list_leads(self) -> list[dict]:
        """Used by GET /leads for the admin dashboard. Demo-only in-memory read —
        swap for a Supabase realtime subscription once real client keys are wired in."""
        return self.store.all_leads_with_outcomes()
