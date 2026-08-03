"""
Thin wrapper around Supabase. Keeps all DB calls in one place so agents
never touch the client directly — makes it trivial to swap DBs later.
"""
import logging

from supabase import Client, create_client

from config import settings
from models import BookingResult, Lead, QualificationResult

logger = logging.getLogger("database")

_client: Client | None = None


def get_client() -> Client:
    global _client
    if _client is None:
        if not settings.supabase_url or not settings.supabase_key:
            raise RuntimeError(
                "SUPABASE_URL / SUPABASE_KEY not set. Fill in .env or run "
                "in DEMO_MODE with a mocked db layer."
            )
        _client = create_client(settings.supabase_url, settings.supabase_key)
    return _client


def save_lead(lead: Lead) -> None:
    if settings.demo_mode and not settings.supabase_url:
        logger.info("[DEMO] Would insert lead: %s", lead.model_dump(mode="json"))
        return
    get_client().table("leads").insert(lead.model_dump(mode="json")).execute()


def update_lead_temperature(lead_id, temperature: str, notes: str) -> None:
    if settings.demo_mode and not settings.supabase_url:
        logger.info("[DEMO] Would update lead %s -> %s (%s)", lead_id, temperature, notes)
        return
    get_client().table("leads").update(
        {"temperature": temperature, "qualification_notes": notes}
    ).eq("id", str(lead_id)).execute()


def save_qualification(result: QualificationResult) -> None:
    if settings.demo_mode and not settings.supabase_url:
        logger.info("[DEMO] Would save qualification transcript for %s", result.lead_id)
        return
    get_client().table("conversations").insert(
        {
            "lead_id": str(result.lead_id),
            "transcript": [t.model_dump(mode="json") for t in result.transcript],
            "temperature": result.temperature.value,
        }
    ).execute()


def save_booking(result: BookingResult) -> None:
    if settings.demo_mode and not settings.supabase_url:
        logger.info("[DEMO] Would save booking: %s", result.model_dump(mode="json"))
        return
    get_client().table("bookings").insert(result.model_dump(mode="json")).execute()
