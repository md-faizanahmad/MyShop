// src/components/dashboard/DashboardSkeleton.tsx
export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-10 bg-gray-200 rounded-xl w-64" />
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full" />
            <div className="space-y-3 flex-1">
              <div className="h-6 bg-gray-200 rounded w-48" />
              <div className="h-4 bg-gray-200 rounded w-64" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-4/5" />
            <div className="h-4 bg-gray-200 rounded w-3/5" />
          </div>
          <div className="h-12 bg-gray-200 rounded-xl w-32" />
        </div>
      </div>
    </div>
  );
}
