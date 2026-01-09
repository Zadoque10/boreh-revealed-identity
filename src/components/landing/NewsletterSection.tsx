import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  applyPhoneMask, 
  isValidBrazilianPhone, 
  normalizePhone,
  formatPhone 
} from "@/lib/phoneUtils";
import { submitToGoogleSheets } from "@/lib/googleSheets";
import { CloudflareTurnstile, CloudflareTurnstileRef } from "@/components/CloudflareTurnstile";

const NewsletterSection = () => {
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
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
      
      // Log para debug
      console.log("📋 Dados antes de enviar:", {
        name: name,
        nameTrimmed: name.trim(),
        phone: phone,
        normalizedPhone: normalizedPhone,
      });
      
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
      setPhoneError("Erro ao processar. Tente novamente.");
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
      setNameError("Por favor, informe seu nome");
      return;
    }

    if (name.trim().length < 2) {
      setNameError("O nome deve ter pelo menos 2 caracteres");
      return;
    }
    
    // Valida telefone
    if (!phone) {
      setPhoneError("Por favor, informe seu número de celular");
      return;
    }

    if (!isValidBrazilianPhone(phone)) {
      setPhoneError("Por favor, informe um número de celular válido");
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
      id="waitlist-form"
      ref={sectionRef}
      className="py-24 md:py-40 bg-card grain relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border/50 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-border/50 to-transparent" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 text-8xl font-display text-foreground/[0.02] select-none"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        ב
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-8xl font-display text-foreground/[0.02] select-none"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        א
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Title */}
          <motion.span 
            className="font-display text-sm uppercase tracking-[0.5em] text-muted-foreground block mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Lista Exclusiva
          </motion.span>
          
          <motion.h2 
            className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Seja o Primeiro
          </motion.h2>
          
          <motion.p 
            className="font-body text-xl md:text-2xl text-muted-foreground italic mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            "Seja o primeiro a vestir sua identidade."
          </motion.p>
          
          <motion.p 
            className="font-body text-lg text-muted-foreground mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            A próxima fase começa em breve. Entre na lista e seja notificado 
            antes de todos sobre o lançamento oficial via WhatsApp.
          </motion.p>

          {/* Form */}
          {!isSubmitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              {/* Campo Nome */}
              <div>
                <Input
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={handleNameChange}
                  maxLength={100}
                  required
                  className={nameError ? "border-red-500 focus-visible:border-red-500" : ""}
                  disabled={isSubmitting || isVerifying}
                />
                {nameError && (
                  <p className="text-sm text-red-500 mt-2 text-left">
                    {nameError}
                  </p>
                )}
              </div>

              {/* Campo Telefone e Botão */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={15}
                    required
                    className={phoneError ? "border-red-500 focus-visible:border-red-500" : ""}
                    disabled={isSubmitting || isVerifying}
                  />
                  {phoneError && (
                    <p className="text-sm text-red-500 mt-2 text-left">
                      {phoneError}
                    </p>
                  )}
                </div>
                <Button 
                  variant="hero" 
                  size="lg" 
                  type="submit"
                  disabled={isSubmitting || isVerifying}
                  className="min-w-[200px]"
                >
                  {isVerifying ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verificando...
                    </span>
                  ) : isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    "Entrar na Lista"
                  )}
                </Button>
              </div>
              
              {/* Cloudflare Turnstile */}
              {TURNSTILE_SITE_KEY && (
                <CloudflareTurnstile
                  ref={turnstileRef}
                  onVerify={handleTurnstileVerify}
                  onError={handleTurnstileError}
                  onExpire={handleTurnstileExpire}
                  theme="auto"
                  size="normal"
                />
              )}
              
              {turnstileError && (
                <p className="text-sm text-red-500 text-center">
                  Erro na verificação. Tente novamente.
                </p>
              )}
              
              <p className="text-xs text-muted-foreground text-center">
                Ao entrar na lista, você concorda em receber mensagens via WhatsApp sobre o lançamento.
              </p>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 border-2 border-gold/50 bg-gold/5"
            >
              <span className="text-4xl mb-4 block">✓</span>
              <p className="font-display text-xl text-foreground uppercase tracking-wide">
                Você está na lista!
              </p>
              <p className="font-body text-muted-foreground mt-2 italic">
                Em breve você receberá novidades exclusivas via WhatsApp.
              </p>
            </motion.div>
          )}

          {/* Trust Elements */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              Notificações via WhatsApp
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              Acesso antecipado
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Conteúdo exclusivo
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
};

export default NewsletterSection;
