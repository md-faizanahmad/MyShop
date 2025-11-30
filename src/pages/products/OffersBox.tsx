import { CheckCircle } from "lucide-react";

interface Props {
  offers?: string[];
}

export default function OffersBox({ offers = [] }: Props) {
  if (!offers.length) return null;

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-4 mt-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Available Offers
      </h3>

      <ul className="space-y-2">
        {offers.map((offer, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <span className="text-gray-700">{offer}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
