"""
Agent 1: Intake
Job: take whatever shape of data the source sends (web form, FB Lead Ad
webhook, IG DM), normalize it into a Lead record, and persist it. This is
intentionally dumb and fast — it should never block on anything slow.
"""
import logging

from database import save_lead
from models import Lead, RawLeadPayload

logger = logging.getLogger("agent.intake")


class IntakeAgent:
    def run(self, payload: RawLeadPayload) -> Lead:
        lead = Lead(
            name=payload.name,
            contact=payload.contact,
            source=payload.source,
            initial_message=payload.initial_message,
        )
        save_lead(lead)
        logger.info("Intake complete for lead %s from %s", lead.id, lead.source.value)
        return lead
