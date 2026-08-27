// // src/components/ProfileRecentOrders.tsx
// import { Package } from "lucide-react";
// import type { Order } from "../types/order";

// interface Props {
//   orders?: Order[]; // optional
//   loading: boolean;
//   error: boolean;
// }

// export default function ProfileRecentOrders({ orders, loading, error }: Props) {
//   // 🔒 SINGLE SOURCE OF TRUTH
//   const safeOrders: Order[] = Array.isArray(orders) ? orders : [];

//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl shadow p-6">
//         <p className="text-gray-500">Loading recent orders…</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-white rounded-2xl shadow p-6 text-red-600">
//         Failed to load orders
//       </div>
//     );
//   }

//   if (safeOrders.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl shadow p-6 text-center">
//         <Package className="mx-auto text-gray-300 mb-3" />
//         <p className="text-gray-600">No orders yet</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow p-6">
//       <h3 className="text-xl font-bold mb-4">Recent Orders</h3>

//       <div className="space-y-3">
//         {safeOrders.slice(0, 3).map((order) => (
//           <div
//             key={order._id}
//             className="flex justify-between bg-gray-50 p-4 rounded-xl"
//           >
//             <div>
//               <p className="font-semibold text-sm">
//                 #{order.paymentInfo.orderId}
//               </p>
//               <p className="text-xs text-gray-500">
//                 {new Date(order.createdAt).toLocaleDateString("en-IN")}
//               </p>
//             </div>

//             <div className="text-right">
//               <p className="font-bold">
//                 ₹{order.totalAmount.toLocaleString("en-IN")}
//               </p>
//               <span className="text-xs capitalize text-gray-600">
//                 {order.status}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
////////////////////////// Refactor and Update 27-08
import { ChevronRight, Package } from "lucide-react";
import type { Order } from "../types/order";
import { Link } from "react-router-dom";

interface Props {
  orders?: Order[]; // optional
  loading: boolean;
  error: boolean;
}

export default function ProfileRecentOrders({ orders, loading, error }: Props) {
  //  SINGLE SOURCE OF TRUTH
  const safeOrders: Order[] = Array.isArray(orders) ? orders : [];

  if (loading) {
    return (
      <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-100 px-4 py-4 sm:px-5">
          <div className="h-5 w-32 animate-pulse rounded bg-zinc-100" />
          <div className="mt-2 h-3 w-44 animate-pulse rounded bg-zinc-100" />
        </div>

        <div className="divide-y divide-zinc-100">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5"
            >
              <div className="min-w-0 flex-1">
                <div className="h-4 w-28 animate-pulse rounded bg-zinc-100" />
                <div className="mt-2 h-3 w-36 animate-pulse rounded bg-zinc-100" />
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="h-4 w-16 animate-pulse rounded bg-zinc-100" />
                <div className="h-5 w-20 animate-pulse rounded-full bg-zinc-100" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-xl border border-red-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50">
            <Package size={17} className="text-red-500" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900">
              Recent Orders
            </h3>
            <p className="mt-0.5 text-xs text-red-600">Failed to load orders</p>
          </div>
        </div>
      </section>
    );
  }

  if (safeOrders.length === 0) {
    return (
      <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-100 px-4 py-4 sm:px-5">
          <h3 className="text-base font-semibold text-zinc-900">
            Recent Orders
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500">
            Your latest purchases will appear here
          </p>
        </div>

        <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
            <Package size={20} className="text-zinc-400" />
          </div>

          <p className="text-sm font-medium text-zinc-800">No orders yet</p>

          <p className="mt-1 max-w-xs text-xs text-zinc-500">
            Once you place an order, you’ll be able to track it from here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-zinc-100 px-4 py-4 sm:px-5">
        <div>
          <h3 className="text-base font-semibold text-zinc-900">
            Recent Orders
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500">Your latest purchases</p>
        </div>

        <Link
          to="/orders"
          className="group inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-sky-600 transition hover:text-sky-700"
        >
          View all
          <ChevronRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {/* Orders */}
      <div className="divide-y divide-zinc-100">
        {safeOrders.slice(0, 3).map((order) => (
          <div
            key={order._id}
            className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-zinc-50/70 sm:px-5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
                <Package size={17} className="text-zinc-500" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-zinc-900">
                  #{order.paymentInfo.orderId}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <p className="text-sm font-semibold text-zinc-900">
                ₹{order.totalAmount.toLocaleString("en-IN")}
              </p>

              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold capitalize text-zinc-600">
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
