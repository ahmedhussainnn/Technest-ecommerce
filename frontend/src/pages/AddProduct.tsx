import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";

const AddProduct = () => {
  const navigate = useNavigate();
  const addProduct = useStore((s) => s.addProduct);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    addProduct({
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      image: form.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
      category: form.category,
      stock: parseInt(form.stock) || 0,
    });
    toast.success("Product added successfully!");
    navigate("/products");
  };

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1 max-w-xl">
        <p className="font-mono text-sm text-primary tracking-widest uppercase mb-1">// New Product</p>
        <h1 className="text-3xl font-mono font-bold text-foreground mb-8">Add Product</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input id="name" placeholder="e.g. Wireless Keyboard" value={form.name} onChange={(e) => update("name", e.target.value)} className="bg-secondary" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe the product..." value={form.description} onChange={(e) => update("description", e.target.value)} className="bg-secondary min-h-[100px]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (£) *</Label>
              <Input id="price" type="number" step="0.01" min="0" placeholder="49.99" value={form.price} onChange={(e) => update("price", e.target.value)} className="bg-secondary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" min="0" placeholder="10" value={form.stock} onChange={(e) => update("stock", e.target.value)} className="bg-secondary" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Input id="category" placeholder="e.g. Peripherals" value={form.category} onChange={(e) => update("category", e.target.value)} className="bg-secondary" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" placeholder="https://..." value={form.image} onChange={(e) => update("image", e.target.value)} className="bg-secondary" />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full">Add Product</Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;
