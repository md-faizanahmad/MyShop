// src/pages/Home.tsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import HeroSection from "../components/HeroSection";
import CategorySection from "../shared/CategoryQuickLinks";
import CustomerReviews from "../shared/CustomerReviews";
import SimpleUGCGallery from "../shared/SimpleUGCGallery";
import type { PublicProduct } from "../types/product";

const API = import.meta.env.VITE_API_URL;

export default function Home() {
  // Fetch Categories

  // Fetch Featured Products
  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: ["home-products"],
    queryFn: async () => {
      const res = await axios.get<{ products: PublicProduct[] }>(
        `${API}/api/products?limit=8&sort=-createdAt`
      );
      return res.data.products;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <HeroSection />

      {/* CATEGORY QUICK LINKS */}
      <CategorySection />

      <CustomerReviews />
      {/* FEATURED PRODUCTS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="text-purple-600 font-semibold hover:underline text-lg hidden sm:block"
            >
              View All →
            </Link>
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array(8)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="space-y-4">
                    <div className="bg-gray-200 rounded-2xl aspect-square animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                  </div>
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          <SimpleUGCGallery />
          {/* Mobile View All Button */}
          <div className="mt-10 text-center sm:hidden">
            <Link
              to="/products"
              className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Optional: Add UGC Gallery, Reviews, etc. later */}
    </div>
  );
}
