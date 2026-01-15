import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { Minus, Plus, Trash2 } from "lucide-react";

const Cart = () => {
  const { items, loading, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const total = getCartTotal();
  const shipping = total > 999 ? 0 : 99;

  if (loading) return <div className="min-h-screen bg-background"><Header /><main className="pt-24 container py-16 text-center">Loading...</main></div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="container py-8 md:py-12">
          <h1 className="font-serif text-3xl md:text-4xl mb-8">Shopping Bag</h1>
          {items.length === 0 ? (
            <div className="text-center py-16"><p className="text-muted-foreground mb-4">Your bag is empty</p><Link to="/shop"><Button>Continue Shopping</Button></Link></div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 bg-card rounded-lg">
                    <Link to={`/product/${item.product?.slug}`} className="w-24 h-32 bg-secondary rounded overflow-hidden flex-shrink-0">
                      <img src={item.product?.images?.[0] || '/placeholder.svg'} alt="" className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/product/${item.product?.slug}`} className="font-medium hover:text-accent">{item.product?.name}</Link>
                      <p className="text-sm text-muted-foreground">{item.size && `Size: ${item.size}`} {item.color && `• ${item.color}`}</p>
                      <p className="font-semibold mt-2">{formatPrice(item.product?.sale_price || item.product?.price || 0)}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center border rounded">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2"><Minus size={14} /></button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2"><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-card p-6 rounded-lg h-fit">
                <h2 className="font-serif text-xl mb-6">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
                  <div className="border-t pt-3 flex justify-between font-semibold text-base"><span>Total</span><span>{formatPrice(total + shipping)}</span></div>
                </div>
                <Link to="/checkout"><Button className="w-full mt-6">Proceed to Checkout</Button></Link>
                <p className="text-xs text-muted-foreground text-center mt-4">Free shipping on orders above ₹999</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Cart;
