import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-serif text-2xl tracking-widest mb-4">VYSTRA</h2>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Contemporary Indian fashion that celebrates heritage while embracing modern elegance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-widest mb-6 text-primary-foreground/50">Shop</h3>
            <ul className="space-y-3">
              {["New Arrivals", "Women", "Men", "Accessories", "Sale"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-widest mb-6 text-primary-foreground/50">Help</h3>
            <ul className="space-y-3">
              {["Contact Us", "Shipping & Returns", "Size Guide", "FAQs", "Track Order"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-widest mb-6 text-primary-foreground/50">Newsletter</h3>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Subscribe for exclusive offers and early access to new collections.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/40"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-foreground text-primary text-sm font-medium hover:bg-primary-foreground/90 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-primary-foreground/50">
              © 2026 VYSTRA. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="#" className="text-xs text-primary-foreground/50 hover:text-primary-foreground/70">
                Privacy Policy
              </Link>
              <Link to="#" className="text-xs text-primary-foreground/50 hover:text-primary-foreground/70">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
