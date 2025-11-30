interface ProductSpecificationsProps {
  specifications: Record<string, string>;
}

export default function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) {
  const entries = Object.entries(specifications);
  if (!entries.length) return null;

  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold mb-4">Specifications</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {entries.map(([key, value]) => (
          <div key={key} className="flex gap-3 border-b pb-2">
            <span className="w-32 text-gray-500 text-sm">{key}</span>
            <span className="text-gray-900 text-sm font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
