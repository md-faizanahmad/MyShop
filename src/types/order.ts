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

// export interface Order {
//   _id: string;
//   user: string;
//   items: OrderItem[];
//   totalAmount: number;
//   status: string;
//   paymentStatus: string;
//   paymentInfo: {
//     orderId: string;
//     paymentId: string;
//   };
//   createdAt: string;
// }
// src/types/order.ts
// src/types/order.ts

// export interface ShippingAddress {
//   fullName: string;
//   phone: string;
//   street: string;
//   city: string;
//   state: string;
//   pincode: string;
//   landmark?: string;
// }

// export interface PopulatedProduct {
//   _id: string;
//   name: string;
//   price: number;
//   imageUrl: string;
// }
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
//   | "Placed"
//   | "Confirmed"
//   | "Shipped"
//   | "Out for Delivery"
//   | "Delivered"
//   | "Cancelled";

// export interface Order {
//   _id: string;
//   user: string;
//   items: OrderItem[];
//   shippingAddress: ShippingAddress;
//   totalAmount: number;
//   status: OrderStatus;
//   paymentStatus: string;
//   paymentInfo: {
//     orderId?: string;
//     paymentId?: string;
//   };
//   createdAt: string;
//   updatedAt?: string;
// }

//////////////// from old chat
// src/types/order.ts

export interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  qty: number;
  price: number;
}

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
  user: string; // userId
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentInfo: {
    orderId: string;
    paymentId: string;
  };
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt?: string;
}
