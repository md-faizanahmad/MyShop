import { Suspense } from "react";
// import { Link } from "react-router-dom";
import { useHome } from "../hooks/useHome";
// import ProductCard from "./ProductCard";
import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategoryQuickLinks";
// import CustomerReviews from "../components/home/CustomerReviews";
// import SimpleUGCGallery from "../components/home/SimpleUGCGallery";
import TrustBenefitsBar from "../components/home/TrustBenefitsBar";
import BrandStorySection from "../components/home/BrandStorySection";
import FeatureProducts from "../components/home/FeatureProducts";
import CustomerReviews from "../components/home/CustomerReviews";
import MobileCategoryNavbar from "../components/Navbar/MobileCategoryNavbar";
import FlashSale from "@/components/home/FlashSale";
import NewArrivals from "@/components/new-arrivals/NewArrivals";
// import FeaturedCollection from "../components/home/FeaturedCollections";

export default function Home() {
  const { data, isLoading } = useHome();

  // const hero = data?.hero ?? null;
  const heroes = data?.heroes ?? [];
  // const featuredProducts = data?.featuredProducts ?? [];
  const categories = data?.categories ?? [];
  const latestReviews = data?.latestReviews ?? [];

  return (
    <div className="min-h-screen ">
      <MobileCategoryNavbar />
      <main className="flex flex-col gap-12 md:gap-16">
        {/* <HeroSection heroes={hero} loading={isLoading} /> */}

        <HeroSection heroes={heroes} loading={isLoading} />
        {/* <MobileCategoryScroll /> */}
        <Suspense>
          <CategorySection
            categories={categories}
            loading={isLoading}
            limit={6}
          />
        </Suspense>
        {/* <FeaturedCollection /> */}
        <TrustBenefitsBar />
        <FlashSale />
        <FeatureProducts />
        <NewArrivals />
        {/* <SimpleUGCGallery /> */}
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
