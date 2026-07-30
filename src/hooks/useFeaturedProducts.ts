// hooks/useFeaturedProducts.ts

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  imageUrl: string;
  category: {
    name: string;
    slug: string;
  };
}

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://api.myazstore.shop/v1/products",
      );

      return data.products as Product[];
    },
    staleTime: 1000 * 60 * 10,
  });
};
