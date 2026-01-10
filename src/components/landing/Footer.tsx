import { motion } from "framer-motion";
import { toast } from "sonner";

const Footer = () => {
  const socialLinks = [
    { name: "Instagram", url: "https://www.instagram.com/boreh.company?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { name: "TikTok", url: "#" }, // Link será adicionado quando disponível
  ];

  return (
    <footer className="py-16 md:py-24 bg-foreground text-background grain relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-display font-bold select-none">
          ב
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-4xl md:text-5xl font-bold mb-4">
              BOREH
            </h3>
            <p className="font-body text-lg text-background/70 italic">
              O Criador
            </p>
            <p className="font-body text-background/50 mt-4 max-w-xs">
              Moda como expressão de identidade. Criados para mais do que existe.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            className="md:text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="font-display text-sm uppercase tracking-[0.3em] text-background/50 mb-6">
              Navegação
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#manifesto" className="font-body text-background/70 hover:text-background transition-colors duration-300">
                  Manifesto
                </a>
              </li>
              <li>
                <a href="#quality" className="font-body text-background/70 hover:text-background transition-colors duration-300">
                  Qualidade
                </a>
              </li>
              <li>
                <a href="#colecao" className="font-body text-background/70 hover:text-background transition-colors duration-300">
                  Coleção
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/boreh.company?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-background/70 hover:text-background transition-colors duration-300"
                >
                  Contato
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            className="md:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="font-display text-sm uppercase tracking-[0.3em] text-background/50 mb-6">
              Conecte-se
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target={link.url !== "#" ? "_blank" : undefined}
                    rel={link.url !== "#" ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      if (link.name === "TikTok") {
                        e.preventDefault();
                        toast("Em breve", {
                          duration: 2000,
                          position: "top-center",
                        });
                      }
                    }}
                    className="font-display text-lg text-background/70 hover:text-background transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-background group-hover:w-6 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-background/20 to-transparent mb-12" />

        {/* Bottom */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Final Quote */}
          <div className="text-center md:text-left">
            <p className="font-body text-xl md:text-2xl italic text-background/80">
              "Criados para mais."
            </p>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-background/40 mt-2">
              Boreh aponta para o eterno
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-background/30">
              © 2025 BOREH. Todos os direitos reservados.
            </p>
          </div>
        </motion.div>

        {/* Large Brand Mark */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="font-display text-6xl md:text-8xl font-bold text-background/5">
            BOREH
          </span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
