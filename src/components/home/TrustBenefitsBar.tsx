import { ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";
import { motion } from "framer-motion";

interface Benefit {
  id: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  subtitle: string;
}

export default function TrustBenefitsBar() {
  const benefits: Benefit[] = [
    {
      id: "free-shipping",
      icon: Truck,
      title: "Fast Delivery",
      subtitle: "Reliable shipping",
    },
    {
      id: "easy-returns",
      icon: RotateCcw,
      title: "Easy Returns",
      subtitle: "7-day policy",
    },
    {
      id: "secure-payments",
      icon: ShieldCheck,
      title: "Secure Pay",
      subtitle: "100% safe checkout",
    },
    {
      id: "support",
      icon: Headphones,
      title: "24/7 Support",
      subtitle: "Expert assistance",
    },
  ];

  return (
    <section className="w-full py-8 sm:py-12 bg-white border-y border-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 sm:gap-8">
          {benefits.map((b, index) => {
            const Icon = b.icon;

            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col items-center sm:flex-row sm:items-center sm:text-left text-center gap-4 sm:gap-5"
              >
                {/* ICON CONTAINER */}
                <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-zinc-50 text-zinc-600 border border-zinc-100 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-500/20 group-hover:border-blue-600">
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                </div>

                {/* TEXT CONTENT */}
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-[13px] sm:text-[14px] font-bold text-zinc-900 tracking-tight">
                    {b.title}
                  </h3>
                  <p className="text-[11px] sm:text-[12px] text-zinc-500 font-medium leading-tight">
                    {b.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
