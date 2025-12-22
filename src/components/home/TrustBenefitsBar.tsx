import { ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

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
      subtitle: "Quick & reliable shipping",
    },
    {
      id: "easy-returns",
      icon: RotateCcw,
      title: "Easy Returns",
      subtitle: "Hassle-free 7-day returns",
    },
    {
      id: "secure-payments",
      icon: ShieldCheck,
      title: "Secure Payments",
      subtitle: "100% safe checkout",
    },
    {
      id: "support",
      icon: Headphones,
      title: "24/7 Support",
      subtitle: "Always here to help",
    },
  ];

  return (
    <section className="w-full py-10 bg-gray-50 ">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {benefits.map((b) => {
          const Icon = b.icon;

          return (
            <div
              key={b.id}
              className="group  cursor-pointer flex flex-col items-center text-center gap-3"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white  border border-gray-200  shadow-sm transition-transform duration-200 group-hover:lg:scale-110">
                <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
              </div>

              <div className="text-sm font-semibold text-gray-900 ">
                {b.title}
              </div>

              <p className="text-xs text-gray-500 ">{b.subtitle}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
