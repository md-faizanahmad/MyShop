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
    <div className="w-full py-1">
      <div className="mb-1.5 text-xs font-medium text-gray-500">
        {categoryName}
      </div>

      <h1 className="max-w-2xl text-xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-2xl">
        {name}
      </h1>
    </div>
  );
}
