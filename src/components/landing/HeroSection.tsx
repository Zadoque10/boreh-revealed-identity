import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById("waitlist");
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const scrollToManifesto = () => {
    const manifestoSection = document.getElementById("manifesto-section");
    if (manifestoSection) {
      manifestoSection.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="BOREH Hero"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Floating Elements - Arredondados */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border-2 border-primary/20 rounded-full"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-24 h-24 border-2 border-gold/30 rounded-3xl"
        animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-3 h-3 bg-gold rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content Container Arredondado */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          className="max-w-5xl mx-auto bg-card/40 backdrop-blur-sm rounded-3xl p-12 md:p-20 border border-border/50 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-display text-sm uppercase tracking-[0.5em] text-muted-foreground mb-4 block">
            Apresentando
          </span>
        </motion.div>

        <motion.h1
          className="font-display text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tight text-foreground mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          BOREH
        </motion.h1>

        <motion.p
          className="font-display text-xl md:text-2xl uppercase tracking-[0.3em] text-primary mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          O Criador
        </motion.p>

        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <p className="font-body text-2xl md:text-3xl italic text-foreground/80 leading-relaxed">
            "A identidade não é copiada. Ela é revelada."
          </p>
          <p className="font-body text-lg text-muted-foreground mt-4">
            Criados à imagem do Criador. Chamados para viver além do comum.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <Button variant="hero" size="xl" onClick={scrollToWaitlist}>
            Entrar na Lista
          </Button>
          <Button variant="hero-outline" size="xl" onClick={scrollToManifesto}>
            Conheça o Propósito
          </Button>
        </motion.div>

        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2 bg-background/50 backdrop-blur-sm"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div className="w-1.5 h-1.5 bg-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
