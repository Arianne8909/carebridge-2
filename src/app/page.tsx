import Nav from "@/components/landing/Navbar/Nav";
import Hero from "@/components/landing/Hero/Hero";
import Problem from "@/components/landing/Problem/Problem";
import HowItWorks from "@/components/landing/HowItWorks/HowItWorks";
import Categories from "@/components/landing/Categories/Categories";
import Donors from "@/components/landing/Donors/Donors";
import TrustSection from "@/components/landing/TrustSection/TrustSection";
import FeaturedTopics from "@/components/landing/FeaturedTopics/FeaturedTopics";
import Footer from "@/components/landing/Footer/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Categories />
        <Donors />
        <TrustSection />
        <FeaturedTopics />
      </main>
      <Footer />
    </>
  );
}