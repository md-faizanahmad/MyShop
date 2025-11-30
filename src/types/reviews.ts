// src/components/types.ts
export interface Review {
  _id?: string;
  user?: { name?: string };
  rating: number;
  comment: string;
  createdAt?: string;
}
