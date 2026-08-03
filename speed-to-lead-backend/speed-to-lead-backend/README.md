# Speed-to-Lead AI System — Backend

4-agent pipeline: **Intake → Qualification → Scheduling → Notify**, coordinated
by `orchestrator.py`. See `speed-to-lead-demo-spec.md` for the full
architecture writeup.

## Setup

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Runs fully in **DEMO_MODE** with zero API keys — every external call
(Supabase, Cal.com, Twilio) is logged instead of fired for real, so you can
test the full pipeline logic before spending a rupee on API credits. Add
`ANTHROPIC_API_KEY` first if you want real qualification chat replies
instead of canned ones; add the rest as you wire up each integration.

## Run

```bash
uvicorn main:app --reload --port 8000
```

## Test the flow end-to-end

```bash
# 1. Simulate a new lead coming in
curl -X POST http://localhost:8000/webhook/lead \
  -H "Content-Type: application/json" \
  -d '{"name": "Priya Sharma", "contact": "priya@example.com", "source": "web_form", "initial_message": "Interested in a 3BHK"}'
# -> {"lead_id": "...", "status": "received"}

# 2. Send chat messages as the lead (use the lead_id from step 1)
curl -X POST http://localhost:8000/chat/<lead_id> \
  -H "Content-Type: application/json" \
  -d '{"message": "My budget is around 80 lakhs"}'

# repeat 2-3 times — after 3 lead messages the orchestrator auto-scores,
# books (if warm/hot), and notifies (if hot). Watch the terminal logs to
# see each agent fire in DEMO_MODE.
```

## Build order (matches the 3-day plan)
- [x] Day 1: models, config, database, intake + qualification agents
- [ ] Day 2: scheduling + notify agents wired to real Cal.com/Twilio keys, orchestrator finalize logic tested end-to-end
- [ ] Day 3: Next.js landing page + chat widget + admin dashboard on top of this API

## Before using with a real client
- Tighten CORS in `main.py` (`allow_origins=["*"]` → the client's actual domain)
- Swap `ConversationStore` (in-memory) for a Redis- or Supabase-backed session — right now conversation state is lost on server restart, fine for a demo, not for production
- Verify the Cal.com v2 API request/response shape in `agents/scheduling.py` against current docs before going live — API surfaces shift
- Add basic auth/rate-limiting on `/webhook/lead` so it can't be spammed
