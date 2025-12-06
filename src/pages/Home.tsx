// src/pages/Home.tsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategoryQuickLinks";
import CustomerReviews from "../components/home/CustomerReviews";
import SimpleUGCGallery from "../components/home/SimpleUGCGallery";
import type { PublicProduct } from "../types/product";
import TrustBenefitsBar from "../components/home/TrustBenefitsBar";
import BrandStorySection from "../components/home/BrandStorySection";

const API = import.meta.env.VITE_API_URL as string;

export default function Home() {
  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: ["home-products"],
    queryFn: async () => {
      const res = await axios.get<{ products: PublicProduct[] }>(
        `${API}/v1/products?limit=8&sort=-createdAt`
      );
      return res.data.products;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex flex-col gap-12 md:gap-16">
        {/* HERO */}
        <HeroSection />

        {/* CATEGORY QUICK LINKS */}
        <CategorySection />

        {/* TRUST / BENEFITS BAR */}
        <TrustBenefitsBar />

        {/* FEATURED PRODUCTS */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Featured Products
              </h2>
              <Link
                to="/products"
                className="text-purple-600 font-semibold hover:underline text-sm sm:text-base hidden sm:block"
              >
                View All →
              </Link>
            </div>

            {loadingProducts ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }, (_, i) => (
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

            {/* Mobile View All Button */}
            <div className="mt-8 text-center sm:hidden">
              <Link
                to="/products"
                className="inline-block bg-black text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* UGC GALLERY (social proof / lifestyle) */}
        <SimpleUGCGallery />

        {/* CUSTOMER REVIEWS */}
        <CustomerReviews />

        {/* BRAND STORY */}
        <BrandStorySection />
      </main>
    </div>
  );
}
