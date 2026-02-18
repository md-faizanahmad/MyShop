import { Link } from "react-router-dom";
import ProductCard from "../../pages/ProductCard";
import { useHome } from "../../hooks/useHome";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function FeatureProducts() {
  const { data, isLoading } = useHome();
  const featuredProducts = data?.featuredProducts ?? [];

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600">
              Curated Selection
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
              Featured Products
            </h2>
            <div className="h-1 w-12 bg-blue-600 rounded-full" />
          </div>

          <Link
            to="/products"
            className="group flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-blue-600 transition-colors"
          >
            Explore Full Catalog
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* --- CONTENT SECTION --- */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-5">
                <div className="bg-zinc-50 border border-zinc-100 rounded-4xl aspect-4/5 animate-pulse" />
                <div className="space-y-2 px-2">
                  <div className="h-3 bg-zinc-100 rounded-full w-3/4 animate-pulse" />
                  <div className="h-3 bg-zinc-100 rounded-full w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-16"
          >
            {featuredProducts.map((product) => (
              <motion.li
                key={product._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <ProductCard product={product} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}

export default FeatureProducts;
