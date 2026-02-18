import { Link } from "react-router-dom";
import { ArrowRight, Laptop, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

// These would normally come from your API fetch
const products = [
  {
    name: "Nothing 3a",
    category: "Smartphone",
    slug: "nothing-3a",
    imageUrl:
      "https://res.cloudinary.com/daqb5wglu/image/upload/q_auto,f_auto,w_auto,dpr_auto/v1765303201/MyStore/products/file_sys9qq.png",
    theme: "from-zinc-900 to-zinc-800",
    accent: "text-blue-400",
    icon: <Smartphone size={16} />,
  },
  {
    name: "Mac Atlas",
    category: "Laptops",
    slug: "mac-atlas",
    imageUrl:
      "https://res.cloudinary.com/daqb5wglu/image/upload/q_auto,f_auto,w_auto,dpr_auto/v1765302805/MyStore/products/file_micrrn.jpg",
    theme: "from-blue-950 to-zinc-950",
    accent: "text-emerald-400",
    icon: <Laptop size={16} />,
  },
];

export default function TechPromoBanners() {
  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className={`group relative h-[450px] sm:h-[550px] overflow-hidden rounded-[3rem] bg-linear-to-br ${product.theme} shadow-2xl shadow-zinc-200`}
          >
            {/* PRODUCT IMAGE - Deep Scale Effect */}
            <div className="absolute inset-0 p-12 sm:p-14 flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-2 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
            </div>

            {/* OVERLAYS */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />

            {/* CONTENT */}
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <div className={`flex items-center gap-2 mb-3 ${product.accent}`}>
                {product.icon}
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                  {product.category}
                </span>
              </div>

              <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-4 leading-none">
                {product.name}
              </h3>

              <Link
                to={`/category/${product.category}/product/${product.slug}`}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:bg-white hover:text-black active:scale-95 w-fit"
              >
                Learn More
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* DECORATIVE AMBIENT GLOW */}
            <div
              className={`absolute -top-24 -right-24 w-64 h-64 blur-[100px] opacity-20 rounded-full bg-white transition-opacity group-hover:opacity-40`}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
