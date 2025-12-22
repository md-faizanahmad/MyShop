// src/pages/SearchResults.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";
import ProductCard from "../ProductCard";
import ProductSkeleton from "../../skeleton/ProductSkeleton";
import type { PublicProduct } from "../../types/product";

const API = import.meta.env.VITE_API_URL;
console.log(API);

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q")?.trim() || "";

  // src/pages/SearchResults.tsx - Update the React Query queryFn
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<PublicProduct[]>({
    queryKey: ["search", q],
    queryFn: async () => {
      if (!q) return [];
      // ← CHANGE THIS LINE: Use /v1/products instead of /v1/products/search
      const res = await axios.get<{ products: PublicProduct[] }>(
        `${API}/v1/products`,
        {
          params: { q, limit: 50 }, // Your getProducts handles 'q' for category search
        }
      );
      return res.data.products || [];
    },
    enabled: !!q,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (!q) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <Search size={64} className="mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold text-gray-800">
            Search for products
          </h1>
          <p className="text-gray-600 mt-3">Type something to see results</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Search Results for
          </h1>
          {/* {q} this carry query of search input */}
          <p
            className="
    text-2xl sm:text-3xl font-bold text-blue-600 mt-2
    break-all whitespace-normal max-w-full
  "
          >
            "{q}"
          </p>

          <p className="text-gray-600 mt-3">
            {isLoading
              ? "Searching..."
              : `${products.length} product${
                  products.length !== 1 ? "s" : ""
                } found`}
          </p>
        </motion.div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(10)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-600 text-xl">
              Failed to load results. Please try again.
            </p>
          </div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Search size={80} className="mx-auto text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold text-gray-800">
              No products found
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              Try searching with different keywords
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Browse All Products
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
