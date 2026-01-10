import { Button } from "@/components/ui/button";
import borehLogo from "@/assets/boreh-logo.png";

const HeroSection = () => {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToManifesto = () => {
    document.getElementById("manifesto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 texture-grain" />
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-cream-dark/30 blur-3xl animate-float" />
      <div className="absolute bottom-32 right-16 w-48 h-48 rounded-full bg-accent/40 blur-3xl animate-float animation-delay-300" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-muted/50 blur-2xl animate-float animation-delay-500" />

      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="glass-strong rounded-editorial-xl p-8 md:p-16 lg:p-20 texture-grain">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fade-up">
            <img 
              src={borehLogo} 
              alt="BOREH" 
              className="h-24 md:h-32 lg:h-40 w-auto opacity-90"
            />
          </div>

          {/* Main Typography */}
          <div className="text-center space-y-6">
            <h1 className="text-editorial animate-fade-up animation-delay-100">
              <span className="block font-display italic text-warm-gray text-2xl md:text-3xl lg:text-4xl mb-2">
                O Criador
              </span>
            </h1>

            <p className="text-statement text-foreground/80 max-w-2xl mx-auto animate-fade-up animation-delay-200">
              Moda, identidade e propósito.
            </p>

            <p className="text-xl md:text-2xl text-warm-gray font-light max-w-xl mx-auto animate-fade-up animation-delay-300">
              Criados para ser.<br />
              <span className="font-medium">Não para repetir.</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 animate-fade-up animation-delay-400">
            <Button 
              variant="hero" 
              size="hero"
              onClick={scrollToWaitlist}
            >
              Entrar na lista
            </Button>
            <Button 
              variant="hero-outline" 
              size="hero"
              onClick={scrollToManifesto}
            >
              Quem somos
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 animate-fade-in animation-delay-500">
        <div className="flex flex-col items-center gap-2 text-warm-gray">
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-warm-gray to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
