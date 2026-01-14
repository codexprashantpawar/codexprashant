import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-fashion.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="VYSTRA Fashion Collection"
          className="w-full h-full object-cover img-editorial"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24">
        <div className="max-w-2xl stagger-children">
          <p className="text-primary-foreground/80 text-sm font-sans uppercase tracking-ultra mb-4">
            Spring/Summer 2026
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-6 leading-tight">
            Elegance
            <br />
            <span className="italic font-light">Reimagined</span>
          </h1>
          <p className="text-primary-foreground/90 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg">
            Discover our latest collection where traditional Indian craftsmanship 
            meets contemporary design. Each piece tells a story of heritage and innovation.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero">
              Shop Collection
            </Button>
            <Button variant="heroOutline">
              Explore Lookbook
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
