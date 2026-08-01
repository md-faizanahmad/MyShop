import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

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
  return (
    <section className="w-full bg-slate-50/50 dark:bg-neutral-900/50 border-y border-neutral-200/80 dark:border-neutral-800 py-6 antialiased overflow-hidden">
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

        {/* ================= MOBILE LAYOUT (Infinite Marquee) ================= */}
        <div className="relative md:hidden w-full overflow-hidden mask-[linear-gradient(to_right,transparent_0,black_10%,black_90%,transparent_100%)]">
          <div className="flex w-max animate-marquee gap-8">
            {/* Duplicated list to create flawless seamless loop */}
            {[...benefits, ...benefits].map((b, index) => {
              const Icon = b.icon;
              return (
                <div
                  key={`${b.id}-${index}`}
                  className="flex items-center gap-3 shrink-0 pr-2"
                >
                  <div
                    className={`p-2 rounded-lg ${b.bgClass} ${b.colorClass} shrink-0`}
                  >
                    <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
                      {b.title}
                    </h3>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium whitespace-nowrap">
                      {b.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
