export default function Footer() {
  return (
    <footer id="contact" className="bg-ink py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-paper">Anders &amp; Vale</p>
          <p className="mt-2 font-body text-sm text-paper/60">
            1400 S Congress Ave, Austin, TX 78704
          </p>
          <p className="font-body text-sm text-paper/60">hello@andersandvale.example · (512) 555-0148</p>
        </div>
        <p className="font-mono text-xs text-paper/40">© {new Date().getFullYear()} Anders &amp; Vale Realty</p>
      </div>
    </footer>
  );
}
