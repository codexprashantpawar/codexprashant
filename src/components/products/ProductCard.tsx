import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  sale_price: number | null;
  images: string[];
  is_new?: boolean;
  is_featured?: boolean;
  category?: {
    name: string;
    slug: string;
  };
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
  };

  const discount = product.sale_price 
    ? Math.round(((product.price - product.sale_price) / product.price) * 100) 
    : 0;

  return (
    <Link 
      to={`/product/${product.slug}`} 
      className={cn("group block", className)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
        <img
          src={product.images[0] || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover img-zoom"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.is_new && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium tracking-wide">
              NEW
            </span>
          )}
          {discount > 0 && (
            <span className="px-3 py-1 bg-highlight text-highlight-foreground text-xs font-medium">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={cn(
            "absolute top-3 right-3 w-10 h-10 rounded-full bg-background/90 flex items-center justify-center transition-all",
            "opacity-0 group-hover:opacity-100",
            inWishlist && "opacity-100"
          )}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            size={18} 
            className={cn(
              "transition-colors",
              inWishlist ? "fill-highlight text-highlight" : "text-foreground"
            )} 
          />
        </button>

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <ShoppingBag size={16} className="mr-2" />
            Add to Bag
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-1">
        {product.category && (
          <p className="text-xs text-muted-foreground tracking-wide uppercase">
            {product.category.name}
          </p>
        )}
        <h3 className="font-medium text-foreground group-hover:text-accent transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">
            {formatPrice(product.sale_price || product.price)}
          </span>
          {product.sale_price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
