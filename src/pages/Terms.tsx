import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl text-center mb-12">Terms of Service</h1>
            
            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="font-serif text-2xl text-foreground mb-4">Acceptance of Terms</h2>
                <p>By accessing and using INVAANI, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-foreground mb-4">Orders and Payments</h2>
                <p>All orders are subject to availability. Prices are in Indian Rupees and include applicable taxes. We reserve the right to cancel orders due to pricing errors or stock issues.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-foreground mb-4">Shipping and Delivery</h2>
                <p>Delivery times are estimates and may vary. We are not responsible for delays caused by shipping carriers or customs. Risk of loss passes to you upon delivery.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-foreground mb-4">Returns and Refunds</h2>
                <p>Returns are accepted within 15 days of delivery per our Return Policy. Refunds are processed to the original payment method within 5-7 business days.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-foreground mb-4">Contact</h2>
                <p>Questions about these terms? Contact us at aaryan100m@gmail.com or call +91 8830764356.</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
