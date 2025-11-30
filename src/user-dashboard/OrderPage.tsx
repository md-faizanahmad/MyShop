// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import type { Order } from "../types/order";
// import { Loader2 } from "lucide-react";

// const API = import.meta.env.VITE_API_URL;

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   async function loadOrders() {
//     try {
//       const { data } = await axios.get(`${API}/api/orders/my-orders`, {
//         withCredentials: true,
//       });

//       setOrders(data.orders);
//     } catch {
//       console.error("Failed to load orders");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-40">
//         <Loader2 className="animate-spin text-gray-500" size={28} />
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return <p className="text-gray-600">You have no orders yet.</p>;
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">My Orders</h1>

//       <div className="space-y-6">
//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="bg-white shadow rounded-lg p-4 border"
//           >
//             <div className="flex justify-between items-center">
//               <p className="font-semibold">
//                 Order ID:
//                 <span className="text-blue-600 ml-1">#{order._id}</span>
//               </p>

//               <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
//                 {order.status}
//               </span>
//             </div>

//             <p className="mt-1 text-gray-600 text-sm">
//               Placed: {new Date(order.createdAt).toLocaleString()}
//             </p>

//             <div className="mt-3 space-y-2">
//               {order.items.slice(0, 2).map((item) => (
//                 <div key={item.product._id} className="flex items-center gap-3">
//                   <img
//                     src={item.product.imageUrl}
//                     alt={item.product.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />

//                   <p className="text-sm">{item.product.name}</p>
//                 </div>
//               ))}

//               {order.items.length > 2 && (
//                 <p className="text-gray-500 text-xs">+ more items…</p>
//               )}
//             </div>

//             <div className="flex justify-between items-center mt-4">
//               <p className="font-semibold">₹{order.totalAmount}</p>

//               <Link
//                 to={`/order/${order._id}`}
//                 className="text-blue-600 hover:underline text-sm font-medium"
//               >
//                 View Details →
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
/////////////////New and Refactor

// src/pages/OrdersPage.tsx
// import { Loader2 } from "lucide-react";
// import { useOrders } from "../hooks/useOrders";
// import OrderCard from "./OrderCard";
// import SkeletonGrid from "./SkeletonGrid";
// import type { Order } from "../types/order";

// export default function OrdersPage() {
//   const {
//     data,
//     isLoading,
//     isError,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isFetching,
//     refetch,
//   } = useOrders();

//   // Flatten pages to a single array
//   const orders = data?.pages.flatMap((p: { orders: any }) => p.orders) ?? [];

//   if (isLoading) {
//     return (
//       <div>
//         <div className="flex items-center gap-3 mb-4 text-center">
//           <Loader2 className="animate-spin text-gray-500" size={18} />
//           <p className="text-sm py-5 text-gray-600 text-center mt-4">
//             Loading your orders…
//           </p>
//         </div>
//         <SkeletonGrid count={2} />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="py-8">
//         <p className="text-red-600">Couldn’t load orders.</p>
//         <button
//           onClick={() => refetch()}
//           className="mt-3 inline-flex items-center px-3 py-1.5 rounded-md border text-sm"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return <p className="text-gray-600">You have no orders yet.</p>;
//   }

//   return (
//     <section aria-labelledby="orders-title" className="space-y-6">
//       <div className="flex ms-8 items-center text-center justify-between">
//         <h1 id="orders-title" className="text-2xl py-5  font-bold">
//           My Orders
//         </h1>
//         <div className="flex items-center gap-3">
//           {isFetching && (
//             <small className="text-xs text-gray-500">Refreshing…</small>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 m-4 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {orders.map((order: Order) => (
//           <OrderCard key={order._id} order={order} />
//         ))}
//       </div>

//       <div className="flex items-center justify-center mt-2">
//         {hasNextPage ? (
//           <button
//             onClick={() => fetchNextPage()}
//             disabled={isFetchingNextPage}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-60"
//           >
//             {isFetchingNextPage ? (
//               <>
//                 <Loader2 className="animate-spin" size={16} /> Loading…
//               </>
//             ) : (
//               "Load more"
//             )}
//           </button>
//         ) : (
//           <p className="text-sm text-gray-500">No more orders.</p>
//         )}
//       </div>
//     </section>
//   );
// }
////////////update--// src/pages/OrdersPage.tsx or src/components/OrdersPage.tsx
import { Loader2, Package, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOrders } from "../hooks/useOrders";
import OrderCard from "./OrderCard";

export default function OrdersPage() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    refetch,
  } = useOrders();

  // Flatten all pages into one array
  const orders = data?.pages.flatMap((page) => page.orders) ?? [];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 flex items-center gap-3"
          >
            <Package size={36} className="text-blue-600" />
            My Orders
            {orders.length > 0 && (
              <span className="text-2xl font-normal text-gray-600">
                ({orders.length})
              </span>
            )}
            <div className="mt-6">
              {isFetching && !isFetchingNextPage && (
                <motion.small
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-gray-500 flex items-center gap-2"
                >
                  <RefreshCw size={14} className="animate-spin" />
                  Refreshing…
                </motion.small>
              )}
            </div>
          </motion.h1>

          {/* Refreshing indicator */}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-8">
            <div className="text-center py-12">
              <Loader2
                className="mx-auto animate-spin text-blue-600"
                size={32}
              />
              <p className="mt-4 text-gray-600">Loading your orders…</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-md p-6 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-32 mb-4" />
                  <div className="h-32 bg-gray-100 rounded-xl mb-4" />
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-200 " />
                    <div className="h-8 bg-gray-200 rounded-lg w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-red-700 font-medium mb-4">
                Couldn’t load your orders
              </p>
              <button
                onClick={() => refetch()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-medium"
              >
                <RefreshCw size={18} />
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <Package size={90} className="mx-auto text-gray-300 mb-8" />
            <p className="text-2xl text-gray-600 mb-6">
              You haven't placed any orders yet
            </p>
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Start Shopping
            </a>
          </motion.div>
        )}

        {/* Orders List */}
        {!isLoading && !isError && orders.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {orders.map((order) => (
                  <motion.div
                    key={order._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <OrderCard order={order} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load More */}
            <div className="text-center mt-12">
              {hasNextPage ? (
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isFetchingNextPage ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Loading more…
                    </>
                  ) : (
                    "Load More Orders"
                  )}
                </button>
              ) : (
                <p className="text-gray-500 text-lg">
                  You've seen all your orders
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
