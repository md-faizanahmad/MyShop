import { useState, useEffect } from "react";
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
    title: "Instant Returns",
    subtitle: "7-day doorstep pickup",
    colorClass: "text-red-600",
    bgClass: "bg-red-50",
  },
  {
    id: "secure-checkout",
    icon: ShieldCheck,
    title: "Secure Checkout",
    subtitle: "UPI, Cards & COD available",
    colorClass: "text-sky-600",
    bgClass: "bg-sky-50",
  },
  {
    id: "customer-support",
    icon: Headphones,
    title: "24/7 Support",
    subtitle: "Quick resolution helpline",
    colorClass: "text-red-600",
    bgClass: "bg-red-50",
  },
];

export default function TrustBenefitsBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play interval for mobile view
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % benefits.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="w-full border-y border-slate-200/80 bg-white py-3.5">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* ================= DESKTOP LAYOUT (Grid) ================= */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-4">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.id} className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${b.bgClass} ${b.colorClass}`}
                >
                  <Icon size={19} strokeWidth={2.2} aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="truncate text-xs font-bold text-slate-900">
                      {b.title}
                    </h3>
                    {b.badge && (
                      <span className="rounded bg-sky-100 px-1 py-0.5 text-[9px] font-extrabold tracking-tight text-sky-700">
                        {b.badge}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-[11px] font-medium text-slate-500">
                    {b.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= MOBILE LAYOUT (Auto Carousel) ================= */}
        <div
          className="flex flex-col items-center md:hidden"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Active Benefit Item */}
          <div className="flex min-h-[52px] w-full items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-2.5 transition-all">
            {(() => {
              const b = benefits[activeIndex];
              const Icon = b.icon;
              return (
                <>
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${b.bgClass} ${b.colorClass}`}
                  >
                    <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-bold text-slate-900">
                        {b.title}
                      </h3>
                      {b.badge && (
                        <span className="rounded bg-sky-100 px-1 py-0.5 text-[9px] font-extrabold tracking-tight text-sky-700">
                          {b.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-medium text-slate-500">
                      {b.subtitle}
                    </p>
                  </div>
                </>
              );
            })()}
          </div>

          {/* Dots Indicator */}
          <div className="mt-2.5 flex items-center gap-1.5">
            {benefits.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "w-4 bg-sky-600" : "w-1.5 bg-slate-200"
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
