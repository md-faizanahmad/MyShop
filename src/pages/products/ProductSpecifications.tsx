import { useState } from "react";

interface ProductSpecificationsProps {
  specifications: Record<string, string>;
}

export default function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const entries = Object.entries(specifications);

  if (!entries.length) return null;

  // Show only the first 5 specs initially on mobile to save vertical space
  const displayedEntries = isExpanded ? entries : entries.slice(0, 5);

  return (
    <div className="mt-8 px-4 sm:px-0">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Product Specifications
      </h2>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <dl>
          {displayedEntries.map(([key, value], index) => (
            <div
              key={key}
              className={`flex flex-col sm:flex-row py-3 px-4 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } ${index !== 0 ? "border-top border-gray-100" : ""}`}
            >
              {/* Label: Full width on mobile, 1/3 width on tablet+ */}
              <dt className="text-sm font-medium text-gray-500 sm:w-1/3 mb-1 sm:mb-0 uppercase tracking-wide text-[11px]">
                {key}
              </dt>
              {/* Value: High contrast for readability */}
              <dd className="text-sm text-gray-900 sm:w-2/3 font-medium">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {entries.length > 5 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 w-full py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
        >
          {isExpanded
            ? "Show Less"
            : `Show All Specifications (${entries.length})`}
        </button>
      )}
    </div>
  );
}
