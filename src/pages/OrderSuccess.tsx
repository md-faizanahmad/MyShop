// // src/pages/OrderSuccess.tsx
// import { useSearchParams, Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { CheckCircle, Package, ArrowRight, Home, Download } from "lucide-react";

// const API = import.meta.env.VITE_API_URL as string;

// export default function OrderSuccess() {
//   const [searchParams] = useSearchParams();
//   const orderId = searchParams.get("orderId");

//   const displayOrderId = orderId ?? "ORD-" + Date.now().toString().slice(-6);

//   const handleInvoiceDownload = (): void => {
//     if (!orderId) return;

//     // 🔒 HttpOnly cookies will be sent automatically
//     window.open(`${API}/v1/orders/invoice/${orderId}`, "_blank");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8 sm:py-12">
//       <div className="mx-auto max-w-xl">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center"
//         >
//           {/* Icon */}
//           <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
//             <CheckCircle className="h-8 w-8 text-green-600" />
//           </div>

//           {/* Title */}
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//             Order Confirmed
//           </h1>

//           <p className="mt-2 text-sm sm:text-base text-gray-600">
//             Your payment was successful. We’ve received your order.
//           </p>

//           {/* Order Info */}
//           <div className="mt-6 rounded-xl border bg-gray-50 p-4 text-left">
//             <div className="flex items-center gap-3 mb-2">
//               <Package className="text-blue-600" size={20} />
//               <span className="font-semibold text-gray-800">Order ID</span>
//             </div>

//             <p className="font-mono text-sm sm:text-base text-blue-600 break-all">
//               {displayOrderId}
//             </p>

//             <p className="mt-2 text-xs text-gray-500">
//               Invoice & order details are available below.
//             </p>
//           </div>

//           {/* Actions */}
//           <div className="mt-6 flex flex-col gap-3">
//             {orderId && (
//               <>
//                 <Link
//                   to={`/order/${orderId}`}
//                   className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
//                 >
//                   View Order
//                   <ArrowRight size={16} />
//                 </Link>

//                 <button
//                   onClick={handleInvoiceDownload}
//                   className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
//                 >
//                   <Download size={16} />
//                   Download Invoice
//                 </button>
//               </>
//             )}

//             <Link
//               to="/"
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-200 transition"
//             >
//               <Home size={16} />
//               Continue Shopping
//             </Link>
//           </div>

//           {/* Trust Info */}
//           <div className="mt-8 grid grid-cols-3 gap-3 text-xs text-gray-600">
//             <div className="rounded-lg bg-gray-50 p-3">🚚 Fast Delivery</div>
//             <div className="rounded-lg bg-gray-50 p-3">📦 Easy Tracking</div>
//             <div className="rounded-lg bg-gray-50 p-3">🔒 Secure Payment</div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
//////////////////////19-08-2026
// src/pages/OrderSuccess.tsx
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Package,
  ArrowRight,
  Home,
  Download,
  Truck,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";

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
    <main className="min-h-dvh bg-stone-50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden border border-stone-200 bg-white"
        >
          {/* Success Header */}
          <div className="border-b border-stone-200 px-5 py-7 text-center sm:px-8 sm:py-9">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border border-emerald-200 bg-emerald-50">
              <CheckCircle
                className="h-7 w-7 text-emerald-600"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>

            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
              Payment successful
            </p>

            <h1 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
              Order Confirmed
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-500">
              Your payment was successful. We’ve received your order.
            </p>
          </div>

          {/* Order Information */}
          <div className="grid lg:grid-cols-[1fr_280px]">
            <div className="border-b border-stone-200 lg:border-b-0 lg:border-r">
              <div className="px-5 py-5 sm:px-8 sm:py-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-stone-200 bg-stone-50">
                    <Package
                      size={18}
                      className="text-stone-700"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                      Order ID
                    </p>

                    <p className="mt-1 break-all font-mono text-sm font-semibold text-stone-900 sm:text-base">
                      {displayOrderId}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-stone-100 pt-4">
                  <p className="text-sm leading-6 text-stone-500">
                    Invoice & order details are available below.
                  </p>
                </div>
              </div>

              {/* Trust Information */}
              <div className="border-t border-stone-200">
                <div className="grid grid-cols-1 divide-y divide-stone-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  <div className="flex items-center gap-3 px-5 py-4 sm:block sm:px-6">
                    <Truck
                      size={18}
                      className="shrink-0 text-stone-600 sm:mb-2"
                      aria-hidden="true"
                    />

                    <div>
                      <p className="text-xs font-semibold text-stone-800">
                        Fast Delivery
                      </p>
                      <p className="mt-0.5 text-[11px] leading-4 text-stone-400">
                        Reliable shipping
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 px-5 py-4 sm:block sm:px-6">
                    <PackageCheck
                      size={18}
                      className="shrink-0 text-stone-600 sm:mb-2"
                      aria-hidden="true"
                    />

                    <div>
                      <p className="text-xs font-semibold text-stone-800">
                        Easy Tracking
                      </p>
                      <p className="mt-0.5 text-[11px] leading-4 text-stone-400">
                        Track your order
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 px-5 py-4 sm:block sm:px-6">
                    <ShieldCheck
                      size={18}
                      className="shrink-0 text-stone-600 sm:mb-2"
                      aria-hidden="true"
                    />

                    <div>
                      <p className="text-xs font-semibold text-stone-800">
                        Secure Payment
                      </p>
                      <p className="mt-0.5 text-[11px] leading-4 text-stone-400">
                        Payment protected
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col p-5 sm:p-8 lg:p-6">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Next steps
                </p>
                <p className="mt-1 text-sm text-stone-600">
                  Manage your order or continue shopping.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                {orderId && (
                  <>
                    <Link
                      to={`/order/${orderId}`}
                      className="inline-flex h-11 items-center justify-center gap-2 bg-stone-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"
                    >
                      View Order
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>

                    <button
                      onClick={handleInvoiceDownload}
                      className="inline-flex h-11 items-center justify-center gap-2 border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"
                    >
                      <Download size={16} aria-hidden="true" />
                      Download Invoice
                    </button>
                  </>
                )}

                <Link
                  to="/"
                  className="inline-flex h-11 items-center justify-center gap-2 border border-stone-200 px-4 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2"
                >
                  <Home size={16} aria-hidden="true" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Small footer note */}
        <p className="mt-5 text-center text-xs text-stone-400">
          Thank you for shopping with us.
        </p>
      </div>
    </main>
  );
}
