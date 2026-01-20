import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroSaree from "@/assets/hero-saree.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroSaree}
          alt="VYSTRA Women's Saree Collection - Elegant Traditional Fashion"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24">
        <div className="max-w-2xl stagger-children">
          <p className="text-primary-foreground/90 text-sm font-sans uppercase tracking-ultra mb-4">
            Premium Saree Collection 2026
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-6 leading-tight">
            Timeless
            <br />
            <span className="italic font-light">Elegance</span>
          </h1>
          <p className="text-primary-foreground/90 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg">
            Discover our exquisite collection of handcrafted sarees. 
            From Banarasi silk to Kanjivaram, celebrate tradition with modern elegance.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" asChild>
              <Link to="/shop">Explore Collection</Link>
            </Button>
            <Button variant="heroOutline" asChild>
              <Link to="/category/sarees">Shop Sarees</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary-foreground/50 to-primary-foreground/50" />
      </div>
    </section>
  );
};

export default HeroSection;
