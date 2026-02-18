import { Suspense } from "react";
// import { Link } from "react-router-dom";
import { useHome } from "../hooks/useHome";
// import ProductCard from "./ProductCard";
import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategoryQuickLinks";
// import CustomerReviews from "../components/home/CustomerReviews";
import SimpleUGCGallery from "../components/home/SimpleUGCGallery";
import TrustBenefitsBar from "../components/home/TrustBenefitsBar";
import BrandStorySection from "../components/home/BrandStorySection";
import FeatureProducts from "../components/home/FeatureProducts";
import CustomerReviews from "../components/home/CustomerReviews";
import TechPromoBanners from "../components/home/TechPromoBanners";
import MobileCategoryScroll from "../components/home/MobileScrollNav";

export default function Home() {
  const { data, isLoading } = useHome();

  const hero = data?.hero ?? null;
  // const featuredProducts = data?.featuredProducts ?? [];
  const categories = data?.categories ?? [];
  const latestReviews = data?.latestReviews ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex flex-col gap-12 md:gap-16">
        <HeroSection hero={hero} loading={isLoading} />
        <MobileCategoryScroll />
        <Suspense>
          <CategorySection
            categories={categories}
            loading={isLoading}
            limit={6}
          />
        </Suspense>

        <TrustBenefitsBar />
        {/* <FlashSale /> */}
        <TechPromoBanners />
        {/* Featured Products */}
        <FeatureProducts />

        <SimpleUGCGallery />

        {/* Map backend reviews into your component format */}
        <CustomerReviews
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
        />

        <BrandStorySection />
      </main>
    </div>
  );
}
