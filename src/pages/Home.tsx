import { Suspense } from "react";
import { Link } from "react-router-dom";
import { useHome } from "../hooks/useHome";
import ProductCard from "./ProductCard";
import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategoryQuickLinks";
// import CustomerReviews from "../components/home/CustomerReviews";
import SimpleUGCGallery from "../components/home/SimpleUGCGallery";
import TrustBenefitsBar from "../components/home/TrustBenefitsBar";
import BrandStorySection from "../components/home/BrandStorySection";

export default function Home() {
  const { data, isLoading } = useHome();

  const hero = data?.hero ?? null;
  const featuredProducts = data?.featuredProducts ?? [];
  const categories = data?.categories ?? [];
  // const latestReviews = data?.latestReviews ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex flex-col gap-12 md:gap-16">
        <HeroSection hero={hero} loading={isLoading} />

        <Suspense>
          <CategorySection
            categories={categories}
            loading={isLoading}
            limit={6}
          />
        </Suspense>

        <TrustBenefitsBar />

        {/* Featured Products */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Featured Products
              </h2>

              <Link
                to="/products"
                aria-label="View all products"
                className="text-purple-600 font-semibold hover:underline text-sm sm:text-base  sm:inline-flex"
              >
                View All →
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <div className="bg-gray-200 rounded-2xl aspect-square animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                  </div>
                ))}
              </div>
            ) : (
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <li key={product._id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <SimpleUGCGallery />

        {/* Map backend reviews into your component format */}
        {/* <CustomerReviews
          reviews={latestReviews.map((r) => ({
            id: `${r.productId}-${r.user}`,
            name: r.name,
            rating: r.rating,
            comment: r.comment,
            dateISO: r.createdAt,
            date: new Date(r.createdAt).toLocaleDateString(),
            verified: r.verified,
            city: "", // optional
          }))}
        /> */}

        <BrandStorySection />
      </main>
    </div>
  );
}
