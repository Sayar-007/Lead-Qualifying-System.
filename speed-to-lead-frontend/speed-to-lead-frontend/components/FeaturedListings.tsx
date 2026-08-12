interface Listing {
  area: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  tag?: string;
  image: string;
}

const listings: Listing[] = [
  {
    price: "$4,250,000",
    area: "West Lake Hills",
    beds: "4",
    baths: "5",
    sqft: "5,120",
    tag: "New Listing",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0s8pRxiYpbrQ_US-bDUg83FETtBQrchlswYvfuY1S9bdRkjkv7YwB_3uNEsIMd-LmwMLlba9Gy4E8LE5SBbWtXBdEvkYl54UdO_At1oHlm2eSmwnlf-J5IIB2bNjH3QEHGyEgXC7UBvL1I26tcMwmwlvlCFQFQBI7scQMItbesNtrrpI-1ZhFtTr_dhfU8fVL5Nsq4Y5MbE7pEU3yHkRTnnNawpXSLSTfmAryNR0a9iwtOIJUmQzr"
  },
  {
    price: "$6,800,000",
    area: "Barton Creek",
    beds: "6",
    baths: "7.5",
    sqft: "8,400",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5cICKM60rCrlmyZTwT12Ps10yaTZ-Z55Whp2YC_-uyqOtKS-42ViVqEOqAkmrh1my8_gArr62-0H2V1703HFp9ARLwxapaNO_ONSmY5cDMSLqWggxiF1g8xgiY18ilL0nC1DWMkO3ckrGugQtzuOxjixqoe703pa5cjmLYFDL_mYB1hH1wUJKVkSf3WfP-TQudFrgIcbPJD1hRNgEO7OAsRKap4tdh1FOgSDdvWe24Aw4kakt4h4d"
  },
  {
    price: "$3,100,000",
    area: "Tarrytown",
    beds: "3",
    baths: "3",
    sqft: "3,200",
    tag: "Under Contract",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4uk9IU8tItLUz5-Nv-fgnOZHzO616sTR8HoNOri7in4qmaVsrSCaQv-WxROrkoL8HePDrIBtH1MlRMAVcC3wrRY2RPUGOKjvlELOGi2c1YbRVh8BAGzHbcWjajyBT3K1WG6MNJnTUNjd3oRl_ZLEc3MyZnUXUvCX-Q5zbqetM3YO-nLm6IXucTRAxgs0VLWkFjt_GuIa416LsW0jXHb-MBuWf3hH71CJCcjEdfIExR98auRy_5npH"
  }
];

export default function FeaturedListings() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface" id="listings">
      <div className="max-w-container-max mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-outline-variant pb-8">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary mb-2">Curated Portfolio</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Exceptional properties across Central Texas.</p>
          </div>
          <a className="font-label-caps text-label-caps text-primary hover:text-secondary transition-colors uppercase tracking-widest hidden md:inline-block" href="#">View All Listings <span className="material-symbols-outlined align-middle ml-1" style={{ fontSize: "16px" }}>arrow_forward</span></a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {listings.map((l, i) => (
            <article key={i} className="group cursor-pointer bg-surface-card rounded-lg overflow-hidden border border-surface-variant transition-transform hover:-translate-y-1 duration-300">
              <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 border border-black/5 z-10 pointer-events-none rounded-t-lg"></div>
                <img className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" src={l.image} alt={l.area} />
                {l.tag && (
                  <div className="absolute top-4 right-4 z-20 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-sm">
                    <span className="font-label-caps text-label-caps text-primary">{l.tag}</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-headline-md text-headline-md text-primary mb-1">{l.price}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">{l.area}</p>
                <div className="flex space-x-4 border-t border-surface-variant pt-4">
                  <span className="font-data-mono text-data-mono text-on-surface-variant"><span className="font-bold text-primary">{l.beds}</span> Beds</span>
                  <span className="font-data-mono text-data-mono text-on-surface-variant"><span className="font-bold text-primary">{l.baths}</span> Baths</span>
                  <span className="font-data-mono text-data-mono text-on-surface-variant"><span className="font-bold text-primary">{l.sqft}</span> Sq Ft</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <a className="font-label-caps text-label-caps text-primary hover:text-secondary transition-colors uppercase tracking-widest inline-block border-b border-primary pb-1" href="#">View All Listings</a>
        </div>
      </div>
    </section>
  );
}
