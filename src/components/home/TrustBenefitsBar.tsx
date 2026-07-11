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
      subtitle: "Reliable shipping protocol",
    },
    {
      id: "easy-returns",
      icon: RotateCcw,
      title: "Easy Returns",
      subtitle: "7-day return policy",
    },
    {
      id: "secure-payments",
      icon: ShieldCheck,
      title: "Secure Pay",
      subtitle: "Encrypted checkout",
    },
    {
      id: "support",
      icon: Headphones,
      title: "24/7 Support",
      subtitle: "Expert assistance desk",
    },
  ];

  return (
    <section className="w-full py-10  antialiased">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 md:divide-x divide-neutral-200">
          {benefits.map((b, index) => {
            const Icon = b.icon;

            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="flex items-start gap-3 px-4 first:pl-2 md:first:pl-0 last:pr-0"
              >
                <div className="mt-0.5 text-neutral-900 shrink-0">
                  <Icon size={14} strokeWidth={2.5} aria-hidden="true" />
                </div>

                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-neutral-900">
                    {b.title}
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-medium">
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
