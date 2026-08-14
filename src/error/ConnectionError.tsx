import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw, WifiOff } from "lucide-react";
import { useConnectionStore } from "../store/useConnectionStore";

export default function ConnectionError() {
  const isConnected = useConnectionStore((state) => state.isConnected);

  useEffect(() => {
    if (isConnected) return;

    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [isConnected]);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {!isConnected && (
        <motion.div
          role="alert"
          aria-live="assertive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex min-h-dvh items-center justify-center bg-black/10 px-4 backdrop-blur-[2px]"
        >
          <motion.section
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            aria-labelledby="connection-error-title"
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl sm:max-w-lg sm:p-6"
          >
            <div className="flex items-start gap-4">
              <div
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500"
              >
                <WifiOff className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h1
                  id="connection-error-title"
                  className="text-base font-semibold text-gray-900 sm:text-lg"
                >
                  Connection lost
                </h1>

                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Check your internet connection and try again.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:ring-offset-2 active:bg-gray-700"
            >
              <RefreshCw aria-hidden="true" className="size-4" />
              Try Again
            </button>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
