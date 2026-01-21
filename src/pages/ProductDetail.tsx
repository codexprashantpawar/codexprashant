import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { Heart, Minus, Plus, ShoppingBag, Truck, RotateCcw, Shield, Sparkles } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { cn } from "@/lib/utils";
import ProductGrid from "@/components/products/ProductGrid";
import AITryOn from "@/components/products/AITryOn";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showTryOn, setShowTryOn] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    
    const { data } = await supabase
      .from("products")
      .select(`*, categories(name, slug)`)
      .eq("slug", slug)
      .maybeSingle();

    if (data) {
      setProduct({ ...data, category: data.categories });
      setSelectedSize(data.sizes?.[0] || "");
      setSelectedColor(data.colors?.[0] || "");
      
      // Add to recently viewed
      addToRecentlyViewed({
        id: data.id,
        name: data.name,
        slug: data.slug,
        price: data.price,
        sale_price: data.sale_price,
        images: data.images || []
      });
      
      // Fetch related products
      const { data: related } = await supabase
        .from("products")
        .select(`*, categories(name, slug)`)
        .eq("category_id", data.category_id)
        .neq("id", data.id)
        .limit(4);
      
      setRelatedProducts(related?.map(p => ({ ...p, category: p.categories })) || []);
    }
    
    setLoading(false);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, selectedSize, selectedColor, quantity);
    }
  };

  const handleWishlist = () => {
    if (!product) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 md:pt-24">
          <div className="container py-8">
            <div className="grid md:grid-cols-2 gap-8 animate-pulse">
              <div className="aspect-[3/4] bg-secondary rounded-lg" />
              <div className="space-y-4">
                <div className="h-4 bg-secondary rounded w-1/4" />
                <div className="h-8 bg-secondary rounded w-3/4" />
                <div className="h-6 bg-secondary rounded w-1/3" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 md:pt-24">
          <div className="container py-16 text-center">
            <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
            <Link to="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = product.sale_price 
    ? Math.round(((product.price - product.sale_price) / product.price) * 100) 
    : 0;

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="container py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-foreground">Shop</Link>
            {product.category && (
              <>
                <span className="mx-2">/</span>
                <Link to={`/category/${product.category.slug}`} className="hover:text-foreground">
                  {product.category.name}
                </Link>
              </>
            )}
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
                <img
                  src={product.images?.[selectedImage] || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images?.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={cn(
                        "w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors",
                        selectedImage === idx ? "border-accent" : "border-transparent"
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              
              {/* AI Try-On Button */}
              <Button
                variant="outline"
                className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                onClick={() => setShowTryOn(true)}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Try On with AI Camera
              </Button>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {product.category && (
                <Link 
                  to={`/category/${product.category.slug}`}
                  className="text-sm text-muted-foreground tracking-wide uppercase hover:text-foreground"
                >
                  {product.category.name}
                </Link>
              )}

              <h1 className="font-serif text-3xl md:text-4xl">{product.name}</h1>

              <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold">
                  {formatPrice(product.sale_price || product.price)}
                </span>
                {product.sale_price && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="px-2 py-1 bg-highlight text-highlight-foreground text-xs font-medium rounded">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {product.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Size Selection */}
              {product.sizes?.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Size</Label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "px-4 py-2 border rounded-lg text-sm transition-colors",
                          selectedSize === size
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors?.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Color: {selectedColor}</Label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color: string) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "px-4 py-2 border rounded-lg text-sm transition-colors",
                          selectedColor === color
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        )}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Quantity</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-secondary transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-secondary transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button onClick={handleAddToCart} className="flex-1" size="lg">
                  <ShoppingBag size={18} className="mr-2" />
                  Add to Bag
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlist}
                  className={cn(inWishlist && "text-highlight border-highlight")}
                >
                  <Heart size={18} className={cn(inWishlist && "fill-highlight")} />
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                  <Truck size={24} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RotateCcw size={24} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Easy Returns</p>
                </div>
                <div className="text-center">
                  <Shield size={24} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Secure Payment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16 md:mt-24">
              <h2 className="font-serif text-2xl md:text-3xl mb-8">You May Also Like</h2>
              <ProductGrid products={relatedProducts} />
            </section>
          )}
        </div>
      </main>
      <Footer />
      
      {/* AI Try-On Modal */}
      <AITryOn
        productImage={product?.images?.[0] || '/placeholder.svg'}
        productName={product?.name || ''}
        open={showTryOn}
        onClose={() => setShowTryOn(false)}
      />
    </div>
  );
};

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={className}>{children}</p>
);

export default ProductDetail;
