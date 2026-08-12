export default function TrustSection() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low" id="why">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <div className="mb-4 inline-block border-l-2 border-secondary pl-4">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Our Approach</span>
          </div>
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6">The Speed of Certainty.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
            In Austin's dynamic market, hesitation is a luxury. Anders &amp; Vale leverages unparalleled internal processes to ensure you are positioned to move the moment the right opportunity arises. We eliminate friction, providing clarity and decisive action when it matters most.
          </p>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="mt-1 mr-4 text-secondary">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <div>
                <h4 className="font-headline-md text-headline-md text-primary text-xl mb-1">Immediate Insights</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Real-time market intelligence delivered without delay.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mt-1 mr-4 text-secondary">
                <span className="material-symbols-outlined">shield_lock</span>
              </div>
              <div>
                <h4 className="font-headline-md text-headline-md text-primary text-xl mb-1">Secure Transactions</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Streamlined, definitive closing procedures.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div
            className="bg-cover bg-center w-full h-[500px] rounded-lg shadow-sm border border-outline-variant"
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCmDVdqbzoDpnSRvwR3L52tIHmBMgejU9c95FbacrSJptXAGJGs0bU5fi_sLP7PkUqeF8fEftFgYyQ_m8tOYt1aZfI4zE6ckOlESHC4cD2_mfrylbufZ8wM1WX6yroEONyD4Pk_Cv1fhN_PAWfEoKkQLEzelqlUy8Hrrr9pcqcASx-9u56Wq4kkQBOZ3u4s6fKgSCW9yo7uRkTAmns9Mr1YdbaaNkXRbnRtd5vh8yU8CLRKdFMzAwHy')"
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
