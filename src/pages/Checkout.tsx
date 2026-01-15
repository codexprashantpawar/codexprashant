import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatPrice } from "@/lib/formatPrice";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, CreditCard, Banknote, Smartphone } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: user?.email || "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const subtotal = getCartTotal();
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to place an order",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Generate order number
      const orderNum = `VYS${Date.now().toString(36).toUpperCase()}`;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          order_number: orderNum,
          subtotal,
          shipping_cost: shipping,
          total,
          payment_method: paymentMethod,
          payment_status: paymentMethod === "cod" ? "pending" : "pending",
          status: "pending",
          shipping_address: {
            full_name: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            address_line1: formData.addressLine1,
            address_line2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postalCode,
            country: "India",
          },
          notes: formData.notes,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product?.name || "Product",
        product_image: item.product?.images?.[0] || null,
        quantity: item.quantity,
        price: item.product?.sale_price || item.product?.price || 0,
        size: item.size,
        color: item.color,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      await clearCart();

      setOrderNumber(orderNum);
      setOrderPlaced(true);

      toast({
        title: "Order placed successfully!",
        description: `Your order number is ${orderNum}`,
      });

    } catch (error: any) {
      toast({
        title: "Error placing order",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <div className="container py-16 text-center">
            <h1 className="font-serif text-3xl mb-4">Please Sign In</h1>
            <p className="text-muted-foreground mb-6">You need to sign in to checkout</p>
            <Link to="/login">
              <Button size="lg">Sign In</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <div className="container py-16 text-center max-w-lg mx-auto">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="font-serif text-3xl mb-4">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-2">Thank you for shopping with VYSTRA</p>
            <p className="text-lg font-semibold mb-8">Order Number: {orderNumber}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/account/orders">
                <Button>View Orders</Button>
              </Link>
              <Link to="/shop">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="container py-8 md:py-12">
          <h1 className="font-serif text-3xl md:text-4xl mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Shipping Details */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-card p-6 rounded-lg">
                  <h2 className="font-serif text-xl mb-6">Shipping Details</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="addressLine1">Address Line 1 *</Label>
                      <Input
                        id="addressLine1"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="addressLine2">Address Line 2</Label>
                      <Input
                        id="addressLine2"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="notes">Order Notes (optional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Any special instructions..."
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card p-6 rounded-lg">
                  <h2 className="font-serif text-xl mb-6">Payment Method</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-accent">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Banknote className="w-5 h-5" />
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">Pay when your order arrives</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-accent mt-3">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Smartphone className="w-5 h-5" />
                        <div>
                          <p className="font-medium">UPI</p>
                          <p className="text-sm text-muted-foreground">Pay using UPI apps</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:border-accent mt-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                        <CreditCard className="w-5 h-5" />
                        <div>
                          <p className="font-medium">Credit/Debit Card</p>
                          <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-card p-6 rounded-lg sticky top-24">
                  <h2 className="font-serif text-xl mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    {items.map(item => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-20 bg-secondary rounded overflow-hidden flex-shrink-0">
                          <img
                            src={item.product?.images?.[0] || "/placeholder.svg"}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 text-sm">
                          <p className="font-medium line-clamp-1">{item.product?.name}</p>
                          <p className="text-muted-foreground">
                            {item.size && `Size: ${item.size}`} {item.color && `• ${item.color}`}
                          </p>
                          <p className="text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="font-semibold">
                            {formatPrice((item.product?.sale_price || item.product?.price || 0) * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 text-sm border-t pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-semibold text-base">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full mt-6" size="lg" disabled={loading}>
                    {loading ? "Placing Order..." : `Place Order - ${formatPrice(total)}`}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By placing this order, you agree to our Terms of Service
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
