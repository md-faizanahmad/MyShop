// src/components/Header/CartIcon.tsx
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "../../store/CartStore";
import { useAuthStore } from "../../store/AuthStore";

export default function CartIcon() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const totalItems = useCartStore((state) =>
    isLoggedIn ? state.getTotalItems() : 0
  );

  if (!isLoggedIn) {
    return (
      <Link to="/cart" className="relative" aria-label="Cart">
        <ShoppingCart
          size={24}
          className="text-gray-700 hover:text-gray-900 transition"
        />
      </Link>
    );
  }

  return (
    <Link to="/cart" className="relative" aria-label="Cart">
      <ShoppingCart
        size={24}
        className="text-gray-700 hover:text-gray-900 transition"
      />

      {totalItems > 0 && (
        <motion.span
          key={totalItems}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-5 h-5 flex items-center justify-center shadow-lg"
        >
          {totalItems > 99 ? "99+" : totalItems}
        </motion.span>
      )}
    </Link>
  );
}
