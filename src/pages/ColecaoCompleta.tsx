import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "@/components/landing/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import collection1 from "@/assets/collection-1.png";
import collection2 from "@/assets/collection-2.png";
import tshirtBack from "@/assets/tshirt-back.png";

interface Lancamento {
  id: number;
  imagem: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  detalhes: string[];
}

interface LancamentoItemProps {
  lancamento: Lancamento;
  index: number;
}

const LancamentoItem = ({ lancamento, index, imagens }: LancamentoItemProps & { imagens: string[] }) => {
  const itemRef = useRef(null);
  const itemInView = useInView(itemRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={itemRef}
      className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12 lg:gap-16`}
      initial={{ opacity: 0, y: 50 }}
      animate={itemInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Carrossel de Imagens */}
      <div className="flex-1 w-full">
        <Carousel className="w-full">
          <CarouselContent>
            {imagens.map((imagem, idx) => (
              <CarouselItem key={idx}>
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-[4/5] md:aspect-square">
                    <img
                      src={imagem}
                      alt={`${lancamento.titulo} - Imagem ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 md:left-6 h-12 w-12 rounded-full bg-background/80 backdrop-blur-md border-2 border-foreground/20 hover:bg-background hover:border-foreground/40 transition-all" />
          <CarouselNext className="right-4 md:right-6 h-12 w-12 rounded-full bg-background/80 backdrop-blur-md border-2 border-foreground/20 hover:bg-background hover:border-foreground/40 transition-all" />
        </Carousel>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 w-full space-y-6">
        <div>
          <span className="inline-block bg-background/90 backdrop-blur-md border border-border/50 rounded-2xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            {lancamento.subtitulo}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {lancamento.titulo}
          </h2>
        </div>
        
        <p className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed">
          {lancamento.descricao}
        </p>

        <ul className="space-y-3 pt-4">
          {lancamento.detalhes.map((detalhe, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-foreground mt-2">•</span>
              <span className="font-body text-base md:text-lg text-muted-foreground">
                {detalhe}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ColecaoCompleta = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const lancamento = {
    id: 1,
    imagem: collection1,
    titulo: "Yahweh Collection",
    subtitulo: t.collection.launch.subtitle,
    descricao: t.collection.launch.description,
    detalhes: t.collection.launch.details
  };

  const imagens = [collection1, collection2, tshirtBack];

  return (
    <main className="overflow-hidden">
      <section className="pt-32 md:pt-40 pb-24 md:pb-32 bg-background grain relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div
            ref={titleRef}
            className="text-center max-w-4xl mx-auto mb-16 md:mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="font-display text-sm uppercase tracking-[0.5em] text-muted-foreground mb-4 block">
              {t.collection.label}
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              {t.collection.title}
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground">
              {t.collection.description}
            </p>
          </motion.div>

          {/* Lançamento Principal */}
          <div className="max-w-6xl mx-auto">
            <LancamentoItem lancamento={lancamento} index={0} imagens={imagens} />
          </div>

          {/* Botão Voltar */}
          <motion.div
            className="flex justify-center mt-16 md:mt-24"
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              variant="hero-outline"
              size="xl"
              onClick={handleVoltar}
              className="gap-2 rounded-2xl"
            >
              <ArrowLeft className="w-5 h-5" />
              {t.collection.back}
            </Button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ColecaoCompleta;
