import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80"
              alt="INVAANI Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/70" />
          </div>
          <div className="relative z-10 text-center text-primary-foreground">
            <h1 className="font-serif text-4xl md:text-6xl mb-4">Our Story</h1>
            <p className="text-lg text-primary-foreground/80">Celebrating Indian Women Since 2010</p>
          </div>
        </div>

        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto space-y-12">
            <section className="text-center">
              <h2 className="font-serif text-3xl md:text-4xl mb-6">About INVAANI</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                INVAANI was founded with a simple mission: to celebrate the beauty and diversity of 
                Indian women through fashion. We believe every woman deserves to feel confident and 
                beautiful, regardless of her age, size, or style preference.
              </p>
            </section>

            <section className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-serif text-2xl mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We envision a world where traditional Indian craftsmanship meets contemporary 
                  design, creating fashion that honors our heritage while embracing modern sensibilities. 
                  From the youngest girls to our wise elders, INVAANI is for every woman who wants 
                  to express herself through style.
                </p>
              </div>
              <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80"
                  alt="Artisan craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
            </section>

            <section className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 aspect-square bg-secondary rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600&q=80"
                  alt="Quality fabrics"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="font-serif text-2xl mb-4">Our Promise</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every garment at INVAANI is crafted with care, using premium fabrics and 
                  sustainable practices. We work directly with artisan communities across India,
                  ensuring fair wages and preserving traditional weaving techniques that have been 
                  passed down through generations.
                </p>
              </div>
            </section>

            <section className="bg-secondary p-8 md:p-12 rounded-lg text-center">
              <h3 className="font-serif text-2xl mb-6">Why Choose INVAANI?</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <p className="font-serif text-4xl text-accent mb-2">15+</p>
                  <p className="text-muted-foreground">Years of Excellence</p>
                </div>
                <div>
                  <p className="font-serif text-4xl text-accent mb-2">50K+</p>
                  <p className="text-muted-foreground">Happy Customers</p>
                </div>
                <div>
                  <p className="font-serif text-4xl text-accent mb-2">100+</p>
                  <p className="text-muted-foreground">Artisan Partners</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
