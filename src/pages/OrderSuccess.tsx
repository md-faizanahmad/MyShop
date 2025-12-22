// src/pages/OrderSuccess.tsx
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight, Home, Download } from "lucide-react";

const API = import.meta.env.VITE_API_URL as string;

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const displayOrderId = orderId ?? "ORD-" + Date.now().toString().slice(-6);

  const handleInvoiceDownload = (): void => {
    if (!orderId) return;

    // 🔒 HttpOnly cookies will be sent automatically
    window.open(`${API}/v1/orders/invoice/${orderId}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center"
        >
          {/* Icon */}
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Order Confirmed
          </h1>

          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Your payment was successful. We’ve received your order.
          </p>

          {/* Order Info */}
          <div className="mt-6 rounded-xl border bg-gray-50 p-4 text-left">
            <div className="flex items-center gap-3 mb-2">
              <Package className="text-blue-600" size={20} />
              <span className="font-semibold text-gray-800">Order ID</span>
            </div>

            <p className="font-mono text-sm sm:text-base text-blue-600 break-all">
              {displayOrderId}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              Invoice & order details are available below.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3">
            {orderId && (
              <>
                <Link
                  to={`/order/${orderId}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
                >
                  View Order
                  <ArrowRight size={16} />
                </Link>

                <button
                  onClick={handleInvoiceDownload}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
                >
                  <Download size={16} />
                  Download Invoice
                </button>
              </>
            )}

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-200 transition"
            >
              <Home size={16} />
              Continue Shopping
            </Link>
          </div>

          {/* Trust Info */}
          <div className="mt-8 grid grid-cols-3 gap-3 text-xs text-gray-600">
            <div className="rounded-lg bg-gray-50 p-3">🚚 Fast Delivery</div>
            <div className="rounded-lg bg-gray-50 p-3">📦 Easy Tracking</div>
            <div className="rounded-lg bg-gray-50 p-3">🔒 Secure Payment</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
