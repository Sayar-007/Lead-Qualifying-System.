"""
Agent 4: Notify
Job: for hot leads, immediately alert the business owner via WhatsApp
(falling back to SMS) with a one-line summary — this is the moment that
sells the whole system in a live demo.
"""
import logging

from twilio.rest import Client

from config import settings
from models import BookingResult, Lead, NotifyResult, QualificationResult

logger = logging.getLogger("agent.notify")

_client = (
    Client(settings.twilio_account_sid, settings.twilio_auth_token)
    if settings.twilio_account_sid
    else None
)


class NotifyAgent:
    def alert_hot_lead(
        self, lead: Lead, qualification: QualificationResult, booking: BookingResult
    ) -> NotifyResult:
        message = self._build_message(lead, qualification, booking)

        if _client is None or settings.demo_mode:
            logger.info("[DEMO] Would send WhatsApp alert to owner:\n%s", message)
            return NotifyResult(lead_id=lead.id, alert_sent=True, channel="demo-log")

        try:
            _client.messages.create(
                body=message,
                from_=settings.twilio_from_whatsapp,
                to=f"whatsapp:{settings.business_owner_phone}",
            )
            return NotifyResult(lead_id=lead.id, alert_sent=True, channel="whatsapp")
        except Exception as exc:  # noqa: BLE001 - fall back to SMS on any WhatsApp failure
            logger.warning("WhatsApp send failed (%s), falling back to SMS", exc)
            _client.messages.create(
                body=message,
                from_=settings.twilio_from_sms,
                to=settings.business_owner_phone,
            )
            return NotifyResult(lead_id=lead.id, alert_sent=True, channel="sms")

    def _build_message(
        self, lead: Lead, qualification: QualificationResult, booking: BookingResult
    ) -> str:
        slot_text = (
            booking.slot_start.strftime("%a %b %d, %I:%M %p")
            if booking.booked and booking.slot_start
            else "not booked"
        )
        return (
            f"\U0001f525 HOT LEAD: {lead.name} ({lead.contact})\n"
            f"Source: {lead.source.value}\n"
            f"{qualification.intent_summary}\n"
            f"Call booked: {slot_text}"
        )
