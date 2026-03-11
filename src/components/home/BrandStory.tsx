import { Button } from "@/components/ui/button";

const BrandStory = () => {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="text-accent text-xs font-sans uppercase tracking-ultra mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
              Where Heritage
              <br />
              <span className="italic font-light">Meets Innovation</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Born from a passion for preserving India's rich textile heritage, 
              INVAANI represents a new chapter in contemporary fashion. We collaborate 
              with master artisans across the country, translating centuries-old 
              techniques into pieces designed for the modern wardrobe.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Every garment tells a story of tradition, crafted with intention 
              and worn with purpose. This is fashion that honors its roots while 
              embracing what's next.
            </p>
            <Button variant="editorial" size="lg">
              Discover Our Craft
            </Button>
          </div>

          {/* Image Collage */}
          <div className="order-1 lg:order-2 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] bg-secondary overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80"
                    alt="Artisan at work"
                    className="w-full h-full object-cover img-editorial hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square bg-accent/20 flex items-center justify-center p-8">
                  <div className="text-center">
                    <span className="block font-serif text-5xl text-accent">15+</span>
                    <span className="text-sm text-muted-foreground uppercase tracking-wide">Years of Craft</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="aspect-square bg-secondary overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80"
                    alt="Textile detail"
                    className="w-full h-full object-cover img-editorial hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[4/5] bg-secondary overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80"
                    alt="Fabric weaving"
                    className="w-full h-full object-cover img-editorial hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-accent/30 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
