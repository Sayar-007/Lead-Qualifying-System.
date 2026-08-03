const points = [
  {
    title: "Local, not corporate",
    body: "Every agent lives within twenty minutes of the listings they sell. We walk the trails and eat at the taco trucks too.",
  },
  {
    title: "We answer fast",
    body: "Reach out any hour and you'll hear back within minutes, not days — whether it's a quick question or a full showing request.",
  },
  {
    title: "No pressure, ever",
    body: "We'll tell you when a house isn't right for you. Our job is a good fit, not a fast close.",
  },
];

export default function TrustSection() {
  return (
    <section id="why" className="bg-stone py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Why Anders &amp; Vale</p>
        <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {points.map((p) => (
            <div key={p.title}>
              <h3 className="font-display text-lg font-semibold text-ink-text">{p.title}</h3>
              <p className="mt-2 font-body text-[15px] leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
