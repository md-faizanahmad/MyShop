import { Link } from "react-router-dom";
import { ArrowRight, Laptop, Smartphone, Tv } from "lucide-react";
import { motion } from "framer-motion";
import { useFeaturedProducts } from "../../hooks/useFeaturedProducts";

const categoryIcons: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone size={12} />,
  Laptops: <Laptop size={12} />,
  Electronics: <Tv size={12} />,
};

export default function TechPromoBanners() {
  const { data: products = [], isLoading } = useFeaturedProducts();

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

  if (isLoading) return null;

  return (
    <section className="py-12 px-4 antialiased">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, scale: 0.99 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="group flex flex-col justify-between bg-white p-5 transition-colors hover:border hover:border-neutral-300"
          >
            {/* Top */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-1.5 text-neutral-400">
                {categoryIcons[product.category.name]}
                <span className="text-[10px] font-mono tracking-wider uppercase font-medium">
                  {product.category.name}
                </span>
              </div>

              <span className="text-[10px] font-mono text-neutral-300">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Image */}
            <div className="my-6 aspect-video w-full overflow-hidden bg-neutral-50 flex items-center justify-center p-6 border border-neutral-100">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-full max-w-full object-contain mix-blend-darken transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Bottom */}
            <div className="flex items-end justify-between gap-4 pt-2">
              <div>
                <h3 className="text-base font-semibold tracking-tight text-neutral-900">
                  {product.name}
                </h3>

                <p className="text-xs text-neutral-400">
                  {product.category.name}
                </p>
              </div>

              <Link
                to={`/category/${product.category.slug}/product/${product.slug}`}
                className="inline-flex h-8 items-center gap-2 bg-neutral-900 px-3 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
              >
                <span>View Details</span>

                <ArrowRight
                  size={12}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
