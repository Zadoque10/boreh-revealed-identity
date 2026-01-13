import { useLanguage } from "@/contexts/LanguageContext";
import tshirtFront from "@/assets/tshirt-front.png";

const QualitySection = () => {
  const { t } = useLanguage();
  const qualities = t.quality.qualities;
  return (
    <section id="quality" className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cream/50" />
      <div className="absolute inset-0 texture-grain" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-sm uppercase tracking-[0.3em] text-warm-gray mb-4 block animate-fade-up">
            {t.quality.sectionLabel}
          </span>
          <h2 className="text-statement mb-6 animate-fade-up animation-delay-100">
            {t.quality.title}
            <br />
            <span className="font-display italic text-warm-gray">{t.quality.titleItalic}</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative animate-fade-up animation-delay-200">
            <div className="glass-strong rounded-editorial-xl p-8 md:p-12">
              <img 
                src={tshirtFront} 
                alt="Camiseta BOREH - Frente"
                className="w-full h-auto rounded-editorial shadow-card"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 glass-strong rounded-editorial px-6 py-4 shadow-elevated">
              <span className="text-xs uppercase tracking-widest text-warm-gray block">{t.quality.premium}</span>
              <span className="font-semibold">{t.quality.cotton}</span>
            </div>
          </div>

          {/* Quality Cards */}
          <div className="space-y-6">
            {qualities.map((quality, index) => (
              <div 
                key={quality.title}
                className={`group glass rounded-editorial-lg p-6 md:p-8 hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 animate-fade-up`}
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-charcoal flex items-center justify-center text-off-white font-display italic text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl font-semibold">{quality.title}</h3>
                      <span className="text-sm text-warm-gray uppercase tracking-wider">
                        {quality.subtitle}
                      </span>
                    </div>
                    <p className="text-warm-gray leading-relaxed">
                      {quality.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
