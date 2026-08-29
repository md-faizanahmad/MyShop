import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  type LucideIcon,
} from "lucide-react";

interface Benefit {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  badge?: string;
  colorClass: string;
  bgClass: string;
}

const benefits: Benefit[] = [
  {
    id: "express-delivery",
    icon: Truck,
    title: "Express Delivery",
    subtitle: "Free on orders over ₹499",
    badge: "FAST",
    colorClass: "text-sky-600",
    bgClass: "bg-sky-50",
  },
  {
    id: "easy-returns",
    icon: RotateCcw,
    title: "Easy Returns",
    subtitle: "7-day doorstep pickup",
    colorClass: "text-black-600",
    bgClass: "bg-red-50",
  },
  {
    id: "secure-checkout",
    icon: ShieldCheck,
    title: "Secure Checkout",
    subtitle: "UPI, Cards & COD available",
    colorClass: "text-green-600",
    bgClass: "bg-green-100",
  },
  {
    id: "customer-support",
    icon: Headphones,
    title: "Customer Support",
    subtitle: "Quick resolution helpline",
    colorClass: "text-red-600",
    bgClass: "bg-red-50",
  },
];

const mobileSlides = [
  [benefits[0], benefits[1]],
  [benefits[2], benefits[3]],
];

export default function TrustBenefitsBar() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % mobileSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const BenefitContent = ({ benefit }: { benefit: Benefit }) => {
    const Icon = benefit.icon;

    return (
      <div className="flex min-w-0 items-center gap-2.5">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${benefit.bgClass} ${benefit.colorClass}`}
        >
          <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-xs font-bold text-slate-900 sm:text-sm">
              {benefit.title}
            </h3>

            {benefit.badge && (
              <span className="shrink-0 rounded bg-sky-100 px-1 py-0.5 text-[8px] font-extrabold leading-none tracking-tight text-sky-700">
                {benefit.badge}
              </span>
            )}
          </div>

          <p className="mt-0.5 truncate text-[10px] font-medium leading-tight text-slate-500 sm:text-[11px]">
            {benefit.subtitle}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full py-5 md:py-6">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className={`flex items-center justify-center px-4 lg:px-6 ${
                index !== 0 ? "border-l border-slate-200" : ""
              }`}
            >
              <BenefitContent benefit={benefit} />
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div
          className="md:hidden"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="relative flex min-h-11 items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.45,
                  ease: "easeInOut",
                }}
                className="grid w-full grid-cols-2"
              >
                {mobileSlides[activeSlide].map((benefit, index) => (
                  <div
                    key={benefit.id}
                    className={`flex items-center ${
                      index === 1 ? "border-l border-slate-200 pl-3" : "pr-3"
                    }`}
                  >
                    <BenefitContent benefit={benefit} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile indicators */}
          <div className="mt-3 flex justify-center gap-1.5">
            {mobileSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Show benefit set ${index + 1}`}
                aria-current={activeSlide === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === index
                    ? "w-4 bg-sky-600"
                    : "w-1.5 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
