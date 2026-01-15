import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { Trash2, ShoppingBag } from "lucide-react";

const Wishlist = () => {
  const { items, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (loading) return <div className="min-h-screen bg-background"><Header /><main className="pt-24 container py-16 text-center">Loading...</main></div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="container py-8 md:py-12">
          <h1 className="font-serif text-3xl md:text-4xl mb-8">Wishlist</h1>
          {items.length === 0 ? (
            <div className="text-center py-16"><p className="text-muted-foreground mb-4">Your wishlist is empty</p><Link to="/shop"><Button>Explore Collection</Button></Link></div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {items.map(item => (
                <div key={item.id} className="group">
                  <Link to={`/product/${item.product?.slug}`} className="block aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
                    <img src={item.product?.images?.[0] || '/placeholder.svg'} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                  <div className="mt-3">
                    <Link to={`/product/${item.product?.slug}`} className="font-medium hover:text-accent line-clamp-1">{item.product?.name}</Link>
                    <p className="font-semibold">{formatPrice(item.product?.sale_price || item.product?.price || 0)}</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="flex-1" onClick={() => addToCart(item.product_id)}><ShoppingBag size={14} className="mr-1" />Add</Button>
                      <Button size="sm" variant="outline" onClick={() => removeFromWishlist(item.product_id)}><Trash2 size={14} /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Wishlist;
