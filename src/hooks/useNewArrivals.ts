import { useEffect, useState } from "react";
import type { PublicProduct } from "@/types/product";

const PRODUCTS_API = "https://api.myazstore.shop/v1/products";

interface UseNewArrivalsOptions {
  days?: number;
  limit?: number;
}

interface UseNewArrivalsReturn {
  products: PublicProduct[];
  loading: boolean;
  error: string | null;
}

export function useNewArrivals({
  days = 60,
  limit,
}: UseNewArrivalsOptions = {}): UseNewArrivalsReturn {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(PRODUCTS_API);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: { products: PublicProduct[] } = await response.json();

        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        const newArrivals = data.products
          .filter((product) => {
            const createdAt = new Date(product.createdAt);

            return (
              !Number.isNaN(createdAt.getTime()) && createdAt >= cutoffDate
            );
          })
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );

        const result =
          typeof limit === "number" ? newArrivals.slice(0, limit) : newArrivals;

        if (!cancelled) {
          setProducts(result);
        }
      } catch (err) {
        console.error("Failed to load new arrivals:", err);

        if (!cancelled) {
          setProducts([]);
          setError(
            err instanceof Error ? err.message : "Failed to load new arrivals",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchNewArrivals();

    return () => {
      cancelled = true;
    };
  }, [days, limit]);

  return {
    products,
    loading,
    error,
  };
}
