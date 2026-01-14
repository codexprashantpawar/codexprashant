import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CollectionsGrid from "@/components/home/CollectionsGrid";
import TrendingProducts from "@/components/home/TrendingProducts";
import BrandStory from "@/components/home/BrandStory";
import Newsletter from "@/components/home/Newsletter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CollectionsGrid />
        <TrendingProducts />
        <BrandStory />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
