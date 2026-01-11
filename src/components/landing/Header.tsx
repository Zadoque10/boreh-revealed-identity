import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import borehLogo from "@/assets/logo-boreh.png";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Início", href: "/", scrollTo: null },
    { label: "Coleção", href: "/colecao-completa", scrollTo: null },
    { label: "Matéria Prima", href: "/", scrollTo: "materia-prima" },
    { label: "Manifesto", href: "/", scrollTo: "manifesto" },
    { label: "Sobre", href: "/", scrollTo: "quality" },
  ];

  const handleNavClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    if (item.scrollTo) {
      e.preventDefault();
      // Se estiver em outra página, navega primeiro
      if (location.pathname !== "/") {
        window.location.href = item.href;
        setTimeout(() => {
          const element = document.getElementById(item.scrollTo);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.getElementById(item.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (item: typeof navItems[0]) => {
    if (item.href !== "/") {
      return location.pathname === item.href;
    }
    return location.pathname === "/" && !item.scrollTo;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center z-10 transition-transform duration-300 hover:scale-105"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src={borehLogo}
              alt="BOREH"
              className="h-8 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center gap-8">
              {navItems.map((item) => {
                if (item.scrollTo) {
                  return (
                    <button
                      key={item.label}
                      onClick={(e) => handleNavClick(e, item)}
                      className={cn(
                        "relative font-body text-sm uppercase tracking-[0.15em] transition-colors duration-300",
                        isActive(item)
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                      {isActive(item) && (
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground" />
                      )}
                    </button>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "relative font-body text-sm uppercase tracking-[0.15em] transition-colors duration-300",
                      isActive(item)
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                    {isActive(item) && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground" />
                    )}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-muted/50 transition-colors"
              aria-label="Buscar"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Shopping Bag Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-muted/50 transition-colors relative"
              aria-label="Carrinho"
            >
              <ShoppingBag className="h-4 w-4" />
              {/* Badge for cart count - can be added later */}
              {/* <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                0
              </span> */}
            </Button>

            {/* Mobile Menu */}
            {isMobile && (
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-muted/50 transition-colors"
                    aria-label="Menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] sm:max-w-sm">
                  <div className="flex flex-col h-full">
                    {/* Mobile Logo */}
                    <div className="mb-8 pt-4">
                      <img
                        src={borehLogo}
                        alt="BOREH"
                        className="h-10 w-auto"
                      />
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex flex-col gap-6 flex-1">
                      {navItems.map((item) => {
                        if (item.scrollTo) {
                          return (
                            <button
                              key={item.label}
                              onClick={(e) => handleNavClick(e, item)}
                              className={cn(
                                "text-left font-body text-lg uppercase tracking-[0.15em] transition-colors duration-300 py-2 border-b border-border/50",
                                isActive(item)
                                  ? "text-foreground font-semibold"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {item.label}
                            </button>
                          );
                        }
                        return (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "text-left font-body text-lg uppercase tracking-[0.15em] transition-colors duration-300 py-2 border-b border-border/50",
                              isActive(item)
                                ? "text-foreground font-semibold"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </nav>

                    {/* Mobile Footer */}
                    <div className="mt-auto pt-8 border-t border-border">
                      <div className="flex flex-col gap-4">
                        <a
                          href="https://www.instagram.com/boreh.company?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Instagram
                        </a>
                        <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground/50">
                          © 2025 BOREH
                        </p>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
