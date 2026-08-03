# Demo #1: Speed-to-Lead AI System — Build Spec

## The Pitch (what you say to the prospect)
"You're losing most of your leads because you don't respond fast enough. This system responds in under a minute, qualifies the lead, books them straight on your calendar, and pings you instantly if it's a hot one — 24/7, no staff needed."

**Demo niche:** Real estate (clearest, most universally understood ROI story — a single closed deal is worth $8K-15K in commission, so even a small lift in response speed pays for a year of the system). The architecture is niche-agnostic — swapping to coaches, dental clinics, or home services later is just copy + qualification-question changes, not a rebuild.

---

## System Architecture — 4 Agents + 1 Orchestrator

```
Lead comes in (web form / FB Lead Ad / IG DM webhook)
        │
        ▼
[1] INTAKE AGENT
    - Parses raw lead data into structured fields (name, contact, source, initial message)
    - Writes lead record to DB
        │
        ▼
[2] QUALIFICATION AGENT
    - Opens a live chat/SMS conversation with the lead within seconds
    - Asks 3-4 targeted questions (budget, timeline, intent/urgency)
    - Scores the lead: Hot / Warm / Cold
        │
        ▼
[3] SCHEDULING AGENT
    - If Hot/Warm: checks calendar availability, books a call directly
    - If Cold: adds to a nurture sequence instead of booking
        │
        ▼
[4] NOTIFY/CRM AGENT
    - Logs everything to the CRM record
    - Sends the business owner a real-time WhatsApp/SMS alert for Hot leads
      with a one-line lead summary
        │
        ▼
   ORCHESTRATOR (routes state between agents, handles retries/fallback,
   escalates to human if the AI gets a question it can't answer)
```

This is the part that makes it a genuine multi-agent system rather than "a chatbot" — each agent has a narrow job, hands off state to the next, and the orchestrator makes routing decisions (e.g., skip scheduling entirely for cold leads).

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Backend | Python 3.11+, FastAPI | Fast to build, async-friendly for webhook handling |
| Orchestration | Plain Python state machine (custom) | Faster to ship in 3 days than learning LangGraph mid-build; upgrade to LangGraph later once you have time to showcase framework fluency — mention it in the pitch either way |
| LLM | Claude Haiku or GPT-4o-mini for the live qualification chat | You need sub-2-second responses to sell "instant response" — cheap/fast models matter more here than raw intelligence. Use a stronger model (Sonnet/GPT-4o) only for lead scoring/summary, where quality matters more than speed |
| Database | Supabase (Postgres, free tier) | Gives you DB + realtime + auth in one, looks professional in a live dashboard demo |
| Calendar | Cal.com API (open-source, free) | Easiest booking integration, no client Google Workspace dependency |
| Messaging | Twilio (SMS/WhatsApp) | Free trial credits cover the whole demo phase |
| Frontend | Next.js + Tailwind | One landing page (the "client's website") + an embedded chat widget + a live admin dashboard showing leads arriving in real time — this dashboard is your biggest "wow" moment in a sales call |
| Hosting | Vercel (frontend) + Railway (backend) | Free/cheap tiers, live URL you can screen-share or send to a prospect directly |

**Cost/latency flags for you as the engineer:**
- Qualification chat = highest volume of LLM calls → use the cheapest model here, this is where costs balloon if you scale to real clients
- Keep each qualification turn to 1 short LLM call, not a long chain — latency compounds fast with multi-agent hops
- Budget ~$5-10 total in API costs to build and demo this

---

## 3-Day Build Plan

**Day 1 — Backend core**
- FastAPI skeleton, Supabase schema (leads, conversations, bookings tables)
- Intake agent (webhook receiver + parser)
- Qualification agent (LLM conversation loop + scoring logic)

**Day 2 — Integrations**
- Cal.com booking integration (scheduling agent)
- Twilio SMS/WhatsApp alert integration (notify agent)
- Orchestrator wiring all 4 agents together, end-to-end test with a fake lead

**Day 3 — Frontend + polish**
- Landing page for a fictional real estate agency (the "client site")
- Embedded chat widget wired to the backend
- Live admin dashboard (leads table updating in real time via Supabase realtime)
- Record a 90-second Loom: submit a lead live, show instant chat response, booking confirmation, and the WhatsApp alert landing in real time

---

## Demo Script (for the actual sales call)
1. Share your screen, open the fake agency site
2. Submit a lead as if you're a customer — chat opens instantly
3. Answer the qualifying questions on screen
4. Show the calendar booking confirmation appear
5. Cut to your phone — show the WhatsApp alert landing in real time
6. Close with the ROI math: "If this gets you even one extra closed deal a month, it's paid for itself many times over."

---

## Next Steps
- Lock in real estate as the demo niche (recommended — swap-ready for other niches later)
- I can write the actual FastAPI project scaffold + agent code next, or the Next.js landing page + widget first — whichever you want to tackle first
