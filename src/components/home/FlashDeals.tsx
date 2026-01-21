import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Zap, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  sale_price: number | null;
  images: string[];
}

const FlashDeals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 30, seconds: 0 });
  const { addToCart } = useCart();

  useEffect(() => {
    fetchDeals();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 5, minutes: 30, seconds: 0 }; // Reset
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchDeals = async () => {
    const { data } = await supabase
      .from("products")
      .select("id, name, slug, price, sale_price, images")
      .eq("is_active", true)
      .not("sale_price", "is", null)
      .limit(4);
    if (data) setProducts(data);
  };

  if (products.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-r from-highlight/10 via-background to-highlight/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-highlight p-2 rounded-lg">
              <Zap className="w-6 h-6 text-highlight-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground">Flash Deals</h2>
              <p className="text-muted-foreground text-sm">Grab before they're gone!</p>
            </div>
          </div>
          
          {/* Countdown Timer */}
          <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg shadow-sm">
            <Clock className="w-5 h-5 text-highlight" />
            <span className="text-sm text-muted-foreground">Ends in:</span>
            <div className="flex gap-1">
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded font-mono font-bold">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="font-bold text-foreground">:</span>
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded font-mono font-bold">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="font-bold text-foreground">:</span>
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded font-mono font-bold">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => {
            const discount = product.sale_price 
              ? Math.round(((product.price - product.sale_price) / product.price) * 100) 
              : 0;

            return (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.images[0] || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {discount > 0 && (
                    <div className="absolute top-2 left-2 bg-highlight text-highlight-foreground px-2 py-1 rounded-full text-xs font-bold">
                      {discount}% OFF
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-foreground text-sm line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-highlight">
                      {formatPrice(product.sale_price || product.price)}
                    </span>
                    {product.sale_price && (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="w-full mt-2 bg-highlight hover:bg-highlight/90 text-highlight-foreground"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product.id);
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlashDeals;