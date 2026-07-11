import { Link } from "react-router-dom";
import { ArrowRight, Laptop, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    name: "Nothing 3a",
    category: "Smartphone",
    slug: "nothing-3a",
    imageUrl:
      "https://res.cloudinary.com/daqb5wglu/image/upload/q_auto,f_auto,w_auto,dpr_auto/v1765303201/MyStore/products/file_sys9qq.png",
    theme: "from-zinc-900 to-zinc-800",
    accent: "text-blue-400",
    icon: <Smartphone size={12} />,
  },
  {
    name: "Mac Atlas",
    category: "Laptops",
    slug: "mac-atlas",
    imageUrl:
      "https://res.cloudinary.com/daqb5wglu/image/upload/q_auto,f_auto,w_auto,dpr_auto/v1765302805/MyStore/products/file_micrrn.jpg",
    theme: "from-blue-950 to-zinc-950",
    accent: "text-emerald-400",
    icon: <Laptop size={12} />,
  },
];

export default function TechPromoBanners() {
  return (
    <section className="py-12 px-4  antialiased cursor-pointer">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product, index) => (
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, scale: 0.99 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="group flex flex-col justify-between bg-white p-5 transition-colors hover:border-neutral-300"
          >
            {/* TOP BAR: TECHNICAL SPEC METADATA */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-1.5 text-neutral-400">
                {product.icon}
                <span className="text-[10px] font-mono tracking-wider uppercase font-medium">
                  {product.category}
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-300">
                0{index + 1}
              </span>
            </div>

            {/* MID SECTION: CONTROLLED IMAGE FRAME */}
            <div className="my-6 aspect-video w-full overflow-hidden bg-neutral-50 flex items-center justify-center p-6 border border-neutral-100">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-full mix-blend-darken max-w-full object-contain filter contrast-[1.02] transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* BOTTOM SECTION: NAVIGATION & DETAILS */}
            <div className="flex items-end justify-between gap-4 pt-2">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-base font-semibold tracking-tight text-neutral-900">
                  {product.name}
                </h3>
                <p className="text-xs text-neutral-400">
                  Premium hardware specifications.
                </p>
              </div>

              <Link
                to={`/category/${product.category}/product/${product.slug}`}
                className="inline-flex h-8 items-center gap-2 bg-neutral-900 px-3 text-xs font-medium text-white transition-colors hover:bg-neutral-800 "
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
