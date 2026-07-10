import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-12 antialiased dark:bg-neutral-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="w-full max-w-[400px] border border-neutral-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:border-neutral-800 dark:bg-neutral-900"
      >
        {children}
      </motion.div>
    </div>
  );
}
