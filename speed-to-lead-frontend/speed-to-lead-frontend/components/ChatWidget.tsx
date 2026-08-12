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
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <button
          onClick={() => setPhase("intro")}
          className="bg-secondary text-on-secondary w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200"
          aria-label="Open chat"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>chat_bubble</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <div className="w-80 bg-surface/80 backdrop-blur-[12px] border border-outline-variant rounded-xl shadow-[0px_4px_20px_rgba(6,78,59,0.08)] mb-4 overflow-hidden transform origin-bottom-right transition-all duration-300">
        <div className="bg-primary p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
            <span className="font-label-caps text-label-caps text-on-primary">Concierge</span>
          </div>
          <button onClick={() => setPhase("closed")} className="text-on-primary hover:text-secondary-fixed transition-colors" aria-label="Close chat">
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>close</span>
          </button>
        </div>

        {phase === "intro" && (
          <form onSubmit={handleIntroSubmit} className="p-4 flex flex-col gap-3 bg-surface-bright/50">
            <p className="font-body-md text-sm text-on-surface">Hi! Before we dive in — who am I speaking with?</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-md border border-surface-variant bg-surface px-3 py-2 font-body-md text-sm text-on-surface outline-none focus:border-primary"
              required
            />
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Email or phone"
              className="w-full rounded-md border border-surface-variant bg-surface px-3 py-2 font-body-md text-sm text-on-surface outline-none focus:border-primary"
              required
            />
            <button type="submit" className="w-full rounded-md bg-secondary py-2 font-label-caps text-label-caps text-on-secondary transition hover:bg-on-secondary-fixed-variant">
              Start chatting
            </button>
            {error && <p className="text-xs text-error">{error}</p>}
          </form>
        )}

        {phase === "chatting" && (
          <>
            <div ref={scrollRef} className="h-64 p-4 overflow-y-auto flex flex-col space-y-4 bg-surface-bright/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.role === "lead" ? "items-end" : "items-start"}`}>
                  <div className={`py-2 px-3 rounded-lg max-w-[85%] border shadow-sm ${m.role === "lead" ? "bg-primary text-on-primary rounded-tr-none border-primary" : "bg-surface-container text-on-surface rounded-tl-none border-surface-variant"}`}>
                    <p className="font-body-md text-sm">{m.content}</p>
                  </div>
                  {m.role === "agent" && m.responseSeconds > 0 && (
                    <div className="mt-1 flex items-center space-x-1">
                      <span className="material-symbols-outlined text-[10px] text-secondary">bolt</span>
                      <span className="font-label-caps text-[10px] text-secondary tracking-widest">responded in {m.responseSeconds.toFixed(1)}s</span>
                    </div>
                  )}
                </div>
              ))}
              
              {waiting && (
                <div className="flex flex-col items-start">
                  <div className="bg-surface-container py-2 px-3 rounded-lg rounded-tl-none max-w-[85%] border border-surface-variant shadow-sm">
                    <p className="font-body-md text-sm text-on-surface-variant animate-pulse">{elapsed.toFixed(1)}s...</p>
                  </div>
                </div>
              )}

              {outcome && (
                <div className="rounded-lg border border-secondary/40 bg-secondary/10 px-3 py-2 mt-2 text-center">
                  <p className="font-label-caps text-secondary text-xs">
                    {outcome.booked ? "Appointment Booked" : "Details Received"}
                  </p>
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="p-3 bg-surface border-t border-outline-variant">
              <div className="flex items-center bg-surface-container-low rounded-full px-3 py-2 border border-surface-variant focus-within:border-primary">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type a message..."
                  className="bg-transparent border-none focus:ring-0 font-body-md text-sm text-on-surface w-full p-0 outline-none"
                />
                <button type="submit" disabled={waiting} className="text-primary hover:text-secondary ml-2 transition-colors disabled:opacity-50">
                  <span className="material-symbols-outlined" style={{ fontSize: "20px", fontVariationSettings: "'FILL' 1" }}>send</span>
                </button>
              </div>
              {error && <p className="px-3 pt-2 text-xs text-error">{error}</p>}
            </form>
          </>
        )}
      </div>
      
      <button
        onClick={() => setPhase("closed")}
        className="bg-secondary text-on-secondary w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200"
      >
        <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>expand_more</span>
      </button>
    </div>
  );
}
