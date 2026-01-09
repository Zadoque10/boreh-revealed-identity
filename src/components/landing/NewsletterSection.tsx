import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  applyPhoneMask, 
  isValidBrazilianPhone, 
  normalizePhone,
  formatPhone 
} from "@/lib/phoneUtils";
import { submitToGoogleSheets } from "@/lib/googleSheets";

const NewsletterSection = () => {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // URL do Google Apps Script Web App (será configurada via variável de ambiente)
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const masked = applyPhoneMask(value);
    setPhone(masked);
    setPhoneError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Valida telefone
    if (!phone) {
      setPhoneError("Por favor, informe seu número de celular");
      return;
    }

    if (!isValidBrazilianPhone(phone)) {
      setPhoneError("Por favor, informe um número de celular válido");
      return;
    }

    setIsSubmitting(true);
    setPhoneError("");

    try {
      // Normaliza o telefone para formato padrão
      const normalizedPhone = normalizePhone(phone);
      
      // Se tiver URL do Google Script configurada, envia para Google Sheets
      if (GOOGLE_SCRIPT_URL) {
        console.log("Enviando para Google Sheets...", { url: GOOGLE_SCRIPT_URL, phone: normalizedPhone });
        const result = await submitToGoogleSheets(normalizedPhone, GOOGLE_SCRIPT_URL);
        
        if (!result.success) {
          throw new Error(result.message || "Erro ao enviar dados");
        }
        console.log("Dados enviados com sucesso!");
      } else {
        console.warn("VITE_GOOGLE_SCRIPT_URL não configurada. Dados não serão salvos.");
        // Mesmo sem URL configurada, mostra sucesso para o usuário
        // (útil para testes locais sem configurar o Google Sheets)
      }

      // Sucesso
      setIsSubmitted(true);
      setPhone("");
    } catch (error) {
      console.error("Erro ao processar inscrição:", error);
      setPhoneError("Erro ao processar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
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
                    disabled={isSubmitting}
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Entrar na Lista"}
                </Button>
              </div>
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
