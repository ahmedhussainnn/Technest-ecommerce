import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/store/useStore";

const Products = () => {
  const { getFilteredProducts, searchQuery } = useStore();
  const products = getFilteredProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="mb-8">
          <p className="font-mono text-sm text-primary tracking-widest uppercase mb-1">// Catalogue</p>
          <h1 className="text-3xl font-mono font-bold text-foreground">All Products</h1>
          {searchQuery && (
            <p className="text-muted-foreground mt-2">
              Showing results for "<span className="text-primary">{searchQuery}</span>" — {products.length} found
            </p>
          )}
        </div>
        {products.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-mono text-lg">No products found.</p>
            <p className="text-sm mt-1">Try a different search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
