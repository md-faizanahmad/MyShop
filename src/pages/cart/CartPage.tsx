// // src/pages/cart/CartPage.tsx
// import { Link } from "react-router-dom";
// import { Trash2, ShoppingBag, Heart } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";
// import type { JSX } from "react";

// import { useCartStore } from "../../store/useCartStore";
// import { useWishlistStore } from "../../store/useWishlistStore";
// import OrderSummaryCard from "./OrderSummaryCard";

// export default function CartPage(): JSX.Element {
//   /* -----------------------------
//      Stores
//   ----------------------------- */
//   const items = useCartStore((s) => s.items);
//   const loading = useCartStore((s) => s.loading);
//   const totalItems = useCartStore((s) =>
//     s.items.reduce((sum, i) => sum + i.qty, 0)
//   );
//   const updateQty = useCartStore((s) => s.updateQty);
//   const removeItem = useCartStore((s) => s.removeItem);

//   const wishlistItems = useWishlistStore((s) => s.items);
//   const removeWish = useWishlistStore((s) => s.remove);

//   /* -----------------------------
//      Helpers
//   ----------------------------- */
//   const isWishlisted = (productId: string): boolean =>
//     wishlistItems.some((w) => w.productId === productId);

//   /* -----------------------------
//      Loading state
//   ----------------------------- */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-sky-50 text-gray-500">
//         Loading cart…
//       </div>
//     );
//   }

//   /* -----------------------------
//      Empty state
//   ----------------------------- */
//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-sky-50">
//         <div className="text-center">
//           <ShoppingBag size={64} className="mx-auto text-sky-600 mb-6" />
//           <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
//           <Link
//             to="/"
//             className="inline-block bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold"
//           >
//             Continue shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   /* -----------------------------
//      Render
//   ----------------------------- */
//   return (
//     <div className="min-h-screen bg-sky-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8 text-center">
//           Your Cart ({totalItems} items)
//         </h1>

//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-6">
//             <AnimatePresence>
//               {items.map((item) => {
//                 const p = item.product;

//                 return (
//                   <motion.div
//                     key={p._id}
//                     layout
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, x: -50 }}
//                     className="bg-white rounded-2xl p-5 shadow"
//                   >
//                     <div className="flex gap-4">
//                       <img
//                         src={p.imageUrl}
//                         alt={p.name}
//                         className="w-24 h-24 rounded-xl object-cover"
//                       />

//                       <div className="flex-1 space-y-3">
//                         <h3 className="font-semibold text-lg">{p.name}</h3>

//                         <p className="font-bold text-sky-600">
//                           ₹{(p.price * item.qty).toLocaleString("en-IN")}
//                         </p>

//                         <div className="flex items-center gap-4">
//                           {/* Qty */}
//                           <div className="flex items-center border rounded-xl">
//                             <button
//                               onClick={() => updateQty(p._id, item.qty - 1)}
//                               disabled={item.qty <= 1}
//                               className="px-3 py-2"
//                             >
//                               −
//                             </button>

//                             <span className="px-4 font-bold">{item.qty}</span>

//                             <button
//                               onClick={() => updateQty(p._id, item.qty + 1)}
//                               className="px-3 py-2"
//                             >
//                               +
//                             </button>
//                           </div>

//                           {/* Wishlist (remove only) */}
//                           {isWishlisted(p._id) && (
//                             <button
//                               onClick={() => {
//                                 void removeWish(p._id);
//                                 toast.success("Removed from wishlist");
//                               }}
//                               className="p-2 rounded-xl bg-red-50 text-red-600"
//                             >
//                               <Heart size={20} className="fill-current" />
//                             </button>
//                           )}

//                           {/* Remove */}
//                           <button
//                             onClick={() => void removeItem(p._id)}
//                             className="p-2 text-red-600 bg-red-50 rounded-xl"
//                           >
//                             <Trash2 size={20} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </AnimatePresence>
//           </div>

//           <OrderSummaryCard />
//         </div>
//       </div>
//     </div>
//   );
// }

//////////////////////// update with limit
// src/pages/cart/CartPage.tsx
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import type { JSX } from "react";

import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";
import OrderSummaryCard from "./OrderSummaryCard";
import { getMaxQtyByPrice } from "../../utils/cartLimits";

export default function CartPage(): JSX.Element {
  const items = useCartStore((s) => s.items);
  const loading = useCartStore((s) => s.loading);
  const totalItems = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.qty, 0)
  );
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);

  const wishlistItems = useWishlistStore((s) => s.items);
  const removeWish = useWishlistStore((s) => s.remove);

  const isWishlisted = (productId: string): boolean =>
    wishlistItems.some((w) => w.productId === productId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50">
        Loading cart…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-sky-600 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <Link
            to="/"
            className="inline-block bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Your Cart ({totalItems} items)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {items.map((item) => {
                const p = item.product;
                const maxQty = getMaxQtyByPrice(p.price);
                const canIncrease = item.qty < maxQty;

                return (
                  <motion.div
                    key={p._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="bg-white rounded-2xl p-5 shadow"
                  >
                    <div className="flex gap-4">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-24 h-24 rounded-xl object-cover"
                      />

                      <div className="flex-1 space-y-3">
                        <h3 className="font-semibold text-lg">{p.name}</h3>

                        <p className="font-bold text-sky-600">
                          ₹{(p.price * item.qty).toLocaleString("en-IN")}
                        </p>

                        <div className="flex items-center gap-4">
                          {/* Qty */}
                          <div className="flex items-center border rounded-xl">
                            <button
                              onClick={() => updateQty(p._id, item.qty - 1)}
                              disabled={item.qty <= 1}
                              className="px-3 py-2 disabled:opacity-40"
                            >
                              −
                            </button>

                            <span className="px-4 font-bold">{item.qty}</span>

                            <button
                              onClick={() => {
                                if (!canIncrease) {
                                  toast.error(
                                    `Maximum ${maxQty} units allowed`
                                  );
                                  return;
                                }
                                updateQty(p._id, item.qty + 1);
                              }}
                              disabled={!canIncrease}
                              className="px-3 py-2 disabled:opacity-40"
                            >
                              +
                            </button>
                          </div>

                          {/* Wishlist remove */}
                          {isWishlisted(p._id) && (
                            <button
                              onClick={() => {
                                void removeWish(p._id);
                                toast.success("Removed from wishlist");
                              }}
                              className="p-2 rounded-xl bg-red-50 text-red-600"
                            >
                              <Heart size={20} className="fill-current" />
                            </button>
                          )}

                          {/* Remove */}
                          <button
                            onClick={() => void removeItem(p._id)}
                            className="p-2 text-red-600 bg-red-50 rounded-xl"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <OrderSummaryCard />
        </div>
      </div>
    </div>
  );
}
