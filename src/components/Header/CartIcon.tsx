// src/components/Header/CartIcon.tsx
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "../../store/useCartStore";

export default function CartIcon() {
  /* -----------------------------
     Store
  ----------------------------- */
  const totalItems = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.qty, 0)
  );
  const loading = useCartStore((s) => s.loading);

  /* -----------------------------
     During hydration, don't lie
  ----------------------------- */
  if (loading) {
    return (
      <Link to="/cart" className="relative" aria-label="Cart">
        <ShoppingCart size={18} className="text-gray-400 animate-pulse" />
      </Link>
    );
  }

  /* -----------------------------
     Render
  ----------------------------- */
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
