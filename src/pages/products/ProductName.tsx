import { motion } from "framer-motion";

interface ProductNameProps {
  name: string;
  categoryName?: string;
}

export default function ProductName({
  name,
  categoryName = "Premium Selection",
}: ProductNameProps) {
  if (!name || name.trim().length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-transparent py-2 antialiased"
    >
      {/* E-Commerce Catalog Meta Indicators */}
      <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
        <span className="text-emerald-700 font-bold">{categoryName}</span>
        <span>•</span>
        <span>Verified Genuine Stock</span>
        <span>•</span>
        <span>Local Direct Delivery</span>
      </div>

      {/* Prominent high-contrast title typography */}
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 leading-tight max-w-2xl">
        {name}
      </h1>
    </motion.div>
  );
}
