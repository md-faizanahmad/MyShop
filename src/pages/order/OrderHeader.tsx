// components/order/OrderHeader.tsx
import { motion } from "framer-motion";
import { Package, Calendar } from "lucide-react";

interface Props {
  id: string;
  createdAt: string;
}

export default function OrderHeader({ id, createdAt }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-linear-to-r from-blue-600 via-sky-800 to-sky-600 rounded-2xl p-5 sm:p-6 text-white shadow-xl border border-white/20 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
        {/* Left: Icon + Info */}
        <div className="flex items-center gap-3 sm:gap-4 w-full">
          {/* Icon */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center flex-shrink-0">
            <Package size={26} className="sm:w-7 sm:h-7" />
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide truncate">
              Order #{id}
            </h2>
            <p className="text-xs sm:text-sm opacity-90 flex items-center gap-1.5 mt-1.5 flex-wrap">
              <Calendar size={14} className="flex-shrink-0" />
              <span className="truncate">
                {new Date(createdAt).toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </p>
          </div>
        </div>

        {/* Optional Right Section (if you add status later) */}
        <div className="hidden sm:block" />
      </div>
    </motion.div>
  );
}
