import { Check } from "lucide-react";

interface ProductHighlightsProps {
  highlights: string[];
}

export default function ProductHighlights({
  highlights,
}: ProductHighlightsProps) {
  if (!highlights.length) return null;

  return (
    <section className="mt-6 sm:mt-8">
      <h2 className="mb-3 text-base font-semibold text-gray-900 sm:text-lg">
        Key Highlights
      </h2>

      <div className="space-y-2">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="flex items-start gap-2.5 text-sm text-gray-700"
          >
            <Check size={17} className="mt-0.5 shrink-0 text-green-600" />
            <span>{highlight}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
