import { motion } from "framer-motion";

interface ProductNameProps {
  name: string;
}

export default function ProductName({ name }: ProductNameProps) {
  if (!name || name.trim().length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-transparent py-2 antialiased"
    >
      {/* Structural catalog tag */}
      <div className="mb-1">
        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-bold">
          Authentic Article Stock
        </span>
      </div>

      {/* Prominent, clean product title layout */}
      <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 leading-tight max-w-xl">
        {name}
      </h1>
    </motion.div>
  );
}
