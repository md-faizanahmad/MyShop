import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { HomeResponse } from "../types/home";

const API = import.meta.env.VITE_API_URL;

export function useHome() {
  return useQuery<HomeResponse>({
    queryKey: ["home"],
    queryFn: async () => {
      const res = await axios.get<{ data: HomeResponse }>(`${API}/v1/home`);
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
