const ManifestoSection = () => {
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
              Manifesto
            </span>
          </div>

          {/* Editorial Typography Layout */}
          <div className="space-y-16 md:space-y-24">
            {/* Opening Statement */}
            <div className="text-center animate-fade-up animation-delay-100">
              <h2 className="font-display italic text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight">
                "Magnum Opus
                <br />
                <span className="text-warm-gray">de Deus"</span>
              </h2>
            </div>

            {/* Body Text - Treated Graphically */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 animate-fade-up animation-delay-200">
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  Você foi criado com propósito, moldado com intenção, 
                  desenhado para deixar uma marca única no mundo.
                </p>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  A BOREH existe para te lembrar disso todos os dias. Cada peça que vestimos 
                  carrega uma mensagem. Cada tecido conta uma história.
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  Não fazemos moda para seguir tendências. Criamos para quem entende que 
                  identidade não se copia — se constrói.
                </p>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  Para quem sabe que o que fazemos hoje ecoa pela eternidade.
                </p>
              </div>
            </div>

            {/* Featured Quote */}
            <div className="relative py-12 md:py-16 animate-fade-up animation-delay-300">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-charcoal to-transparent" />
              <blockquote className="pl-8 md:pl-12">
                <p className="text-statement font-display italic text-foreground">
                  O que fazemos
                  <br />
                  <span className="text-warm-gray">ecoa pela eternidade.</span>
                </p>
              </blockquote>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up animation-delay-400">
              <div className="text-center p-6">
                <h3 className="text-headline mb-4">Identidade</h3>
                <p className="text-warm-gray">
                  Você não é mais um. Você é único. Sua história merece ser contada.
                </p>
              </div>
              <div className="text-center p-6">
                <h3 className="text-headline mb-4">Propósito</h3>
                <p className="text-warm-gray">
                  Cada escolha é uma declaração. Cada peça, um lembrete do seu valor.
                </p>
              </div>
              <div className="text-center p-6">
                <h3 className="text-headline mb-4">Eternidade</h3>
                <p className="text-warm-gray">
                  O que construímos hoje permanece. Criamos legado, não tendências.
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
