// import { useSearchParams, Link } from "react-router-dom";

// export default function OrderSuccess() {
//   const [search] = useSearchParams();
//   const orderId = search.get("orderId");

//   return (
//     <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
//       <h1 className="text-3xl font-bold text-green-600">
//         🎉 Order Placed Successfully!
//       </h1>

//       <p className="text-gray-700 mt-3">
//         Thank you for shopping with us. Your order has been successfully
//         processed.
//       </p>
//       <p>OrderId:{orderId}</p>
//       {orderId && (
//         <Link
//           to={`/dashboard/orders/${orderId}`}
//           className="mt-5 text-blue-600 underline text-lg"
//         >
//           View Order Details
//         </Link>
//       )}

//       <Link
//         to="/"
//         className="mt-3 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
//       >
//         Continue Shopping
//       </Link>
//     </div>
//   );
// }
////////////////////Updated ui and ux
// src/pages/OrderSuccess.tsx
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  // Optional fallback if no orderId (still show success)
  const displayOrderId = orderId || "ORD" + Date.now().toString().slice(-6);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-32 h-32 bg-green-100 rounded-full mb-8"
          >
            <CheckCircle className="w-20 h-20 text-green-600" />
          </motion.div>

          {/* Main Message */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
          >
            Order Confirmed!
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-700 mb-6"
          >
            Thank you for your purchase! Your order has been placed
            successfully.
          </motion.p>

          {/* Order ID Card */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block bg-white rounded-2xl shadow-xl p-8 mb-10 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <Package className="text-blue-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">Order ID</h2>
            </div>
            <p className="text-3xl font-mono font-bold text-blue-600 tracking-wider">
              {displayOrderId}
            </p>
            <p className="text-sm text-gray-500 mt-3">
              We'll send confirmation to your email & phone
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {orderId ? (
              <Link
                to={`/orders/${orderId}`}
                className="inline-flex items-center gap-3 bg-linear-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition"
              >
                View Order Details
                <ArrowRight size={20} />
              </Link>
            ) : (
              <Link
                to="/orders"
                className="inline-flex items-center gap-3 bg-linear-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition"
              >
                View All Orders
                <ArrowRight size={20} />
              </Link>
            )}

            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-white text-gray-800 border-2 border-gray-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 transition"
            >
              <Home size={20} />
              Continue Shopping
            </Link>
          </motion.div>

          {/* Extra Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
          >
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md">
              <div className="text-4xl mb-2">Fast Delivery</div>
              <p className="text-gray-600">Get it in 2–5 days</p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md">
              <div className="text-4xl mb-2">Easy Tracking</div>
              <p className="text-gray-600">Real-time updates</p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md">
              <div className="text-4xl mb-2">Safe & Secure</div>
              <p className="text-gray-600">100% payment protection</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
