// src/types/wishlist-item.ts

import type { PublicProduct } from "./product";

export interface WishlistItem {
  /** Product ID */
  productId: string;

  /** Full product snapshot at the time of adding (prevents broken links if product is deleted) */
  product: PublicProduct;

  /** When it was added to wishlist */
  addedAt: string;
}
