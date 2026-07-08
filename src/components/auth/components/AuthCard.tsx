// src/features/auth/components/AuthCard.tsx

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-2xl border border-sky-50 bg-white px-5 py-6 shadow-xl sm:max-w-lg sm:px-8 sm:py-8"
      >
        {children}
      </motion.div>
    </div>
  );
}
