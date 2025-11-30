// components/TestModeBanner.tsx
import { AlertCircle, CreditCard, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function TestModeBanner() {
  // Change this to `false` when going live
  const isTestMode = true;

  if (!isTestMode) return null;

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-16 left-0 right-0 z-50"
    >
      <div className="bg-linear-to-r from-sky-600 via-blue-600 to-red-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-3 text-sm md:text-base font-bold tracking-wide">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <AlertCircle className="w-5 h-5" />
          <span className="hidden sm:inline">TEST MODE ACTIVE</span>
          <span className="inline sm:hidden">TEST MODE</span>
          <span className="mx-2 hidden md:inline">•</span>
          <span className="text-yellow-200">
            No real money will be charged • Orders are for testing only
          </span>
          <CreditCard className="w-5 h-5 ml-2 animate-bounce" />
        </div>
      </div>

      {/* Optional: Little glowing border */}
      <div className="h-1 bg-linear-to-r from-sky-400 via-sky-500 to-red-500 animate-pulse" />
    </motion.div>
  );
}
