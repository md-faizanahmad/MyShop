export interface ReviewUser {
  _id: string;
  name: string;
}
export interface CartItem {
  productId: string;
  qty: number;
  product: PublicProduct; // REQUIRED
}

export interface Review {
  _id: string;
  user: ReviewUser;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ProductImage {
  url: string;
  publicId: string;
}

export interface PublicProduct {
  _id: string;
  slug: string;

  name: string;
  description?: string;

  price: number;
  discountPrice?: number;

  stock: number;

  imageUrl: string;
  images?: ProductImage[]; // ✅ FIXED

  offers?: string[];
  highlights?: string[];

  specifications?: Record<string, string>;

  category: {
    _id: string;
    name: string;
    slug: string;
  };

  rating?: {
    average: number;
    count: number;
  };

  reviews?: Review[];
}
