import NavigationHeader from "@/components/NavigationHeader";
import AboutSection from "./_components/AboutSection";
import CTASection from "./_components/CTASection";
import FeaturesSection from "./_components/FeaturesSection";
import HeroSection from "./_components/HeroSection";
import LanguagesSection from "./_components/LanguagesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-body/20 flex flex-col">
      <div className="container">
        <NavigationHeader />
        <HeroSection />
        <LanguagesSection />
        <FeaturesSection />
        <AboutSection />
        <CTASection />
      </div>
    </div>
  );
}
