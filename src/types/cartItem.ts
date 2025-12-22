// // src/types/cart-item.ts

// import type { PublicProduct } from "./product";

// export interface CartItem {
//   /** Unique ID for the cart entry (NOT the product ID) */
//   _id: string;

//   /** Full product object */
//   product: PublicProduct; // <-- ALWAYS required

//   /** Quantity */
//   qty: number;

//   /** Optional variant */
//   selectedVariant?: {
//     name: string;
//     value: string;
//     priceAdjustment?: number;
//   };

//   /** Timestamp */
//   addedAt: string;
// }// src/types/cartItem.ts
import type { PublicProduct } from "./product";

export interface CartItem {
  product: PublicProduct;
  qty: number;
}
