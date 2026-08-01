import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Benefit {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  colorClass: string;
  bgClass: string;
}

const benefits: Benefit[] = [
  {
    id: "free-shipping",
    icon: Truck,
    title: "Fast Delivery",
    subtitle: "Reliable shipping protocol",
    colorClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    id: "easy-returns",
    icon: RotateCcw,
    title: "Easy Returns",
    subtitle: "7-day return policy",
    colorClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-50 dark:bg-amber-950/50",
  },
  {
    id: "secure-payments",
    icon: ShieldCheck,
    title: "Secure Pay",
    subtitle: "Encrypted checkout",
    colorClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-50 dark:bg-emerald-950/50",
  },
  {
    id: "support",
    icon: Headphones,
    title: "24/7 Support",
    subtitle: "Expert assistance desk",
    colorClass: "text-indigo-600 dark:text-indigo-400",
    bgClass: "bg-indigo-50 dark:bg-indigo-950/50",
  },
];

export default function TrustBenefitsBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = benefits.length;

  // Auto-play timer for mobile slider
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3500);

    return () => clearInterval(interval);
  }, [total, isPaused]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  return (
    <section className="w-full bg-slate-50/50 dark:bg-neutral-900/50 border-y border-neutral-200/80 dark:border-neutral-800 py-4 md:py-6 antialiased overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* ================= DESKTOP LAYOUT (Grid) ================= */}
        <div className="hidden md:grid md:grid-cols-4 divide-x divide-neutral-200 dark:divide-neutral-800">
          {benefits.map((b, index) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="flex items-center gap-3.5 px-6 first:pl-2 last:pr-2 group transition-all duration-200"
              >
                <div
                  className={`p-2.5 rounded-xl ${b.bgClass} ${b.colorClass} shrink-0 group-hover:scale-105 transition-transform duration-200`}
                >
                  <Icon size={20} strokeWidth={2.2} aria-hidden="true" />
                </div>

                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                    {b.title}
                  </h3>
                  <p className="text-[12px] text-neutral-500 dark:text-neutral-400 font-medium leading-tight">
                    {b.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= MOBILE LAYOUT (Auto / Manual Swipe) ================= */}
        <div
          className="block md:hidden relative w-full"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[52px] w-full flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {benefits.map((b, index) => {
                if (index !== activeIndex) return null;
                const Icon = b.icon;

                return (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -30) handleNext();
                      if (info.offset.x > 30) handlePrev();
                    }}
                    className="absolute inset-0 flex items-center justify-center gap-3 px-4 touch-pan-y"
                  >
                    <div
                      className={`p-2 rounded-xl ${b.bgClass} ${b.colorClass} shrink-0`}
                    >
                      <Icon size={20} strokeWidth={2.2} aria-hidden="true" />
                    </div>

                    <div className="flex flex-col justify-center">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                        {b.title}
                      </h3>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium leading-tight">
                        {b.subtitle}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Pagination Indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {benefits.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-5 bg-neutral-800 dark:bg-neutral-200"
                    : "w-1.5 bg-neutral-300 dark:bg-neutral-700"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
