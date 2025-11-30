// src/components/Header/WishlistIcon.tsx
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/AuthStore";
import { useWishlistStore } from "../../store/WishlistStore";

export default function WishlistIcon() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const count = useWishlistStore((state) =>
    isLoggedIn ? state.items.length : 0
  );

  return (
    <Link to="/wishlist" className="relative" aria-label="Wishlist">
      <Heart
        size={24}
        className={`transition-all ${
          count > 0 && isLoggedIn
            ? "fill-pink-500 text-pink-500"
            : "text-gray-700 hover:text-pink-500"
        }`}
      />

      {isLoggedIn && count > 0 && (
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
