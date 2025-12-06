// // // src/components/cart/CartItemsList.tsx
// // import { motion, AnimatePresence } from "framer-motion";
// // import { Minus, Plus, Trash2 } from "lucide-react";
// // import { useDebouncedCallback } from "use-debounce";
// // import axios from "axios";
// // import React from "react";
// // import type { CartItem } from "../../types/cartItem";

// // const API = import.meta.env.VITE_API_URL;

// // const CartItemRow = motion(
// //   React.memo(({ item, onQtyChange, onRemove }: any) => {
// //     const debouncedUpdate = useDebouncedCallback((qty: number) => {
// //       axios
// //         .put(
// //           `${API}/v1/cart/update`,
// //           { productId: item.product._id, qty },
// //           { withCredentials: true }
// //         )
// //         .catch(() => onQtyChange(item.product._id, item.qty)); // rollback if failed
// //     }, 400);

// //     const handleQty = (newQty: number) => {
// //       onQtyChange(item.product._id, newQty);
// //       if (newQty >= 1) debouncedUpdate(newQty);
// //     };

// //     return (
// //       <motion.div
// //         layout
// //         initial={{ opacity: 0, x: -30 }}
// //         animate={{ opacity: 1, x: 0 }}
// //         exit={{ opacity: 0, x: 100, scale: 0.9 }}
// //         className="flex gap-5 bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all border"
// //       >
// //         <img
// //           src={item.product.imageUrl}
// //           alt={item.product.name}
// //           className="w-28 h-28 rounded-xl object-cover border"
// //           loading="lazy"
// //         />

// //         <div className="flex-1">
// //           <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
// //             {item.product.name}
// //           </h3>
// //           {/* <p className="text-2xl font-bold text-blue-600 mt-2">
// //             ₹{item.product.price.toLocaleString()}
// //           </p> */}

// //           <div className="flex items-center gap-4 mt-6">
// //             <button
// //               onClick={() => handleQty(item.qty - 1)}
// //               disabled={item.qty === 1}
// //               className="w-11 h-11 rounded-full bg-gray-100 hover:bg-red-100 disabled:opacity-50 transition"
// //             >
// //               <Minus size={18} className="me-4" />
// //             </button>

// //             <motion.span
// //               key={item.qty}
// //               initial={{ scale: 1.4 }}
// //               animate={{ scale: 1 }}
// //               transition={{ type: "spring", stiffness: 500 }}
// //               className="text-xl font-bold w-12 text-center"
// //             >
// //               {item.qty}
// //             </motion.span>

// //             <button
// //               onClick={() => handleQty(item.qty + 1)}
// //               className="w-11 h-11 rounded-full bg-gray-100 hover:bg-green-100 transition"
// //             >
// //               <Plus size={18} className="me-4" />
// //             </button>
// //           </div>
// //         </div>

// //         <motion.button
// //           whileHover={{ scale: 1.2 }}
// //           whileTap={{ scale: 0.9 }}
// //           onClick={() => onRemove(item.product._id)}
// //           className="text-red-500 hover:bg-red-50 p-3 rounded-full self-start"
// //         >
// //           <Trash2 size={22} />
// //         </motion.button>
// //       </motion.div>
// //     );
// //   })
// // );

// // export default function CartItemsList({ items, onQtyChange, onRemove }: any) {
// //   return (
// //     <div className="lg:col-span-2 space-y-6">
// //       <AnimatePresence mode="popLayout">
// //         {items.map((item: CartItem) => (
// //           <CartItemRow
// //             key={item.product._id}
// //             item={item}
// //             onQtyChange={onQtyChange}
// //             onRemove={onRemove}
// //           />
// //         ))}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }
// //////////////////////////////////////////////////
// /////////// Update
// // src/components/cart/CartItemsList.tsx
// import { Trash2, AlertCircle } from "lucide-react";
// import { useDebouncedCallback } from "use-debounce";
// import axios from "axios";
// import React from "react";

// const API = import.meta.env.VITE_API_URL as string;

// interface CartItem {
//   product: {
//     _id: string;
//     name: string;
//     price: number;
//     imageUrl?: string;
//   } | null;
//   qty: number;
// }

