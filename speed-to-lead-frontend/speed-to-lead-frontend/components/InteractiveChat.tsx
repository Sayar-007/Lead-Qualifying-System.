"use client";

import { useState } from "react";

export default function InteractiveChat() {
  const [isOpen, setIsOpen] = useState(true);

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
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
      </div>

      {/* Chat Messages Container */}
      <div id="chat-messages" className="flex-1 overflow-y-auto p-6 space-y-6 bg-stone-50">
          {/* AI Welcome Message */}
          <div className="flex flex-col items-start max-w-[85%]">
              <div className="bg-white border border-emerald-100 p-4 rounded-2xl rounded-tl-none shadow-sm text-stone-800 text-sm leading-relaxed">
                  Welcome to Anders & Vale. I'm your dedicated concierge. To provide you with the most relevant property insights, may I start with your name?
              </div>
              <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] font-label-caps text-stone-400 tracking-wider">Responded in 0.8s</span>
              </div>
          </div>

          {/* User Message Example */}
          <div className="flex flex-col items-end self-end max-w-[85%] ml-auto">
              <div className="bg-emerald-800 text-white p-4 rounded-2xl rounded-tr-none shadow-sm text-sm leading-relaxed">
                  Hi, I'm Julian. I'm looking for a 3-bedroom in West Lake Hills.
              </div>
          </div>

          {/* AI Qualification Message */}
          <div className="flex flex-col items-start max-w-[85%]">
              <div className="bg-white border border-emerald-100 p-4 rounded-2xl rounded-tl-none shadow-sm text-stone-800 text-sm leading-relaxed">
                  Pleasure to meet you, Julian. West Lake Hills is an exceptional choice. Based on current market velocity, are you looking to move within the next 30-60 days, or are you just beginning your search?
              </div>
              <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] font-label-caps text-stone-400 tracking-wider">Responded in 1.1s</span>
              </div>
          </div>
      </div>

      {/* Chat Input Area */}
      <div className="p-4 bg-white border-t border-stone-100">
          <form id="chat-form" className="relative flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Type your message..." className="w-full bg-stone-100 border-none rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-emerald-900/10 placeholder-stone-400" />
              <button type="submit" className="bg-emerald-900 text-white p-2.5 rounded-full hover:bg-emerald-800 transition-all flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path></svg>
              </button>
          </form>
          <p className="text-[10px] text-center text-stone-400 mt-3 font-label-caps tracking-widest italic">
              Proving the speed of certainty.
          </p>
      </div>
    </div>
  );
}
