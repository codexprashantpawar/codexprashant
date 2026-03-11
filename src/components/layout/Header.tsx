import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X, Heart, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    {
      label: "Ethnic Wear",
      href: "/category/ethnic-wear",
      subcategories: [
        { label: "Sarees", href: "/category/sarees" },
        { label: "Kurtis", href: "/category/kurtis" },
        { label: "Lehengas", href: "/category/lehengas" },
        { label: "Salwar Suits", href: "/category/salwar-suits" },
      ],
    },
    {
      label: "Western Wear",
      href: "/category/western-wear",
      subcategories: [
        { label: "Dresses", href: "/category/dresses" },
        { label: "Tops", href: "/category/tops" },
        { label: "Jeans & Pants", href: "/category/jeans-pants" },
      ],
    },
    {
      label: "Girls",
      href: "/category/girls-clothing",
      subcategories: [],
    },
    {
      label: "Nightwear",
      href: "/category/nightwear",
      subcategories: [],
    },
    {
      label: "Activewear",
      href: "/category/activewear",
      subcategories: [],
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/98 backdrop-blur-md shadow-soft"
          : "bg-background/95 backdrop-blur-sm"
      } border-b border-border`}
    >
      <div className="container mx-auto">
        {/* Top bar - promotional */}
        <div className="hidden md:block py-1.5 text-center border-b border-border/50">
          <p className="text-xs text-muted-foreground">
            Free Shipping on orders above ₹999 | Easy 15-day returns
          </p>
        </div>

        <div className="flex items-center justify-between h-16 py-2">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="font-serif text-2xl md:text-3xl font-semibold tracking-widest text-primary">
              INVAANI
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/new-arrivals"
              className={`px-4 py-2 text-sm font-sans tracking-wide transition-colors duration-200 uppercase hover:text-accent ${
                location.pathname === "/new-arrivals" ? "text-accent" : "text-foreground/80"
              }`}
            >
              New
            </Link>

            {categories.map((category) => (
              <DropdownMenu key={category.label}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-sans tracking-wide transition-colors duration-200 uppercase hover:text-accent ${
                      location.pathname.includes(category.href) ? "text-accent" : "text-foreground/80"
                    }`}
                  >
                    {category.label}
                    {category.subcategories.length > 0 && <ChevronDown className="w-3 h-3" />}
                  </button>
                </DropdownMenuTrigger>
                {category.subcategories.length > 0 && (
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to={category.href} className="w-full">
                        All {category.label}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {category.subcategories.map((sub) => (
                      <DropdownMenuItem key={sub.label} asChild>
                        <Link to={sub.href} className="w-full">
                          {sub.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            ))}

            <Link
              to="/shop"
              className={`px-4 py-2 text-sm font-sans tracking-wide transition-colors duration-200 uppercase hover:text-accent ${
                location.pathname === "/shop" ? "text-accent" : "text-foreground/80"
              }`}
            >
              Shop All
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                  <Input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pr-10"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </form>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                  <Search className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/wishlist">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-highlight text-highlight-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>

            {/* User */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/account" className="w-full">
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/account/orders" className="w-full">
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/wishlist" className="w-full">
                        Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="w-full">
                        Sign In
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/register" className="w-full">
                        Create Account
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-border animate-fade-in max-h-[70vh] overflow-y-auto">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </form>

            <div className="flex flex-col gap-2">
              <Link
                to="/new-arrivals"
                className="text-lg font-serif tracking-wide text-foreground/80 hover:text-foreground transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                New Arrivals
              </Link>

              {categories.map((category) => (
                <div key={category.label}>
                  <Link
                    to={category.href}
                    className="text-lg font-serif tracking-wide text-foreground/80 hover:text-foreground transition-colors duration-200 py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.label}
                  </Link>
                  {category.subcategories.length > 0 && (
                    <div className="pl-4 flex flex-col gap-1">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                to="/shop"
                className="text-lg font-serif tracking-wide text-foreground/80 hover:text-foreground transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop All
              </Link>

              <div className="border-t border-border mt-4 pt-4">
                {user ? (
                  <>
                    <Link
                      to="/account"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 block w-full text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
