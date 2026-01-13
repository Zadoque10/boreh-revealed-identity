import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  applyPhoneMask, 
  isValidBrazilianPhone, 
  normalizePhone,
  formatPhone 
} from "@/lib/phoneUtils";
import { submitToGoogleSheets } from "@/lib/googleSheets";
import { CloudflareTurnstile, CloudflareTurnstileRef } from "@/components/CloudflareTurnstile";

const NewsletterSection = () => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);
  const turnstileRef = useRef<CloudflareTurnstileRef>(null);
  const pendingSubmitRef = useRef(false);

  // URL do Google Apps Script Web App (será configurada via variável de ambiente)
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";
  const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setNameError("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const masked = applyPhoneMask(value);
    setPhone(masked);
    setPhoneError("");
  };

  const executeSubmitRef = useRef<() => Promise<void>>();
  
  const executeSubmit = async () => {
    setIsSubmitting(true);
    setIsVerifying(false);
    setPhoneError("");
    setNameError("");

    try {
      // Normaliza o telefone para formato padrão
      const normalizedPhone = normalizePhone(phone);
      
      // Se tiver URL do Google Script configurada, envia para Google Sheets
      if (GOOGLE_SCRIPT_URL) {
        const result = await submitToGoogleSheets(name.trim(), normalizedPhone, GOOGLE_SCRIPT_URL);
        
        if (!result.success) {
          throw new Error(result.message || "Erro ao enviar dados");
        }
      }

      // Sucesso
      setIsSubmitted(true);
      setName("");
      setPhone("");
      setTurnstileToken(null);
      pendingSubmitRef.current = false;
    } catch (error) {
      setPhoneError(t.newsletter.errorMessage);
      // Reseta o Turnstile em caso de erro
      turnstileRef.current?.reset();
      setTurnstileToken(null);
      pendingSubmitRef.current = false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Atualiza a ref quando executeSubmit muda
  useEffect(() => {
    executeSubmitRef.current = executeSubmit;
  }, [name, phone, GOOGLE_SCRIPT_URL]);

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
    setTurnstileError(false);
    setIsVerifying(false);
    
    // Se havia um submit pendente, executa agora
    if (pendingSubmitRef.current) {
      pendingSubmitRef.current = false;
      // Executa o submit após um pequeno delay
      setTimeout(() => {
        executeSubmitRef.current?.();
      }, 100);
    }
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null);
    setTurnstileError(true);
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Valida nome
    if (!name.trim()) {
      setNameError(t.newsletter.nameErrorRequired);
      return;
    }

    if (name.trim().length < 2) {
      setNameError(t.newsletter.nameErrorMin);
      return;
    }
    
    // Valida telefone
    if (!phone) {
      setPhoneError(t.newsletter.phoneErrorRequired);
      return;
    }

    if (!isValidBrazilianPhone(phone)) {
      setPhoneError(t.newsletter.phoneErrorInvalid);
      return;
    }

    // Se tiver Turnstile configurado e ainda não tiver token, inicia verificação
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setIsVerifying(true);
      setPhoneError("");
      setNameError("");
      pendingSubmitRef.current = true;
      // Força o Turnstile a executar a verificação novamente
      turnstileRef.current?.reset();
      // O Turnstile vai chamar handleTurnstileVerify quando estiver pronto
      // E então executeSubmit será chamado automaticamente
      return;
    }

    // Se já tem token ou não precisa de Turnstile, executa direto
    executeSubmit();
  };

  return (
    <section 
      id="waitlist"
      className="relative py-24 md:py-40 px-4 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 texture-grain" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-cream-dark/40 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-accent/30 blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Main Container */}
        <div className="glass-strong rounded-editorial-xl p-8 md:p-16 lg:p-20 texture-grain text-center">
          {/* Section Label */}
          <div className="mb-8 animate-fade-up">
            <span className="inline-block glass rounded-editorial px-6 py-3 text-xs uppercase tracking-[0.2em] text-warm-gray font-medium">
              {t.newsletter.label}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-statement mb-6 animate-fade-up animation-delay-100">
            {t.newsletter.title}
            <br />
            <span className="font-display italic text-warm-gray">{t.newsletter.titleItalic}</span>
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-warm-gray max-w-xl mx-auto mb-12 animate-fade-up animation-delay-200">
            {t.newsletter.subtitle}<br />
            <span className="font-medium text-foreground">{t.newsletter.subtitleBold}</span>
          </p>

          {isSubmitted ? (
            <div className="animate-scale-in">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-charcoal flex items-center justify-center">
                <svg className="w-10 h-10 text-off-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-headline mb-4">{t.newsletter.successTitle}</h3>
              <p className="text-warm-gray">
                {t.newsletter.successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up animation-delay-300">
              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder={t.newsletter.namePlaceholder}
                    value={name}
                    onChange={handleNameChange}
                    maxLength={100}
                    required
                    className={`h-14 px-6 rounded-editorial-lg bg-background/50 border-border/50 text-center text-lg placeholder:text-warm-gray/60 focus:ring-2 focus:ring-charcoal ${
                      nameError ? "border-red-500 focus-visible:border-red-500" : ""
                    }`}
                    disabled={isSubmitting || isVerifying}
                  />
                  {nameError && (
                    <p className="text-sm text-red-500 mt-2 text-center">
                      {nameError}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder={t.newsletter.phonePlaceholder}
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={15}
                    required
                    className={`h-14 px-6 rounded-editorial-lg bg-background/50 border-border/50 text-center text-lg placeholder:text-warm-gray/60 focus:ring-2 focus:ring-charcoal ${
                      phoneError ? "border-red-500 focus-visible:border-red-500" : ""
                    }`}
                    disabled={isSubmitting || isVerifying}
                  />
                  {phoneError && (
                    <p className="text-sm text-red-500 mt-2 text-center">
                      {phoneError}
                    </p>
                  )}
                </div>
              </div>

              {/* Cloudflare Turnstile */}
              {TURNSTILE_SITE_KEY && (
                <div className="space-y-2">
                  {isVerifying && (
                    <div className="flex items-center justify-center gap-2 text-sm text-warm-gray">
                      <svg className="animate-spin h-4 w-4 text-charcoal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{t.newsletter.verifying}</span>
                    </div>
                  )}
                  <div className="flex justify-center">
                    <CloudflareTurnstile
                      ref={turnstileRef}
                      onVerify={handleTurnstileVerify}
                      onError={handleTurnstileError}
                      onExpire={handleTurnstileExpire}
                      theme="auto"
                      size="normal"
                    />
                  </div>
                </div>
              )}

              {turnstileError && (
                <p className="text-sm text-red-500 text-center">
                  {t.newsletter.turnstileError}
                </p>
              )}

              <Button 
                type="submit"
                variant="hero" 
                size="hero-lg"
                className="w-full"
                disabled={isSubmitting || isVerifying}
              >
                {isVerifying ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t.newsletter.verifying}
                  </span>
                ) : isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t.newsletter.submitting}
                  </span>
                ) : (
                  t.newsletter.submitButton
                )}
              </Button>

              <p className="text-sm text-warm-gray/70 mt-6">
                {t.newsletter.disclaimer}
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-24 text-center animate-fade-up animation-delay-500">
        <p className="font-display italic text-2xl text-warm-gray mb-2">
          BOREH
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