// // Debounced API update
// const useUpdateQuantity = (
//   productId: string,
//   currentQty: number,
//   onRollback: (id: string, qty: number) => void
// ) => {
//   return useDebouncedCallback((qty: number) => {
//     axios
//       .put(
//         `${API}/v1/cart/update`,
//         { productId, qty },
//         { withCredentials: true }
//       )
//       .catch(() => {
//         onRollback(productId, currentQty);
//       });
//   }, 600);
// };

// const CartItemRow = React.memo(
//   ({
//     item,
//     onQtyChange,
//     onRemove,
//   }: {
//     item: CartItem;
//     onQtyChange: (id: string, qty: number) => void;
//     onRemove: (id: string) => void;
//   }) => {
//     const updateQtyApi = useUpdateQuantity(
//       item.product?._id || "deleted",
//       item.qty,
//       onQtyChange
//     );

//     const handleQtyChange = (newQty: number) => {
//       if (newQty < 1 || !item.product) return;

//       // Update UI immediately
//       onQtyChange(item.product._id, newQty);

//       // Send to backend (debounced)
//       updateQtyApi(newQty);
//     };

//     if (!item.product) {
//       return (
//         <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
//           <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
//           <p className="text-red-700 font-medium">
//             Product no longer available
//           </p>
//           <button
//             onClick={() => onRemove("deleted")}
//             className="mt-3 text-sm text-red-600 underline"
//           >
//             Remove
//           </button>
//         </div>
//       );
//     }

//     const { product } = item;
//     const totalPrice = product.price * item.qty;

//     return (
//       <div className="grid grid-cols-[90px_1fr] gap-4 bg-white border rounded-xl p-4">
//         {/* Image - Left */}
//         <img
//           src={product.imageUrl || "/placeholder.jpg"}
//           alt={product.name}
//           className="w-full h-24 rounded-lg object-cover border"
//         />

//         {/* Right Side */}
//         <div className="space-y-3">
//           {/* Product Name */}
//           <h3 className="font-medium text-gray-900 line-clamp-2 text-sm sm:text-base">
//             {product.name}
//           </h3>

//           {/* Price */}
//           <div>
//             <div className="font-bold text-xl text-gray-900 tabular-nums">
//               ₹{totalPrice.toLocaleString("en-IN")}
//             </div>
//             {item.qty > 1 && (
//               <div className="text-xs text-gray-500 mt-0.5">
//                 ₹{product.price.toLocaleString()} × {item.qty} pcs
//               </div>
//             )}
//           </div>

//           {/* Buttons Row */}
//           <div className="flex items-center gap-4">
//             {/* Qty Selector */}
//             <div className="flex items-center border border-gray-300 rounded-md select-none">
//               <button
//                 onClick={() => handleQtyChange(item.qty - 1)}
//                 disabled={item.qty <= 1}
//                 className="w-9 h-9 flex items-center justify-center hover:bg-gray-100   transition"
//                 aria-label="Decrease quantity"
//               >
//                 -
//               </button>

//               <div className="w-12 text-center font-bold bg-gray-50 py-1">
//                 {item.qty}
//               </div>

//               <button
//                 onClick={() => handleQtyChange(item.qty + 1)}
//                 className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
//                 aria-label="Increase quantity"
//               >
//                 +
//               </button>
//             </div>

//             {/* Remove */}
//             <button
//               onClick={() => onRemove(product._id)}
//               className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded text-sm font-medium transition"
//             >
//               <Trash2 />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// interface CartItemsListProps {
//   items: CartItem[];
//   onQtyChange: (id: string, qty: number) => void;
//   onRemove: (id: string) => void;
// }

// export default function CartItemsList({
//   items,
//   onQtyChange,
//   onRemove,
// }: CartItemsListProps) {
//   if (items.length === 0) {
//     return (
//       <div className="text-center py-24">
//         <div className="bg-gray-100 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6" />
//         <p className="text-xl font-medium text-gray-600">Your cart is empty</p>
//         <p className="text-gray-500 mt-2">Add items to get started</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4 max-w-2xl mx-auto">
//       {items.map((item) => (
//         <CartItemRow
//           key={item.product?._id || `deleted-${Math.random()}`}
//           item={item}
//           onQtyChange={onQtyChange}
//           onRemove={onRemove}
//         />
//       ))}
//     </div>
//   );
// }
//////////////////////////// updated with qty
import { Trash2, AlertCircle } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import React from "react";

const API = import.meta.env.VITE_API_URL as string;

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl?: string;
  } | null;
  qty: number;
}

