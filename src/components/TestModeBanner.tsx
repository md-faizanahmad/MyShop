// components/TestModeBanner.tsx
import { AlertCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function TestModeBanner() {
  // Toggle this to `false` when going live
  const isTestMode = true;

  if (!isTestMode) return null;

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed top-15 left-0 right-0 z-40"
      role="status"
      aria-live="polite"
    >
      {/* Banner background */}
      <div className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-50 shadow-md border-b border-slate-700/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-[13px]">
          {/* Left: message */}
          <div className="flex items-center gap-2 sm:gap-3">
            <AlertCircle className="w-4 h-4 text-yellow-300 shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold tracking-wide uppercase text-[10px] sm:text-[11px] text-yellow-200">
                Test Mode · Under Development
              </span>
              <span className="text-slate-200">
                This website is currently in{" "}
                <span className="font-medium">demo / development mode</span>. No
                real payments or orders will be processed.
              </span>
            </div>
          </div>

          {/* Right: extra note + contact */}
          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
            <span className="hidden sm:inline text-slate-300/90">
              Interested in this project?{" "}
              <span className="font-medium">
                Use the contact page or email.
              </span>
            </span>

            <a
              href="mailto:mdahmad.dev@gmail.com"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-500/70 bg-slate-800/70 px-3 py-1.5 text-[11px] font-medium text-slate-50 hover:bg-slate-700 hover:border-slate-400 transition"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Developer</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
