import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
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
          <div className="animate-fade-up">
            <h3 className="font-display text-4xl md:text-5xl font-bold mb-4">
              BOREH
            </h3>
            <p className="font-body text-background/50 mt-4 max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="md:text-center animate-fade-up animation-delay-100">
            <h4 className="font-display text-sm uppercase tracking-[0.3em] text-background/50 mb-6">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#manifesto" className="font-body text-background/70 hover:text-background transition-colors duration-300">
                  {t.footer.manifesto}
                </a>
              </li>
              <li>
                <a href="#quality" className="font-body text-background/70 hover:text-background transition-colors duration-300">
                  {t.footer.quality}
                </a>
              </li>
              <li>
                <a href="#products-section" className="font-body text-background/70 hover:text-background transition-colors duration-300">
                  {t.footer.collection}
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/boreh.company?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-background/70 hover:text-background transition-colors duration-300"
                >
                  {t.footer.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:text-right animate-fade-up animation-delay-200">
            <h4 className="font-display text-sm uppercase tracking-[0.3em] text-background/50 mb-6">
              {t.footer.connect}
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
                        toast(t.footer.comingSoon, {
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
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-background/20 to-transparent mb-12" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-up animation-delay-300">
          {/* Final Quote */}
          <div className="text-center md:text-left">
            <p className="font-body text-xl md:text-2xl italic text-background/80">
              {t.footer.quote}
            </p>
            <p className="font-display text-sm uppercase tracking-[0.2em] text-background/40 mt-2">
              {t.footer.quoteSubtitle}
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-background/30">
              {t.footer.copyright}
            </p>
          </div>
        </div>

        {/* Large Brand Mark */}
        <div className="mt-16 text-center animate-fade-up animation-delay-400">
          <span className="font-display text-6xl md:text-8xl font-bold text-background/5">
            BOREH
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
