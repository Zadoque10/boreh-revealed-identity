import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ShoppingBag, Globe, Check } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import borehLogo from "@/assets/logo-boreh.png";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t.header.nav.inicio, href: "/", scrollTo: null },
    { label: t.header.nav.colecao, href: "/colecao-completa", scrollTo: null },
    { label: t.header.nav.materiaPrima, href: "/", scrollTo: "materia-prima" },
    { label: t.header.nav.manifesto, href: "/", scrollTo: "manifesto" },
    { label: t.header.nav.sobre, href: "/", scrollTo: "quality" },
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
            {/* Language Selector */}
            <div className="relative">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-muted/50 transition-all duration-200 hover:scale-105 active:scale-95 relative group"
                    aria-label="Language"
                  >
                    <Globe className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-12" />
                    {/* Badge indicando idioma atual */}
                    <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-charcoal border border-background text-[8px] flex items-center justify-center text-off-white font-bold pointer-events-none">
                      {language.toUpperCase().charAt(0)}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  sideOffset={10}
                  alignOffset={-5}
                  className="min-w-[150px] backdrop-blur-md bg-background/95 border-border/50 shadow-xl rounded-lg"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                  side="bottom"
                >
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setLanguage("pt");
                    }}
                    className={cn(
                      "cursor-pointer transition-all duration-150 rounded-md",
                      language === "pt" 
                        ? "bg-accent/50 font-semibold" 
                        : "hover:bg-accent/30"
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">PT</span>
                        <span>Português</span>
                      </span>
                      {language === "pt" && (
                        <Check className="h-4 w-4 text-charcoal ml-2" />
                      )}
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setLanguage("en");
                    }}
                    className={cn(
                      "cursor-pointer transition-all duration-150 rounded-md",
                      language === "en" 
                        ? "bg-accent/50 font-semibold" 
                        : "hover:bg-accent/30"
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">EN</span>
                        <span>English</span>
                      </span>
                      {language === "en" && (
                        <Check className="h-4 w-4 text-charcoal ml-2" />
                      )}
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Search Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-muted/50 transition-colors"
              aria-label={t.header.search}
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Shopping Bag Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full hover:bg-muted/50 transition-colors relative"
              aria-label={t.header.cart}
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
                        {/* Language Selector Mobile */}
                        <div className="flex items-center justify-between pb-4 border-b border-border/50">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground uppercase tracking-wider">Idioma</span>
                          </div>
                          <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
                            <button
                              onClick={() => {
                                setLanguage("pt");
                                setIsMobileMenuOpen(false);
                              }}
                              className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 min-w-[60px]",
                                language === "pt"
                                  ? "bg-background text-foreground shadow-sm"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              PT
                            </button>
                            <button
                              onClick={() => {
                                setLanguage("en");
                                setIsMobileMenuOpen(false);
                              }}
                              className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 min-w-[60px]",
                                language === "en"
                                  ? "bg-background text-foreground shadow-sm"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              EN
                            </button>
                          </div>
                        </div>
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
