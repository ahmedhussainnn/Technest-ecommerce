import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useStore((s) => s.addToCart);

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="group rounded-lg border border-border bg-card overflow-hidden transition-all hover:glow hover:border-primary/30 animate-fade-in">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="p-4 space-y-2">
        <p className="text-xs font-mono text-primary uppercase tracking-wider">{product.category}</p>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-mono font-semibold text-foreground line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-mono font-bold text-primary">£{product.price.toFixed(2)}</span>
          <Button size="sm" onClick={handleAdd}>
            <ShoppingCart className="w-4 h-4 mr-1" />Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
