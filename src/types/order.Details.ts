/* ======================================
   USER ORDER TYPES (UI SAFE)
   ====================================== */

/* ---------- Order ---------- */

export interface Order {
  _id: string;
  createdAt: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  paymentInfo: PaymentInfo;
  items: OrderItemPopulated[];
  shippingAddress: ShippingAddress;
}

/* ---------- Status ---------- */

export type OrderStatus = "processing" | "shipping" | "delivered" | "cancelled";

export type PaymentStatus = "Paid" | "Pending" | "Failed";

/* ---------- Payment ---------- */

export interface PaymentInfo {
  orderId: string;
  paymentId: string;
}

/* ---------- ORDER ITEM (POPULATED) ---------- */

export interface OrderItemPopulated {
  qty: number;
  price: number; // price at purchase time
  product: OrderProduct;
}

/* ---------- PRODUCT (USER SAFE) ---------- */

export interface OrderProduct {
  _id: string;
  name: string;
  slug: string;
  thumbnail: string;
  images: ProductImage[];
  price: number;
  discountPrice?: number;
  highlights: string[];
  specifications: Record<string, string>;
}

/* ---------- PRODUCT IMAGE ---------- */

export interface ProductImage {
  url: string;
}

/* ---------- SHIPPING ---------- */

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}
