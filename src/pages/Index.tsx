import HeroSection from "@/components/landing/HeroSection";
import ManifestoSection from "@/components/landing/ManifestoSection";
import ConceptSection from "@/components/landing/ConceptSection";
import ProductsSection from "@/components/landing/ProductsSection";
import NewsletterSection from "@/components/landing/NewsletterSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <ProductsSection />
      <ManifestoSection />
      <ConceptSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
};

export default Index;
