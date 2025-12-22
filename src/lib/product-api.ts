// src/lib/product-api.ts
import api from "./axios";
import type { PublicProduct } from "../types/product";

/**
 * Product API helpers
 * - all functions are fully typed, return explicit shapes
 * - uses the global api instance (withCredentials true)
 */

export interface ListProductsParams {
  ids?: string[];
  page?: number;
  perPage?: number;
  q?: string;
  category?: string;
}

export async function getProduct(productId: string): Promise<PublicProduct> {
  const res = await api.get<PublicProduct>(
    `/v1/products/${encodeURIComponent(productId)}`
  );
  return res.data;
}

export async function listProducts(
  params?: ListProductsParams
): Promise<PublicProduct[]> {
  const query = new URLSearchParams();
  if (params?.ids && params.ids.length > 0) {
    // backend may accept comma-separated ids
    query.set("ids", params.ids.join(","));
  }
  if (params?.page) query.set("page", String(params.page));
  if (params?.perPage) query.set("perPage", String(params.perPage));
  if (params?.q) query.set("q", params.q);
  if (params?.category) query.set("category", params.category);

  const path = query.toString()
    ? `/v1/products?${query.toString()}`
    : "/v1/products";
  const res = await api.get<PublicProduct[]>(path);
  return res.data;
}

/**
 * Bulk fetch by ids: best-effort; preserve ordering of input ids in output.
 */
export async function listProductsByIds(
  ids: string[]
): Promise<PublicProduct[]> {
  if (ids.length === 0) return [];
  // Prefer server-supported bulk endpoint; fallback to parallel requests if needed.
  try {
    // If backend supports ?ids=1,2,3
    const res = await listProducts({ ids });
    // Map results back to the input order
    const map = new Map<string, PublicProduct>();
    for (const p of res) map.set(p._id, p);
    return ids
      .map((id) => map.get(id))
      .filter((p): p is PublicProduct => p !== undefined);
  } catch {
    // fallback: parallel requests
    const promises = ids.map((id) => getProduct(id));
    const results = await Promise.all(promises);
    return results;
  }
}
export default { getProduct, listProducts, listProductsByIds };
