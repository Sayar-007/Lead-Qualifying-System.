"use client";

import { useState, useRef, useEffect } from "react";
import { createLead, sendChatMessage } from "@/lib/api";

interface Message {
  role: "agent" | "lead";
  content: string;
  responseSeconds?: number;
}

export default function InteractiveChat() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      content: "Welcome to Anders & Vale. I'm your dedicated concierge. To provide you with the most relevant property insights, may I start with your name?",
      responseSeconds: 0.8,
    },
  ]);
  const [draft, setDraft] = useState("");
  const [leadId, setLeadId] = useState<string | null>(null);
  const [waiting, setWaiting] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
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

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim() || waiting) return;

    const text = draft;
    setDraft("");
    setMessages((m) => [...m, { role: "lead", content: text }]);
    setWaiting(true);
    startTimer();

    try {
      let currentLeadId = leadId;
      if (!currentLeadId) {
        // Assume first message contains their name
        const leadRes = await createLead({
          name: text,
          contact: "anonymous",
          source: "web_form",
        });
        currentLeadId = leadRes.lead_id;
        setLeadId(currentLeadId);
      }

      const chatRes = await sendChatMessage(currentLeadId, text);
      const took = stopTimer();
      setMessages((m) => [
        ...m,
        { role: "agent", content: chatRes.reply, responseSeconds: took },
      ]);
    } catch (err) {
      stopTimer();
      setMessages((m) => [
        ...m,
        { role: "agent", content: "Sorry, I'm having trouble connecting right now." },
      ]);
    } finally {
      setWaiting(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-emerald-900 text-white p-4 rounded-full shadow-lg hover:bg-emerald-800 transition-colors z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
      </button>
    );
  }

  return (
    <div id="chat-panel" className="fixed bottom-24 right-8 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-emerald-100/50 z-50">
      {/* Chat Header */}
      <div className="bg-emerald-900 px-6 py-4 flex justify-between items-center text-white">
        <div>
          <h3 className="font-display text-lg tracking-tight">Anders & Vale Concierge</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-xs text-emerald-100/80 font-label-caps tracking-widest">AI Agent Online</span>
          </div>
        </div>
        <button id="close-chat" onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      {/* Chat Messages Container */}
      <div id="chat-messages" ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-stone-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === "lead" ? "items-end self-end max-w-[85%] ml-auto" : "items-start max-w-[85%]"}`}>
            <div className={`p-4 shadow-sm text-sm leading-relaxed ${m.role === "lead" ? "bg-emerald-800 text-white rounded-2xl rounded-tr-none" : "bg-white border border-emerald-100 rounded-2xl rounded-tl-none text-stone-800"}`}>
              {m.content}
            </div>
            {m.role === "agent" && m.responseSeconds !== undefined && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] font-label-caps text-stone-400 tracking-wider">
                  Responded in {m.responseSeconds.toFixed(1)}s
                </span>
              </div>
            )}
          </div>
        ))}
        {waiting && (
          <div className="flex flex-col items-start max-w-[85%]">
            <div className="bg-white border border-emerald-100 p-4 rounded-2xl rounded-tl-none shadow-sm text-stone-800 text-sm leading-relaxed animate-pulse">
              Typing... ({elapsed.toFixed(1)}s)
            </div>
          </div>
        )}
      </div>

      {/* Chat Input Area */}
      <div className="p-4 bg-white border-t border-stone-100">
        <form id="chat-form" className="relative flex items-center gap-2" onSubmit={handleSend}>
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={waiting}
            placeholder="Type your message..."
            className="w-full bg-stone-100 border-none rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-emerald-900/10 placeholder-stone-400"
          />
          <button
            type="submit"
            disabled={waiting}
            className="bg-emerald-900 text-white p-2.5 rounded-full hover:bg-emerald-800 transition-all flex-shrink-0 disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </form>
        <p className="text-[10px] text-center text-stone-400 mt-3 font-label-caps tracking-widest italic">
          Proving the speed of certainty.
        </p>
      </div>
    </div>
  );
}
