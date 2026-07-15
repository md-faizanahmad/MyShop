import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, WifiOff } from "lucide-react";
import { useConnectionStore } from "./store/useConnectionStore";

export default function ConnectionError() {
  const isConnected = useConnectionStore((state) => state.isConnected);

  if (isConnected) return null;

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, y: 16 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mx-4 w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-600">
            <WifiOff size={30} />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-gray-900">
            Couldn't load this page
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Please check your internet connection and try again. If the problem
            continues, the server may be temporarily unavailable.
          </p>

          <button
            onClick={handleRetry}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
