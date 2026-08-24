interface ProductNameProps {
  name: string;
  categoryName?: string;
}

export default function ProductName({ name }: ProductNameProps) {
  if (!name || name.trim().length === 0) return null;

  return (
    <div className="w-full">
      <h1 className="max-w-2xl text-3xl font-semibold leading-snug text-gray-900">
        {name}
      </h1>
    </div>
  );
}
