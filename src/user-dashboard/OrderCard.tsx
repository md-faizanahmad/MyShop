// src/components/OrderCard.tsx
import { Link } from "react-router-dom";
import type { Order } from "../types/order";

function statusClasses(status: string) {
  switch ((status || "").toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "processing":
      return "bg-indigo-100 text-indigo-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "in-transit":
      return "bg-sky-100 text-sky-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
    case "canceled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function formatCurrency(amount?: number) {
  if (typeof amount !== "number") return "—";
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });
}

export default function OrderCard({ order }: { order: Order }) {
  const statusClass = statusClasses(order.status);

  return (
    <article className="bg-white  border border-gray-100  rounded-2xl shadow-sm p-4 sm:p-5 transition">
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-semibold truncate">
            Order <span className="text-sky-600">#{order._id}</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
            Placed:{" "}
            <time dateTime={order.createdAt}>
              {new Date(order.createdAt).toLocaleString()}
            </time>
          </p>
        </div>

        <span
          className={`inline-flex items-center text-xs sm:text-sm px-3 py-1 rounded-full font-medium ${statusClass}`}
        >
          {order.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-3">
          {order.items.slice(0, 2).map((item) => (
            <div key={item.product._id} className="flex items-center gap-3">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                loading="lazy"
                decoding="async"
                width={64}
                height={64}
                className="w-16 h-16 object-cover rounded-md shrink-0 border border-gray-100"
              />
              <div className="min-w-0">
                <p className="text-sm truncate">{item.product.name}</p>
                <p className="text-xs text-gray-500">
                  {item.qty} × {formatCurrency(item.price)}
                </p>
              </div>
            </div>
          ))}

          {order.items.length > 2 && (
            <p className="text-xs text-gray-400">
              + {order.items.length - 2} more item(s)
            </p>
          )}
        </div>

        <div className="flex flex-col justify-between items-start sm:items-end gap-3">
          <p className="text-sm font-semibold">
            {formatCurrency(order.totalAmount)}
          </p>
          <Link
            to={`/order/${order._id}`}
            className="inline-flex items-center text-sm font-medium text-sky-600 hover:underline"
          >
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
