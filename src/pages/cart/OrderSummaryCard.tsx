// src/components/cart/OrderSummaryCard.tsx
import { Link } from "react-router-dom";
import { ArrowRight, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useState } from "react";
import { useCartStore } from "../../store/CartStore";

export default function OrderSummaryCard() {
  const { getTotalPrice, getTotalItems, clearCart } = useCartStore();
  const [showClearModal, setShowClearModal] = useState(false);
  const subtotal = getTotalPrice();

  const handleClearCart = () => {
    clearCart();
    setShowClearModal(false);
    toast.success("Cart cleared!", { icon: "Trash2", duration: 2000 });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl border border-sky-100 overflow-hidden"
      >
        {/* Gradient Header */}
        <div className="bg-linear-to-r from-sky-500 to-blue-600 text-white px-6 py-5">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <p className="text-sky-100 text-sm mt-1">
            {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold text-black">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between text-green-600 font-medium">
              <span>Shipping</span>
              <span>FREE</span>
            </div>

            {subtotal >= 999 && (
              <div className="bg-emerald-50 text-emerald-700 px-4 py-3 rounded-xl text-sm font-semibold text-center">
                FREE Shipping Unlocked!
              </div>
            )}
          </div>

          <div className="border-t-2 border-dashed border-sky-200 pt-6">
            <div className="flex justify-between items-baseline">
              <span className="text-xl font-bold text-gray-800">Total</span>
              <span className="text-3xl font-black text-sky-600">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <Link
            to="/checkout"
            className="w-full text-center bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-lg py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
          >
            Proceed to Checkout
            <ArrowRight size={24} />
          </Link>

          {/* Clear Cart Button */}
          <button
            onClick={() => setShowClearModal(true)}
            className="w-full flex items-center justify-center gap-3 py-4 text-red-600 font-semibold rounded-2xl border-2 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
          >
            <Trash2 size={22} />
            Clear Cart
          </button>
        </div>
      </motion.div>

      {/* Custom Modal – No confirm() */}
      <AnimatePresence>
        {showClearModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowClearModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 size={40} className="text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Clear Cart?
              </h3>
              <p className="text-gray-600 mb-8">
                All items will be removed from your cart. This cannot be undone.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowClearModal(false)}
                  className="flex-1 py-4 rounded-2xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearCart}
                  className="flex-1 py-4 rounded-2xl font-bold text-white bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg transition"
                >
                  Yes, Clear Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
