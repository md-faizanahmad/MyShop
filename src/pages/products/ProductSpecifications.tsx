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

  const displayedEntries = isExpanded ? entries : entries.slice(0, 5);

  return (
    <section className="mt-6 sm:mt-8">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">
        Product Specifications
      </h2>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <dl>
          {displayedEntries.map(([key, value], index) => (
            <div
              key={key}
              className={`grid grid-cols-[42%_58%] items-center px-3 py-3 sm:grid-cols-[35%_65%] sm:px-4 ${
                index > 0 ? "border-t border-gray-100" : ""
              } ${index % 2 === 1 ? "bg-gray-50/70" : ""}`}
            >
              <dt className="pr-3 text-xs font-medium text-gray-500 sm:text-sm">
                {key}
              </dt>

              <dd className="text-sm font-medium text-gray-900">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {entries.length > 5 && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 w-full rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-medium text-sky-600 transition hover:bg-gray-50"
        >
          {isExpanded
            ? "Show Less"
            : `Show All Specifications (${entries.length})`}
        </button>
      )}
    </section>
  );
}
