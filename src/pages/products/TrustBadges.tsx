// src/components/product/TrustBadges.tsx
import { Shield, Package, Star } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    { icon: Shield, color: "text-green-600", label: "100% Secure" },
    { icon: Package, color: "text-blue-600", label: "Free Shipping" },
    { icon: Star, color: "text-yellow-500", label: "4.8 Rated" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {badges.map((badge, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-md">
          <badge.icon className={`mx-auto ${badge.color}`} size={36} />
          <p className="text-xs font-medium text-gray-700 mt-3">
            {badge.label}
          </p>
        </div>
      ))}
    </div>
  );
}
