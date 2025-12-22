// src/types/search.ts
export interface ProductCategory {
  slug: string;
}

export interface ProductSearchResult {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  slug: string;
}
