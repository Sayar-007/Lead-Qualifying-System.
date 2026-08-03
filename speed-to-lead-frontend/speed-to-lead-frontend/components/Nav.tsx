export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-paper/10 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <p className="font-display text-lg font-semibold tracking-tight text-paper">
          Anders <span className="text-brass-light">&amp;</span> Vale
        </p>
        <nav className="hidden gap-8 font-body text-[15px] text-paper/80 sm:flex">
          <a href="#listings" className="transition hover:text-paper">Listings</a>
          <a href="#why" className="transition hover:text-paper">Why us</a>
          <a href="#contact" className="transition hover:text-paper">Contact</a>
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-brass px-4 py-2 font-display text-sm font-medium text-ink transition hover:bg-brass-light"
        >
          Book a viewing
        </a>
      </div>
    </header>
  );
}
