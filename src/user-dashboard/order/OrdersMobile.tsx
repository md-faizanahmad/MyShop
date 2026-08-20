import { Loader2, Package, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Order } from "@/types/order";
import OrderCard from "../OrderCard";
import OrdersPagination from "./OrdersPagination";

interface OrdersMobileProps {
  orders: Order[];
  totalCount: number;
  page: number;

  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;

  hasNextPage: boolean;
  hasPrevPage: boolean;

  onPreviousPage: () => void;
  onNextPage: () => void;
  onRetry: () => void;
}

export default function OrdersMobile({
  orders,
  totalCount,
  page,
  isLoading,
  isError,
  isFetching,
  hasNextPage,
  hasPrevPage,
  onPreviousPage,
  onNextPage,
  onRetry,
}: OrdersMobileProps) {
  return (
    <section className="min-h-screen px-3 py-5">
      {/* Header */}
      <header className="mb-5 flex items-center justify-between">
        <h1 className="flex min-w-0 items-center gap-2 text-lg font-semibold tracking-tight text-gray-900">
          <Package size={21} className="shrink-0 text-sky-500" />

          <span className="truncate">My Orders</span>

          {totalCount > 0 && (
            <span className="shrink-0 text-sm font-normal text-gray-500">
              ({totalCount})
            </span>
          )}
        </h1>

        {isFetching && !isLoading && (
          <span
            className="ml-2 flex shrink-0 items-center text-gray-400"
            aria-label="Updating orders"
          >
            <RefreshCw size={14} className="animate-spin" />
          </span>
        )}
      </header>

      {/* Loading */}
      {isLoading && (
        <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
          <Loader2
            size={32}
            className="animate-spin text-sky-500"
            aria-hidden="true"
          />

          <p className="mt-3 text-sm text-gray-500">Loading your orders…</p>
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div className="flex min-h-[55vh] flex-col items-center justify-center px-4 text-center">
          <Package
            size={48}
            className="mb-4 text-gray-300"
            aria-hidden="true"
          />

          <p className="text-sm font-medium text-gray-700">
            Failed to load orders
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Something went wrong while loading your orders.
          </p>

          <button
            type="button"
            onClick={onRetry}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-600 active:bg-sky-700"
          >
            <RefreshCw size={15} />
            Try Again
          </button>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && orders.length === 0 && (
        <div className="flex min-h-[55vh] flex-col items-center justify-center px-4 text-center">
          <Package
            size={64}
            className="mb-5 text-gray-300"
            aria-hidden="true"
          />

          <h2 className="text-base font-semibold text-gray-800">
            No orders yet
          </h2>

          <p className="mt-1 max-w-xs text-sm text-gray-500">
            You haven’t placed any orders yet.
          </p>

          <a
            href="/"
            className="mt-5 inline-flex items-center rounded-lg bg-sky-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
          >
            Start Shopping
          </a>
        </div>
      )}

      {/* Orders */}
      {!isLoading && !isError && orders.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <AnimatePresence mode="popLayout">
              {orders.map((order) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <OrderCard order={order} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          <OrdersPagination
            page={page}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
          />
        </>
      )}
    </section>
  );
}
