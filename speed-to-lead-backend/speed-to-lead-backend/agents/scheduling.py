"""
Agent 3: Scheduling
Job: for hot/warm leads, find the next available slot and book it directly
via Cal.com. Cold leads skip this entirely (orchestrator decides that).

NOTE: Cal.com's v2 API surface has shifted a few times. Before wiring this
up for a real client, verify the exact endpoint/payload shape against
https://cal.com/docs/api-reference/v2 — the structure below is correct as
of this build but treat it as "verify, don't assume" since API contracts
like this move faster than any static reference can track.
"""
import logging
from datetime import datetime, timedelta

import httpx

from config import settings
from database import save_booking
from models import BookingResult, Lead

logger = logging.getLogger("agent.scheduling")


class SchedulingAgent:
    def __init__(self) -> None:
        self.base_url = settings.calcom_api_base
        self.headers = {
            "Authorization": f"Bearer {settings.calcom_api_key}",
            "Content-Type": "application/json",
        }

    async def book_next_available(self, lead: Lead) -> BookingResult:
        if settings.demo_mode and not settings.calcom_api_key:
            return self._demo_booking(lead)

        async with httpx.AsyncClient(timeout=10.0) as client:
            slot = await self._find_next_slot(client)
            if slot is None:
                result = BookingResult(
                    lead_id=lead.id, booked=False,
                    reason_if_not_booked="No available slots in next 7 days",
                )
                save_booking(result)
                return result

            booking_resp = await client.post(
                f"{self.base_url}/bookings",
                headers=self.headers,
                json={
                    "eventTypeId": int(settings.calcom_event_type_id),
                    "start": slot,
                    "attendee": {"name": lead.name, "email": lead.contact, "timeZone": "UTC"},
                },
            )
            booking_resp.raise_for_status()
            data = booking_resp.json()

            result = BookingResult(
                lead_id=lead.id,
                booked=True,
                slot_start=datetime.fromisoformat(slot.replace("Z", "+00:00")),
                calcom_booking_uid=data.get("data", {}).get("uid"),
            )

        save_booking(result)
        logger.info("Booked lead %s for %s", lead.id, slot)
        return result

    async def _find_next_slot(self, client: httpx.AsyncClient) -> str | None:
        now = datetime.utcnow()
        resp = await client.get(
            f"{self.base_url}/slots",
            headers=self.headers,
            params={
                "eventTypeId": settings.calcom_event_type_id,
                "startTime": now.isoformat() + "Z",
                "endTime": (now + timedelta(days=7)).isoformat() + "Z",
            },
        )
        resp.raise_for_status()
        slots = resp.json().get("data", {})
        for _day, day_slots in slots.items():
            if day_slots:
                return day_slots[0]["time"]
        return None

    def _demo_booking(self, lead: Lead) -> BookingResult:
        logger.info("[DEMO] No CALCOM_API_KEY set, simulating a booking for lead %s", lead.id)
        fake_slot = datetime.utcnow() + timedelta(days=1, hours=2)
        result = BookingResult(
            lead_id=lead.id, booked=True, slot_start=fake_slot,
            calcom_booking_uid="demo-booking-uid",
        )
        save_booking(result)
        return result
