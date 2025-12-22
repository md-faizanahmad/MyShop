export interface Address {
  _id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault?: boolean;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}
