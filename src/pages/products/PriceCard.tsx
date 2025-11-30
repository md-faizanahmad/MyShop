// src/components/product/PriceCard.tsx
import { motion } from "framer-motion";
import { CheckCircle2, Zap, AlertCircle } from "lucide-react";

interface PriceCardProps {
  price: number; // Original MRP
  discountedPrice?: number; // Optional: final price after discount
  stock: number;
  savings?: number; // Optional: total savings
  offerText?: string; // e.g., "Diwali Sale", "Bank Offer"
}

export default function PriceCard({
  price,
  discountedPrice,
  stock,
  savings,
  offerText = "Limited Time Deal",
}: PriceCardProps) {
  // Auto-calculate if not provided
  const finalPrice =
    discountedPrice || Math.max(price - (savings || 5000), 999);
  const totalSavings = savings || price - finalPrice;

  const isLowStock = stock > 0 && stock <= 10;
  const isOutOfStock = stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Top Offer Banner */}
      <div className="bg-linear-to-r from-orange-500 to-red-600 text-white px-4 py-2.5 text-center font-bold text-sm flex items-center justify-center gap-2">
        <Zap size={16} className="animate-pulse" />
        {offerText} • Save ₹{totalSavings.toLocaleString()}!
      </div>

      <div className="p-5 space-y-5">
        {/* Final Price */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">
              Deal Price
            </span>
            {totalSavings > 3000 && (
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded">
                Best Price
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-black text-gray-900">
              ₹{finalPrice.toLocaleString()}
            </span>
            <span className="text-lg text-gray-500">incl. all taxes</span>
          </div>
        </div>

        {/* MRP + Savings */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-500 line-through">
            ₹{price.toLocaleString()}
          </span>
          <span className="text-green-600 font-bold">
            −₹{totalSavings.toLocaleString()} (
            {Math.round((totalSavings / price) * 100)}% off)
          </span>
        </div>

        {/* Extra Offers */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-green-700 font-medium">
            <CheckCircle2 size={16} />
            <span>Extra ₹500 off on Axis Bank Credit Card</span>
          </div>
          <div className="flex items-center gap-2 text-green-700 font-medium">
            <CheckCircle2 size={16} />
            <span>No Cost EMI available</span>
          </div>
        </div>

        {/* Stock Status */}
        <div className="pt-4 border-t border-gray-100">
          {isOutOfStock ? (
            <div className="flex items-center gap-2 text-red-600 font-bold">
              <AlertCircle size={20} />
              <span>Out of Stock</span>
            </div>
          ) : isLowStock ? (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Hurry! Only</span>
              <span className="text-xl font-black text-red-600">
                {stock} left
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle2 size={18} />
              <span>In Stock • Free Delivery</span>
            </div>
          )}
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
          <span>7-day replacement</span>
          <span>Genuine Product</span>
          <span>Cash on Delivery</span>
        </div>
      </div>
    </motion.div>
  );
}
