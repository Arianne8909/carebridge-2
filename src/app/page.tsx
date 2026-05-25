import Nav from "@/components/landing/Navbar/Nav";
import Hero from "@/components/landing/Hero/Hero";
import HowItWorks from "@/components/landing/HowItWorks/HowItWorks";
import Urgent from "@/components/landing/Urgent/Urgent";
import Impact from "@/components/landing/Impact/Impact";
import FeaturedTopics from "@/components/landing/FeaturedTopics/FeaturedTopics";
import TrustSection from "@/components/landing/TrustSection/TrustSection";
import Donors from "@/components/landing/Donors/Donors";
import Footer from "@/components/landing/Footer/Footer";

export default function HomePage() {
  return (
    <main>
      <Nav />
      <Hero />
      <HowItWorks />
      <Urgent />
      <Impact />
      <FeaturedTopics />
      <TrustSection />
      <Donors />
      <Footer />
    </main>
  );
}