// src/types/wishlistItem.ts
import type { PublicProduct } from "./product";

export interface WishlistItem {
  productId: string;
  product: PublicProduct;
  addedAt: string; // ISO timestamp
}
