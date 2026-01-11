import HeroSection from "@/components/landing/HeroSection";
import ManifestoSection from "@/components/landing/ManifestoSection";
import QualitySection from "@/components/landing/QualitySection";
import ProductsSection from "@/components/landing/ProductsSection";
import NewsletterSection from "@/components/landing/NewsletterSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <ProductsSection />
      <QualitySection />
      <ManifestoSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
};

export default Index;
