// CartEmpty.tsx
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CartEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-24"
    >
      <ShoppingBag size={90} className="mx-auto text-gray-300 mb-8" />
      <p className="text-2xl text-gray-600 mb-6">Your cart is empty</p>
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition"
      >
        Continue Shopping
      </Link>
    </motion.div>
  );
}
