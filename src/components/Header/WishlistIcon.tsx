// src/components/Header/WishlistIcon.tsx
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlistStore } from "../../store/useWishlistStore";
import type { JSX } from "react";

export default function WishlistIcon(): JSX.Element {
  const count = useWishlistStore((s) => s.items?.length ?? 0);
  if (count === undefined) {
    return <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />;
  }
  return (
    <Link to="/wishlist" className="relative" aria-label="Wishlist">
      <Heart
        size={24}
        className={`transition-all ${
          count > 0
            ? "fill-pink-500 text-pink-500"
            : "text-gray-700 hover:text-pink-500"
        }`}
      />

      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 600, damping: 20 }}
          className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-5 h-5 flex items-center justify-center shadow-lg"
        >
          {count > 99 ? "99+" : count}
        </motion.span>
      )}
    </Link>
  );
}
