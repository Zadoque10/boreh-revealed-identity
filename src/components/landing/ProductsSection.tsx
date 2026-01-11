import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import collection1 from "@/assets/collection-1.png";
import collection2 from "@/assets/collection-2.png";
import tshirtBack from "@/assets/tshirt-back.png";

const ProductsSection = () => {
  const navigate = useNavigate();

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById("waitlist");
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSobreColecao = () => {
    navigate("/colecao-completa");
  };

  return (
    <section id="products-section" className="relative py-24 md:py-32 px-4 overflow-hidden bg-background grain">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-16 md:mb-24">
        <div className="flex items-end justify-between flex-wrap gap-4 animate-fade-up">
          <div>
            <span className="font-display text-sm uppercase tracking-[0.5em] text-muted-foreground mb-4 block animate-fade-up animation-delay-100">
              Coleção
            </span>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight animate-fade-up animation-delay-200">
              Em Breve
            </h2>
          </div>
          <p className="font-body text-lg text-muted-foreground max-w-md animate-fade-up animation-delay-300">
            Peças que carregam significado. Feitas para quem entende que vestir é declarar.
          </p>
        </div>
      </div>

      {/* Editorial Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Card 1 - Large */}
          <div className="md:col-span-7 group animate-fade-up animation-delay-100">
            <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-[4/5] md:aspect-[3/4]">
                <img
                  src={collection1}
                  alt="Coleção BOREH"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <span className="inline-block bg-background/90 backdrop-blur-md border border-border/50 rounded-2xl px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] mb-4 shadow-lg">
                  Em Breve
                </span>
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-background">
                  Yahweh Collection
                </h3>
              </div>
            </div>
          </div>

          {/* Card 2 + 3 Stacked */}
          <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
            {/* Card 2 */}
            <div className="group flex-1 animate-fade-up animation-delay-200">
              <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                <div className="aspect-square md:aspect-auto md:h-full">
                  <img
                    src={collection2}
                    alt="Coleção BOREH"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block bg-background/90 backdrop-blur-md border border-border/50 rounded-2xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-lg">
                    Em Breve
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group flex-1 animate-fade-up animation-delay-300">
              <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                <div className="aspect-square md:aspect-auto md:h-full bg-muted">
                  <img
                    src={tshirtBack}
                    alt="Camiseta BOREH"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block bg-background/90 backdrop-blur-md border border-border/50 rounded-2xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-lg">
                    Premium Cotton
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 animate-fade-up animation-delay-400">
        <Button
          variant="hero"
          size="xl"
          onClick={scrollToWaitlist}
          className="rounded-2xl"
        >
          Entrar na lista
        </Button>
        <Button
          variant="hero-outline"
          size="xl"
          onClick={handleSobreColecao}
          className="rounded-2xl"
        >
          Sobre a coleção
        </Button>
      </div>
    </section>
  );
};

export default ProductsSection;
