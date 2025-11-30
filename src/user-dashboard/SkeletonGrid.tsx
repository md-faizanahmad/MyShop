// src/components/SkeletonGrid.tsx
export default function SkeletonGrid({ count = 2 }: { count?: number }) {
  const items = Array.from({ length: count });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((_, i) => (
        <div
          key={i}
          className="rounded-2xl p-4 border border-gray-100 bg-white animate-pulse"
        >
          <div className="h-4 w-3/5 bg-gray-200 rounded mb-3" />
          <div className="h-3 w-2/5 bg-gray-200 rounded mb-4" />
          <div className="flex gap-3">
            <div className="w-16 h-16 bg-gray-200 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded" />
              <div className="h-3 w-1/2 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
