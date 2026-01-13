import { useLanguage } from "@/contexts/LanguageContext";

const ManifestoSection = () => {
  const { t } = useLanguage();

  return (
    <section id="manifesto" className="relative py-24 md:py-40 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 texture-grain" />
      <div className="absolute top-0 left-0 w-full h-32 gradient-fade-t" />
      <div className="absolute bottom-0 left-0 w-full h-32 gradient-fade-b" />
      
      {/* Decorative Blurs */}
      <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full bg-cream-dark/40 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-accent/30 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main Container */}
        <div className="glass-strong rounded-editorial-xl p-8 md:p-16 lg:p-24 texture-grain">
          {/* Section Label */}
          <div className="text-center mb-12 md:mb-20 animate-fade-up">
            <span className="text-sm uppercase tracking-[0.3em] text-warm-gray">
              {t.manifesto.label}
            </span>
          </div>

          {/* Editorial Typography Layout */}
          <div className="space-y-16 md:space-y-24">
            {/* Opening Statement */}
            <div className="text-center animate-fade-up animation-delay-100">
              <h2 className="font-display italic text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight">
                {t.manifesto.opening}
                <br />
                <span className="text-warm-gray">{t.manifesto.openingItalic}</span>
              </h2>
            </div>

            {/* Body Text - Treated Graphically */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 animate-fade-up animation-delay-200">
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  {t.manifesto.paragraph1}
                </p>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  {t.manifesto.paragraph2}
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  {t.manifesto.paragraph3}
                </p>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  {t.manifesto.paragraph4}
                </p>
              </div>
            </div>

            {/* Featured Quote */}
            <div className="relative py-12 md:py-16 animate-fade-up animation-delay-300">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-charcoal to-transparent" />
              <blockquote className="pl-8 md:pl-12">
                <p className="text-statement font-display italic text-foreground">
                  {t.manifesto.quote}
                  <br />
                  <span className="text-warm-gray">{t.manifesto.quoteItalic}</span>
                </p>
              </blockquote>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up animation-delay-400">
              <div className="text-center p-6">
                <h3 className="text-headline mb-4">{t.manifesto.values.identity.title}</h3>
                <p className="text-warm-gray">
                  {t.manifesto.values.identity.description}
                </p>
              </div>
              <div className="text-center p-6">
                <h3 className="text-headline mb-4">{t.manifesto.values.purpose.title}</h3>
                <p className="text-warm-gray">
                  {t.manifesto.values.purpose.description}
                </p>
              </div>
              <div className="text-center p-6">
                <h3 className="text-headline mb-4">{t.manifesto.values.eternity.title}</h3>
                <p className="text-warm-gray">
                  {t.manifesto.values.eternity.description}
                </p>
              </div>
            </div>

            {/* Closing */}
            <div className="text-center pt-8 animate-fade-up animation-delay-500">
              <p className="font-display italic text-2xl md:text-3xl text-warm-gray">
                BOREH
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
