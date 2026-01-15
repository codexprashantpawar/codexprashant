import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1920&q=80"
          alt="VYSTRA Women's Fashion Collection"
          className="w-full h-full object-cover img-editorial"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24">
        <div className="max-w-2xl stagger-children">
          <p className="text-primary-foreground/80 text-sm font-sans uppercase tracking-ultra mb-4">
            Women's Collection 2026
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-6 leading-tight">
            Celebrate
            <br />
            <span className="italic font-light">Her Style</span>
          </h1>
          <p className="text-primary-foreground/90 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg">
            Discover exquisite women's fashion from traditional sarees to modern western wear. 
            Perfect for every age, every occasion, every woman.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" asChild>
              <Link to="/shop">Shop Now</Link>
            </Button>
            <Button variant="heroOutline" asChild>
              <Link to="/new-arrivals">New Arrivals</Link>
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
