export type Language = "pt" | "en";

export interface Translations {
  // Header
  header: {
    nav: {
      inicio: string;
      colecao: string;
      materiaPrima: string;
      manifesto: string;
      sobre: string;
    };
    search: string;
    cart: string;
    menu: string;
  };

  // Hero Section
  hero: {
    tagline: string;
    subtitle: string;
    subtitleBold: string;
    ctaWaitlist: string;
    ctaAbout: string;
    explore: string;
  };

  // Products Section
  products: {
    collection: string;
    comingSoon: string;
    description: string;
    ctaWaitlist: string;
    ctaCollection: string;
    premiumCotton: string;
  };

  // Quality Section
  quality: {
    sectionLabel: string;
    title: string;
    titleItalic: string;
    premium: string;
    cotton: string;
    qualities: {
      title: string;
      subtitle: string;
      description: string;
    }[];
  };

  // Manifesto Section
  manifesto: {
    label: string;
    opening: string;
    openingItalic: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    paragraph4: string;
    quote: string;
    quoteItalic: string;
    values: {
      identity: {
        title: string;
        description: string;
      };
      purpose: {
        title: string;
        description: string;
      };
      eternity: {
        title: string;
        description: string;
      };
    };
  };

  // Newsletter Section
  newsletter: {
    label: string;
    title: string;
    titleItalic: string;
    subtitle: string;
    subtitleBold: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    nameErrorRequired: string;
    nameErrorMin: string;
    phoneErrorRequired: string;
    phoneErrorInvalid: string;
    verifying: string;
    submitting: string;
    submitButton: string;
    successTitle: string;
    successMessage: string;
    errorMessage: string;
    turnstileError: string;
    disclaimer: string;
  };

  // Footer
  footer: {
    tagline: string;
    navigation: string;
    manifesto: string;
    quality: string;
    collection: string;
    contact: string;
    connect: string;
    quote: string;
    quoteSubtitle: string;
    copyright: string;
    comingSoon: string;
  };

  // Collection Page
  collection: {
    label: string;
    title: string;
    description: string;
    back: string;
    launch: {
      subtitle: string;
      description: string;
      details: string[];
    };
  };

  // NotFound Page
  notFound: {
    title: string;
    message: string;
    backHome: string;
  };
}

