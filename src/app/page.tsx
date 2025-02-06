import BenefitsSection from "./_components/BenefitSection";
import CTASection from "./_components/CtaSection";
import FeaturesSection from "./_components/FeaturesSection";
import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";
import Navbar from "./_components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
