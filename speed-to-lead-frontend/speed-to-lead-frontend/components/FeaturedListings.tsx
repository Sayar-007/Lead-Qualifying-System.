interface Listing {
  address: string;
  area: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  tag: string;
  image: string;
}

const listings: Listing[] = [
  {
    address: "1148 Cypress Ridge Dr",
    area: "Westlake Hills",
    price: "$1,240,000",
    beds: 4,
    baths: 3,
    sqft: "3,180",
    tag: "New listing",
    image: "/images/listing-1.jpg",
  },
  {
    address: "412 Barton Creek Ln",
    area: "Dripping Springs",
    price: "$865,000",
    beds: 3,
    baths: 2,
    sqft: "2,410",
    tag: "Open house Sat",
    image: "/images/listing-2.jpg",
  },
  {
    address: "27 Mirador Court",
    area: "Lakeway",
    price: "$1,975,000",
    beds: 5,
    baths: 4,
    sqft: "4,620",
    tag: "Lake view",
    image: "/images/listing-3.jpg",
  },
];

export default function FeaturedListings() {
  return (
    <section id="listings" className="bg-paper py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Featured</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink-text">
              Homes on the market now
            </h2>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <article
              key={l.address}
              className="group overflow-hidden rounded-card border border-ink/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-44 w-full overflow-hidden bg-stone">
                <img
                  src={l.image}
                  alt={`${l.address}, ${l.area}`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 rounded-full bg-ink/90 px-3 py-1 font-mono text-[11px] text-paper">
                  {l.tag}
                </span>
              </div>
              <div className="p-5">
                <p className="font-display text-lg font-semibold text-ink-text">{l.price}</p>
                <p className="mt-1 font-body text-[15px] text-ink-text">{l.address}</p>
                <p className="font-body text-sm text-muted">{l.area}</p>
                <p className="mt-3 font-mono text-xs text-muted">
                  {l.beds} bd · {l.baths} ba · {l.sqft} sqft
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
