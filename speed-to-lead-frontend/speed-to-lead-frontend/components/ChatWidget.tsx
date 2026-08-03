"use client";

import { useEffect, useRef, useState } from "react";
import { createLead, sendChatMessage, type ChatTurnOutcome } from "@/lib/api";

interface AgentMessage {
  role: "agent";
  content: string;
  responseSeconds: number;
}
interface LeadMessage {
  role: "lead";
  content: string;
}
type Message = AgentMessage | LeadMessage;

type Phase = "closed" | "intro" | "chatting";

export default function ChatWidget() {
  const [phase, setPhase] = useState<Phase>("closed");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [outcome, setOutcome] = useState<ChatTurnOutcome | null>(null);
  const [error, setError] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, waiting]);

  function startTimer() {
    startRef.current = performance.now();
    setElapsed(0);
    timerRef.current = setInterval(() => {
      setElapsed((performance.now() - startRef.current) / 1000);
    }, 80);
  }

  function stopTimer(): number {
    if (timerRef.current) clearInterval(timerRef.current);
    return (performance.now() - startRef.current) / 1000;
  }

  async function handleIntroSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setError(null);
    try {
      const res = await createLead({ name, contact, source: "web_form" });
      setLeadId(res.lead_id);
      setPhase("chatting");
      setMessages([
        {
          role: "agent",
          content: `Thanks ${name.split(" ")[0]}! Tell me a bit about the home you're after — area, budget, timeline — and I'll get you sorted quickly.`,
          responseSeconds: 0,
        },
      ]);
    } catch {
      setError("Couldn't reach the assistant. Is the backend running?");
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim() || !leadId || waiting) return;
    const text = draft;
    setDraft("");
    setMessages((m) => [...m, { role: "lead", content: text }]);
    setWaiting(true);
    startTimer();
    setError(null);

    try {
      const res = await sendChatMessage(leadId, text);
      const took = stopTimer();
      setMessages((m) => [...m, { role: "agent", content: res.reply, responseSeconds: took }]);
      if (res.finalized && res.outcome) setOutcome(res.outcome);
    } catch {
      stopTimer();
      setError("Couldn't reach the assistant. Is the backend running?");
    } finally {
      setWaiting(false);
    }
  }

  if (phase === "closed") {
    return (
      <button
        onClick={() => setPhase("intro")}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-ink px-5 py-3.5 text-paper shadow-xl transition hover:bg-ink-2"
        aria-label="Open chat with Anders & Vale"
      >
        <span className="h-2 w-2 rounded-full bg-brass-light animate-pulse-dot" />
        <span className="font-display text-sm font-medium">Ask Anders &amp; Vale</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-[560px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-card border border-ink/10 bg-paper shadow-2xl">
      {/* header */}
      <div className="flex items-center justify-between bg-ink px-4 py-3.5">
        <div>
          <p className="font-display text-sm font-semibold text-paper">Anders &amp; Vale</p>
          <p className="font-mono text-[11px] text-brass-light">usually replies instantly</p>
        </div>
        <button
          onClick={() => setPhase("closed")}
          className="text-paper/70 transition hover:text-paper"
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      {phase === "intro" && (
        <form onSubmit={handleIntroSubmit} className="flex flex-1 flex-col justify-center gap-3 px-5">
          <p className="font-body text-[15px] leading-snug text-ink-text">
            Hi! Before we dive in — who am I speaking with?
          </p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="rounded-lg border border-ink/15 bg-white px-3 py-2 font-body text-sm outline-none focus-visible:border-brass"
            required
          />
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Email or phone"
            className="rounded-lg border border-ink/15 bg-white px-3 py-2 font-body text-sm outline-none focus-visible:border-brass"
            required
          />
          <button
            type="submit"
            className="rounded-lg bg-brass py-2.5 font-display text-sm font-medium text-ink transition hover:bg-brass-light"
          >
            Start chatting
          </button>
          {error && <p className="font-mono text-xs text-ember">{error}</p>}
        </form>
      )}

      {phase === "chatting" && (
        <>
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "lead" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    m.role === "lead"
                      ? "max-w-[80%] rounded-2xl rounded-br-sm bg-ink px-3.5 py-2 font-body text-[14px] text-paper"
                      : "max-w-[80%] rounded-2xl rounded-bl-sm bg-stone px-3.5 py-2 font-body text-[14px] text-ink-text"
                  }
                >
                  <p>{m.content}</p>
                  {m.role === "agent" && m.responseSeconds > 0 && (
                    <p className="mt-1 font-mono text-[10px] text-muted">
                      responded in {m.responseSeconds.toFixed(1)}s
                    </p>
                  )}
                </div>
              </div>
            ))}

            {waiting && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-stone px-3.5 py-2">
                  <p className="font-mono text-[11px] text-muted">{elapsed.toFixed(1)}s…</p>
                </div>
              </div>
            )}

            {outcome && (
              <div className="rounded-xl border border-brass/40 bg-brass/10 px-3.5 py-3">
                <p className="font-display text-[13px] font-semibold text-ink-text">
                  {outcome.booked ? "You're on the calendar" : "Thanks for the details"}
                </p>
                <p className="mt-1 font-body text-[13px] text-muted">
                  {outcome.booked && outcome.slot_start
                    ? new Date(outcome.slot_start).toLocaleString(undefined, {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })
                    : "We'll follow up with matching listings shortly."}
                </p>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="flex gap-2 border-t border-ink/10 px-3 py-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 rounded-full border border-ink/15 bg-white px-4 py-2 font-body text-sm outline-none focus-visible:border-brass"
            />
            <button
              type="submit"
              disabled={waiting}
              className="rounded-full bg-ink px-4 py-2 font-display text-sm text-paper transition disabled:opacity-40"
            >
              Send
            </button>
          </form>
          {error && <p className="px-4 pb-2 font-mono text-xs text-ember">{error}</p>}
        </>
      )}
    </div>
  );
}
