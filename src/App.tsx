import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import { WishlistProvider } from "@/hooks/useWishlist";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Search from "./pages/Search";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Shipping from "./pages/Shipping";
import SizeGuide from "./pages/SizeGuide";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminOrderDetail from "./pages/admin/OrderDetail";
import AdminCategories from "./pages/admin/Categories";
import AdminCustomers from "./pages/admin/Customers";
import AdminMessages from "./pages/admin/Messages";
import AdminSettings from "./pages/admin/Settings";
import WhatsAppButton from "./components/WhatsAppButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/account" element={<Account />} />
                <Route path="/account/orders" element={<Orders />} />
                <Route path="/account/orders/:id" element={<OrderDetail />} />
                <Route path="/search" element={<Search />} />
                <Route path="/new-arrivals" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/size-guide" element={<SizeGuide />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="orders/:id" element={<AdminOrderDetail />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="customers" element={<AdminCustomers />} />
                  <Route path="messages" element={<AdminMessages />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <WhatsAppButton />
            </BrowserRouter>
          </TooltipProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
