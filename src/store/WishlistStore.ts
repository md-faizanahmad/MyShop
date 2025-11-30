// src/store/WishlistStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PublicProduct } from "../types/product";

interface WishlistState {
  items: PublicProduct[];
  toggle: (product: PublicProduct) => void;
  remove: (productId: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],

      toggle: (product) =>
        set((state) => {
          const exists = state.items.some((i) => i._id === product._id);
          if (exists) {
            // Remove
            return {
              items: state.items.filter((i) => i._id !== product._id), // ← NEW ARRAY
            };
          }
          // Add
          return {
            items: [...state.items, product], // ← NEW ARRAY
          };
        }),

      remove: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i._id !== productId), // ← NEW ARRAY
        })),

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage",
    }
  )
);
