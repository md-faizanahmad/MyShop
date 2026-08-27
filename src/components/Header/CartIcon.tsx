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
    s.items.reduce((sum, i) => sum + i.qty, 0),
  );
  const loading = useCartStore((s) => s.loading);

  /* -----------------------------
     During hydration, don't lie
  ----------------------------- */
  // if (loading) {
  //   return (
  //     <Link to="/cart" className="relative" aria-label="Cart">
  //       <ShoppingCart size={18} className="text-gray-400 animate-pulse" />
  //     </Link>
  //   );
  // }

  if (loading) {
    return (
      <div
        className="relative h-6 w-6 animate-pulse rounded-md bg-gray-200"
        aria-hidden="true"
      />
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
          className="absolute -top-1 -right-1
    bg-red-500 text-white font-bold
    text-[9px] sm:text-[10px]
    min-w-4 h-4
    px-1
    rounded-full
    flex items-center justify-center
    shadow-md leading-none
    whitespace-nowrap"
        >
          {totalItems > 99 ? "99+" : totalItems}
        </motion.span>
      )}
    </Link>
  );
}
