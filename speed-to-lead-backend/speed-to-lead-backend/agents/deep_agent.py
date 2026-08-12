"""
Deep Agent for the Speed-to-Lead AI System
This agent unifies the conversational qualification, scoring, booking, and notifying logic
using the deepagents framework.
"""
import logging
from datetime import datetime, timedelta
from uuid import UUID
import httpx
from twilio.rest import Client

from deepagents import create_deep_agent

from config import settings
from database import save_booking, save_qualification, update_lead_temperature
from models import BookingResult, Lead, LeadTemperature, NotifyResult, QualificationResult

logger = logging.getLogger("agent.deep")

_twilio_client = (
    Client(settings.twilio_account_sid, settings.twilio_auth_token)
    if settings.twilio_account_sid
    else None
)

async def book_next_available(lead_id: str, name: str, contact: str) -> str:
    """
    Book a 15-minute intro call on Cal.com for the lead.
    Call this ONLY if the lead is Hot or Warm and they have agreed to a call.
    """
    if settings.demo_mode and not settings.calcom_api_key:
        fake_slot = datetime.utcnow() + timedelta(days=1, hours=2)
        result = BookingResult(
            lead_id=UUID(lead_id), booked=True, slot_start=fake_slot,
            calcom_booking_uid="demo-booking-uid",
        )
        save_booking(result)
        return f"Call booked for {fake_slot}"

    base_url = settings.calcom_api_base
    headers = {
        "Authorization": f"Bearer {settings.calcom_api_key}",
        "Content-Type": "application/json",
    }
    
    async with httpx.AsyncClient(timeout=10.0) as client:
        now = datetime.utcnow()
        resp = await client.get(
            f"{base_url}/slots",
            headers=headers,
            params={
                "eventTypeId": settings.calcom_event_type_id,
                "startTime": now.isoformat() + "Z",
                "endTime": (now + timedelta(days=7)).isoformat() + "Z",
            },
        )
        resp.raise_for_status()
        slots = resp.json().get("data", {})
        
        slot_to_book = None
        for _day, day_slots in slots.items():
            if day_slots:
                slot_to_book = day_slots[0]["time"]
                break
                
        if slot_to_book is None:
            result = BookingResult(
                lead_id=UUID(lead_id), booked=False,
                reason_if_not_booked="No available slots in next 7 days",
            )
            save_booking(result)
            return "Failed to book call: No available slots in next 7 days"

        booking_resp = await client.post(
            f"{base_url}/bookings",
            headers=headers,
            json={
                "eventTypeId": int(settings.calcom_event_type_id),
                "start": slot_to_book,
                "attendee": {"name": name, "email": contact, "timeZone": "UTC"},
            },
        )
        booking_resp.raise_for_status()
        data = booking_resp.json()

        slot_start = datetime.fromisoformat(slot_to_book.replace("Z", "+00:00"))
        result = BookingResult(
            lead_id=UUID(lead_id),
            booked=True,
            slot_start=slot_start,
            calcom_booking_uid=data.get("data", {}).get("uid"),
        )
        save_booking(result)
        from orchestrator import store
        store.set_outcome_field(UUID(lead_id), "booked", True)
        store.set_outcome_field(UUID(lead_id), "slot_start", slot_start.isoformat())
        return f"Call successfully booked for {slot_start}"


def alert_owner(lead_id: str, name: str, contact: str, source: str, intent_summary: str, slot_text: str) -> str:
    """
    Alert the business owner via WhatsApp for Hot leads. 
    Call this ONLY when a lead is confirmed to be HOT and you have summarized their intent.
    """
    message = (
        f"🔥 HOT LEAD: {name} ({contact})\n"
        f"Source: {source}\n"
        f"{intent_summary}\n"
        f"Call booked: {slot_text}"
    )

    if _twilio_client is None or settings.demo_mode:
        logger.info("[DEMO] Would send WhatsApp alert to owner:\n%s", message)
        return "Demo: Alert successfully logged."

    try:
        _twilio_client.messages.create(
            body=message,
            from_=settings.twilio_from_whatsapp,
            to=f"whatsapp:{settings.business_owner_phone}",
        )
        from orchestrator import store
        store.set_outcome_field(UUID(lead_id), "owner_notified", True)
        return "WhatsApp alert sent."
    except Exception as exc:  # fallback to SMS
        logger.warning("WhatsApp send failed (%s), falling back to SMS", exc)
        _twilio_client.messages.create(
            body=message,
            from_=settings.twilio_from_sms,
            to=settings.business_owner_phone,
        )
        from orchestrator import store
        store.set_outcome_field(UUID(lead_id), "owner_notified", True)
        return "SMS alert sent."


def save_qualification_result(lead_id: str, temperature: str, intent_summary: str, budget_signal: str, timeline_signal: str) -> str:
    """
    Saves the qualification score of the lead into the database.
    temperature must be one of: 'hot', 'warm', 'cold'
    """
    try:
        temp_enum = LeadTemperature(temperature.lower())
    except ValueError:
        return f"Invalid temperature: {temperature}. Must be hot, warm, or cold."
        
    result = QualificationResult(
        lead_id=UUID(lead_id),
        temperature=temp_enum,
        budget_signal=budget_signal,
        timeline_signal=timeline_signal,
        intent_summary=intent_summary,
        transcript=[], # Deep agent manages conversation internally, we just record the result
    )
    save_qualification(result)
    update_lead_temperature(UUID(lead_id), result.temperature.value, result.intent_summary)
    
    from orchestrator import store
    store.set_outcome_field(UUID(lead_id), "temperature", result.temperature.value)
    store.set_outcome_field(UUID(lead_id), "intent_summary", result.intent_summary)
    
    return f"Qualification result saved as {temperature.upper()}."


SYSTEM_PROMPT = """You are a friendly, efficient assistant for a real estate agency. 
A new lead just came in. Your job in this conversation is to naturally find out:
1. Their budget range
2. Their timeline (browsing vs ready to move in weeks)
3. What they're actually looking for (property type, area, must-haves)

Keep every reply under 2 sentences. Sound human, not like a form. Ask one question at a time. 

Once you have enough signal on all three points, you MUST:
1. Call `save_qualification_result` to score them (hot/warm/cold).
   - hot = clear budget + ready to move within weeks
   - warm = interested but vague on budget or timeline
   - cold = just browsing, no urgency, or budget clearly mismatched
2. If hot or warm, ask to check calendar availability for a quick call.
3. If they agree to a call, call `book_next_available` to book a slot for them.
4. If hot, call `alert_owner` to notify the business owner.

Do not break character. Smoothly guide the lead through the inquiry experience.
"""

from langchain_openai import ChatOpenAI

def get_agent():
    # Fallback for demo mode
    model_name = settings.scoring_model if hasattr(settings, "scoring_model") else "anthropic/claude-3-5-sonnet-20240620"
    print("DEBUG: model_name is", model_name)
    model = ChatOpenAI(model=model_name, max_tokens=1024, api_key=settings.anthropic_api_key, base_url="https://openrouter.ai/api/v1") if settings.anthropic_api_key else "openai/gpt-4o"
    print("DEBUG: ChatOpenAI model is", getattr(model, 'model_name', model))
    return create_deep_agent(
        tools=[book_next_available, alert_owner, save_qualification_result],
        system_prompt=SYSTEM_PROMPT,
        model=model,
    )
