import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: {
        sitekey: string;
        callback?: (token: string) => void;
        "error-callback"?: () => void;
        "expired-callback"?: () => void;
        theme?: "light" | "dark" | "auto";
        size?: "normal" | "compact";
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface CloudflareTurnstileProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
}

export interface CloudflareTurnstileRef {
  reset: () => void;
}

export const CloudflareTurnstile = forwardRef<CloudflareTurnstileRef, CloudflareTurnstileProps>(({
  onVerify,
  onError,
  onExpire,
  theme = "auto",
  size = "normal",
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

  const reset = () => {
    if (widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch (error) {
        // Se reset falhar, remove e renderiza novamente
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (removeError) {
          // Ignora erro de remoção
        }
        widgetIdRef.current = null;
        // Força re-renderização
        setIsLoaded(false);
        setTimeout(() => setIsLoaded(true), 100);
      }
    } else {
      // Se não há widget, força re-renderização
      widgetIdRef.current = null;
      setIsLoaded(false);
      setTimeout(() => setIsLoaded(true), 100);
    }
  };

  useImperativeHandle(ref, () => ({
    reset,
  }));

  useEffect(() => {
    // Carrega o script do Turnstile se ainda não estiver carregado
    if (!document.querySelector('script[src*="challenges.cloudflare.com"]')) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    } else {
      setIsLoaded(true);
    }

    // Verifica se o Turnstile já está disponível
    const checkTurnstile = setInterval(() => {
      if (window.turnstile) {
        setIsLoaded(true);
        clearInterval(checkTurnstile);
      }
    }, 100);

    return () => {
      clearInterval(checkTurnstile);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !window.turnstile || !containerRef.current || !siteKey) {
      return;
    }

    // Evita renderizar múltiplas vezes
    if (widgetIdRef.current) {
      return;
    }

    // Verifica se já existe um widget renderizado neste container
    if (containerRef.current.querySelector('.cf-turnstile')) {
      return;
    }

    // Renderiza o widget do Turnstile
    try {
      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          onVerify(token);
        },
        "error-callback": () => {
          onError?.();
        },
        "expired-callback": () => {
          onExpire?.();
        },
        theme,
        size,
      });

      widgetIdRef.current = widgetId;
    } catch (error) {
      // Ignora erros de renderização múltipla
      console.warn("Turnstile render error:", error);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (error) {
          // Ignora erros ao remover
        }
        widgetIdRef.current = null;
      }
    };
  }, [isLoaded, siteKey, onVerify, onError, onExpire, theme, size]);

  if (!siteKey) {
    return null; // Não renderiza se não houver site key
  }

  return (
    <div className="flex justify-center">
      <div ref={containerRef} className="turnstile-container" />
    </div>
  );
});

CloudflareTurnstile.displayName = "CloudflareTurnstile";
