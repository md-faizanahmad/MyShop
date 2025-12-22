// import { create } from "zustand";
// import type { CartItem } from "../types/cartItem";
// import type { PublicProduct } from "../types/product";
// import { apiClient } from "../lib/axios";

// interface CartState {
//   items: CartItem[];
//   loading: boolean;
//   count: number; // 🔑 header-safe

//   hydrate: () => Promise<void>;
//   addItem: (product: PublicProduct, qty?: number) => Promise<void>;
//   updateQty: (productId: string, qty: number) => Promise<void>;
//   removeItem: (productId: string) => Promise<void>;
//   clear: () => void;

//   getTotalPrice: () => number;
// }

// export const useCartStore = create<CartState>((set, get) => ({
//   items: [],
//   loading: false,
//   count: 0,

//   /* ---------------------------
//      HYDRATE (SAFE)
//   ---------------------------- */
//   hydrate: async (): Promise<void> => {
//     set({ loading: true });

//     try {
//       const res = await apiClient.get("/v1/cart");

//       if (res.data?.success && Array.isArray(res.data.items)) {
//         set({
//           items: res.data.items,
//           count: res.data.items.reduce(
//             (sum: number, i: CartItem) => sum + i.qty,
//             0
//           ),
//         });
//       }
//       // ❗ do NOT clear on failure
//     } finally {
//       set({ loading: false });
//     }
//   },

//   /* ---------------------------
//      ADD (OPTIMISTIC)
//   ---------------------------- */
//   addItem: async (product: PublicProduct, qty = 1): Promise<void> => {
//     const existing = get().items.find((i) => i.product._id === product._id);

//     if (existing) {
//       await get().updateQty(product._id, existing.qty + qty);
//       return;
//     }

//     const optimistic: CartItem = { product, qty };

//     set((state) => ({
//       items: [...state.items, optimistic],
//       count: state.count + qty,
//     }));

//     try {
//       await apiClient.post("/v1/cart/add", {
//         productId: product._id,
//         qty,
//       });
//     } catch {
//       set((state) => ({
//         items: state.items.filter((i) => i.product._id !== product._id),
//         count: state.count - qty,
//       }));
//     }
//   },

//   /* ---------------------------
//      UPDATE QTY
//   ---------------------------- */
//   updateQty: async (productId: string, qty: number): Promise<void> => {
//     if (qty < 1) return;

//     const prev = get().items;
//     const prevItem = prev.find((i) => i.product._id === productId);
//     if (!prevItem) return;

//     const diff = qty - prevItem.qty;

//     set((state) => ({
//       items: state.items.map((i) =>
//         i.product._id === productId ? { ...i, qty } : i
//       ),
//       count: state.count + diff,
//     }));

//     try {
//       await apiClient.put("/v1/cart/update", {
//         productId,
//         qty,
//       });
//     } catch {
//       set({
//         items: prev,
//         count: prev.reduce((sum, i) => sum + i.qty, 0),
//       });
//     }
//   },

//   /* ---------------------------
//      REMOVE
//   ---------------------------- */
//   removeItem: async (productId: string): Promise<void> => {
//     const prev = get().items;
//     const removed = prev.find((i) => i.product._id === productId);

//     if (!removed) return;

//     set((state) => ({
//       items: state.items.filter((i) => i.product._id !== productId),
//       count: state.count - removed.qty,
//     }));

//     try {
//       await apiClient.delete(`/v1/cart/remove/${productId}`);
//     } catch {
//       set({
//         items: prev,
//         count: prev.reduce((sum, i) => sum + i.qty, 0),
//       });
//     }
//   },

//   /* ---------------------------
//      CLEAR (LOCAL)
//   ---------------------------- */
//   clear: (): void => {
//     set({ items: [], count: 0 });
//   },

//   /* ---------------------------
//      TOTAL PRICE
//   ---------------------------- */
//   getTotalPrice: (): number =>
//     get().items.reduce((sum, i) => sum + i.qty * i.product.price, 0),
// }));

////////////////////////// update with clear cart
import { create } from "zustand";
import type { CartItem } from "../types/cartItem";
import type { PublicProduct } from "../types/product";
import { apiClient } from "../lib/axios";

interface CartState {
  items: CartItem[];
  loading: boolean;

  hydrate: () => Promise<void>;
  addItem: (product: PublicProduct, qty?: number) => Promise<void>;
  updateQty: (productId: string, qty: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clear: () => Promise<void>;

  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: false,

  /* ---------------------------
     HYDRATE
  ---------------------------- */
  hydrate: async () => {
    set({ loading: true });

    try {
      const res = await apiClient.get("/v1/cart");

      if (res.data?.success && Array.isArray(res.data.items)) {
        set({ items: res.data.items });
      }
    } finally {
      set({ loading: false });
    }
  },

  /* ---------------------------
     ADD ITEM (OPTIMISTIC)
  ---------------------------- */
  addItem: async (product, qty = 1) => {
    const existing = get().items.find((i) => i.product._id === product._id);

    if (existing) {
      await get().updateQty(product._id, existing.qty + qty);
      return;
    }

    const optimistic: CartItem = { product, qty };

    set((state) => ({
      items: [...state.items, optimistic],
    }));

    try {
      await apiClient.post("/v1/cart/add", {
        productId: product._id,
        qty,
      });
    } catch {
      set((state) => ({
        items: state.items.filter((i) => i.product._id !== product._id),
      }));
    }
  },

  /* ---------------------------
     UPDATE QTY
  ---------------------------- */
  updateQty: async (productId, qty) => {
    if (qty < 1) return;

    const prev = get().items;

    set({
      items: prev.map((i) => (i.product._id === productId ? { ...i, qty } : i)),
    });

    try {
      await apiClient.put("/v1/cart/update", { productId, qty });
    } catch {
      set({ items: prev });
    }
  },

  /* ---------------------------
     REMOVE ITEM
  ---------------------------- */
  removeItem: async (productId) => {
    const prev = get().items;

    set({
      items: prev.filter((i) => i.product._id !== productId),
    });

    try {
      await apiClient.delete(`/v1/cart/remove/${productId}`);
    } catch {
      set({ items: prev });
    }
  },

  /* ---------------------------
     CLEAR CART (OPTIMISTIC)
  ---------------------------- */
  clear: async () => {
    const prev = get().items;

    // instant UI update
    set({ items: [] });

    try {
      await Promise.all(
        prev.map((i) => apiClient.delete(`/v1/cart/remove/${i.product._id}`))
      );
    } catch {
      // rollback
      set({ items: prev });
    }
  },

  /* ---------------------------
     TOTAL PRICE
  ---------------------------- */
  getTotalPrice: () =>
    get().items.reduce((sum, i) => sum + i.qty * i.product.price, 0),
}));
