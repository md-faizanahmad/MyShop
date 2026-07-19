import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Category } from "../types/nav";

const API_URL = import.meta.env.VITE_API_URL;

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["public-categories-with-subs"],
    queryFn: async () => {
      const res = await axios.get<{ categories: Category[] }>(
        `${API_URL}/v1/categories?withSubs=true`,
      );

      return res.data.categories ?? [];
    },
  });
}
