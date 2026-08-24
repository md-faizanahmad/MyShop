export default function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 sm:mb-6 sm:gap-3">
          <div className="h-4 w-4 rounded-full bg-gray-300" />
          <div className="h-4 w-20 rounded bg-gray-300" />
          <div className="h-4 w-4 rounded-full bg-gray-300" />
          <div className="h-4 w-28 rounded bg-gray-300" />
        </div>

        {/* Product */}
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr] lg:gap-5">
          {/* Gallery */}
          <div className="min-w-0">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-4">
              {/* Thumbnails */}
              <div className="order-2 grid grid-cols-4 gap-2 lg:order-1 lg:flex lg:w-16 lg:shrink-0 lg:flex-col lg:gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square w-full rounded-lg bg-gray-200"
                  />
                ))}
              </div>

              {/* Main Image */}
              <div className="order-1 min-w-0 flex-1 lg:order-2">
                <div className="aspect-[1/0.9] max-h-[360px] rounded-lg bg-gray-200 sm:aspect-square sm:max-h-[480px] lg:max-h-none" />
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-6 sm:mt-8">
              <div className="mb-3 h-5 w-32 rounded bg-gray-300" />

              <div className="space-y-2.5">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="min-w-0 space-y-4">
            {/* Product Name */}
            <div>
              <div className="mb-1 h-3 w-28 rounded bg-gray-200" />
              <div className="h-5 w-3/4 rounded bg-gray-300" />
            </div>

            {/* Price */}
            <div>
              <div className="h-7 w-32 rounded bg-gray-300" />
              <div className="mt-2 h-3 w-28 rounded bg-gray-200" />

              <div className="mt-4 space-y-2 border-t border-gray-100 pt-3">
                <div className="h-4 w-32 rounded bg-gray-200" />
                <div className="h-4 w-36 rounded bg-gray-200" />
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>

              <div className="mt-4 h-4 w-32 rounded bg-gray-200" />
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="h-11 rounded-lg bg-gray-300 sm:h-12" />
              <div className="h-11 rounded-lg bg-gray-300 sm:h-12" />
            </div>

            {/* Description */}
            <div className="py-4 sm:py-6">
              <div className="mb-3 h-5 w-24 rounded bg-gray-300" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-11/12 rounded bg-gray-200" />
                <div className="h-4 w-4/5 rounded bg-gray-200" />
              </div>
            </div>

            {/* Specifications */}
            <div>
              <div className="mb-3 h-5 w-44 rounded bg-gray-300" />

              <div className="overflow-hidden rounded-lg border border-gray-200">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4"
                  >
                    <div className="h-3 w-20 rounded bg-gray-200" />
                    <div className="h-4 w-32 rounded bg-gray-200 sm:col-span-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-10 border-t pt-8 sm:mt-14 sm:pt-10">
          <div className="mx-auto mb-5 h-5 w-40 rounded bg-gray-300 sm:mb-6" />

          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 w-full rounded-lg bg-gray-200" />
            ))}
          </div>
        </section>

        {/* Suggested Products */}
        <section className="mt-10 sm:mt-14">
          <div className="mx-auto mb-5 h-5 w-48 rounded bg-gray-300 sm:mb-6" />

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-52 rounded-lg bg-gray-200 sm:h-56" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
