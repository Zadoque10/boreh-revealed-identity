import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBg from "@/assets/image-gen-11.png";

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToManifesto = () => {
    document.getElementById("manifesto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
        {/* Main Typography */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground mb-16 md:mb-20 tracking-tight animate-fade-up">
          {t.hero.tagline}
        </h1>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 animate-fade-up animation-delay-200">
          <Button 
            variant="hero" 
            size="hero"
            onClick={scrollToWaitlist}
          >
            {t.hero.ctaWaitlist}
          </Button>
          <Button 
            variant="hero-outline" 
            size="hero"
            onClick={scrollToManifesto}
            className="bg-white/95 backdrop-blur-md text-foreground border-2 border-foreground/80 hover:bg-white hover:border-foreground shadow-lg"
          >
            {t.hero.ctaAbout}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
