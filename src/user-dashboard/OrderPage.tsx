// import { Loader2, Package, RefreshCw } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useOrders } from "../hooks/useOrders";
// import OrderCard from "./OrderCard";

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

//   // Flatten all pages into one array

//   const orders = data?.pages.flatMap((p) => p.orders) ?? [];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-10">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-4xl font-bold text-gray-900 flex items-center gap-3"
//           >
//             <Package size={36} className="text-blue-600" />
//             My Orders
//             {orders.length > 0 && (
//               <span className="text-2xl font-normal text-gray-600">
//                 ({orders.length})
//               </span>
//             )}
//             <div className="mt-6">
//               {isFetching && !isFetchingNextPage && (
//                 <motion.small
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="text-xs text-gray-500 flex items-center gap-2"
//                 >
//                   <RefreshCw size={14} className="animate-spin" />
//                   Refreshing…
//                 </motion.small>
//               )}
//             </div>
//           </motion.h1>

//           {/* Refreshing indicator */}
//         </div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="space-y-8">
//             <div className="text-center py-12">
//               <Loader2
//                 className="mx-auto animate-spin text-blue-600"
//                 size={32}
//               />
//               <p className="mt-4 text-gray-600">Loading your orders…</p>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[1, 2, 3].map((i) => (
//                 <div
//                   key={i}
//                   className="bg-white rounded-2xl shadow-md p-6 animate-pulse"
//                 >
//                   <div className="h-4 bg-gray-200 rounded w-32 mb-4" />
//                   <div className="h-32 bg-gray-100 rounded-xl mb-4" />
//                   <div className="space-y-3">
//                     <div className="h-4 bg-gray-200 rounded w-full" />
//                     <div className="h-4 bg-gray-200 rounded w-200 " />
//                     <div className="h-8 bg-gray-200 rounded-lg w-24" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Error State */}
//         {isError && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="text-center py-20"
//           >
//             <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
//               <p className="text-red-700 font-medium mb-4">
//                 Couldn’t load your orders
//               </p>
//               <button
//                 onClick={() => refetch()}
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-medium"
//               >
//                 <RefreshCw size={18} />
//                 Try Again
//               </button>
//             </div>
//           </motion.div>
//         )}

//         {/* Empty State */}
//         {!isLoading && !isError && orders.length === 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center py-24"
//           >
//             <Package size={90} className="mx-auto text-gray-300 mb-8" />
//             <p className="text-2xl text-gray-600 mb-6">
//               You haven't placed any orders yet
//             </p>
//             <a
//               href="/"
//               className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
//             >
//               Start Shopping
//             </a>
//           </motion.div>
//         )}

//         {/* Orders List */}
//         {!isLoading && !isError && orders.length > 0 && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ staggerChildren: 0.1 }}
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
//             >
//               <AnimatePresence>
//                 {orders.map((order) => (
//                   <motion.div
//                     key={order._id}
//                     layout
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.9 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     <OrderCard order={order} />
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </motion.div>

//             {/* Load More */}
//             <div className="text-center mt-12">
//               {hasNextPage ? (
//                 <button
//                   onClick={() => fetchNextPage()}
//                   disabled={isFetchingNextPage}
//                   className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   {isFetchingNextPage ? (
//                     <>
//                       <Loader2 className="animate-spin" size={20} />
//                       Loading more…
//                     </>
//                   ) : (
//                     "Load More Orders"
//                   )}
//                 </button>
//               ) : (
//                 <p className="text-gray-500 text-lg">
//                   You've seen all your orders
//                 </p>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
///////////////// update with backend pagination
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Loader2,
  Package,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OrderCard from "./OrderCard";
import { apiClient as api } from "../lib/axios";
import type { PaginatedOrdersResponse } from "../types/order";

const PAGE_LIMIT = 6;

export default function OrdersPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching, refetch } =
    useQuery<PaginatedOrdersResponse>({
      queryKey: ["my-orders", page],
      queryFn: async () => {
        const { data } = await api.get<PaginatedOrdersResponse>(
          `/v1/orders/my-orders?page=${page}&limit=${PAGE_LIMIT}`
        );
        return data;
      },
      // React Query v5 replacement for keepPreviousData
      placeholderData: (prev) => prev,
      staleTime: 60_000,
    });

  const orders = data?.orders ?? [];
  const hasNextPage = Boolean(data?.hasMore);
  const hasPrevPage = page > 1;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h4 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Package size={34} className="text-blue-600" />
            My Orders
            {(data?.totalCount ?? 0) > 0 && (
              <span className="text-xl font-normal text-gray-600">
                ({data?.totalCount})
              </span>
            )}
          </h4>

          {isFetching && (
            <span className="text-xs text-gray-500 flex items-center gap-2">
              <RefreshCw size={14} className="animate-spin" />
              Updating…
            </span>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-20">
            <Loader2 className="mx-auto animate-spin text-blue-600" size={36} />
            <p className="mt-4 text-gray-600">Loading your orders…</p>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center py-20">
            <p className="text-red-600 mb-6">Failed to load orders</p>
            <button
              onClick={() => refetch()}
              className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && orders.length === 0 && (
          <div className="text-center py-24">
            <Package size={80} className="mx-auto text-gray-300 mb-6" />
            <p className="text-xl text-gray-600 mb-6">
              You haven’t placed any orders yet
            </p>
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700"
            >
              Start Shopping
            </a>
          </div>
        )}

        {/* Orders Grid */}
        {!isLoading && !isError && orders.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {orders.map((order) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <OrderCard order={order} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                disabled={!hasPrevPage}
                onClick={() => setPage((p) => p - 1)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40"
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              <span className="text-sm text-gray-600">Page {page}</span>

              <button
                disabled={!hasNextPage}
                onClick={() => setPage((p) => p + 1)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40"
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