export const translations: Record<Language, Translations> = {
  pt: {
    header: {
      nav: {
        inicio: "Início",
        colecao: "Coleção",
        materiaPrima: "Matéria Prima",
        manifesto: "Manifesto",
        sobre: "Sobre",
      },
      search: "Buscar",
      cart: "Carrinho",
      menu: "Menu",
    },
    hero: {
      tagline: "Moda, identidade e propósito.",
      subtitle: "Criados para ser.",
      subtitleBold: "Não para repetir.",
      ctaWaitlist: "Entrar na lista",
      ctaAbout: "Quem somos",
      explore: "Explore",
    },
    products: {
      collection: "Coleção",
      comingSoon: "Em Breve",
      description: "Peças que carregam significado. Feitas para quem entende que vestir é declarar.",
      ctaWaitlist: "Entrar na lista",
      ctaCollection: "Sobre a coleção",
      premiumCotton: "Premium Cotton",
    },
    quality: {
      sectionLabel: "Matéria-Prima",
      title: "Qualidade é identidade",
      titleItalic: "materializada.",
      premium: "Premium",
      cotton: "100% Cotton",
      qualities: [
        {
          title: "Algodão Egípcio",
          subtitle: "Pureza & Origem",
          description: "Fibras longas, maciez incomparável. A excelência começa na escolha da matéria-prima.",
        },
        {
          title: "Fibras Naturais",
          subtitle: "Compromisso & Essência",
          description: "Respirabilidade e conforto que só a natureza proporciona. Sem concessões.",
        },
        {
          title: "Anti-Bolinhas",
          subtitle: "Durabilidade",
          description: "Tecnologia que preserva. Suas peças mantêm a aparência de novas por muito mais tempo.",
        },
        {
          title: "Conforto Premium",
          subtitle: "Experiência Sensorial",
          description: "Vestir bem é sentir bem. Cada detalhe pensado para o seu conforto absoluto.",
        },
      ],
    },
    manifesto: {
      label: "Manifesto",
      opening: '"Magnum Opus',
      openingItalic: 'de Deus"',
      paragraph1: "Você foi criado com propósito, moldado com intenção, desenhado para deixar uma marca única no mundo.",
      paragraph2: "A BOREH existe para te lembrar disso todos os dias. Cada peça que vestimos carrega uma mensagem. Cada tecido conta uma história.",
      paragraph3: "Não fazemos moda para seguir tendências. Criamos para quem entende que identidade não se copia — se constrói.",
      paragraph4: "Para quem sabe que o que fazemos hoje ecoa pela eternidade.",
      quote: "O que fazemos",
      quoteItalic: "ecoa pela eternidade.",
      values: {
        identity: {
          title: "Identidade",
          description: "Você não é mais um. Você é único. Sua história merece ser contada.",
        },
        purpose: {
          title: "Propósito",
          description: "Cada escolha é uma declaração. Cada peça, um lembrete do seu valor.",
        },
        eternity: {
          title: "Eternidade",
          description: "O que construímos hoje permanece. Criamos legado, não tendências.",
        },
      },
    },
    newsletter: {
      label: "Acesso Exclusivo",
      title: "Lista de Espera",
      titleItalic: "Exclusiva BOREH",
      subtitle: "Para quem entende que",
      subtitleBold: "identidade não se copia.",
      namePlaceholder: "Nome completo",
      phonePlaceholder: "WhatsApp (com DDD)",
      nameErrorRequired: "Por favor, informe seu nome",
      nameErrorMin: "O nome deve ter pelo menos 2 caracteres",
      phoneErrorRequired: "Por favor, informe seu número de celular",
      phoneErrorInvalid: "Por favor, informe um número de celular válido",
      verifying: "Verificando segurança...",
      submitting: "Entrando...",
      submitButton: "Entrar na lista exclusiva",
      successTitle: "Você está na lista!",
      successMessage: "Fique atento ao seu WhatsApp. Novidades chegando em breve.",
      errorMessage: "Erro ao processar. Tente novamente.",
      turnstileError: "Erro na verificação. Tente novamente.",
      disclaimer: "Sem spam. Apenas propósito, lançamentos e identidade.",
    },
    footer: {
      tagline: "Moda como expressão de identidade. Criados para mais do que existe.",
      navigation: "Navegação",
      manifesto: "Manifesto",
      quality: "Qualidade",
      collection: "Coleção",
      contact: "Contato",
      connect: "Conecte-se",
      quote: '"Criados para mais."',
      quoteSubtitle: "Boreh aponta para o eterno",
      copyright: "© 2025 BOREH. Todos os direitos reservados.",
      comingSoon: "Em breve",
    },
    collection: {
      label: "Coleção",
      title: "Sobre a Coleção",
      description: "Descubra o lançamento principal da nossa coleção e entenda o significado por trás de cada peça.",
      back: "Voltar",
      launch: {
        subtitle: "Lançamento Principal",
        description: "A primeira coleção da BOREH representa a essência da marca. Cada peça foi cuidadosamente pensada para carregar significado e propósito. A Yahweh Collection é um manifesto visual sobre identidade, propósito e eternidade.",
        details: [
          "Design minimalista com foco na mensagem",
          "Tecidos premium selecionados para durabilidade",
          "Produção limitada e exclusiva",
          "Cada peça conta uma história única",
        ],
      },
    },
    notFound: {
      title: "404",
      message: "Oops! Página não encontrada",
      backHome: "Voltar para o início",
    },
  },
  en: {
    header: {
      nav: {
        inicio: "Home",
        colecao: "Collection",
        materiaPrima: "Materials",
        manifesto: "Manifesto",
        sobre: "About",
      },
      search: "Search",
      cart: "Cart",
      menu: "Menu",
    },
    hero: {
      tagline: "Fashion, identity and purpose.",
      subtitle: "Created to be.",
      subtitleBold: "Not to repeat.",
      ctaWaitlist: "Join the list",
      ctaAbout: "Who we are",
      explore: "Explore",
    },
    products: {
      collection: "Collection",
      comingSoon: "Coming Soon",
      description: "Pieces that carry meaning. Made for those who understand that dressing is declaring.",
      ctaWaitlist: "Join the list",
      ctaCollection: "About the collection",
      premiumCotton: "Premium Cotton",
    },
    quality: {
      sectionLabel: "Materials",
      title: "Quality is identity",
      titleItalic: "materialized.",
      premium: "Premium",
      cotton: "100% Cotton",
      qualities: [
        {
          title: "Egyptian Cotton",
          subtitle: "Purity & Origin",
          description: "Long fibers, incomparable softness. Excellence begins with the choice of raw material.",
        },
        {
          title: "Natural Fibers",
          subtitle: "Commitment & Essence",
          description: "Breathability and comfort that only nature provides. No compromises.",
        },
        {
          title: "Anti-Pilling",
          subtitle: "Durability",
          description: "Technology that preserves. Your pieces maintain their new appearance for much longer.",
        },
        {
          title: "Premium Comfort",
          subtitle: "Sensory Experience",
          description: "Dressing well is feeling well. Every detail designed for your absolute comfort.",
        },
      ],
    },
    manifesto: {
      label: "Manifesto",
      opening: '"Magnum Opus',
      openingItalic: 'of God"',
      paragraph1: "You were created with purpose, shaped with intention, designed to leave a unique mark on the world.",
      paragraph2: "BOREH exists to remind you of this every day. Every piece we wear carries a message. Every fabric tells a story.",
      paragraph3: "We don't make fashion to follow trends. We create for those who understand that identity is not copied — it's built.",
      paragraph4: "For those who know that what we do today echoes through eternity.",
      quote: "What we do",
      quoteItalic: "echoes through eternity.",
      values: {
        identity: {
          title: "Identity",
          description: "You are not just another one. You are unique. Your story deserves to be told.",
        },
        purpose: {
          title: "Purpose",
          description: "Every choice is a declaration. Every piece, a reminder of your worth.",
        },
        eternity: {
          title: "Eternity",
          description: "What we build today remains. We create legacy, not trends.",
        },
      },
    },
    newsletter: {
      label: "Exclusive Access",
      title: "Waitlist",
      titleItalic: "Exclusive BOREH",
      subtitle: "For those who understand that",
      subtitleBold: "identity is not copied.",
      namePlaceholder: "Full name",
      phonePlaceholder: "WhatsApp (with area code)",
      nameErrorRequired: "Please enter your name",
      nameErrorMin: "Name must be at least 2 characters",
      phoneErrorRequired: "Please enter your phone number",
      phoneErrorInvalid: "Please enter a valid phone number",
      verifying: "Verifying security...",
      submitting: "Joining...",
      submitButton: "Join the exclusive list",
      successTitle: "You're on the list!",
      successMessage: "Keep an eye on your WhatsApp. News coming soon.",
      errorMessage: "Error processing. Please try again.",
      turnstileError: "Verification error. Please try again.",
      disclaimer: "No spam. Only purpose, launches and identity.",
    },
    footer: {
      tagline: "Fashion as an expression of identity. Created for more than exists.",
      navigation: "Navigation",
      manifesto: "Manifesto",
      quality: "Quality",
      collection: "Collection",
      contact: "Contact",
      connect: "Connect",
      quote: '"Created for more."',
      quoteSubtitle: "Boreh points to the eternal",
      copyright: "© 2025 BOREH. All rights reserved.",
      comingSoon: "Coming soon",
    },
    collection: {
      label: "Collection",
      title: "About the Collection",
      description: "Discover the main launch of our collection and understand the meaning behind each piece.",
      back: "Back",
      launch: {
        subtitle: "Main Launch",
        description: "BOREH's first collection represents the essence of the brand. Each piece was carefully designed to carry meaning and purpose. The Yahweh Collection is a visual manifesto about identity, purpose and eternity.",
        details: [
          "Minimalist design focused on the message",
          "Premium fabrics selected for durability",
          "Limited and exclusive production",
          "Each piece tells a unique story",
        ],
      },
    },
    notFound: {
      title: "404",
      message: "Oops! Page not found",
      backHome: "Return to Home",
    },
  },
};
