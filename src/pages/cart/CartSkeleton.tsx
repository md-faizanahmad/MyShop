// CartSkeleton.tsx
export default function CartSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex gap-5 bg-white rounded-2xl p-6 shadow animate-pulse"
          >
            <div className="w-28 h-28 bg-gray-200 rounded-xl" />
            <div className="flex-1 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-8 bg-gray-200 rounded w-32" />
              <div className="flex gap-4">
                <div className="w-11 h-11 bg-gray-200 rounded-full" />
                <div className="w-16 h-10 bg-gray-200 rounded" />
                <div className="w-11 h-11 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
