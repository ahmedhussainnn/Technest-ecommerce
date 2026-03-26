import { Link } from "react-router-dom";
import { CheckCircle, XCircle, Clock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/store/useStore";

const statusConfig = {
  completed: { icon: CheckCircle, color: "text-success", label: "Completed" },
  failed: { icon: XCircle, color: "text-destructive", label: "Failed" },
  pending: { icon: Clock, color: "text-warning", label: "Pending" },
};

const Orders = () => {
  const orders = useStore((s) => s.orders);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/40" />
          <p className="font-mono text-lg">No orders yet</p>
          <Button variant="outline" asChild>
            <Link to="/products">Start Shopping</Link>
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
        <p className="font-mono text-sm text-primary tracking-widest uppercase mb-1">// History</p>
        <h1 className="text-3xl font-mono font-bold text-foreground mb-8">Order History</h1>

        <div className="space-y-6">
          {orders.map((order) => {
            const { icon: StatusIcon, color, label } = statusConfig[order.status];
            return (
              <div key={order.id} className="rounded-lg border border-border bg-card p-6 space-y-4 animate-fade-in">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                  <div className={`flex items-center gap-1 ${color}`}>
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-sm font-mono">{label}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover bg-secondary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-mono text-foreground">£{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border">
                  {order.paypalTransactionId && (
                    <p className="text-xs text-muted-foreground font-mono">PayPal: {order.paypalTransactionId}</p>
                  )}
                  <p className="text-lg font-mono font-bold text-primary">£{order.total.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
