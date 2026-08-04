import Image from "next/image";

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

        <div className="relative aspect-[4/3] overflow-hidden rounded-card">
          <Image
            src="/images/hero-house.jpg"
            alt="Modern hill-country home at dusk"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}

