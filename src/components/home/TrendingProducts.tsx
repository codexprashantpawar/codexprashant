import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock product data - in real app this would come from API/database
const products = [
  {
    id: 1,
    name: "Silk Chanderi Kurta",
    price: 8999,
    originalPrice: 12999,
    category: "Women",
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80",
  },
  {
    id: 2,
    name: "Linen Nehru Jacket",
    price: 6499,
    category: "Men",
    tag: "New",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
  },
  {
    id: 3,
    name: "Handwoven Silk Saree",
    price: 24999,
    category: "Women",
    tag: "Trending",
    image: "https://images.unsplash.com/photo-1610030469668-8e4c41d03f79?w=600&q=80",
  },
  {
    id: 4,
    name: "Embroidered Anarkali",
    price: 15999,
    originalPrice: 19999,
    category: "Women",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
  },
];

const TrendingProducts = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-muted-foreground text-xs font-sans uppercase tracking-ultra mb-3">
              Curated for You
            </p>
            <h2 className="font-serif text-4xl md:text-5xl">Trending Now</h2>
          </div>
          <Button variant="editorial">
            View All Products
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group">
              {/* Image Container */}
              <div className="relative aspect-[3/4] bg-secondary overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover img-zoom"
                />
                
                {/* Tag */}
                {product.tag && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-sans uppercase tracking-wide">
                    {product.tag}
                  </span>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      wishlist.includes(product.id)
                        ? "fill-highlight text-highlight"
                        : "text-foreground"
                    }`}
                  />
                </button>

                {/* Quick Add */}
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <Button variant="default" className="w-full gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Add to Bag
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <p className="text-muted-foreground text-xs font-sans uppercase tracking-wide mb-1">
                  {product.category}
                </p>
                <h3 className="font-serif text-lg mb-2 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-sans font-medium">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground line-through text-sm">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
