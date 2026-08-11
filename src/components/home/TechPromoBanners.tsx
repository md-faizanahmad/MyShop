// import { Link } from "react-router-dom";
// import { ArrowRight, Laptop, Smartphone, Tv } from "lucide-react";
// import { motion } from "framer-motion";
// import { useFeaturedProducts } from "../../hooks/useFeaturedProducts";

// const categoryIcons: Record<string, React.ReactNode> = {
//   Smartphone: <Smartphone size={12} />,
//   Laptops: <Laptop size={12} />,
//   Electronics: <Tv size={12} />,
// };

// export default function TechPromoBanners() {
//   const { data: products = [], isLoading } = useFeaturedProducts();

//   // Keep the first product from each category
//   const featuredProducts = Object.values(
//     products.reduce(
//       (acc, product) => {
//         const categoryName = product.category.name;

//         if (!acc[categoryName]) {
//           acc[categoryName] = product;
//         }

//         return acc;
//       },
//       {} as Record<string, (typeof products)[number]>,
//     ),
//   );

//   if (isLoading) return null;

//   return (
//     <section className="py-12 px-4 antialiased">
//       <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
//         {featuredProducts.map((product, index) => (
//           <motion.div
//             key={product._id}
//             initial={{ opacity: 0, scale: 0.99 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: index * 0.05, duration: 0.3 }}
//             className="group flex flex-col justify-between bg-white p-5 transition-colors hover:border hover:border-neutral-300"
//           >
//             {/* Top */}
//             <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
//               <div className="flex items-center gap-1.5 text-neutral-400">
//                 {categoryIcons[product.category.name]}
//                 <span className="text-[10px] font-mono tracking-wider uppercase font-medium">
//                   {product.category.name}
//                 </span>
//               </div>

//               <span className="text-[10px] font-mono text-neutral-300">
//                 {String(index + 1).padStart(2, "0")}
//               </span>
//             </div>

//             {/* Image */}
//             <div className="my-1 aspect-video w-full overflow-hidden  flex items-center justify-center p-6 border border-neutral-100">
//               <img
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="max-h-full max-w-full object-contain mix-blend-darken transition-transform duration-500 group-hover:scale-105"
//               />
//             </div>

//             {/* Bottom */}
//             <div className="flex items-end justify-between gap-4 pt-2">
//               <div>
//                 <h3 className="text-base font-semibold tracking-tight text-neutral-900">
//                   {product.name}
//                 </h3>

//                 <p className="text-xs text-neutral-400">
//                   {product.category.name}
//                 </p>
//               </div>

//               <Link
//                 to={`/category/${product.category.slug}/product/${product.slug}`}
//                 className="inline-flex h-8 items-center gap-2 bg-neutral-900 px-3 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
//               >
//                 <span>View Details</span>

//                 <ArrowRight
//                   size={12}
//                   className="transition-transform group-hover:translate-x-0.5"
//                 />
//               </Link>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

////////////////////////////////01082026 update
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Laptop,
  Smartphone,
  Tv,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFeaturedProducts } from "../../hooks/useFeaturedProducts";

// Clean e-commerce category themes
const categoryConfig: Record<
  string,
  { icon: React.ReactNode; badgeClass: string }
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

export default function TechPromoBanners() {
  const { data: products = [], isLoading } = useFeaturedProducts();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Keep the first product from each category
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

  // Auto-play timer for mobile slider
  useEffect(() => {
    if (total === 0 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);

    return () => clearInterval(interval);
  }, [total, isPaused]);

  if (isLoading || total === 0) return null;

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  return (
    <section className="py-10 px-4 antialiased bg-slate-50/60 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-linear-to-br from-sky-100 to-red-100 p-1.5 text-red-500">
              <Sparkles size={16} />
            </span>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Featured Collections
            </h2>
          </div>

          {/* Mobile Slide Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-full border border-slate-200 bg-white text-slate-600 active:scale-95 transition-transform"
              aria-label="Previous card"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-full border border-slate-200 bg-white text-slate-600 active:scale-95 transition-transform"
              aria-label="Next card"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <p className="text-xs font-semibold text-slate-500 hidden md:block">
            Handpicked premium tech gear
          </p>
        </div>

        {/* ================= MOBILE SWIPE & AUTO-SLIDER (< md) ================= */}
        <div
          className="block md:hidden relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Auto-Slide Progress Line */}
          <div className="w-full bg-slate-200 h-1 rounded-full mb-4 overflow-hidden">
            <motion.div
              key={activeIndex}
              initial={{ width: "0%" }}
              animate={{ width: isPaused ? "0%" : "100%" }}
              transition={{ duration: 4.5, ease: "linear" }}
              className="h-full bg-linear-to-r from-sky-600 from-0% via-sky-600 via-50% to-red-600 to-50%"
            />
          </div>

          {/* Swipe Container */}
          <div className="relative min-h-[420px] w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {featuredProducts.map((product, index) => {
                if (index !== activeIndex) return null;

                const config = categoryConfig[product.category.name] || {
                  icon: <Smartphone size={13} />,
                  badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
                };

                return (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -40) handleNext();
                      if (info.offset.x > 40) handlePrev();
                    }}
                    className="absolute inset-0 flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 p-5 shadow-md touch-pan-y"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.badgeClass}`}
                      >
                        {config.icon}
                        <span>{product.category.name}</span>
                      </div>

                      <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        In Stock
                      </span>
                    </div>

                    {/* Image */}
                    <div className="my-3 relative aspect-4/3 w-full rounded-xl bg-slate-50/80 border border-slate-100 p-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain pointer-events-none"
                      />
                    </div>

                    {/* Footer / CTA */}
                    <div className="flex flex-col gap-3">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 tracking-tight line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Swipe left/right to explore collections
                        </p>
                      </div>

                      <Link
                        to={`/category/${product.category.slug}/product/${product.slug}`}
                        className="inline-flex w-full items-center justify-between h-11 px-4 rounded-xl bg-slate-900 active:bg-blue-600 text-xs font-semibold text-white shadow-sm transition-all duration-200"
                      >
                        <span>Shop {product.category.name}</span>
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Pagination Indicators */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {featuredProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-6 bg-sky-600"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ================= DESKTOP GRID (>= md) ================= */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => {
            const config = categoryConfig[product.category.name] || {
              icon: <Smartphone size={13} />,
              badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
            };

            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.badgeClass}`}
                  >
                    {config.icon}
                    <span>{product.category.name}</span>
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    In Stock
                  </span>
                </div>

                <div className="my-4 relative aspect-4/3 w-full rounded-xl bg-slate-50/80 border border-slate-100 p-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Starting from best market price
                    </p>
                  </div>

                  <Link
                    to={`/category/${product.category.slug}/product/${product.slug}`}
                    className="inline-flex w-full items-center justify-between h-11 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-xs font-semibold text-white shadow-sm transition-all duration-200 mt-1"
                  >
                    <span>Shop {product.category.name}</span>
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
