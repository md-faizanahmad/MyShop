// src/pages/checkout/CheckoutLoading.tsx
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutLoading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-sky-600 mx-auto" />
        <p className="mt-4 text-lg font-medium text-gray-700">
          Preparing checkout…
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Loading your addresses and cart
        </p>
      </div>
    </motion.div>
  );
}
