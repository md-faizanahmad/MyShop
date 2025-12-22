// src/components/skeletons/NavbarLinkSkeleton.tsx
import { motion } from "framer-motion";

export default function NavbarLinkSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
          className="h-4 w-20 bg-gray-200 rounded-md animate-pulse"
        />
      ))}
    </div>
  );
}
