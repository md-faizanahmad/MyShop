// export interface CartItem {
//   product: {
//     _id: string;
//     name: string;
//     price: number;
//     imageUrl: string;
//   };
//   qty: number;
// }
// src/types/cartItem.ts

import type { PublicProduct } from "./product";

// export interface CartItem {
//   product: Product;
//   qty: number;
// }
// src/types/cartItem.ts
// import type { Product } from "./product";

// export interface CartItem {
//   _id: string;
//   product: Product; // Allow null for deleted products
//   qty: number;
// }
// src/types/cart-item.ts

export interface CartItem {
  /** Unique ID for cart item (not product ID) – useful for updates/removal */
  _id: string;

  /** Full product object (for display: name, image, price, etc.) */
  product: PublicProduct;

  /** Quantity selected */
  qty: number;

  /** Optional: selected variant (size, color, etc.) */
  selectedVariant?: {
    name: string; // e.g., "Red", "XL"
    value: string; // e.g., "red", "xl"
    priceAdjustment?: number; // e.g., +₹200 for larger size
  };

  /** Timestamp when added (useful for analytics) */
  addedAt: string;
}
