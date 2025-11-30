import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const quotes = [
  "Preparing your personalized shopping experience…",
  "Just a moment, securing your session…",
  "Fetching your preferences…",
  "Optimizing your shopping journey…",
];

export default function LoadingScreen() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Rotate quotes every 1.8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Spinner */}
      <motion.div
        className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Quote */}
      <motion.p
        key={quoteIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5 }}
        className="mt-6 text-gray-600 text-sm sm:text-base text-center px-6"
      >
        {quotes[quoteIndex]}
      </motion.p>
    </div>
  );
}
