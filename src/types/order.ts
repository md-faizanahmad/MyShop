// // src/types/order.ts

// export interface OrderItem {
//   product: {
//     _id: string;
//     name: string;
//     price: number;
//     imageUrl: string;
//   };
//   qty: number;
//   price: number;
// }

// export type OrderStatus =
//   | "placed"
//   | "processing"
//   | "shipping"
//   | "delivered"
//   | "cancelled";

// export type PaymentStatus = "Paid" | "Unpaid";

// export interface ShippingAddress {
//   fullName: string;
//   phone: string;
//   street: string;
//   city: string;
//   state: string;
//   pincode: string;
//   landmark?: string;
// }

// export interface Order {
//   _id: string;
//   user: string; // userId
//   items: OrderItem[];
//   totalAmount: number;
//   status: OrderStatus;
//   paymentStatus: PaymentStatus;
//   paymentInfo: {
//     orderId: string;
//     paymentId: string;
//   };
//   shippingAddress: ShippingAddress;
//   createdAt: string;
//   updatedAt?: string;
// }
// src/types/order.ts

// export interface OrderItemPopulated {
//   product: {
//     _id: string;
//     name: string;
//     price: number;
//     imageUrl: string;
//   };
//   qty: number;
//   price: number;
// }

// export interface OrderItemFlat {
//   productId: string;
//   productName: string;
//   productImage: string;
//   qty: number;
//   price: number;
// }

// export type OrderItem = OrderItemPopulated | OrderItemFlat;

// export type OrderStatus =
//   | "placed"
//   | "processing"
//   | "shipping"
//   | "delivered"
//   | "cancelled";

// export type PaymentStatus = "Paid" | "Unpaid";

// export interface ShippingAddress {
//   fullName: string;
//   phone: string;
//   street: string;
//   city: string;
//   state: string;
//   pincode: string;
//   landmark?: string;
// }

// export interface Order {
//   _id: string;
//   user: string;
//   items: OrderItem[];
//   totalAmount: number;
//   status: OrderStatus;
//   paymentStatus: PaymentStatus;
//   paymentInfo: {
//     orderId: string;
//     paymentId: string;
//   };
//   shippingAddress: ShippingAddress;
//   createdAt: string;
//   updatedAt?: string;
// }

//// update after order details pag
// src/types/order.ts

/* ---------------------------------
   PRODUCT (minimal)
---------------------------------- */
export interface OrderProduct {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

/* ---------------------------------
   ORDER ITEM - POPULATED
   (used in OrderDetails page)
---------------------------------- */
export interface OrderItemPopulated {
  product: OrderProduct;
  qty: number;
  price: number;
}

/* ---------------------------------
   ORDER ITEM - FLAT
   (used in admin / list APIs)
---------------------------------- */
export interface OrderItemFlat {
  productId: string;
  productName: string;
  productImage: string;
  qty: number;
  price: number;
}

/* ---------------------------------
   UNION (API reality)
---------------------------------- */
export type OrderItem = OrderItemPopulated | OrderItemFlat;

/* ---------------------------------
   OTHER TYPES
---------------------------------- */
export type OrderStatus =
  | "placed"
  | "processing"
  | "shipping"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "Paid" | "Unpaid";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentInfo: {
    orderId: string;
    paymentId: string;
    signature?: string; // ✅ ADD THIS (optional, safe)
  };
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt?: string;
}
export interface PaginatedOrdersResponse {
  orders: Order[];
  page: number;
  limit: number;
  totalCount: number;
  hasMore: boolean;
}
