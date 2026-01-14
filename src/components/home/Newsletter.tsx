import { useState } from "react";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-24 bg-secondary">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-accent text-xs font-sans uppercase tracking-ultra mb-4">
            Stay Connected
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Join the VYSTRA World
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Be the first to discover new collections, exclusive offers, and styling 
            inspiration delivered straight to your inbox.
          </p>

          {isSubmitted ? (
            <div className="animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-serif">Welcome to the family!</p>
              <p className="text-muted-foreground mt-2">Check your inbox for a special welcome gift.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-background border border-border px-6 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
              />
              <Button type="submit" variant="default" size="xl">
                Subscribe
              </Button>
            </form>
          )}

          <p className="text-xs text-muted-foreground mt-6">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
