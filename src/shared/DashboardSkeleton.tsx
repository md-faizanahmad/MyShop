// src/components/dashboard/DashboardSkeleton.tsx
export default function DashboardSkeleton() {
  return (
    <div className="w-full bg-zinc-50 min-h-screen antialiased animate-pulse">
      {/* Top Breadcrumb Title Strip Skeleton */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="h-3 bg-zinc-200 w-48" />
          <div className="h-6 bg-zinc-200 w-24" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Navigation Console Skeleton */}
          <div className="lg:col-span-3 space-y-4">
            {/* Identity Profile Matrix Box */}
            <div className="bg-white border border-zinc-200 p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-200 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-2 bg-zinc-200 w-12" />
                <div className="h-3 bg-zinc-200 w-28" />
              </div>
            </div>

            {/* Navigation Menu Stack Box */}
            <div className="bg-white border border-zinc-200 p-4 space-y-4">
              <div className="space-y-2">
                <div className="h-2 bg-zinc-200 w-20" />
                <div className="h-3 bg-zinc-200 w-full" />
                <div className="h-3 bg-zinc-200 w-4/5" />
              </div>
              <div className="border-t border-zinc-100 pt-3 space-y-3">
                <div className="h-4 bg-zinc-200 w-full" />
                <div className="h-4 bg-zinc-200 w-full" />
              </div>
            </div>
          </div>

          {/* Right Main Content Matrix Skeleton */}
          <div className="lg:col-span-9 space-y-5">
            <div className="bg-white border border-zinc-200 p-6 space-y-4">
              <div className="h-4 bg-zinc-200 w-36 mb-2" />
              <div className="h-16 bg-zinc-100 w-full" />
              <div className="h-16 bg-zinc-100 w-full" />
              <div className="h-16 bg-zinc-100 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
