export default function CategoryProductsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Skeleton (optional - like filters bar) */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-shimmer" />
          <div className="h-9 w-32 bg-gray-200 rounded-lg animate-shimmer" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Grid of Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {[...Array(20)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Single Product Card Skeleton (Instagram + Amazon Style)
function ProductCardSkeleton() {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="aspect-square relative bg-gray-200">
        <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-gray-200 via-gray-100 to-gray-200" />

        {/* Wishlist heart (top right) */}
        <div className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm">
          <div className="h-5 w-5 m-2 bg-gray-300 rounded-full animate-shimmer" />
        </div>
      </div>

      <div className="p-3 space-y-2">
        {/* Brand / Category */}
        <div className="h-4 w-3/4 bg-gray-200 rounded-full animate-shimmer" />

        {/* Product Title - 2 lines */}
        <div className="space-y-1.5">
          <div className="h-4 bg-gray-200 rounded-full animate-shimmer w-full" />
          <div className="h-4 bg-gray-200 rounded-full animate-shimmer w-11/12" />
        </div>

        {/* Rating (optional) */}
        <div className="flex items-center gap-1 pt-1">
          <div className="h-4 w-4 bg-gray-200 rounded animate-shimmer" />
          <div className="h-3 w-16 bg-gray-200 rounded-full animate-shimmer" />
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 pt-1">
          <div className="h-6 w-20 bg-gray-300 rounded animate-shimmer" />
          <div className="h-5 w-14 bg-gray-200 rounded animate-shimmer line-through opacity-70" />
        </div>

        {/* Discount badge (optional) */}
        <div className="absolute top-3 left-3">
          <div className="h-6 w-12 bg-red-200 rounded-full animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
