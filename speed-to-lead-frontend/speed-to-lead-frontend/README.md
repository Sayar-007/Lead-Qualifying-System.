# Speed-to-Lead — Frontend (Anders & Vale demo site)

A fictional Austin, TX real-estate brokerage site with the working chat
widget embedded, plus an internal admin dashboard showing leads land in
real time. This is the "stage" for the backend system — see
`speed-to-lead-backend/` for the actual 4-agent pipeline.

- `/` — the public-facing site a prospect would see. Submit a lead through
  the chat widget (bottom-right bubble) to trigger the real pipeline.
- `/admin` — the internal view. Polls the backend every 4s and shows leads
  arriving with their temperature, booking status, and notification state.
  **This is what you show the client on the sales call** — split-screen the
  public site and this dashboard side by side.

## Setup

```bash
npm install
cp .env.local.example .env.local
```

Make sure the backend is running first (`speed-to-lead-backend/`, see its
README) — this expects it at `http://localhost:8000` by default. Change
`NEXT_PUBLIC_API_URL` in `.env.local` if it's running elsewhere.

## Run

```bash
npm run dev
```

Visit `http://localhost:3000` for the site, `http://localhost:3000/admin`
for the dashboard.

## Design system
- **Colors**: ink (#14181C), stone (#EDEAE1), paper (#FBFAF7), brass
  (#B08D4F, primary accent), ember (#C4562F, hot-lead/urgency), pine
  (#33513F, booked/success)
- **Type**: Space Grotesk (display/headlines), Newsreader (body copy),
  IBM Plex Mono (data, timestamps, the live response-time counter in the
  chat widget)
- **Signature element**: the chat widget shows a live ticking counter while
  waiting for a reply, then freezes it next to the response — this proves
  the "we respond instantly" pitch inside the actual interaction instead of
  just claiming it in copy.

## Before showing a real client
- Swap the property listings in `components/FeaturedListings.tsx` for
  something closer to their actual inventory (or genuinely their listings,
  if you're pitching a real agency)
- Swap "Anders & Vale" branding for theirs, or keep it generic/fictional
  if this stays a portfolio demo
- Deploy to Vercel (`vercel deploy`) so you have a live URL to send instead
  of screen-sharing localhost
