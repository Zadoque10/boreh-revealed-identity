import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const manifestoBlocks = [
  {
    text: "Aquele que faz todas as coisas pela Palavra.",
    accent: false,
  },
  {
    text: "O invisível se torna inegável.",
    accent: true,
  },
  {
    text: "Somos a obra-prima do Criador.",
    accent: false,
  },
  {
    text: "Identidade. Autenticidade. Eternidade.",
    accent: true,
  },
  {
    text: "O que fazemos ecoa para sempre.",
    accent: false,
  },
];

const ManifestoBlock = ({ text, accent, index }: { text: string; accent: boolean; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={`manifesto-block p-8 md:p-12 ${
        index % 2 === 0 ? "ml-0 md:ml-12" : "mr-0 md:mr-12"
      }`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <p
        className={`font-body text-2xl md:text-4xl lg:text-5xl leading-tight ${
          accent ? "text-primary italic" : "text-foreground"
        }`}
      >
        {text}
      </p>
      {accent && (
        <div className="mt-4 h-0.5 w-24 bg-gradient-to-r from-gold to-primary" />
      )}
    </motion.div>
  );
};

const ManifestoSection = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-40 bg-background grain relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <motion.div
        className="absolute top-20 right-10 w-40 h-40 border border-accent/10 rotate-45"
        animate={{ rotate: [45, 50, 45] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.div
          ref={titleRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-display text-sm uppercase tracking-[0.5em] text-muted-foreground">
            Manifesto
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mt-4">
            No Princípio Era a Palavra
          </h2>
        </motion.div>

        {/* Manifesto Blocks */}
        <div className="max-w-4xl mx-auto space-y-8">
          {manifestoBlocks.map((block, index) => (
            <ManifestoBlock
              key={index}
              text={block.text}
              accent={block.accent}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold to-transparent mx-auto mb-8" />
          <p className="font-display text-lg uppercase tracking-[0.3em] text-gold">
            בורא
          </p>
          <p className="font-body text-sm text-muted-foreground mt-2 italic">
            "Boreh" em hebraico — O que cria do nada
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ManifestoSection;
