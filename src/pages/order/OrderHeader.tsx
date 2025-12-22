// components/order/OrderBreadcrumb.tsx
import { Link } from "react-router-dom";

interface Props {
  orderId: string;
  createdAt: string;
}

export default function OrderBreadcrumb({ orderId, createdAt }: Props) {
  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 px-4 py-3 text-xs sm:text-sm">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-gray-600">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>

          <Link to="/profile" className="hover:text-blue-600">
            My Profile
          </Link>
          <span>/</span>

          <Link to="/orders" className="hover:text-blue-600">
            My Orders
          </Link>
          <span>/</span>

          <span className="font-medium text-gray-900 truncate">{orderId}</span>
        </nav>

        {/* Separator */}
        <span className="hidden sm:inline text-gray-400 px-2">—</span>

        {/* Date & Time */}
        <span className="text-gray-500 whitespace-nowrap">
          {new Date(createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
