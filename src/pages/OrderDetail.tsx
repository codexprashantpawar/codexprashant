import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/formatPrice";
import { format } from "date-fns";
import { ArrowLeft, Package, Truck, CheckCircle } from "lucide-react";

const OrderDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && id) {
      fetchOrder();
    }
  }, [user, id]);

  const fetchOrder = async () => {
    if (!user || !id) return;

    const { data: orderData } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (orderData) {
      setOrder(orderData);

      const { data: items } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", id);

      setOrderItems(items || []);
    }

    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case "pending": return 1;
      case "processing": return 2;
      case "shipped": return 3;
      case "delivered": return 4;
      default: return 0;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <div className="container py-16 text-center">
            <h1 className="font-serif text-3xl mb-4">Please Sign In</h1>
            <Link to="/login">
              <Button size="lg">Sign In</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <div className="container py-16 text-center">Loading...</div>
        </main>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <div className="container py-16 text-center">
            <h1 className="font-serif text-3xl mb-4">Order Not Found</h1>
            <Link to="/account/orders">
              <Button>View All Orders</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shippingAddress = order.shipping_address as any;
  const statusStep = getStatusStep(order.status);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <div className="container py-8 md:py-12">
          <Link to="/account/orders" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft size={16} />
            Back to Orders
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl">Order {order.order_number}</h1>
              <p className="text-muted-foreground">
                Placed on {format(new Date(order.created_at), "dd MMMM yyyy 'at' hh:mm a")}
              </p>
            </div>
            <Badge className={`${getStatusColor(order.status)} text-sm px-4 py-2`}>
              {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
            </Badge>
          </div>

          {/* Order Progress */}
          {order.status !== "cancelled" && (
            <div className="bg-card p-6 rounded-lg mb-8">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
                <div
                  className="absolute top-5 left-0 h-0.5 bg-accent transition-all"
                  style={{ width: `${(statusStep - 1) * 33.33}%` }}
                />

                {[
                  { label: "Order Placed", icon: Package },
                  { label: "Processing", icon: Package },
                  { label: "Shipped", icon: Truck },
                  { label: "Delivered", icon: CheckCircle },
                ].map((step, idx) => (
                  <div key={step.label} className="relative flex flex-col items-center gap-2 z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        idx + 1 <= statusStep ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <step.icon size={18} />
                    </div>
                    <span className="text-xs text-center">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="md:col-span-2">
              <div className="bg-card p-6 rounded-lg">
                <h2 className="font-serif text-xl mb-6">Order Items</h2>
                <div className="space-y-4">
                  {orderItems.map(item => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="w-20 h-24 bg-secondary rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.product_image || "/placeholder.svg"}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.product_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.size && `Size: ${item.size}`} {item.color && `• ${item.color}`}
                        </p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="font-semibold mt-1">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary & Shipping */}
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg">
                <h2 className="font-serif text-xl mb-4">Order Summary</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{order.shipping_cost === 0 ? "Free" : formatPrice(order.shipping_cost)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium capitalize">{order.payment_method?.replace("_", " ")}</p>
                </div>
              </div>

              {shippingAddress && (
                <div className="bg-card p-6 rounded-lg">
                  <h2 className="font-serif text-xl mb-4">Shipping Address</h2>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">{shippingAddress.full_name}</p>
                    <p>{shippingAddress.address_line1}</p>
                    {shippingAddress.address_line2 && <p>{shippingAddress.address_line2}</p>}
                    <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postal_code}</p>
                    <p>{shippingAddress.country}</p>
                    <p className="pt-2">Phone: {shippingAddress.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetail;
