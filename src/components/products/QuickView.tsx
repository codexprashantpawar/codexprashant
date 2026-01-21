import { useState } from "react";
import { X, Heart, Minus, Plus, ShoppingBag, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  sale_price: number | null;
  images: string[];
  description: string | null;
  sizes: string[] | null;
  colors: string[] | null;
}

interface QuickViewProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const QuickView = ({ product, open, onClose }: QuickViewProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  if (!product) return null;
  
  const inWishlist = isInWishlist(product.id);
  const discount = product.sale_price 
    ? Math.round(((product.price - product.sale_price) / product.price) * 100) 
    : 0;

  const handleAddToCart = () => {
    addToCart(product.id, selectedSize, selectedColor, quantity);
    onClose();
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">Quick View - {product.name}</DialogTitle>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="grid md:grid-cols-2">
          {/* Images */}
          <div className="bg-secondary p-4">
            <div className="aspect-square rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[selectedImage] || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {product.images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      "w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                      selectedImage === idx ? "border-primary" : "border-transparent"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Details */}
          <div className="p-6 flex flex-col">
            <div className="flex-1">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                {product.name}
              </h2>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-foreground">
                  {formatPrice(product.sale_price || product.price)}
                </span>
                {product.sale_price && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="bg-highlight text-highlight-foreground px-2 py-1 rounded text-sm font-medium">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>
              
              {product.description && (
                <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                  {product.description}
                </p>
              )}
              
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-4">
                  <label className="text-sm font-medium text-foreground mb-2 block">Size</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "px-4 py-2 border rounded-lg text-sm transition-all",
                          selectedSize === size 
                            ? "border-primary bg-primary text-primary-foreground" 
                            : "border-input hover:border-primary"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <label className="text-sm font-medium text-foreground mb-2 block">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "px-4 py-2 border rounded-lg text-sm transition-all",
                          selectedColor === color 
                            ? "border-primary bg-primary text-primary-foreground" 
                            : "border-input hover:border-primary"
                        )}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border rounded-lg hover:bg-secondary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border rounded-lg hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-3">
              <Button onClick={handleAddToCart} className="flex-1">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleWishlist}
                className={cn(inWishlist && "text-highlight border-highlight")}
              >
                <Heart className={cn("w-4 h-4", inWishlist && "fill-highlight")} />
              </Button>
            </div>
            
            <Link
              to={`/product/${product.slug}`}
              onClick={onClose}
              className="mt-3 text-center text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1"
            >
              <Eye className="w-4 h-4" />
              View Full Details
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickView;