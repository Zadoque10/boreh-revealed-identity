import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const concepts = [
  {
    title: "Anti-Cópia",
    description: "Recusamos a reprodução em massa de identidades. Cada peça é um convite à originalidade — não seguimos tendências, revelamos essência.",
    icon: "✕",
  },
  {
    title: "Individualidade Sagrada",
    description: "Você não é um acidente. Foi desenhado com intenção, moldado com propósito. Sua singularidade é uma assinatura divina.",
    icon: "◇",
  },
  {
    title: "Moda Como Expressão",
    description: "Vestir-se é um ato de afirmação. Não é sobre parecer — é sobre ser. Cada peça carrega uma mensagem que ecoa quem você verdadeiramente é.",
    icon: "○",
  },
  {
    title: "Eternidade no Agora",
    description: "O que fazemos hoje ressoa para sempre. Criamos com consciência do eterno, onde cada decisão importa além do momento.",
    icon: "∞",
  },
];

const ConceptCard = ({ concept, index }: { concept: typeof concepts[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-8 md:p-10 border border-border/50 hover:border-primary/30 transition-all duration-500">
        {/* Icon */}
        <span className="font-display text-4xl text-gold block mb-6 group-hover:scale-110 transition-transform duration-300">
          {concept.icon}
        </span>

        {/* Title */}
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4 uppercase tracking-wide">
          {concept.title}
        </h3>

        {/* Description */}
        <p className="font-body text-lg text-muted-foreground leading-relaxed">
          {concept.description}
        </p>

        {/* Hover Line */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-gold group-hover:w-full transition-all duration-700" />
      </div>
    </motion.div>
  );
};

const ConceptSection = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-40 bg-card grain relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 50px,
            hsl(var(--foreground)) 50px,
            hsl(var(--foreground)) 51px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 50px,
            hsl(var(--foreground)) 50px,
            hsl(var(--foreground)) 51px
          )`
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          className="max-w-3xl mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-display text-sm uppercase tracking-[0.5em] text-muted-foreground">
            Conceito
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mt-4 mb-6">
            Não Seguimos Tendências
          </h2>
          <p className="font-body text-xl text-muted-foreground italic">
            Revelamos essência. Cada peça é um manifesto vestível sobre identidade, 
            propósito e a beleza de ser único em um mundo de cópias.
          </p>
        </motion.div>

        {/* Concept Grid - Asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-6 md:space-y-8">
            {concepts.slice(0, 2).map((concept, index) => (
              <ConceptCard key={concept.title} concept={concept} index={index} />
            ))}
          </div>
          <div className="space-y-6 md:space-y-8 md:mt-16">
            {concepts.slice(2).map((concept, index) => (
              <ConceptCard key={concept.title} concept={concept} index={index + 2} />
            ))}
          </div>
        </div>

        {/* Tagline */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="font-display text-2xl md:text-3xl text-foreground uppercase tracking-[0.2em]">
            Ctrl+C Ctrl+V ?
          </p>
          <p className="font-body text-xl text-primary italic mt-2">
            Nunca. Você é original.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ConceptSection;
