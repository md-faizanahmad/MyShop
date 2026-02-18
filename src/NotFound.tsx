import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Search, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12 text-center select-none">
      {/* --- VISUAL ICON BLOCK --- */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-zinc-50 rounded-full flex items-center justify-center relative">
          <ShoppingBag size={48} className="text-zinc-200" strokeWidth={1} />
          {/* A floating '?' badge */}
          <div className="absolute top-0 right-0 w-10 h-10 bg-blue-600 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">?</span>
          </div>
        </div>
      </motion.div>

      {/* --- TEXT CONTENT --- */}
      <div className="max-w-md space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 tracking-tight">
          Oops! <span className="text-blue-600">404</span>
        </h1>
        <h2 className="text-xl font-bold text-zinc-800">
          This page seems to be out of stock.
        </h2>
        <p className="text-zinc-500 text-[14px] leading-relaxed">
          The link you followed might be broken, or the page may have been
          removed. Try refreshing or explore our latest collections.
        </p>
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-10 w-full max-w-sm">
        <Link
          to="/"
          className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white px-6 py-3.5 rounded-xl font-bold text-[14px] hover:bg-zinc-800 transition-all active:scale-95 shadow-xl shadow-zinc-200"
        >
          <Home size={18} />
          Back to Home
        </Link>

        <Link
          to="/products"
          className="w-full flex items-center justify-center gap-2 bg-white text-zinc-900 border border-zinc-200 px-6 py-3.5 rounded-xl font-bold text-[14px] hover:bg-zinc-50 transition-all active:scale-95"
        >
          <Search size={18} />
          Browse Shop
        </Link>
      </div>

      {/* --- SUBTLE RECOVERY OPTION --- */}
      <div className="mt-12 flex items-center gap-4 pt-8 border-t border-zinc-100">
        <button
          onClick={() => window.location.reload()}
          className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-blue-600 transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={12} />
          Retry Connection
        </button>
      </div>
    </div>
  );
}
