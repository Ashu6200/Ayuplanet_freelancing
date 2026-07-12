import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustSymbols from "@/components/TrustSymbols";
import ShopGrid from "@/components/ShopGrid";
import Story from "@/components/Story";
import Testimonials from "@/components/Testimonials";
import HealthGoals from "@/components/HealthGoals";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow pb-16 md:pb-0">
        <Hero />
        <TrustSymbols />
        <ShopGrid />
        <Story />
        <Testimonials />
        <HealthGoals />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
