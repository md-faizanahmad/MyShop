// src/pages/checkout/CheckoutVerifying.tsx
import { Loader2, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutVerifying() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <div className="text-center max-w-sm">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-sky-100">
            <Lock className="w-8 h-8 text-sky-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">Verifying Payment</h2>

        <p className="mt-2 text-gray-600">
          Please wait while we confirm your payment securely.
        </p>

        <Loader2 className="w-10 h-10 animate-spin text-sky-600 mx-auto mt-6" />
      </div>
    </motion.div>
  );
}
