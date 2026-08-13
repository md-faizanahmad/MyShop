export interface FeaturedProduct {
  _id: string;
  slug: string;
  name: string;
  imageUrl: string;
  category: {
    name: string;
    slug: string;
  };
}
