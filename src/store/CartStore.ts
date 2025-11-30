// src/store/CartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PublicProduct } from "../types/product";

interface CartItem {
  product: PublicProduct; // ← Now PublicProduct
  qty: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: { product: PublicProduct; qty?: number }) => void;
  updateQuantity: (productId: string, newQty: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // src/store/CartStore.ts — Critical Fix
      addItem: ({ product, qty = 1 }) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.product._id === product._id
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product._id === product._id ? { ...i, qty: i.qty + qty } : i
              ), // ← NEW ARRAY
            };
          }
          return { items: [...state.items, { product, qty }] }; // ← NEW ARRAY
        }),
      updateQuantity: (productId, newQty) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.product._id === productId ? { ...i, qty: newQty } : i
            )
            .filter((i) => i.qty > 0),
        })),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product._id !== productId),
        })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      getTotalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    }),
    { name: "cart-storage" }
  )
);
