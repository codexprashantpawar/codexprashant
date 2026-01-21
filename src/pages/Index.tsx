import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FlashDeals from "@/components/home/FlashDeals";
import CollectionsGrid from "@/components/home/CollectionsGrid";
import TrendingProducts from "@/components/home/TrendingProducts";
import BrandStory from "@/components/home/BrandStory";
import Newsletter from "@/components/home/Newsletter";
import RecentlyViewed from "@/components/home/RecentlyViewed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FlashDeals />
        <CollectionsGrid />
        <TrendingProducts />
        <RecentlyViewed />
        <BrandStory />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
