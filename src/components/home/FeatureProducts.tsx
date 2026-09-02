import { Link } from "react-router-dom";
import ProductCard from "@/pages/ProductCard";
import { useHome } from "@/hooks/useHome";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function FeatureProducts() {
  const { data, isLoading } = useHome();
  const featuredProducts = data?.featuredProducts ?? [];

  return (
    <section className="w-full overflow-hidden py-10 sm:py-16">
      <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6">
        {/* HEADER */}
        <div className="mb-5 flex min-w-0 items-end justify-between gap-3 sm:mb-8 sm:gap-4">
          <div className="min-w-0 space-y-1.5">
            <span className="block truncate text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400 sm:text-[11px] sm:tracking-[0.3em]">
              Curated Selection
            </span>

            <h3 className="truncate text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-2xl">
              Featured Products
            </h3>

            <div className="relative mt-1.5 h-1 w-14 overflow-hidden rounded-full bg-sky-500">
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-black"
                animate={{
                  x: ["0%", "200%", "0%"],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>

          <Link
            to="/products"
            className="group flex shrink-0 items-center gap-1.5 pb-0.5 text-[11px] font-semibold text-zinc-500 transition-colors hover:text-black sm:gap-2 sm:text-sm"
          >
            <span className="hidden sm:inline">Explore Full Catalog</span>
            <span className="sm:hidden">View all</span>

            <ArrowRight
              size={14}
              className="shrink-0 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4"
            />
          </Link>
        </div>

        {/* LOADING */}
        {isLoading ? (
          <div className="flex min-w-0 gap-3 overflow-hidden sm:gap-5 lg:gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="
                  w-[72%] shrink-0
                  sm:w-[42%]
                  md:w-[30%]
                  lg:w-[23%]
                "
              >
                <div className="aspect-square animate-pulse rounded-2xl border border-zinc-100 bg-zinc-50" />

                <div className="mt-3 space-y-2 px-1">
                  <div className="h-3 w-3/4 animate-pulse rounded-full bg-zinc-100" />
                  <div className="h-3 w-1/2 animate-pulse rounded-full bg-zinc-100" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* PRODUCT RAIL */
          <div className="relative min-w-0 overflow-hidden">
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              className="
                flex min-w-0
                snap-x snap-mandatory
                gap-3 overflow-x-auto
                pb-3
                scrollbar-none
                overscroll-x-contain

                sm:gap-5
                lg:gap-6
              "
            >
              {featuredProducts.map((product) => (
                <motion.li
                  key={product._id}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 20,
                    },
                    show: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  className="
                    w-[72%] min-w-0 shrink-0 snap-start
                    sm:w-[42%]
                    md:w-[30%]
                    lg:w-[23%]
                  "
                >
                  <ProductCard product={product} />
                </motion.li>
              ))}
            </motion.ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeatureProducts;
