interface ProductNameProps {
  name: string;
  categoryName?: string;
}

export default function ProductName({
  name,
  categoryName = "Premium Selection",
}: ProductNameProps) {
  if (!name || name.trim().length === 0) return null;

  return (
    <div className="w-full">
      <div className="mb-1 text-xs font-medium text-gray-500">
        {categoryName}
      </div>

      <h1 className="max-w-2xl text-3xl font-semibold leading-snug text-gray-900">
        {name}
      </h1>
    </div>
  );
}
