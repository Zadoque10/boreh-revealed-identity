import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import tshirt1 from "@/assets/tshirt-1.jpg";
import tshirt2 from "@/assets/tshirt-2.jpg";
import tshirt3 from "@/assets/tshirt-3.jpg";

const products = [
  {
    image: tshirt1,
    name: "IDENTIDADE",
    description: "Coleção Gênesis",
    tag: "Em Breve",
  },
  {
    image: tshirt2,
    name: "PROPÓSITO",
    description: "Coleção Gênesis",
    tag: "Em Breve",
  },
  {
    image: tshirt3,
    name: "ETERNIDADE",
    description: "Coleção Gênesis",
    tag: "Em Breve",
  },
];

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-500" />
        
        {/* Tag */}
        <div className="absolute top-4 left-4">
          <span className="font-display text-xs uppercase tracking-[0.3em] bg-gold text-gold-foreground px-4 py-2">
            {product.tag}
          </span>
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Button variant="hero" size="lg" className="bg-background/90 backdrop-blur-sm">
            Notificar-me
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground uppercase tracking-wide">
          {product.name}
        </h3>
        <p className="font-body text-muted-foreground italic">
          {product.description}
        </p>
      </div>

      {/* Decorative Line */}
      <motion.div
        className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-primary to-transparent"
        initial={{ width: 0 }}
        animate={isInView ? { width: "50%" } : {}}
        transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
      />
    </motion.div>
  );
};

const ProductsSection = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-40 bg-background grain relative overflow-hidden">
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
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-display text-sm uppercase tracking-[0.5em] text-muted-foreground">
            Coleção Inicial
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mt-4 mb-6">
            Primeiras Peças
          </h2>
          <p className="font-body text-xl text-muted-foreground italic max-w-2xl mx-auto">
            Três pilares. Três verdades. Três camisetas que carregam mensagens 
            que ecoam na eternidade.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Button variant="hero-outline" size="xl">
            Ver Coleção Completa
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
