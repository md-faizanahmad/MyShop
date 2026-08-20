// ///////////////// update with backend pagination
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import {
//   Loader2,
//   Package,
//   RefreshCw,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import OrderCard from "./OrderCard";
// import { apiClient as api } from "../lib/axios";
// import type { PaginatedOrdersResponse } from "../types/order";

// const PAGE_LIMIT = 6;

// export default function OrdersPage() {
//   const [page, setPage] = useState(1);

//   const { data, isLoading, isError, isFetching, refetch } =
//     useQuery<PaginatedOrdersResponse>({
//       queryKey: ["my-orders", page],
//       queryFn: async () => {
//         const { data } = await api.get<PaginatedOrdersResponse>(
//           `/v1/orders/my-orders?page=${page}&limit=${PAGE_LIMIT}`,
//         );
//         return data;
//       },
//       // React Query v5 replacement for keepPreviousData
//       placeholderData: (prev) => prev,
//       staleTime: 60_000,
//     });

//   const orders = data?.orders ?? [];
//   const hasNextPage = Boolean(data?.hasMore);
//   const hasPrevPage = page > 1;

//   return (
//     <div className="min-h-screen   py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6 flex items-center justify-between md:mb-8">
//           <h4 className="flex min-w-0 items-center gap-2 text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
//             <Package
//               size={22}
//               className="shrink-0 text-sky-500 md:size-[26px]"
//             />

//             <span className="truncate">My Orders</span>

//             {(data?.totalCount ?? 0) > 0 && (
//               <span className="shrink-0 text-sm font-normal text-gray-500 md:text-base">
//                 ({data?.totalCount})
//               </span>
//             )}
//           </h4>

//           {isFetching && (
//             <span className="ml-3 flex shrink-0 items-center gap-1.5 text-[11px] text-gray-500 md:gap-2 md:text-xs">
//               <RefreshCw size={13} className="animate-spin md:size-3.5" />
//               <span className="hidden sm:inline">Updating…</span>
//             </span>
//           )}
//         </div>

//         {/* Loading */}
//         {isLoading && (
//           <div className="text-center py-20">
//             <Loader2 className="mx-auto animate-spin text-blue-600" size={36} />
//             <p className="mt-4 text-gray-600">Loading your orders…</p>
//           </div>
//         )}

//         {/* Error */}
//         {isError && (
//           <div className="text-center py-20">
//             <p className="text-red-600 mb-6">Failed to load orders</p>
//             <button
//               onClick={() => refetch()}
//               className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700"
//             >
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* Empty */}
//         {!isLoading && !isError && orders.length === 0 && (
//           <div className="text-center py-24">
//             <Package size={80} className="mx-auto text-gray-300 mb-6" />
//             <p className="text-xl text-gray-600 mb-6">
//               You haven’t placed any orders yet
//             </p>
//             <a
//               href="/"
//               className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700"
//             >
//               Start Shopping
//             </a>
//           </div>
//         )}

//         {/* Orders Grid */}
//         {!isLoading && !isError && orders.length > 0 && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//             >
//               <AnimatePresence>
//                 {orders.map((order) => (
//                   <motion.div
//                     key={order._id}
//                     initial={{ opacity: 0, scale: 0.96 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0 }}
//                   >
//                     <OrderCard order={order} />
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </motion.div>

//             {/* Pagination */}
//             <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4">
//               <button
//                 disabled={!hasPrevPage}
//                 onClick={() => setPage((p) => p - 1)}
//                 className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40"
//               >
//                 <ChevronLeft size={18} />
//                 Previous
//               </button>

//               <span className="text-sm text-gray-600">Page {page}</span>

//               <button
//                 disabled={!hasNextPage}
//                 onClick={() => setPage((p) => p + 1)}
//                 className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-400 text-white hover:bg-sky-600 disabled:opacity-40"
//               >
//                 Next
//                 <ChevronRight size={18} />
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
/////////////////////////////// refactor 21-08
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient as api } from "../lib/axios";
import type { PaginatedOrdersResponse } from "../types/order";

import OrdersDesktop from "./OrdersDesktop";
import OrdersMobile from "./order/OrdersMobile";

const PAGE_LIMIT = 6;

export default function OrdersPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching, refetch } =
    useQuery<PaginatedOrdersResponse>({
      queryKey: ["my-orders", page],
      queryFn: async () => {
        const { data } = await api.get<PaginatedOrdersResponse>(
          `/v1/orders/my-orders?page=${page}&limit=${PAGE_LIMIT}`,
        );

        return data;
      },
      placeholderData: (prev) => prev,
      staleTime: 60_000,
    });

  const orders = data?.orders ?? [];
  const totalCount = data?.totalCount ?? 0;

  const hasNextPage = Boolean(data?.hasMore);
  const hasPrevPage = page > 1;

  const handlePreviousPage = () => {
    setPage((currentPage) => Math.max(1, currentPage - 1));
  };

  const handleNextPage = () => {
    if (!hasNextPage) return;

    setPage((currentPage) => currentPage + 1);
  };

  const handleRetry = () => {
    void refetch();
  };

  const commonProps = {
    orders,
    totalCount,
    page,
    isLoading,
    isError,
    isFetching,
    hasNextPage,
    hasPrevPage,
    onPreviousPage: handlePreviousPage,
    onNextPage: handleNextPage,
    onRetry: handleRetry,
  };

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        <OrdersMobile {...commonProps} />
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <OrdersDesktop {...commonProps} />
      </div>
    </>
  );
}
