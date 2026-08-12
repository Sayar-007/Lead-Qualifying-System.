import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";
import InteractiveChat from "@/components/InteractiveChat";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <FeaturedListings />
      <TrustSection />
      <Footer />
      <InteractiveChat />
    </main>
  );
}
