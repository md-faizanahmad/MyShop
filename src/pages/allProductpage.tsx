// src/pages/AllProductsPage.tsx
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";

const API = import.meta.env.VITE_API_URL as string;

type SortKey = "latest" | "price-low" | "price-high" | "rating";

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  stock: number;
  imageUrl: string;
  slug: string;
  createdAt: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  subcategory?: {
    _id: string;
    name: string;
    slug: string;
  };
  rating: {
    average: number;
    count: number;
  };
}

export default function AllProductsPage() {
  /* -----------------------------
     Filters / Sort (LOCAL STATE)
  ----------------------------- */
  const [sort, setSort] = useState<SortKey>("latest");
  const [category, setCategory] = useState<string>("all");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  /* -----------------------------
     Fetch products
  ----------------------------- */
  const { data = [], isLoading } = useQuery<Product[]>({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axios.get<{ products: Product[] }>(
        `${API}/v1/products`
      );
      return res.data.products;
    },
  });

  /* -----------------------------
     Derived categories
  ----------------------------- */
  const categories = useMemo(() => {
    const set = new Set<string>();
    data.forEach((p) => set.add(p.category.slug));
    return Array.from(set);
  }, [data]);

  /* -----------------------------
     Filter + Sort pipeline
  ----------------------------- */
  const filteredProducts = useMemo(() => {
    let products = [...data];

    // Category filter
    if (category !== "all") {
      products = products.filter((p) => p.category.slug === category);
    }

    // Stock filter
    if (inStockOnly) {
      products = products.filter((p) => p.stock > 0);
    }

    // Sort
    switch (sort) {
      case "price-low":
        products.sort(
          (a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price)
        );
        break;

      case "price-high":
        products.sort(
          (a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price)
        );
        break;

      case "rating":
        products.sort((a, b) => b.rating.average - a.rating.average);
        break;

      case "latest":
      default:
        products.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return products;
  }, [data, category, inStockOnly, sort]);

  /* -----------------------------
     Loading
  ----------------------------- */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading products…
      </div>
    );
  }

  /* -----------------------------
     Render
  ----------------------------- */
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* TOP BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">
            All Products ({filteredProducts.length})
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="latest">Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* Stock */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              In stock only
            </label>

            <SlidersHorizontal className="text-gray-500" />
          </div>
        </div>

        {/* GRID */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No products found
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
