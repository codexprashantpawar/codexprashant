import { Link } from "react-router-dom";
import { Clock, X } from "lucide-react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";

const RecentlyViewed = () => {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-serif font-bold text-foreground">Recently Viewed</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearRecentlyViewed}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {recentlyViewed.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="flex-shrink-0 w-40 group"
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-2">
                <img
                  src={product.images[0] || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-accent transition-colors">
                {product.name}
              </h3>
              <p className="text-sm font-semibold text-foreground">
                {formatPrice(product.sale_price || product.price)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;