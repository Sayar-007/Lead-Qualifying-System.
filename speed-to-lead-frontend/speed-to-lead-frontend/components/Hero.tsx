export default function Hero() {
  return (
    <header className="relative h-screen min-h-[700px] flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        <div
          className="bg-cover bg-center w-full h-full"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDLhKYof2JwbkKAQR7i6hZH70LXnFc_T5sS9M6miwGLiETLPGnndOI795hSY9Cg1bBtdPzz9l91ky9A5Sf8AN5DsFD4sEmt0LABxjJ6yCBKcRPQle2l9OI8CG3iBqZvBewRwWyKJRMZ_joTqNA4aPvE_w9eeizS7S2Z0SspNqKjAsl1Okrwj424yIMGXeysmBirGgu_rIAL2bu70DhEVUvn9S1kEwY4GJQH_IhX0y1kEMBElA1QW9u9')",
          }}
        ></div>
        <div className="absolute inset-0 hero-overlay"></div>
      </div>
      <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary mb-6 max-w-4xl mx-auto leading-tight">
          Defining the New Standard of Austin Living.
        </h1>
        <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl mx-auto mb-10">
          Bespoke real estate services tailored to your timeline.
        </p>
        <button className="bg-surface text-primary px-8 py-4 rounded-full font-label-caps text-label-caps hover:bg-surface-container-high transition-colors tracking-widest uppercase">
          Explore Properties
        </button>
      </div>
    </header>
  );
}

