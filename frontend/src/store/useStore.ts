import { create } from "zustand";
import { Product, CartItem, Order } from "../types";

interface StoreState {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  searchQuery: string;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
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

const API_URL = "http://localhost:5000/api/products";

export const useStore = create<StoreState>((set, get) => ({
  products: [],
  cart: [],
  orders: [],
  searchQuery: "",

  fetchProducts: async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      const mappedProducts: Product[] = data.map((item: any) => ({
        id: item._id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.imageUrl,
        category: item.category || "Accessories",
        stock: item.stock ?? 10,
        featured: item.featured ?? false,
      }));

      set({ products: mappedProducts });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },

  addProduct: async (product) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: product.image,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const newItem = await response.json();

      const mappedProduct: Product = {
        id: newItem._id,
        name: newItem.name,
        description: newItem.description,
        price: newItem.price,
        image: newItem.imageUrl,
        category: product.category || "Accessories",
        stock: product.stock ?? 10,
        featured: product.featured ?? false,
      };

      set((state) => ({
        products: [...state.products, mappedProduct],
      }));
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  },

  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
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
      cart:
        quantity <= 0
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