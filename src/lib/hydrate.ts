// // src/lib/hydrate.ts
// import type { CartItem } from "../store/CartStore";
// import type { WishlistItem } from "../store/WishlistStore";
// import type { PublicProduct } from "../types/product";
// import { listProductsByIds } from "./product-api";

// /**
//  * Types for hydrated items returned to UI
//  */
// export interface CartItemWithProduct {
//   cartItem: CartItem;
//   product: PublicProduct | null;
// }

// export interface WishlistItemWithProduct {
//   wishlistItem: WishlistItem;
//   product: PublicProduct | null;
// }

// /**
//  * Hydrate cart items with product details.
//  * - Preserves input order.
//  * - Returns product|null when fetch fails for a product.
//  */
// export async function hydrateCartItems(
//   items: CartItem[]
// ): Promise<CartItemWithProduct[]> {
//   const ids = items.map((i) => i.productId);
//   const products = await listProductsByIds(ids);
//   const productMap = new Map<string, PublicProduct>();
//   for (const p of products) productMap.set(p._id, p);

//   return items.map((ci) => ({
//     cartItem: ci,
//     product: productMap.get(ci.productId) ?? null,
//   }));
// }

// /**
//  * Hydrate wishlist items with product details.
//  */
// export async function hydrateWishlistItems(
//   items: WishlistItem[]
// ): Promise<WishlistItemWithProduct[]> {
//   const ids = items.map((i) => i.productId);
//   const products = await listProductsByIds(ids);
//   const productMap = new Map<string, PublicProduct>();
//   for (const p of products) productMap.set(p._id, p);

//   return items.map((wi) => ({
//     wishlistItem: wi,
//     product: productMap.get(wi.productId) ?? null,
//   }));
// }
