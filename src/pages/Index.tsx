import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FlashDeals from "@/components/home/FlashDeals";
import TrendingProducts from "@/components/home/TrendingProducts";
import WomenCollections from "@/components/home/WomenCollections";
import MenCollections from "@/components/home/MenCollections";
import ShopMainCharacter from "@/components/home/ShopMainCharacter";
import NewLaunch from "@/components/home/NewLaunch";
import InstagramFeed from "@/components/home/InstagramFeed";
import Newsletter from "@/components/home/Newsletter";
import RecentlyViewed from "@/components/home/RecentlyViewed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FlashDeals />
        <TrendingProducts />
        <WomenCollections />
        <MenCollections />
        <ShopMainCharacter />
        <NewLaunch />
        <RecentlyViewed />
        <InstagramFeed />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
