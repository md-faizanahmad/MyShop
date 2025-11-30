export default function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-4 h-4 bg-gray-300 rounded-full" />
          <div className="w-24 h-4 bg-gray-300 rounded" />
          <div className="w-4 h-4 bg-gray-300 rounded-full" />
          <div className="w-32 h-4 bg-gray-300 rounded" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: Image Gallery */}
          <div>
            <div className="w-full aspect-square bg-gray-200 rounded-2xl" />

            <div className="mt-4 grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full aspect-square bg-gray-200 rounded-xl"
                />
              ))}
            </div>

            <div className="mt-6">
              <div className="w-40 h-5 bg-gray-300 rounded mb-2" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="space-y-5">
            <div className="w-3/4 h-7 bg-gray-300 rounded" />

            <div className="space-y-2 mt-4">
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
              <div className="h-3 bg-gray-200 rounded w-4/6" />
            </div>

            {/* Price */}
            <div className="w-32 h-8 bg-gray-300 rounded mt-6" />

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <div className="flex-1 h-12 bg-gray-300 rounded-xl" />
              <div className="w-24 h-12 bg-gray-300 rounded-xl" />
            </div>

            <div className="w-full h-20 bg-gray-200 rounded-xl mt-4" />
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-40 bg-gray-200 rounded-xl" />
          <div className="h-40 bg-gray-200 rounded-xl" />
        </div>

        {/* Reviews */}
        <div className="mt-16 border-t pt-10">
          <div className="w-56 h-6 bg-gray-300 rounded mx-auto mb-10" />

          <div className="space-y-4 max-w-3xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full h-20 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Suggested Products */}
        <div className="mt-16">
          <div className="w-64 h-6 bg-gray-300 rounded mx-auto mb-10" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-56 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
