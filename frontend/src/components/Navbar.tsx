import { Link } from "react-router-dom";
import { ShoppingCart, Search, Plus, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/useStore";
import { useState } from "react";

const Navbar = () => {
  const { searchQuery, setSearchQuery, getCartCount } = useStore();
  const cartCount = getCartCount();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="font-mono font-bold text-primary-foreground text-sm">TN</span>
          </div>
          <span className="font-mono font-bold text-lg text-foreground hidden sm:block">
            Tech<span className="text-primary">Nest</span>
          </span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/products">Products</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/add-product"><Plus className="w-4 h-4 mr-1" />Add Product</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/orders">Orders</Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="relative">
            <Link to="/cart">
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-3 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Button variant="ghost" size="sm" asChild onClick={() => setMobileOpen(false)}>
              <Link to="/products">Products</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild onClick={() => setMobileOpen(false)}>
              <Link to="/add-product"><Plus className="w-4 h-4 mr-1" />Add Product</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild onClick={() => setMobileOpen(false)}>
              <Link to="/orders">Orders</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="relative" onClick={() => setMobileOpen(false)}>
              <Link to="/cart">
                <ShoppingCart className="w-4 h-4 mr-1" />Cart
                {cartCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
