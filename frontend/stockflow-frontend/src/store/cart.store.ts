import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clear: () => void;
  total: () => number;
  updateQuantity: (id: string, quantity: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(i => i.id === item.id.toString());

          if (existing) {
            return {
              items: state.items.map(i =>
                i.id === item.id
                  ? { ...i, quantity: Math.min(i.quantity + 1, i.stock) }
                  : i
              ),
            };
          }

          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),

      removeItem: (id) =>
        set({ items: get().items.filter(i => i.id !== id) }),

      increase: (id) =>
        set({
          items: get().items.map(i =>
            i.id === id && i.quantity < i.stock
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }),

      updateQuantity: (id, quantity) =>
        set({
          items: get().items.map(i =>
            i.id === id ? { ...i, quantity } : i
          ),
        }),

      decrease: (id) =>
        set({
          items: get().items.map(i =>
            i.id === id && i.quantity > 1
              ? { ...i, quantity: i.quantity - 1 }
              : i
          ),
        }),

      clear: () => set({ items: [] }),

      total: () =>
        get().items.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        ),
    }),

    { name: "cart-storage" }
  )
);
