import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, translations } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.pt;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Tenta recuperar o idioma salvo no localStorage
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "pt" || saved === "en")) {
      return saved;
    }
    // Detecta o idioma do navegador
    const browserLang = navigator.language.split("-")[0];
    return browserLang === "en" ? "en" : "pt";
  });

  useEffect(() => {
    // Salva o idioma no localStorage quando mudar
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
