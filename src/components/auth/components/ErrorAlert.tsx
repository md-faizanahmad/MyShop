// src/features/auth/components/ErrorAlert.tsx

import { AnimatePresence, motion } from "framer-motion";

interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mb-4 rounded-lg border border-red-100 bg-red-50 px-4 py-2 text-center text-xs text-red-600 sm:text-sm"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
