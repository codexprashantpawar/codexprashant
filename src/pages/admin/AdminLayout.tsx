import { useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Tags,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const AdminLayout = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !adminLoading) {
      if (!user) {
        navigate("/login", { state: { from: location.pathname } });
      } else if (!isAdmin) {
        navigate("/");
      }
    }
  }, [user, isAdmin, authLoading, adminLoading, navigate, location.pathname]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="space-y-4 text-center">
          <Skeleton className="h-12 w-12 rounded-full mx-auto" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Package, label: "Products", href: "/admin/products" },
    { icon: Tags, label: "Categories", href: "/admin/categories" },
    { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
    { icon: Users, label: "Customers", href: "/admin/customers" },
    { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50 flex items-center justify-between px-4">
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
        <h1 className="font-serif text-xl font-semibold">INVAANI Admin</h1>
        <div className="w-10" />
      </header>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-background border-r border-border z-40 transition-transform duration-200 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-16 flex items-center justify-center border-b border-border">
          <Link to="/admin" className="font-serif text-2xl font-semibold tracking-wider">
            INVAANI
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            View Store →
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
            onClick={handleSignOut}
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-4 lg:p-8"><Outlet /></div>
      </main>
    </div>
  );
};

export default AdminLayout;
