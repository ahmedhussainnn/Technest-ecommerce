import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";
import { Order } from "@/types";

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, getCartTotal, addOrder } = useStore();
  const total = getCartTotal();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const order: Order = {
      id: crypto.randomUUID(),
      items: cart.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      total,
      status: "completed",
      paypalTransactionId: `PAYPAL-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };
    addOrder(order);
    clearCart();
    toast.success("Payment successful! Order has been placed.", {
      description: `Transaction ID: ${order.paypalTransactionId}`,
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/40" />
          <p className="font-mono text-lg">Your cart is empty</p>
          <Button variant="outline" asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1 max-w-3xl">
        <p className="font-mono text-sm text-primary tracking-widest uppercase mb-1">// Checkout</p>
        <h1 className="text-3xl font-mono font-bold text-foreground mb-8">Your Cart</h1>

        <div className="space-y-4 mb-8">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover bg-secondary" />
              <div className="flex-1 min-w-0">
                <h3 className="font-mono font-semibold text-foreground truncate">{item.name}</h3>
                <p className="text-sm text-primary font-mono">£{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="font-mono text-sm w-6 text-center">{item.quantity}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              <p className="font-mono font-semibold text-foreground w-20 text-right">
                £{(item.price * item.quantity).toFixed(2)}
              </p>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => { removeFromCart(item.id); toast.info("Item removed"); }}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg text-muted-foreground">Total</span>
            <span className="text-2xl font-mono font-bold text-primary">£{total.toFixed(2)}</span>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal" className="h-6" />
              <span className="font-mono text-sm text-muted-foreground">Sandbox Payment</span>
            </div>
            <p className="text-xs text-muted-foreground">
              This is a simulated PayPal sandbox transaction. No real charges will be made.
            </p>
            <Button variant="hero" size="lg" className="w-full" onClick={handleCheckout}>
              Pay with PayPal — £{total.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
