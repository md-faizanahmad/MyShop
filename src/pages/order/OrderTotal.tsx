// components/order/OrderTotal.tsx
import { motion } from "framer-motion";
import { IndianRupee, CheckCircle2 } from "lucide-react";

interface Props {
  amount: number;
}

export default function OrderTotal({ amount }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative overflow-hidden rounded-3xl shadow-2xl border"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500 via-teal-600 to-cyan-700 opacity-90" />

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full animate-shine" />

      <div className="relative p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-medium opacity-90 tracking-wider">
              Total Amount Paid
            </p>
            <p className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">
              ₹{amount.toLocaleString("en-IN")}
            </p>
          </div>

          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center shadow-xl"
          >
            <CheckCircle2 size={44} className="text-white drop-shadow-lg" />
          </motion.div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm opacity-80">
          <IndianRupee size={18} />
          <span>Secured Payment • 100% Protected</span>
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-linear-to-r from-transparent via-white/30 to-transparent" />
    </motion.div>
  );
}
