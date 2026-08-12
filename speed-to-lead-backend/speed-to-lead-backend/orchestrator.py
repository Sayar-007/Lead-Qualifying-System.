"""
The orchestrator. This is what makes it a *system* rather than four
separate scripts — it holds conversation state per lead, decides when a
conversation has enough signal to score, and routes hot/warm/cold leads
down different paths (book a call vs. just log for nurture).

Refactored to use deepagents.
"""
import logging
from uuid import UUID

from agents.intake import IntakeAgent
from agents.deep_agent import get_agent
from models import (
    ChatTurn,
    Lead,
    RawLeadPayload,
)

logger = logging.getLogger("orchestrator")


class ConversationStore:
    """In-memory transcript + lead cache, keyed by lead_id. Demo-only."""

    def __init__(self) -> None:
        self._transcripts: dict[UUID, list[ChatTurn]] = {}
        self._leads: dict[UUID, Lead] = {}
        self._finalized: set[UUID] = set()
        self._outcomes: dict[UUID, dict] = {}

    def register(self, lead: Lead) -> None:
        self._leads[lead.id] = lead
        self._transcripts[lead.id] = []
        # Initialize outcome
        self._outcomes[lead.id] = {}

    def get_lead(self, lead_id: UUID) -> Lead:
        return self._leads[lead_id]

    def transcript(self, lead_id: UUID) -> list[ChatTurn]:
        return self._transcripts[lead_id]

    def append(self, lead_id: UUID, turn: ChatTurn) -> None:
        self._transcripts[lead_id].append(turn)

    def is_finalized(self, lead_id: UUID) -> bool:
        return lead_id in self._finalized

    def mark_finalized(self, lead_id: UUID) -> None:
        self._finalized.add(lead_id)

    def set_outcome_field(self, lead_id: UUID, key: str, value: any) -> None:
        if lead_id not in self._outcomes:
            self._outcomes[lead_id] = {}
        self._outcomes[lead_id][key] = value

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

# Singleton store for tools to update
store = ConversationStore()

class LeadOrchestrator:
    def __init__(self) -> None:
        self.intake = IntakeAgent()
        self.store = store
        self.agent = get_agent()

    def handle_new_lead(self, payload: RawLeadPayload) -> Lead:
        lead = self.intake.run(payload)
        self.store.register(lead)

        if payload.initial_message:
            self.store.append(lead.id, ChatTurn(role="lead", content=payload.initial_message))

        return lead

    async def handle_chat_turn(self, lead_id: UUID, lead_message: str) -> dict:
        """
        Called on every message the lead sends in the live chat widget.
        """
        self.store.append(lead_id, ChatTurn(role="lead", content=lead_message))
        transcript = self.store.transcript(lead_id)
        lead = self.store.get_lead(lead_id)

        messages = [
            {"role": "system", "content": f"Context: You are speaking with {lead.name}, email: {lead.contact}, lead_id: {lead.id}"}
        ]
        messages.extend([
            {"role": "user" if t.role == "lead" else "assistant", "content": t.content}
            for t in transcript
        ])

        try:
            # LangGraph/deepagents interface
            result = await self.agent.ainvoke({"messages": messages})
            reply_text = result["messages"][-1].content
        except Exception as e:
            logger.error(f"Agent error: {e}")
            reply_text = "I'm having trouble connecting right now. Can I help you with anything else?"

        self.store.append(lead_id, ChatTurn(role="agent", content=reply_text))

        outcome = self.store._outcomes.get(lead_id, {})
        finalized = outcome.get("temperature") is not None

        response = {"reply": reply_text, "finalized": finalized}
        if finalized:
            response["outcome"] = outcome

        return response

    def list_leads(self) -> list[dict]:
        return self.store.all_leads_with_outcomes()
