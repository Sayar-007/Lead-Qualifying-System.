import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <FeaturedListings />
      <TrustSection />
      <Footer />
      <ChatWidget />
    </main>
  );
}
