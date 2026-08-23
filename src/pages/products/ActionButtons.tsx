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
    <div className="mt-3 w-full sm:mt-4">
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={onCartToggle}
          disabled={outOfStock}
          className={`flex h-11 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-semibold transition sm:h-12 ${
            outOfStock
              ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
              : isInCart
                ? "border-gray-900 bg-gray-900 text-white hover:bg-gray-800"
                : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
          }`}
        >
          <ShoppingCart size={17} />
          <span>{isInCart ? "Remove from Cart" : "Add to Cart"}</span>
        </button>

        <button
          type="button"
          onClick={onBuyNow}
          disabled={outOfStock}
          className={`flex h-11 items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold transition sm:h-12 ${
            outOfStock
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <Zap size={17} />
          <span>Buy Now</span>
        </button>
      </div>

      {outOfStock && (
        <p className="mt-2 text-center text-xs font-medium text-red-600">
          Currently out of stock
        </p>
      )}
    </div>
  );
}
