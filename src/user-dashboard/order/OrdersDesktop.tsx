import { Loader2, Package, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Order } from "@/types/order";
import OrderCard from "../OrderCard";
import OrdersPagination from "./OrdersPagination";
import OrdersDateFilter, {
  type OrderDateFilterValue,
} from "./OrdersDateFilter";

interface OrdersDesktopProps {
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

  dateFilter: OrderDateFilterValue;
  onDateFilterChange: (value: OrderDateFilterValue) => void;
  onClearDateFilter: () => void;
}

export default function OrdersDesktop({
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
  dateFilter,
  onDateFilterChange,
  onClearDateFilter,
}: OrdersDesktopProps) {
  return (
    <section className="min-h-screen px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-7 flex items-center justify-between gap-6">
          {/* TITLE */}
          <h4 className="flex min-w-0 items-center gap-2.5 text-2xl font-semibold leading-7 tracking-tight text-gray-900">
            <Package
              size={26}
              className="shrink-0 text-sky-500"
              aria-hidden="true"
            />

            <span>My Orders</span>

            {totalCount > 0 && (
              <span className="inline-flex h-7 shrink-0 items-center text-base font-normal leading-7 text-gray-500">
                ({totalCount})
              </span>
            )}
          </h4>

          {/* ACTIONS */}
          <div className="flex shrink-0 items-center gap-5">
            {isFetching && !isLoading && (
              <span
                className="flex shrink-0 items-center gap-2 text-xs text-gray-500"
                aria-label="Updating orders"
              >
                <RefreshCw
                  size={14}
                  className="animate-spin"
                  aria-hidden="true"
                />
                Updating…
              </span>
            )}

            <OrdersDateFilter
              value={dateFilter}
              onChange={onDateFilterChange}
              onClear={onClearDateFilter}
            />
          </div>
        </header>

        {/* Date Filter */}

        {/* Loading */}
        {isLoading && (
          <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
            <Loader2
              size={38}
              className="animate-spin text-sky-500"
              aria-hidden="true"
            />

            <p className="mt-4 text-sm text-gray-600">Loading your orders…</p>
          </div>
        )}

        {/* Error */}
        {isError && !isLoading && (
          <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
            <Package
              size={56}
              className="mb-5 text-gray-300"
              aria-hidden="true"
            />

            <p className="text-base font-medium text-gray-700">
              Failed to load orders
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Something went wrong while loading your orders.
            </p>

            <button
              type="button"
              onClick={onRetry}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-sky-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-600"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && orders.length === 0 && (
          <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
            <Package
              size={80}
              className="mb-6 text-gray-300"
              aria-hidden="true"
            />

            <h2 className="text-lg font-semibold text-gray-800">
              No orders found
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              You haven’t placed any orders for the selected period.
            </p>

            <a
              href="/"
              className="mt-6 inline-flex items-center rounded-lg bg-sky-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
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
              className="grid grid-cols-2 gap-5 xl:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {orders.map((order) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
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
      </div>
    </section>
  );
}
