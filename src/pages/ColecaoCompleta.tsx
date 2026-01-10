import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/landing/Footer";

const ColecaoCompleta = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const instagramUrl = "https://www.instagram.com/boreh.company?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

  const handleVoltar = () => {
    navigate("/");
    // Aguarda um pouco para garantir que a página carregou antes de fazer scroll
    setTimeout(() => {
      const productsSection = document.getElementById("products-section");
      if (productsSection) {
        productsSection.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        });
      }
    }, 100);
  };

  return (
    <main className="overflow-hidden">
      <section className="py-24 md:py-40 bg-background grain relative overflow-hidden min-h-screen flex items-center">
        {/* Decorative Elements */}
        <motion.div
          className="absolute top-1/4 -left-20 w-40 h-40 border border-gold/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-60 h-60 border border-primary/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Content */}
          <motion.div
            ref={titleRef}
            className="text-center max-w-3xl mx-auto space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Em Breve Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={titleInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="font-display text-sm uppercase tracking-[0.5em] text-muted-foreground inline-block mb-6">
                Em Breve
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Coleção Completa
            </motion.h1>

            {/* Description */}
            <motion.p
              className="font-body text-xl md:text-2xl text-muted-foreground italic mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Estamos preparando algo especial para você. 
              <br />
              Em breve, nossa coleção completa estará disponível.
            </motion.p>

            {/* Instagram Reference */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="font-body text-lg text-foreground">
                Acompanhe nosso{" "}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-gold hover:text-gold/80 transition-colors duration-300 underline underline-offset-4"
                >
                  Instagram
                </a>
                {" "}para ficar por dentro de todas as novidades.
              </p>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="hero" size="xl" className="mt-8">
                  Seguir no Instagram
                </Button>
              </a>
            </motion.div>

            {/* Back Button */}
            <motion.div
              className="mt-16"
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                variant="hero-outline"
                size="lg"
                onClick={handleVoltar}
                className="gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar para Coleção
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ColecaoCompleta;
