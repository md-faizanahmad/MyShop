import { useEffect, useState } from "react";
import {
  Laptop,
  Smartphone,
  Sparkles,
  Tv,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useFeaturedProducts } from "../../hooks/useFeaturedProducts";
import FeaturedCollectionCard from "./FeaturedCollection/FeaturedCollectionCard";

const categoryConfig: Record<
  string,
  {
    icon: React.ReactNode;
    badgeClass: string;
  }
> = {
  Smartphone: {
    icon: <Smartphone size={13} />,
    badgeClass: "bg-red-50 text-red-600",
  },

  Laptops: {
    icon: <Laptop size={13} />,
    badgeClass: "bg-blue-50 text-blue-600",
  },

  Electronics: {
    icon: <Tv size={13} />,
    badgeClass: "bg-amber-50 text-amber-600",
  },
};

const fallbackConfig = {
  icon: <Smartphone size={13} />,
  badgeClass: "bg-zinc-100 text-zinc-600",
};

export default function FeaturedCollections() {
  const { data: products = [], isLoading } = useFeaturedProducts();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /*
   * Keep the first product from each category.
   * Existing product fields and logic remain unchanged.
   */
  const featuredProducts = Object.values(
    products.reduce(
      (acc, product) => {
        const categoryName = product.category.name;

        if (!acc[categoryName]) {
          acc[categoryName] = product;
        }

        return acc;
      },
      {} as Record<string, (typeof products)[number]>,
    ),
  );

  const total = featuredProducts.length;

  useEffect(() => {
    if (total === 0 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);

    return () => clearInterval(interval);
  }, [total, isPaused]);

  if (isLoading || total === 0) {
    return null;
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <section
      aria-labelledby="featured-collections-heading"
      className="py-6 sm:py-8 lg:py-10"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}
        <header className="mb-4 flex items-end justify-between gap-4 sm:mb-5">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-1.5">
              <Sparkles aria-hidden="true" className="size-3.5 text-red-500" />

              <span className="text-[11px] font-semibold text-red-600 sm:text-xs">
                Curated for you
              </span>
            </div>

            <h2
              id="featured-collections-heading"
              className="
                text-lg font-bold
                leading-tight tracking-tight
                text-zinc-900
                sm:text-xl
                lg:text-2xl
              "
            >
              Featured Collections
            </h2>
          </div>

          {/* Mobile controls */}
          <div className="flex shrink-0 items-center gap-1.5 md:hidden">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous collection"
              className="
                flex size-8 items-center justify-center
                rounded-full
                border border-zinc-200
                bg-white
                text-zinc-600
                transition-colors
                hover:bg-zinc-50
                active:scale-95
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-red-500
                focus-visible:ring-offset-2
              "
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next collection"
              className="
                flex size-8 items-center justify-center
                rounded-full
                border border-zinc-200
                bg-white
                text-zinc-600
                transition-colors
                hover:bg-zinc-50
                active:scale-95
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-red-500
                focus-visible:ring-offset-2
              "
            >
              <ChevronRight aria-hidden="true" className="size-4" />
            </button>
          </div>

          {/* Desktop description */}
          <p className="hidden text-sm text-zinc-500 md:block">
            Explore popular categories
          </p>
        </header>

        {/* =====================================================
            MOBILE
        ====================================================== */}
        <div
          className="md:hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Small progress indicator */}
          <div className="mb-4 h-px overflow-hidden bg-zinc-100">
            <motion.div
              key={activeIndex}
              initial={{ width: "0%" }}
              animate={{
                width: isPaused ? "0%" : "100%",
              }}
              transition={{
                duration: 4.5,
                ease: "linear",
              }}
              className="h-full bg-red-500"
            />
          </div>

          {/* Mobile card */}
          <div className="relative min-h-[350px] w-full">
            <AnimatePresence mode="wait">
              {featuredProducts.map((product, index) => {
                if (index !== activeIndex) return null;

                const config =
                  categoryConfig[product.category.name] || fallbackConfig;

                return (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{
                      duration: 0.22,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0"
                  >
                    <FeaturedCollectionCard
                      product={product}
                      config={config}
                      mobile
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {total > 1 && (
            <div className="mt-4 flex items-center justify-center gap-1.5">
              {featuredProducts.map((product, index) => (
                <button
                  key={product._id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to ${product.category.name} collection`}
                  aria-current={index === activeIndex}
                  className={`
                    h-1.5 rounded-full
                    transition-all duration-200
                    ${
                      index === activeIndex
                        ? "w-5 bg-zinc-900"
                        : "w-1.5 bg-zinc-300"
                    }
                  `}
                />
              ))}
            </div>
          )}
        </div>

        {/* =====================================================
            DESKTOP / LAPTOP
        ====================================================== */}
        <div className="hidden grid-cols-3 gap-4 md:grid lg:gap-5">
          {featuredProducts.map((product, index) => {
            const config =
              categoryConfig[product.category.name] || fallbackConfig;

            return (
              <FeaturedCollectionCard
                key={product._id}
                product={product}
                config={config}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
