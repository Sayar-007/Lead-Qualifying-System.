"""
Agent 2: Qualification
Job: hold a short, natural conversation with the lead to surface budget,
timeline, and intent, then score the lead as hot/warm/cold.

Two separate model calls by design:
  - next_reply() uses a fast/cheap model (Haiku-class) because it fires on
    every single chat turn and speed is the entire selling point of this
    system. Latency here is the demo.
  - score() uses a stronger model (Sonnet-class) because it only runs once
    per lead and needs to reason carefully about ambiguous signals before
    deciding whether to wake up a human.
"""
import json
import logging

from openai import OpenAI

from config import settings
from database import save_qualification, update_lead_temperature
from models import ChatTurn, Lead, LeadTemperature, QualificationResult

logger = logging.getLogger("agent.qualification")

_client = OpenAI(api_key=settings.anthropic_api_key, base_url="https://openrouter.ai/api/v1") if settings.anthropic_api_key else None

QUALIFICATION_SYSTEM_PROMPT = """You are a friendly, efficient assistant for a \
real estate agency. A new lead just came in. Your only job in this \
conversation is to naturally find out:
1. Their budget range
2. Their timeline (browsing vs ready to move in weeks)
3. What they're actually looking for (property type, area, must-haves)

Keep every reply under 2 sentences. Sound human, not like a form. Ask one \
question at a time. Once you have enough signal on all three points, thank \
them and say you're checking calendar availability for a quick call."""

SCORING_SYSTEM_PROMPT = """You score real estate leads from a chat transcript. \
Return ONLY valid JSON, no prose, no markdown fences, matching exactly:
{"temperature": "hot" | "warm" | "cold", "budget_signal": string, \
"timeline_signal": string, "intent_summary": string}

hot = clear budget + ready to move within weeks
warm = interested but vague on budget or timeline
cold = just browsing, no urgency, or budget clearly mismatched"""


class QualificationAgent:
    def next_reply(self, transcript: list[ChatTurn], lead_message: str) -> str:
        """Single conversational turn. Called live, once per lead message."""
        if _client is None:
            return self._demo_reply(lead_message)

        messages = [{"role": "system", "content": QUALIFICATION_SYSTEM_PROMPT}]
        messages.extend([
            {"role": "user" if t.role == "lead" else "assistant", "content": t.content}
            for t in transcript
        ])
        messages.append({"role": "user", "content": lead_message})

        response = _client.chat.completions.create(
            model=settings.qualification_model,
            max_tokens=150,
            messages=messages,
        )
        return response.choices[0].message.content

    def score(self, lead: Lead, transcript: list[ChatTurn]) -> QualificationResult:
        """Run once the conversation has enough signal. Decides hot/warm/cold."""
        if _client is None:
            result = self._demo_score(lead, transcript)
        else:
            transcript_text = "\n".join(f"{t.role}: {t.content}" for t in transcript)
            response = _client.chat.completions.create(
                model=settings.scoring_model,
                max_tokens=300,
                messages=[
                    {"role": "system", "content": SCORING_SYSTEM_PROMPT},
                    {"role": "user", "content": transcript_text}
                ],
            )
            raw = response.choices[0].message.content.strip()
            parsed = json.loads(raw)
            result = QualificationResult(
                lead_id=lead.id,
                temperature=LeadTemperature(parsed["temperature"]),
                budget_signal=parsed.get("budget_signal"),
                timeline_signal=parsed.get("timeline_signal"),
                intent_summary=parsed["intent_summary"],
                transcript=transcript,
            )

        save_qualification(result)
        update_lead_temperature(lead.id, result.temperature.value, result.intent_summary)
        logger.info("Lead %s scored as %s", lead.id, result.temperature.value)
        return result

    # --- fallbacks so the pipeline is runnable without an API key set ---
    def _demo_reply(self, lead_message: str) -> str:
        logger.info("[DEMO] No ANTHROPIC_API_KEY set, returning canned reply")
        return "Got it! What's your budget range, roughly?"

    def _demo_score(self, lead: Lead, transcript: list[ChatTurn]) -> QualificationResult:
        return QualificationResult(
            lead_id=lead.id,
            temperature=LeadTemperature.WARM,
            budget_signal="unknown (demo mode)",
            timeline_signal="unknown (demo mode)",
            intent_summary="Demo mode — no live scoring performed.",
            transcript=transcript,
        )
