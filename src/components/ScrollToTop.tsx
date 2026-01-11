import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostra o botão quando o usuário rola mais de 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      variant="default"
      className={cn(
        "fixed bottom-8 right-8 z-50 rounded-full w-14 h-14 p-0 shadow-elevated",
        "transition-all duration-500 ease-in-out",
        "hover:scale-110 hover:shadow-glow active:scale-95",
        "bg-primary text-primary-foreground",
        isVisible
          ? "opacity-100 translate-y-0 visible"
          : "opacity-0 translate-y-4 invisible pointer-events-none"
      )}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="h-6 w-6" />
    </Button>
  );
};

export default ScrollToTop;
