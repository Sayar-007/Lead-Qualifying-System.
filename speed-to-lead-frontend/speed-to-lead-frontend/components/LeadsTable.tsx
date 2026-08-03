import type { LeadRow } from "@/lib/api";

const badgeStyles: Record<LeadRow["temperature"], string> = {
  hot: "bg-ember/15 text-ember border-ember/30",
  warm: "bg-brass/15 text-brass border-brass/30",
  cold: "bg-ink/10 text-muted border-ink/15",
  unscored: "bg-ink/5 text-muted border-ink/10",
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", second: "2-digit" });
}

export default function LeadsTable({ leads }: { leads: LeadRow[] }) {
  if (leads.length === 0) {
    return (
      <div className="rounded-card border border-paper/10 bg-ink-2 px-6 py-16 text-center">
        <p className="font-body text-paper/60">
          No leads yet — submit one from the site to see it land here in real time.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-card border border-paper/10 bg-ink-2">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-paper/10 font-mono text-[11px] uppercase tracking-wider text-paper/40">
            <th className="px-5 py-3 font-medium">Lead</th>
            <th className="px-5 py-3 font-medium">Source</th>
            <th className="px-5 py-3 font-medium">Temp</th>
            <th className="px-5 py-3 font-medium">Booked</th>
            <th className="px-5 py-3 font-medium">Notified</th>
            <th className="px-5 py-3 font-medium">Received</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="animate-row-in border-b border-paper/5 last:border-0">
              <td className="px-5 py-3.5">
                <p className="font-body text-[15px] text-paper">{lead.name}</p>
                <p className="font-mono text-xs text-paper/40">{lead.contact}</p>
              </td>
              <td className="px-5 py-3.5 font-body text-sm text-paper/70">
                {lead.source.replace("_", " ")}
              </td>
              <td className="px-5 py-3.5">
                <span className={`rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase ${badgeStyles[lead.temperature]}`}>
                  {lead.temperature}
                </span>
              </td>
              <td className="px-5 py-3.5 font-mono text-xs">
                {lead.booked ? (
                  <span className="text-pine">
                    {lead.slot_start
                      ? new Date(lead.slot_start).toLocaleDateString(undefined, { month: "short", day: "numeric" })
                      : "yes"}
                  </span>
                ) : (
                  <span className="text-paper/30">—</span>
                )}
              </td>
              <td className="px-5 py-3.5 font-mono text-xs">
                {lead.owner_notified ? <span className="text-ember">sent</span> : <span className="text-paper/30">—</span>}
              </td>
              <td className="px-5 py-3.5 font-mono text-xs text-paper/40">{formatTime(lead.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
