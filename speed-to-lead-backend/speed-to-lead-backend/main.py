"""
FastAPI entrypoint. Two endpoints matter for the demo:
  POST /webhook/lead   - a new lead comes in (web form / FB ad / IG DM)
  POST /chat/{lead_id} - the lead sends a message in the live chat widget

Run locally with:
  uvicorn main:app --reload --port 8000
"""
import logging
from uuid import UUID

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models import RawLeadPayload
from orchestrator import LeadOrchestrator

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(name)s: %(message)s")

app = FastAPI(title="Speed-to-Lead AI System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten to the actual client domain before going live
    allow_methods=["*"],
    allow_headers=["*"],
)

orchestrator = LeadOrchestrator()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/webhook/lead")
def new_lead(payload: RawLeadPayload):
    """Entry point for any lead source. Fires the intake agent immediately."""
    lead = orchestrator.handle_new_lead(payload)
    return {"lead_id": str(lead.id), "status": "received"}


@app.get("/leads")
def list_leads():
    """Polled by the admin dashboard. Newest lead first."""
    return orchestrator.list_leads()


@app.post("/chat/{lead_id}")
async def chat_turn(lead_id: UUID, body: dict):
    """
    Body: {"message": "<what the lead typed>"}
    Returns the agent's reply, and once qualification is complete, the
    booking + notify outcome as well.
    """
    message = body.get("message")
    if not message:
        raise HTTPException(status_code=400, detail="message is required")

    try:
        result = await orchestrator.handle_chat_turn(lead_id, message)
    except KeyError:
        raise HTTPException(status_code=404, detail="Unknown lead_id — call /webhook/lead first")

    return result
