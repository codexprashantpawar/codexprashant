import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/formatPrice";
import { format } from "date-fns";
import { User, Package, Heart, LogOut, Eye } from "lucide-react";

const Orders = () => {
  const { user, signOut } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;

    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setOrders(data || []);
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

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <div className="container py-16 text-center">
            <h1 className="font-serif text-3xl mb-4">Please Sign In</h1>
            <p className="text-muted-foreground mb-6">Sign in to view your orders</p>
            <Link to="/login">
              <Button size="lg">Sign In</Button>
            </Link>
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
          <h1 className="font-serif text-3xl md:text-4xl mb-8">My Orders</h1>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="md:col-span-1">
              <nav className="space-y-2">
                <Link
                  to="/account"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <User size={18} />
                  Profile
                </Link>
                <Link
                  to="/account/orders"
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary text-foreground"
                >
                  <Package size={18} />
                  My Orders
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <Heart size={18} />
                  Wishlist
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors w-full text-left text-destructive"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="md:col-span-3">
              {loading ? (
                <div className="text-center py-12">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="bg-card p-8 rounded-lg text-center">
                  <Package size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h2 className="font-serif text-xl mb-2">No orders yet</h2>
                  <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
                  <Link to="/shop">
                    <Button>Start Shopping</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="bg-card p-6 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Order Number</p>
                          <p className="font-semibold">{order.order_number}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p>{format(new Date(order.created_at), "dd MMM yyyy")}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="font-semibold">{formatPrice(order.total)}</p>
                        </div>
                        <div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                          </Badge>
                        </div>
                        <Link to={`/account/orders/${order.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye size={16} className="mr-2" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
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

export default Orders;
