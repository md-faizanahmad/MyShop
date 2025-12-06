import { ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";
import type { JSX } from "react";

interface Benefit {
  id: string;
  icon: JSX.Element;
  title: string;
  subtitle: string;
}

export default function TrustBenefitsBar() {
  const benefits: Benefit[] = [
    {
      id: "free-shipping",
      icon: <Truck size={22} strokeWidth={1.7} />,
      title: "Fast Delivery",
      subtitle: "Quick & reliable shipping",
    },
    {
      id: "easy-returns",
      icon: <RotateCcw size={22} strokeWidth={1.7} />,
      title: "Easy Returns",
      subtitle: "Hassle-free 7-day returns",
    },
    {
      id: "secure-payments",
      icon: <ShieldCheck size={22} strokeWidth={1.7} />,
      title: "Secure Payments",
      subtitle: "100% safe checkout",
    },
    {
      id: "support",
      icon: <Headphones size={22} strokeWidth={1.7} />,
      title: "24/7 Support",
      subtitle: "Always here to help",
    },
  ];

  return (
    <section className="w-full py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {benefits.map((b) => (
          <div
            key={b.id}
            className="flex flex-col items-center text-center gap-2"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm border">
              {b.icon}
            </div>

            <h4 className="text-sm font-semibold text-gray-800">{b.title}</h4>

            <p className="text-xs text-gray-500">{b.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
