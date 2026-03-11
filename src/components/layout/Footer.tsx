import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-serif text-2xl tracking-widest mb-4">INVAANI</h2>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Exclusive women's fashion for every age, every style, every occasion.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-widest mb-6 text-primary-foreground/50">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/new-arrivals" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/category/sarees" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Sarees
                </Link>
              </li>
              <li>
                <Link to="/category/kurtis" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Kurtis
                </Link>
              </li>
              <li>
                <Link to="/category/dresses" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Dresses
                </Link>
              </li>
              <li>
                <Link to="/category/western-wear" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Western Wear
                </Link>
              </li>
              <li>
                <Link to="/category/girls-clothing" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Girls Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-widest mb-6 text-primary-foreground/50">Help</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/account/orders" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-widest mb-6 text-primary-foreground/50">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <div className="text-sm text-primary-foreground/70">
                  <a href="tel:8830764356" className="hover:text-primary-foreground transition-colors block">
                    +91 8830764356
                  </a>
                  <a href="tel:7499452407" className="hover:text-primary-foreground transition-colors block">
                    +91 7499452407
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:aaryan100m@gmail.com" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  aaryan100m@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span className="text-sm text-primary-foreground/70">
                  Sky One, Pune,<br />
                  Maharashtra, India
                </span>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-widest mb-6 text-primary-foreground/50">Find Us</h3>
            <div className="aspect-video w-full rounded overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4211.919922329808!2d73.8314606128188!3d18.535146902238196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf7bc08a37dd%3A0xfd3b26ac2d7644fb!2sSky%20One!5e0!3m2!1sen!2sin!4v1768408539766!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="VYSTRA Store Location"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-primary-foreground/50">
              © 2026 VYSTRA. All rights reserved.
            </p>
            <p className="text-xs text-primary-foreground/50">
              Design by <span className="text-accent">Prashant Pawar</span>
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-xs text-primary-foreground/50 hover:text-primary-foreground/70">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-primary-foreground/50 hover:text-primary-foreground/70">
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
