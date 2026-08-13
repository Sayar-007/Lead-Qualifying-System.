import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import InteractiveChat from "@/components/InteractiveChat";

export default function ServicesPage() {
  return (
    <>
      <Nav />
      {/* Header Section */}
      <header className="pt-32 pb-20 md:pt-48 md:pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary max-w-3xl mb-6">
          Elevating the Real Estate Experience
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Anders &amp; Vale merges the deep-rooted prestige of Austin's traditional market with advanced analytical systems, providing unparalleled precision in every transaction.
        </p>
      </header>

      {/* Main Content Canvas */}
      <main className="space-y-32 mb-32">
        {/* The Speed of Certainty (Bento Grid Style) */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Large Image Span */}
            <div className="md:col-span-8 bg-surface-container h-[400px] md:h-[600px] overflow-hidden relative group">
              <div 
                className="bg-cover bg-center w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                data-alt="A sleek, modern high-rise office in downtown Austin at twilight. The interior is bathed in sophisticated, cool-toned lighting, with glowing digital screens displaying complex real estate analytics. The view outside shows a dynamic cityscape. The overall mood is high-tech, authoritative, and premium, perfectly matching the New Heritage and Corporate Modern aesthetic." 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDotATa4tkpugIq6y5Qu755mO6dYJTSIuBV0fOIwXl2Fny_a4zFQwweA-AyCzQADQiue9g2PqzfQKQ3S2f1HmcJ_iaJm4qIx3HcdNwdUSHCsvn9kSz9S_3bmEfP4S9zDZ3NkKGQ3Tvt05O_QgUeSrdqjGlFSL--kcJxT_dF5dzcaHRTN7qyh3rP2vjckygDfoZYGv2IIw0-Aiqpx4yyV2TTxfqjFW_HUrgR_kh-QneLdT-gzFKOu8c5')" }}
              ></div>
              <div className="absolute inset-0 border border-surface-variant opacity-50"></div>
            </div>
            {/* Text Span */}
            <div className="md:col-span-4 flex flex-col justify-center p-8 bg-surface-card border border-surface-variant">
              <span className="font-label-caps text-label-caps text-secondary-container mb-4 tracking-wider">Proprietary System</span>
              <h2 className="font-headline-md text-headline-md text-primary mb-6">The Speed of Certainty</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                Our "Speed-to-Lead" architecture isn't just about moving fast; it's about moving with absolute conviction. By aggregating disparate market data streams into a cohesive dashboard, we eliminate the guesswork, giving our clients a decisive advantage in Austin's hyper-competitive landscape.
              </p>
              <ul className="space-y-4 font-data-mono text-data-mono text-on-surface-variant">
                <li className="flex items-center gap-3 border-b border-surface-variant pb-2">
                  <span className="material-symbols-outlined text-primary" data-icon="bolt">bolt</span>
                  <span className="text-primary-container">Sub-30s Response Algorithms</span>
                </li>
                <li className="flex items-center gap-3 border-b border-surface-variant pb-2">
                  <span className="material-symbols-outlined text-primary" data-icon="analytics">analytics</span>
                  <span className="text-primary-container">Predictive Pricing Models</span>
                </li>
                <li className="flex items-center gap-3 pb-2">
                  <span className="material-symbols-outlined text-primary" data-icon="radar">radar</span>
                  <span className="text-primary-container">Off-Market Opportunity Scanning</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Services Section (Asymmetric Layout) */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            {/* Buyer Representation */}
            <div className="order-2 md:order-1 relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-surface-container-high -z-10"></div>
              <img 
                className="w-full h-auto object-cover border border-surface-variant" 
                data-alt="An elegant, affluent couple reviewing architectural blueprints in a brightly lit, minimalist, mid-century modern home. The scene is shot with high contrast and natural light, conveying a sense of exclusivity and thoughtful planning in the Austin real estate market." 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz1-fVjl6-6v9fjwJHDMqaa_PFIWEQXg3vNhY2WyAr20Eby8JCS1KRP5M6l5evbWB6NiDhL2w8YlYHn7Dww9BbLY2bqlXDkSl-HzV60JT4QjW5oLn5yQgh7JgL4IBLPs8ZVGs5wKecxWwxfKC1wTarp_8nS_8wkrl0Kxk16Y1R7Ysdj800QYD8b0haCpyo_q7qo7qkzB5En6XCtQ0fg_nLmxNIij73jk8-5o_Tp7iaYMkKG2HbbpBr"
                alt="Buyer Representation"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="font-headline-md text-headline-md text-primary">Buyer Representation</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Acquiring a significant property requires more than a search; it requires a strategy. We operate as discreet advisors, leveraging our established networks and analytical tools to secure assets that align perfectly with your financial and lifestyle objectives.
              </p>
              <a className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary hover:text-secondary-container transition-colors group" href="#">
                Explore Acquisitions
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
              </a>
            </div>

            {/* Seller Strategy */}
            <div className="space-y-6 md:pl-12">
              <h2 className="font-headline-md text-headline-md text-primary">Seller Strategy</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                We don't merely list properties; we launch them. Our marketing approach combines editorial-grade visual assets with highly targeted, data-driven digital distribution, ensuring your property commands the attention it deserves from qualified buyers globally.
              </p>
              <a className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary hover:text-secondary-container transition-colors group" href="#">
                View Marketing Case Studies
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
              </a>
            </div>
            <div className="relative">
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-surface-container-high -z-10"></div>
              <img 
                className="w-full h-auto object-cover border border-surface-variant" 
                data-alt="A meticulously styled interior of a luxury estate living room. The focus is on a high-end, editorial quality photograph of a beautifully curated space with designer furniture and large windows overlooking the Texas hill country. The lighting is dramatic yet inviting." 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqMDjd0aCcrQusLlSqDQsbQtk0tE_5PKsXhy8PtO_vVk-Q5TqzLAR8NSVvBMx03RgS0z2sMeUMJ1hFphwhvpD1ogjRUn-PeCfyERQYEt5G6AQCQELMNqoaDll6HxSwF1gF3CQ7W448seTg7bWC_S6mE40vGm5ApRZz-MR1ROxzhpHMVdJ4rStelSZJ6E16-iYh-6xYmGfX3tbeBdUnkYFAOjczETlEsmjWqmBc0me2DcO_-YTiXTKm"
                alt="Seller Strategy"
              />
            </div>
          </div>
        </section>

        {/* Market Analysis (Data/Grid focus) */}
        <section className="bg-surface-container-low py-24 border-y border-surface-variant">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center mb-16">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">Market Analysis &amp; Insights</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              Actionable intelligence derived from rigorous data synthesis. We translate complex market signals into clear directives for our clients.
            </p>
          </div>
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Insight Card 1 */}
            <div className="bg-surface-card border border-surface-variant p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="font-data-mono text-data-mono text-secondary-container mb-2">Q3 Report</div>
              <h3 className="font-body-lg text-body-lg text-primary mb-4 font-semibold">Austin Luxury Sector Performance</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 text-sm">
                An analysis of price per square foot trends in the 78704 and 78746 zip codes over the last 18 months.
              </p>
              <a className="font-label-caps text-label-caps text-primary border-b border-primary pb-1 inline-block" href="#">Read Report</a>
            </div>
            {/* Insight Card 2 */}
            <div className="bg-surface-card border border-surface-variant p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="font-data-mono text-data-mono text-secondary-container mb-2">Macro Trend</div>
              <h3 className="font-body-lg text-body-lg text-primary mb-4 font-semibold">Tech Influx &amp; Housing Demand</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 text-sm">
                Evaluating the long-term impact of enterprise relocation on premium inventory availability in Central Texas.
              </p>
              <a className="font-label-caps text-label-caps text-primary border-b border-primary pb-1 inline-block" href="#">Read Report</a>
            </div>
            {/* Insight Card 3 */}
            <div className="bg-surface-card border border-surface-variant p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="font-data-mono text-data-mono text-secondary-container mb-2">Investment</div>
              <h3 className="font-body-lg text-body-lg text-primary mb-4 font-semibold">Yield Optimization Strategies</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 text-sm">
                Identifying emerging corridors with high appreciation potential for discerning portfolio builders.
              </p>
              <a className="font-label-caps text-label-caps text-primary border-b border-primary pb-1 inline-block" href="#">Read Report</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <InteractiveChat />
    </>
  );
}
