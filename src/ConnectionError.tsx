// components/shared/ConnectionError.tsx

import { WifiOff, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface ConnectionErrorProps {
  onRetry?: () => void;
  title?: string;
  message?: string;
}

export default function ConnectionError({
  onRetry,
  title = "Couldn't load this page",
  message = "Please check your connection and try again. If the problem continues, try again in a few moments.",
}: ConnectionErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[60vh] items-center justify-center px-4"
    >
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-600">
          <WifiOff size={30} />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        )}
      </div>
    </motion.div>
  );
}
