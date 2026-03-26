import { create } from "zustand";
import { Product, CartItem, Order } from "@/types";

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Mechanical Keyboard RGB",
    description: "Premium mechanical keyboard with hot-swappable switches, per-key RGB lighting, and aircraft-grade aluminium frame. Features Cherry MX Red switches for smooth linear actuation.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80",
    category: "Peripherals",
    stock: 25,
    featured: true,
  },
  {
    id: "2",
    name: "Wireless Gaming Mouse",
    description: "Ultra-lightweight wireless gaming mouse with 25K DPI optical sensor, 70-hour battery life, and customisable side buttons. Weighs only 63g.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&q=80",
    category: "Peripherals",
    stock: 40,
    featured: true,
  },
  {
    id: "3",
    name: "USB-C Hub 7-in-1",
    description: "Compact 7-in-1 USB-C hub with HDMI 4K@60Hz, 100W Power Delivery, SD/microSD card readers, USB 3.0 ports, and Gigabit Ethernet.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236571?w=600&q=80",
    category: "Accessories",
    stock: 60,
    featured: false,
  },
  {
    id: "4",
    name: "Noise-Cancelling Headphones",
    description: "Over-ear headphones with adaptive noise cancellation, 30-hour battery, and Hi-Res audio certification. Premium memory foam cushions for all-day comfort.",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    category: "Audio",
    stock: 15,
    featured: true,
  },
  {
    id: "5",
    name: "4K Webcam Pro",
    description: "Professional 4K webcam with auto-focus, built-in ring light, dual noise-cancelling microphones, and AI-powered background blur.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&q=80",
    category: "Peripherals",
    stock: 30,
    featured: false,
  },
  {
    id: "6",
    name: "Laptop Stand Aluminium",
    description: "Ergonomic aluminium laptop stand with adjustable height and angle. Compatible with laptops up to 17 inches. Foldable and portable design.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80",
    category: "Accessories",
    stock: 50,
    featured: false,
  },
  {
    id: "7",
    name: "Wireless Charging Pad",
    description: "Qi-certified wireless charging pad with 15W fast charging support. Ultra-slim design with LED indicator and foreign object detection.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1591815302525-756a9bcc3425?w=600&q=80",
    category: "Charging",
    stock: 80,
    featured: false,
  },
  {
    id: "8",
    name: "Portable SSD 1TB",
    description: "Ultra-fast portable SSD with read speeds up to 1050MB/s. IP65 water and dust resistant. USB-C and USB-A compatible with hardware encryption.",
    price: 109.99,
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600&q=80",
    category: "Storage",
    stock: 35,
    featured: true,
  },
];

interface StoreState {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  searchQuery: string;
  addProduct: (product: Omit<Product, "id">) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  setSearchQuery: (query: string) => void;
  getFilteredProducts: () => Product[];
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  products: SAMPLE_PRODUCTS,
  cart: [],
  orders: [],
  searchQuery: "",

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, { ...product, id: crypto.randomUUID() }],
    })),

  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  updateCartQuantity: (productId, quantity) =>
    set((state) => ({
      cart: quantity <= 0
        ? state.cart.filter((item) => item.id !== productId)
        : state.cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
    })),

  clearCart: () => set({ cart: [] }),

  addOrder: (order) =>
    set((state) => ({ orders: [order, ...state.orders] })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  getFilteredProducts: () => {
    const { products, searchQuery } = get();
    if (!searchQuery.trim()) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  },

  getCartTotal: () =>
    get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),

  getCartCount: () =>
    get().cart.reduce((sum, item) => sum + item.quantity, 0),
}));
