// src/types/home.ts
import type { PublicProduct } from "./product";

export interface HomeHeroLiveBadge {
  enabled: boolean;
  text: string;
}

export interface HomeHeroCTA {
  text: string;
  link: string;
}

export interface HomeHero {
  _id: string;
  liveBadge?: HomeHeroLiveBadge;
  headline: string;
  gradientHeadline: string;
  subheadline: string;
  primaryCTA: HomeHeroCTA;
  secondaryCTA?: HomeHeroCTA;
  saleBadge?: HomeHeroLiveBadge;

  // backgroundImage?: string;
  backgroundImage?: string;
  mobileBackgroundImage?: string;

  isActive: boolean;
  startAt: string | null;
  endAt: string | null;
  sortOrder: number;
}

export interface HomeCategory {
  _id: string;
  name: string;
  slug: string;
  image: string | null;
  subcategories: {
    _id: string;
    name: string;
    slug: string;
    image: string | null;
    isDeleted: boolean;
  }[];
}

export interface HomeReview {
  user: string;
  name: string;
  rating: number;
  comment: string;
  verified: boolean;
  createdAt: string;
  productId: string;
  productName: string;
  productSlug: string;
}

export interface HomeResponse {
  // hero: HomeHero | null;
  heroes: HomeHero[];
  featuredProducts: PublicProduct[];
  categories: HomeCategory[];
  latestReviews: HomeReview[];
}
