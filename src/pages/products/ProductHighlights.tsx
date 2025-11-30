import { Check } from "lucide-react";

interface ProductHighlightsProps {
  highlights: string[];
}

export default function ProductHighlights({
  highlights,
}: ProductHighlightsProps) {
  if (!highlights.length) return null;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-3">Key Highlights</h2>

      <div className="space-y-2">
        {highlights.map((h, i) => (
          <div key={i} className="flex items-center gap-3">
            <Check className="text-green-600 w-5 h-5" />
            <span className="text-gray-800 text-sm">{h}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
