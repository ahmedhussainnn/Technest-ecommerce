import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useStore();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-muted-foreground font-mono">
          Product not found.
        </div>
        <Footer />
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/products"><ArrowLeft className="w-4 h-4 mr-1" />Back to Products</Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="rounded-lg overflow-hidden border border-border bg-secondary aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            <div>
              <p className="font-mono text-sm text-primary uppercase tracking-widest mb-2">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-mono font-bold text-foreground">{product.name}</h1>
            </div>

            <p className="text-3xl font-mono font-bold text-primary">£{product.price.toFixed(2)}</p>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Package className="w-4 h-4" />
              <span>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</span>
            </div>

            <Button variant="hero" size="lg" onClick={handleAdd} disabled={product.stock === 0} className="w-full sm:w-auto">
              <ShoppingCart className="w-5 h-5 mr-2" />Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
