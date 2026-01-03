export function ReviewSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse border rounded-xl p-5 bg-white">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="h-10 w-10 bg-gray-200 rounded-full" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-3 w-16 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="h-4 w-12 bg-gray-100 rounded" />
          </div>
          <div className="mt-4 h-4 w-full bg-gray-100 rounded" />
          <div className="mt-2 h-4 w-2/3 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
  );
}
