// // src/components/product/PriceCard.tsx
// import { motion } from "framer-motion";
// import { CheckCircle2, Zap, AlertCircle } from "lucide-react";

// interface PriceCardProps {
//   price: number; // Original MRP
//   discountedPrice?: number; // Optional: final price after discount
//   stock: number;
//   savings?: number; // Optional: total savings
//   offerText?: string; // e.g., "Diwali Sale", "Bank Offer"
// }

// export default function PriceCard({
//   price,
//   discountedPrice,
//   stock,
//   savings,
//   offerText = "Limited Time Deal",
// }: PriceCardProps) {
//   // Auto-calculate if not provided
//   const finalPrice =
//     discountedPrice || Math.max(price - (savings || 5000), 999);
//   const totalSavings = savings || price - finalPrice;

//   const isLowStock = stock > 0 && stock <= 10;
//   const isOutOfStock = stock === 0;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//       className="bg-white   border border-gray-100 overflow-hidden"
//     >
//       {/* Top Offer Banner */}
//       <div className="bg-linear-to-r from-orange-500 to-red-600 text-white px-4 py-2.5 text-center font-bold text-sm flex items-center justify-center gap-2">
//         <Zap size={16} className="animate-pulse" />
//         {offerText} • Save ₹{totalSavings.toLocaleString()}!
//       </div>

//       <div className="p-5 space-y-5">
//         {/* Final Price */}
//         <div className="space-y-1">
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium text-gray-600">
//               Deal Price
//             </span>
//             {totalSavings > 3000 && (
//               <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded">
//                 Best Price
//               </span>
//             )}
//           </div>
//           <div className="flex items-baseline gap-3">
//             <span className="text-4xl font-black text-gray-900">
//               ₹{finalPrice.toLocaleString()}
//             </span>
//             <span className="text-lg text-gray-500">incl. all taxes</span>
//           </div>
//         </div>

//         {/* MRP + Savings */}
//         <div className="flex items-center gap-4 text-sm">
//           <span className="text-gray-500 line-through">
//             ₹{price.toLocaleString()}
//           </span>
//           <span className="text-green-600 font-bold">
//             −₹{totalSavings.toLocaleString()} (
//             {Math.round((totalSavings / price) * 100)}% off)
//           </span>
//         </div>

//         {/* Extra Offers */}
//         <div className="space-y-2 text-sm">
//           <div className="flex items-center gap-2 text-green-700 font-medium">
//             <CheckCircle2 size={16} />
//             <span>Extra ₹500 off on Axis Bank Credit Card</span>
//           </div>
//           <div className="flex items-center gap-2 text-green-700 font-medium">
//             <CheckCircle2 size={16} />
//             <span>No Cost EMI available</span>
//           </div>
//         </div>

//         {/* Stock Status */}
//         <div className="pt-4 border-t border-gray-100">
//           {isOutOfStock ? (
//             <div className="flex items-center gap-2 text-red-600 font-bold">
//               <AlertCircle size={20} />
//               <span>Out of Stock</span>
//             </div>
//           ) : isLowStock ? (
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-gray-600">Hurry! Only</span>
//               <span className="text-xl font-black text-red-600">
//                 {stock} left
//               </span>
//             </div>
//           ) : (
//             <div className="flex items-center gap-2 text-green-600 font-medium">
//               <CheckCircle2 size={18} />
//               <span>In Stock • Free Delivery</span>
//             </div>
//           )}
//         </div>

//         {/* Trust Badges */}
//         <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
//           <span>7-day replacement</span>
//           <span>Genuine Product</span>
//           <span>Cash on Delivery</span>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
////////////////////////////////////////////////////////////////// NEw design 11072026
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-transparent antialiased py-2"
    >
      {/* Structural Minimalist Tag instead of loud banners */}
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold mb-3">
        <Zap size={11} strokeWidth={2.5} />
        <span>{offerText}</span>
        <span className="text-zinc-300">/</span>
        <span>Save ₹{totalSavings.toLocaleString()}</span>
      </div>

      <div className="space-y-4">
        {/* Core Pricing Info Block */}
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl font-black tracking-tight text-zinc-900">
              ₹{finalPrice.toLocaleString()}
            </span>
            {totalSavings > 3000 && (
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-700">
                [ Best Offer ]
              </span>
            )}
          </div>
          <span className="text-[11px] text-zinc-400 font-medium">
            Inclusive of all local taxes
          </span>
        </div>

        {/* MRP Breakdown */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <span className="text-zinc-400 line-through">
            MRP ₹{price.toLocaleString()}
          </span>
          <span>•</span>
          <span>
            Reduced by −₹{totalSavings.toLocaleString()}{" "}
            <span className="text-emerald-700 font-bold">
              ({Math.round((totalSavings / price) * 100)}% off)
            </span>
          </span>
        </div>

        {/* Clean E-commerce Offer Rows */}
        <div className="space-y-2 pt-2 border-t border-zinc-100">
          <div className="flex items-start gap-2 text-xs text-zinc-600">
            <CheckCircle2
              size={13}
              className="text-emerald-700 mt-0.5 flex-shrink-0"
            />
            <span>Extra ₹500 instant bank discount applicable at checkout</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-zinc-600">
            <CheckCircle2
              size={13}
              className="text-emerald-700 mt-0.5 flex-shrink-0"
            />
            <span>No Cost EMI options available for this selection</span>
          </div>
        </div>

        {/* Inventory Context */}
        <div className="pt-2">
          {isOutOfStock ? (
            <div className="flex items-center gap-1.5 text-red-700 font-mono text-xs uppercase tracking-wider font-bold">
              <AlertCircle size={13} strokeWidth={2.5} />
              <span>Out of Stock</span>
            </div>
          ) : isLowStock ? (
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-red-700 font-mono uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
              <span>Hurry, only {stock} items left in stock</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold font-mono uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>In Stock &bull; Free Delivery</span>
            </div>
          )}
        </div>

        {/* Trust Specification Rows */}
        <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-400 uppercase tracking-widest pt-2 border-t border-zinc-100">
          <span>7-Day Replacement</span>
          <span>&middot;</span>
          <span>Genuine Stock</span>
          <span>&middot;</span>
          <span>COD Eligible</span>
        </div>
      </div>
    </motion.div>
  );
}
