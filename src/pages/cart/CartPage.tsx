// //////////////////////// update with limit
// // src/pages/cart/CartPage.tsx
// import { Link } from "react-router-dom";
// import { Trash2, ShoppingBag, Heart } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";
// import type { JSX } from "react";

// import { useCartStore } from "../../store/useCartStore";
// import { useWishlistStore } from "../../store/useWishlistStore";
// import OrderSummaryCard from "./OrderSummaryCard";
// import { getMaxQtyByPrice } from "../../utils/cartLimits";

// export default function CartPage(): JSX.Element {
//   const items = useCartStore((s) => s.items);
//   const loading = useCartStore((s) => s.loading);
//   const totalItems = useCartStore((s) =>
//     s.items.reduce((sum, i) => sum + i.qty, 0),
//   );
//   const updateQty = useCartStore((s) => s.updateQty);
//   const removeItem = useCartStore((s) => s.removeItem);

//   const wishlistItems = useWishlistStore((s) => s.items);
//   const removeWish = useWishlistStore((s) => s.remove);

//   const isWishlisted = (productId: string): boolean =>
//     wishlistItems.some((w) => w.productId === productId);

//   if (loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center px-4 text-neutral-500">
//         <div className="flex flex-col items-center gap-3">
//           <div
//             className="
//         h-8
//         w-8
//         animate-spin
//         rounded-full
//         border-2
//         border-neutral-200
//         border-t-red-600
//       "
//             aria-hidden="true"
//           />

//           <span className="text-xs font-medium md:text-sm">Loading cart…</span>
//         </div>
//       </div>
//     );
//   }

//   if (items.length === 0) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center px-5">
//         <div className="flex max-w-sm flex-col items-center text-center">
//           <div
//             className="
//         mb-4
//         flex
//         h-14
//         w-14
//         items-center
//         justify-center
//         rounded-full
//         bg-sky-50
//         text-sky-600
//         sm:mb-5
//         sm:h-16
//         sm:w-16
//       "
//           >
//             <ShoppingBag
//               size={28}
//               strokeWidth={1.8}
//               className="sm:size-8"
//               aria-hidden="true"
//             />
//           </div>

//           <h2 className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
//             Your cart is empty
//           </h2>

//           <p className="mt-1.5 text-xs leading-5 text-neutral-500 sm:mt-2 sm:text-sm">
//             Looks like you haven&apos;t added anything to your cart yet.
//           </p>

//           <Link
//             to="/"
//             className="
//         mt-5
//         inline-flex
//         items-center
//         justify-center
//         rounded-xl
//         bg-sky-600
//         px-5
//         py-2.5
//         text-xs
//         font-semibold
//         text-white
//         shadow-sm
//         transition-colors
//         hover:bg-sky-700
//         active:scale-[0.98]
//         sm:mt-6
//         sm:px-6
//         sm:py-3
//         sm:text-sm
//       "
//           >
//             Continue shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-sky-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h4 className="mb-5 text-left text-xl font-semibold tracking-tight text-slate-900 sm:mb-6 sm:text-2xl">
//           Your Cart{" "}
//           <span className="ml-1 text-xs font-normal text-slate-400 sm:text-sm">
//             ({totalItems} {totalItems === 1 ? "item" : "items"})
//           </span>
//         </h4>

//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-6">
//             <AnimatePresence>
//               {items.map((item) => {
//                 const p = item.product;
//                 const maxQty = getMaxQtyByPrice(p.price);
//                 const canIncrease = item.qty < maxQty;

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
//                               className="px-3 py-2 disabled:opacity-40"
//                             >
//                               −
//                             </button>

//                             <span className="px-4 font-bold">{item.qty}</span>

//                             <button
//                               onClick={() => {
//                                 if (!canIncrease) {
//                                   toast.error(
//                                     `Maximum ${maxQty} units allowed`,
//                                   );
//                                   return;
//                                 }
//                                 updateQty(p._id, item.qty + 1);
//                               }}
//                               disabled={!canIncrease}
//                               className="px-3 py-2 disabled:opacity-40"
//                             >
//                               +
//                             </button>
//                           </div>

//                           {/* Wishlist remove */}
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
/////////////////////////////////////////////////22-08-2026
import type { JSX } from "react";

import { useCartStore } from "../../store/useCartStore";
import { useWishlistStore } from "../../store/useWishlistStore";

import CartLoading from "./CartLoading";
import CartEmpty from "./CartEmpty";
import CartDesktop from "./CartDesktop";
import CartMobile from "./CartMobile";

export default function CartPage(): JSX.Element {
  const items = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loading);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);

  const wishlistItems = useWishlistStore((state) => state.items);
  const removeWish = useWishlistStore((state) => state.remove);

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  const isWishlisted = (productId: string): boolean =>
    wishlistItems.some((item) => item.productId === productId);

  if (loading) {
    return <CartLoading />;
  }

  if (items.length === 0) {
    return <CartEmpty />;
  }

  const sharedProps = {
    items,
    totalItems,
    updateQty,
    removeItem,
    isWishlisted,
    removeWish,
  };

  return (
    <>
      <CartDesktop {...sharedProps} />
      <CartMobile {...sharedProps} />
    </>
  );
}
