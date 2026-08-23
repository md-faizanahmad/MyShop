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
      <h2 className="mb-3 text-lg font-semibold text-gray-900 sm:text-xl">
        Product Specifications
      </h2>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <dl>
          {displayedEntries.map(([key, value], index) => (
            <div
              key={key}
              className={`grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4 ${
                index > 0 ? "border-t border-gray-100" : ""
              } ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <dt className="text-xs font-medium text-gray-500 sm:text-sm">
                {key}
              </dt>

              <dd className="text-sm font-medium text-gray-900 sm:col-span-2">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {entries.length > 5 && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 w-full rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-gray-50"
        >
          {isExpanded
            ? "Show Less"
            : `Show All Specifications (${entries.length})`}
        </button>
      )}
    </section>
  );
}
