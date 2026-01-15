import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Truck, RotateCcw, Clock, MapPin } from "lucide-react";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl text-center mb-12">Shipping & Returns</h1>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card p-6 rounded-lg text-center">
                <Truck className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="font-serif text-xl mb-2">Free Shipping</h3>
                <p className="text-muted-foreground">On orders above ₹999</p>
              </div>
              <div className="bg-card p-6 rounded-lg text-center">
                <RotateCcw className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="font-serif text-xl mb-2">Easy Returns</h3>
                <p className="text-muted-foreground">15-day return policy</p>
              </div>
            </div>

            <section className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl mb-4">Shipping Information</h2>
                <div className="bg-card p-6 rounded-lg space-y-4 text-muted-foreground">
                  <p><strong className="text-foreground">Standard Shipping:</strong> 5-7 business days (Metro cities), 7-10 business days (Other locations)</p>
                  <p><strong className="text-foreground">Shipping Charges:</strong> Free on orders above ₹999. ₹99 for orders below ₹999.</p>
                  <p><strong className="text-foreground">Order Tracking:</strong> Track your order via SMS/Email link or through your account.</p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl mb-4">Return Policy</h2>
                <div className="bg-card p-6 rounded-lg space-y-4 text-muted-foreground">
                  <p>We offer a 15-day easy return policy from the date of delivery.</p>
                  <p><strong className="text-foreground">Conditions:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Items must be unused and unwashed</li>
                    <li>Original tags must be attached</li>
                    <li>Original packaging required</li>
                    <li>Intimate wear and customized items are non-returnable</li>
                  </ul>
                  <p><strong className="text-foreground">Refund:</strong> Refunds are processed within 5-7 business days after we receive the returned item.</p>
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

export default Shipping;
