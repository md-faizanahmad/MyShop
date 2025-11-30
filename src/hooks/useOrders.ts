// src/hooks/useOrders.ts
import axios from "axios";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { Order } from "../types/order";

const API = import.meta.env.VITE_API_URL;
export const PAGE_LIMIT = 2;

export type FetchResult = {
  orders: Order[];
  hasMore: boolean;
};

async function fetchOrdersPage(
  page: number,
  signal?: AbortSignal
): Promise<FetchResult> {
  const url = `${API}/api/orders/my-orders?page=${page}&limit=${PAGE_LIMIT}`;
  const { data } = await axios.get(url, {
    withCredentials: true,
    timeout: 8000,
    signal,
  });

  if (data && Array.isArray(data.orders)) {
    const orders: Order[] = data.orders;
    const hasMore =
      typeof data.hasMore === "boolean"
        ? data.hasMore
        : orders.length === PAGE_LIMIT;
    return { orders, hasMore };
  }

  if (Array.isArray(data)) {
    const all: Order[] = data;
    const start = (page - 1) * PAGE_LIMIT;
    const slice = all.slice(start, start + PAGE_LIMIT);
    const hasMore = start + PAGE_LIMIT < all.length;
    return { orders: slice, hasMore };
  }

  return { orders: [], hasMore: false };
}

/**
 * Properly typed useInfiniteQuery for v5:
 * - TQueryFnData = FetchResult (one page)
 * - TError = Error
 * - TData = InfiniteData<FetchResult> (the full infinite-data shape returned to consumers)
 * - TQueryKey = ["my-orders"]
 * - TPageParam = number
 */
export function useOrders() {
  return useInfiniteQuery<
    FetchResult, // TQueryFnData (one page)
    Error, // TError
    InfiniteData<FetchResult>, // TData (infinite data shape)
    ["my-orders"], // TQueryKey
    number // TPageParam
  >({
    queryKey: ["my-orders"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1, signal }) =>
      fetchOrdersPage(pageParam, signal),
    // getNextPageParam: (lastPage) => (lastPage.hasMore ? undefined : undefined) /* placeholder below */,
    // NOTE: we'll return a next page index in OrdersPage via hasNextPage from react-query
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
    staleTime: 60_000,
    retry: 1,
  });
}
