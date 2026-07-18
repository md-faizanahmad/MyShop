// // src/pages/product/ActionButtons.tsx
// import { ShoppingCart, Zap } from "lucide-react";

// interface Props {
//   stock: number;

//   isInCart: boolean;

//   onCartToggle: () => void;
//   onBuyNow: () => void;
// }

// export default function ActionButtons({
//   stock,

//   isInCart,

//   onCartToggle,
//   onBuyNow,
// }: Props) {
//   const outOfStock = stock <= 0;

//   return (
//     <div className="flex flex-col gap-3 mt-6">
//       {/* Primary Action Row - Cart + Buy Now (Flipkart/Amazon style) */}
//       <div className="grid grid-cols-2 gap-3">
//         {/* Add to Cart / Remove - Largest & most prominent */}
//         <button
//           onClick={onCartToggle}
//           disabled={outOfStock}
//           className={`relative flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg
//             ${
//               outOfStock
//                 ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                 : isInCart
//                   ? "bg-red-600 text-white hover:bg-red-700"
//                   : "bg-blue-600 text-white hover:bg-blue-700"
//             }`}
//         >
//           <ShoppingCart size={24} />
//           {isInCart ? "Remove" : "Add to Cart"}
//         </button>

//         {/* Buy Now - Equal size, high urgency color */}
//         <button
//           onClick={onBuyNow}
//           disabled={outOfStock}
//           className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg
//             ${
//               outOfStock
//                 ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                 : "bg-blue-400 text-white hover:bg-blue-500"
//             }`}
//         >
//           <Zap size={24} />
//           Buy Now
//         </button>
//       </div>

//       {/* Wishlist - Removed full button since heart is now on image */}
//       {/* Optional: Keep a subtle text link if needed for accessibility/discoverability */}

//       {/* Out of Stock Message */}
//       {outOfStock && (
//         <p className="text-center text-red-600 font-semibold text-lg mt-4">
//           Out of Stock
//         </p>
//       )}
//     </div>
//   );
// }
////////////////////////////////////// Update11072026
// src/pages/product/ActionButtons.tsx
import { ShoppingCart, Zap } from "lucide-react";

interface Props {
  stock: number;
  isInCart: boolean;
  onCartToggle: () => void;
  onBuyNow: () => void;
}

export default function ActionButtons({
  stock,
  isInCart,
  onCartToggle,
  onBuyNow,
}: Props) {
  const outOfStock = stock <= 0;

  return (
    <div className="flex flex-col gap-2.5 mt-4 w-full antialiased">
      {/* Primary Action Grid — High-Conversion Retail Matrix */}
      <div className="grid grid-cols-2 gap-2">
        {/* Add to Cart Trigger */}
        <button
          onClick={onCartToggle}
          disabled={outOfStock}
          className={`flex items-center justify-center gap-2 h-11 px-4 text-xs font-bold uppercase tracking-wider transition-colors border select-none
            ${
              outOfStock
                ? "bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed"
                : isInCart
                  ? "bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-800"
                  : "bg-white text-zinc-900 border-zinc-300 hover:bg-zinc-50"
            }`}
        >
          <ShoppingCart size={13} strokeWidth={2.5} />
          <span>{isInCart ? "Remove Item" : "Add to Cart"}</span>
        </button>

        {/* Buy Now Instant Checkout — Premium Sky Anchor */}
        <button
          onClick={onBuyNow}
          disabled={outOfStock}
          className={`flex items-center justify-center gap-2 h-11 px-4 text-xs font-bold uppercase tracking-wider transition-colors select-none
            ${
              outOfStock
                ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                : "bg-sky-500 text-white hover:bg-sky-600 shadow-xs"
            }`}
        >
          <Zap size={13} strokeWidth={2.5} className="fill-current" />
          <span>Buy Now</span>
        </button>
      </div>

      {/* Structured Out of Stock Warning System */}
      {outOfStock && (
        <div className="mt-1 border border-red-100 bg-red-50/50 px-3 py-2 text-center">
          <p className="text-[11px] font-mono uppercase tracking-widest font-bold text-red-700">
            Come IN-STOCK Soon
          </p>
        </div>
      )}
    </div>
  );
}
