// // src/context/storeContext.ts
// import { createContext } from "react";

// export type StoreContextType = {
//   cartCount: number;
//   wishlistCount: number;
//   wishlistIds: string[];
//   refreshStore: () => Promise<void>;
//   addToWishlist: (productId: string) => Promise<void>;
//   removeFromWishlist: (productId: string) => Promise<void>;
//   addToCart: (productId: string, qty?: number) => Promise<void>;
// };

// // context-only file: no React components here (use .ts to satisfy react-refresh rule)
// export const StoreContext = createContext<StoreContextType>({
//   cartCount: 0,
//   wishlistCount: 0,
//   wishlistIds: [],
//   refreshStore: async () => {},
//   addToWishlist: async () => {},
//   removeFromWishlist: async () => {},
//   addToCart: async () => {},
// });
///////////////////////////////////////////// New Updated
import { createContext } from "react";

export type StoreContextType = {
  cartCount: number;
  wishlistCount: number;
  wishlistIds: string[];
  refreshStore: () => Promise<void>;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  addToCart: (productId: string, qty?: number) => Promise<void>;
};

export const StoreContext = createContext<StoreContextType>({
  cartCount: 0,
  wishlistCount: 0,
  wishlistIds: [],
  refreshStore: async () => {},
  addToWishlist: async () => {},
  removeFromWishlist: async () => {},
  addToCart: async () => {},
});
