import { create } from "zustand";
import type { WishlistItem } from "../types/wishlistItem";
import type { PublicProduct } from "../types/product";
import { apiClient } from "../lib/axios";

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;

  hydrate: () => Promise<void>;
  add: (product: PublicProduct) => Promise<void>;
  remove: (productId: string) => Promise<void>;
  clear: () => Promise<void>;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [], // 🔒 ALWAYS an array
  loading: false,

  /* ---------------------------
     HYDRATE FROM BACKEND
     (AUTH SAFE, SHAPE SAFE)
  ---------------------------- */
  hydrate: async (): Promise<void> => {
    set({ loading: true });

    try {
      const res = await apiClient.get("/v1/wishlist");

      if (res.data?.success && Array.isArray(res.data.products)) {
        const mapped = res.data.products.map((product: PublicProduct) => ({
          productId: product._id,
          product,
          addedAt: new Date().toISOString(), // backend doesn’t send it
        }));

        set({ items: mapped });
      }
    } finally {
      set({ loading: false });
    }
  },

  /* ---------------------------
     ADD (OPTIMISTIC)
  ---------------------------- */
  add: async (product: PublicProduct): Promise<void> => {
    const exists = get().items.some((i) => i.productId === product._id);
    if (exists) return;

    const optimisticItem: WishlistItem = {
      productId: product._id,
      product,
      addedAt: new Date().toISOString(),
    };

    set((state) => ({
      items: [optimisticItem, ...state.items],
    }));

    try {
      await apiClient.post(`/v1/wishlist/add/${product._id}`);
    } catch {
      // rollback
      set((state) => ({
        items: state.items.filter((i) => i.productId !== product._id),
      }));
    }
  },

  /* ---------------------------
     REMOVE (OPTIMISTIC)
  ---------------------------- */
  remove: async (productId: string): Promise<void> => {
    const prev = get().items;

    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    }));

    try {
      await apiClient.delete(`/v1/wishlist/remove/${productId}`);
    } catch {
      // rollback
      set({ items: prev });
    }
  },

  /* ---------------------------
     CLEAR (USER ACTION ONLY)
  ---------------------------- */
  clear: async (): Promise<void> => {
    const prev = get().items;

    set({ items: [] });

    try {
      await Promise.all(
        prev.map((i) => apiClient.delete(`/v1/wishlist/remove/${i.productId}`))
      );
    } catch {
      set({ items: prev });
    }
  },
}));
