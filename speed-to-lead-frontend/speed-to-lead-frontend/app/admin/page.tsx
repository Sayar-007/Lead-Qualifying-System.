"use client";

import { useEffect, useState } from "react";
import { fetchLeads, type LeadRow } from "@/lib/api";
import LeadsTable from "@/components/LeadsTable";

const POLL_MS = 4000;

export default function AdminPage() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [connected, setConnected] = useState(true);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const data = await fetchLeads();
        if (!cancelled) {
          setLeads(data);
          setConnected(true);
          setLastSync(new Date());
        }
      } catch {
        if (!cancelled) setConnected(false);
      }
    }

    poll();
    const id = setInterval(poll, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const hotCount = leads.filter((l) => l.temperature === "hot").length;
  const bookedCount = leads.filter((l) => l.booked).length;

  return (
    <main className="min-h-screen bg-ink px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass-light">Anders &amp; Vale</p>
            <h1 className="mt-1 font-display text-2xl font-semibold text-paper">Lead pipeline</h1>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-paper/50">
            <span
              className={`h-2 w-2 rounded-full ${connected ? "bg-pine animate-pulse-dot" : "bg-ember"}`}
            />
            {connected ? "live" : "reconnecting…"}
            {lastSync && connected && (
              <span className="hidden sm:inline"> · synced {lastSync.toLocaleTimeString()}</span>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <StatCard label="Total leads" value={leads.length} />
          <StatCard label="Hot" value={hotCount} accent="text-ember" />
          <StatCard label="Booked calls" value={bookedCount} accent="text-pine" />
        </div>

        <div className="mt-8">
          <LeadsTable leads={leads} />
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className="rounded-card border border-paper/10 bg-ink-2 px-5 py-4">
      <p className="font-mono text-[11px] uppercase tracking-wider text-paper/40">{label}</p>
      <p className={`mt-1 font-display text-3xl font-semibold ${accent ?? "text-paper"}`}>{value}</p>
    </div>
  );
}
