import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/store/useStore";

const Index = () => {
  const products = useStore((s) => s.products);
  const featured = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-2xl space-y-6">
            <p className="font-mono text-sm text-primary tracking-widest uppercase">// Welcome to TechNest</p>
            <h1 className="text-4xl md:text-6xl font-mono font-bold leading-tight">
              Premium Tech<br />
              <span className="text-gradient">Accessories</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Curated collection of high-quality technology accessories for developers, creators, and professionals.
            </p>
            <div className="flex gap-3 pt-2">
              <Button variant="hero" size="lg" asChild>
                <Link to="/products">Browse Products <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/add-product">Add Product</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Fast Shipping", desc: "Next-day delivery on all orders placed before 2 PM." },
              { icon: Shield, title: "Secure Payments", desc: "All transactions processed securely via PayPal." },
              { icon: Truck, title: "Easy Returns", desc: "30-day hassle-free return policy on all items." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-lg border border-border bg-card hover:glow transition-shadow">
                <Icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-mono font-semibold text-foreground mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-sm text-primary tracking-widest uppercase mb-1">// Featured</p>
            <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground">Top Picks</h2>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/products">View All <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
