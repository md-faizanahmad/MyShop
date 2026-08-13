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
    badgeClass: "bg-blue-50 text-blue-700 border-blue-100",
  },

  Laptops: {
    icon: <Laptop size={13} />,
    badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-100",
  },

  Electronics: {
    icon: <Tv size={13} />,
    badgeClass: "bg-amber-50 text-amber-700 border-amber-100",
  },
};

const sectionClass =
  "overflow-hidden bg-slate-50/50 py-8 px-4 antialiased sm:py-10";

const containerClass = "mx-auto w-full max-w-6xl";

const headerClass = "mb-5 flex items-center justify-between sm:mb-6";

const titleWrapClass = "flex min-w-0 items-center gap-2.5";

const titleIconClass =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 text-red-500 shadow-sm";

const titleClass =
  "text-[17px] font-bold tracking-tight text-slate-900 sm:text-lg";

const desktopSubtitleClass =
  "hidden text-xs font-medium text-slate-500 md:block";

const controlsClass = "flex items-center gap-1.5 md:hidden";

const controlButtonClass =
  "flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-transform active:scale-95";

const mobileSliderClass = "relative block w-full md:hidden";

const progressTrackClass =
  "mb-4 h-0.5 w-full overflow-hidden rounded-full bg-slate-200";

const progressBarClass = "h-full bg-gradient-to-r from-sky-500 to-red-500";

const mobileStageClass =
  "relative flex min-h-[390px] w-full items-center justify-center sm:min-h-[420px]";

const paginationClass = "mt-4 flex items-center justify-center gap-1.5";

const desktopGridClass = "hidden grid-cols-3 gap-5 md:grid lg:gap-6";

const fallbackConfig = {
  icon: <Smartphone size={13} />,
  badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
};

export default function TechPromoBanners() {
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
    <section className={sectionClass}>
      <div className={containerClass}>
        {/* Section Header */}
        <div className={headerClass}>
          <div className={titleWrapClass}>
            <span className={titleIconClass}>
              <Sparkles size={15} />
            </span>

            <h2 className={titleClass}>Featured Collections</h2>
          </div>

          {/* Mobile Controls */}
          <div className={controlsClass}>
            <button
              type="button"
              onClick={handlePrev}
              className={controlButtonClass}
              aria-label="Previous card"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className={controlButtonClass}
              aria-label="Next card"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <p className={desktopSubtitleClass}>
            Handpicked tech worth exploring
          </p>
        </div>

        {/* ================= MOBILE ================= */}
        <div
          className={mobileSliderClass}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Progress */}
          <div className={progressTrackClass}>
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
              className={progressBarClass}
            />
          </div>

          {/* Slider */}
          <div className={mobileStageClass}>
            <AnimatePresence mode="wait">
              {featuredProducts.map((product, index) => {
                if (index !== activeIndex) {
                  return null;
                }

                const config =
                  categoryConfig[product.category.name] || fallbackConfig;

                return (
                  <motion.div
                    key={product._id}
                    initial={{
                      opacity: 0,
                      x: 45,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -45,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    drag="x"
                    dragConstraints={{
                      left: 0,
                      right: 0,
                    }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -40) {
                        handleNext();
                      }

                      if (info.offset.x > 40) {
                        handlePrev();
                      }
                    }}
                    className="absolute inset-0 touch-pan-y"
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
          <div className={paginationClass}>
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-6 bg-slate-900"
                    : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className={desktopGridClass}>
          {featuredProducts.map((product, index) => {
            const config =
              categoryConfig[product.category.name] || fallbackConfig;

            return (
              <div key={product._id} className="group">
                <FeaturedCollectionCard
                  product={product}
                  config={config}
                  index={index}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