// Debounced API update
const useUpdateQuantity = (
  productId: string,
  currentQty: number,
  onRollback: (id: string, qty: number) => void
) => {
  return useDebouncedCallback((qty: number) => {
    axios
      .put(
        `${API}/v1/cart/update`,
        { productId, qty },
        { withCredentials: true }
      )
      .catch(() => {
        onRollback(productId, currentQty);
      });
  }, 600);
};

const CartItemRow = React.memo(
  ({
    item,
    onQtyChange,
    onRemove,
  }: {
    item: CartItem;
    onQtyChange: (id: string, qty: number) => void;
    onRemove: (id: string) => void;
  }) => {
    const updateQtyApi = useUpdateQuantity(
      item.product?._id || "deleted",
      item.qty,
      onQtyChange
    );

    // Determine max quantity based on price
    const getMaxQuantity = (price: number): number => {
      if (price >= 50000) return 1;
      if (price >= 40000) return 2;
      if (price > 25000) return 3;
      return 99; // no practical limit for lower priced items
    };

    const maxQty = item.product ? getMaxQuantity(item.product.price) : 1;

    const handleQtyChange = (newQty: number) => {
      if (!item.product || newQty < 1) return;

      if (newQty > maxQty) {
        alert(
          `Sorry! Only ${maxQty} unit${
            maxQty > 1 ? "s" : ""
          } allowed for this product.`
        );
        return;
      }

      onQtyChange(item.product._id, newQty);
      updateQtyApi(newQty);
    };

    const handleRemove = () => {
      if (!item.product) {
        onRemove("deleted");
        return;
      }

      const confirmed = window.confirm(
        `Remove "${item.product.name}" from cart?`
      );

      if (confirmed) {
        onRemove(item.product._id);
      }
    };

    if (!item.product) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <p className="text-red-700 font-medium">
            Product no longer available
          </p>
          <button
            onClick={() => onRemove("deleted")}
            className=".mt-3 text-sm text-red-600 underline hover:text-red-800"
          >
            Remove from cart
          </button>
        </div>
      );
    }

    const { product } = item;
    const totalPrice = product.price * item.qty;

    return (
      <div className="grid grid-cols-[90px_1fr] gap-4 bg-white border rounded-xl p-4 shadow-sm">
        {/* Image */}
        <img
          src={product.imageUrl || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-24 rounded-lg object-cover border"
        />

        {/* Right Side */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900 line-clamp-2 text-sm sm:text-base">
            {product.name}
          </h3>

          {/* Price */}
          <div>
            <div className="font-bold text-xl text-gray-900 tabular-nums">
              ₹{totalPrice.toLocaleString("en-IN")}
            </div>
            {item.qty > 1 && (
              <div className="text-xs text-gray-500 mt-0.5">
                ₹{product.price.toLocaleString("en-IN")} × {item.qty} pcs
              </div>
            )}
          </div>

          {/* Max quantity notice for high-value items */}
          {product.price > 25000 && (
            <p className="text-xs text-amber-700 font-medium bg-amber-50 px-2 py-1 rounded">
              Max {maxQty} unit{maxQty > 1 ? "s" : ""} allowed (high-value item)
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-md select-none">
              <button
                onClick={() => handleQtyChange(item.qty - 1)}
                disabled={item.qty <= 1}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                aria-label="Decrease quantity"
              >
                −
              </button>

              <div className="w-14 text-center font-bold text-gray-800 py-1">
                {item.qty}
              </div>

              <button
                onClick={() => handleQtyChange(item.qty + 1)}
                disabled={item.qty >= maxQty}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Delete with Confirmation */}
            <button
              onClick={handleRemove}
              className="text-red-600 hover:bg-red-50 p-2.5 rounded-lg transition flex items-center justify-center"
              aria-label="Remove item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

interface CartItemsListProps {
  items: CartItem[];
  onQtyChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItemsList({
  items,
  onQtyChange,
  onRemove,
}: CartItemsListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="bg-gray-100 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6" />
        <p className="text-xl font-medium text-gray-600">Your cart is empty</p>
        <p className="text-gray-500 mt-2">Add some amazing products!</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      {items.map((item) => (
        <CartItemRow
          key={item.product?._id || `deleted-${Math.random()}`}
          item={item}
          onQtyChange={onQtyChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
