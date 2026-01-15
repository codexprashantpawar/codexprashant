import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto prose prose-gray">
            <h1 className="font-serif text-4xl md:text-5xl text-center mb-12">Privacy Policy</h1>
            
            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="font-serif text-2xl text-foreground mb-4">Information We Collect</h2>
                <p>We collect information you provide directly, including name, email, phone number, shipping address, and payment information when you make a purchase.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-foreground mb-4">How We Use Your Information</h2>
                <p>Your information is used to process orders, provide customer support, send order updates, and improve our services. We may also send promotional emails with your consent.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-foreground mb-4">Information Security</h2>
                <p>We implement industry-standard security measures to protect your personal information. Payment processing is handled by secure third-party providers.</p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-foreground mb-4">Contact Us</h2>
                <p>For privacy-related questions, contact us at aaryan100m@gmail.com or call +91 8830764356.</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
