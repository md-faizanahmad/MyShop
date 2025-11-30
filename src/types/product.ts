// export interface PublicProduct {
//   _id: string;
//   name: string;
//   slug: string;
//   price: number;
//   discountPrice?: number;
//   offers?: string[];

//   imageUrl: string;
//   images?: string[];

//   description?: string;
//   stock?: number;

//   category: {
//     _id: string;
//     name: string;
//     slug: string;
//   };

//   highlights?: string[];
//   specifications?: Record<string, string>;

//   rating?: {
//     average: number;
//     count: number;
//   };

//   reviews?: any[];
// }
// export interface Review {
//   _id: string;
//   user: string;
//   name: string;
//   rating: number;
//   comment: string;
//   verified: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface PublicProduct {
//   _id: string;
//   name: string;
//   slug: string;

//   price: number;
//   discountPrice?: number;
//   offers?: string[];

//   imageUrl: string;
//   images?: string[];

//   description?: string;
//   stock?: number;

//   highlights?: string[];
//   specifications?: Record<string, string>;

//   category: {
//     _id: string;
//     name: string;
//     slug: string;
//   };

//   rating?: {
//     average: number;
//     count: number;
//   };

//   reviews?: Review[];
// }
export interface ReviewUser {
  _id: string;
  name: string;
}

export interface Review {
  _id: string;
  user: ReviewUser;
  rating: number;
  comment: string;
  createdAt: string;
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
  images?: string[];

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
