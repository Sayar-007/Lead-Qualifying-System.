export default function Hero() {
  return (
    <section className="bg-ink">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div className="animate-fade-up">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass-light">
            Austin &amp; the Hill Country
          </p>
          <h1 className="mt-4 font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-paper md:text-6xl">
            Homes with a
            <br />
            sense of <span className="italic font-body font-normal text-brass-light">place.</span>
          </h1>
          <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-paper/75">
            We know every ridge, creek lot, and cul-de-sac from Westlake to Dripping
            Springs — so you don&apos;t have to guess where you&apos;ll actually want to live.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#listings"
              className="rounded-full bg-brass px-6 py-3 font-display text-sm font-medium text-ink transition hover:bg-brass-light"
            >
              View current listings
            </a>
            <a href="#contact" className="font-body text-sm text-paper/70 underline underline-offset-4 transition hover:text-paper">
              Talk to an agent
            </a>
          </div>
        </div>

        <div className="relative">
          <HillCountryIllustration />
        </div>
      </div>
    </section>
  );
}

function HillCountryIllustration() {
  return (
    <svg viewBox="0 0 480 420" className="w-full" role="img" aria-label="Illustration of a modern hill-country home at dusk">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E252B" />
          <stop offset="100%" stopColor="#14181C" />
        </linearGradient>
        <linearGradient id="sun" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4B87E" />
          <stop offset="100%" stopColor="#B08D4F" />
        </linearGradient>
      </defs>

      <rect width="480" height="420" fill="url(#sky)" rx="20" />
      <circle cx="360" cy="90" r="46" fill="url(#sun)" opacity="0.9" />

      {/* rolling hills */}
      <path d="M0 300 Q 120 250 240 290 T 480 270 V 420 H 0 Z" fill="#EDEAE1" opacity="0.06" />
      <path d="M0 330 Q 140 290 260 320 T 480 300 V 420 H 0 Z" fill="#EDEAE1" opacity="0.1" />

      {/* house */}
      <g transform="translate(90,220)">
        <rect x="0" y="60" width="220" height="90" fill="#EDEAE1" opacity="0.9" rx="2" />
        <rect x="0" y="30" width="130" height="34" fill="#B08D4F" opacity="0.85" />
        <rect x="130" y="0" width="90" height="64" fill="#D4B87E" opacity="0.5" />
        {/* windows */}
        <rect x="18" y="82" width="34" height="40" fill="#14181C" opacity="0.7" />
        <rect x="66" y="82" width="34" height="40" fill="#14181C" opacity="0.7" />
        <rect x="150" y="16" width="52" height="34" fill="#14181C" opacity="0.55" />
        {/* deck line */}
        <line x1="-10" y1="150" x2="230" y2="150" stroke="#B08D4F" strokeWidth="2" opacity="0.6" />
      </g>

      {/* tree line, simple */}
      <g opacity="0.35" fill="#EDEAE1">
        <circle cx="60" cy="300" r="16" />
        <circle cx="80" cy="292" r="12" />
        <circle cx="420" cy="290" r="14" />
      </g>
    </svg>
  );
}
