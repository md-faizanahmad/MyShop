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
    s.items.reduce((sum, i) => sum + i.qty, 0),
  );
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);

  const wishlistItems = useWishlistStore((s) => s.items);
  const removeWish = useWishlistStore((s) => s.remove);

  const isWishlisted = (productId: string): boolean =>
    wishlistItems.some((w) => w.productId === productId);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-neutral-500">
        <div className="flex flex-col items-center gap-3">
          <div
            className="
        h-8
        w-8
        animate-spin
        rounded-full
        border-2
        border-neutral-200
        border-t-red-600
      "
            aria-hidden="true"
          />

          <span className="text-xs font-medium md:text-sm">Loading cart…</span>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-5">
        <div className="flex max-w-sm flex-col items-center text-center">
          <div
            className="
        mb-4
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-sky-50
        text-sky-600
        sm:mb-5
        sm:h-16
        sm:w-16
      "
          >
            <ShoppingBag
              size={28}
              strokeWidth={1.8}
              className="sm:size-8"
              aria-hidden="true"
            />
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
            Your cart is empty
          </h2>

          <p className="mt-1.5 text-xs leading-5 text-neutral-500 sm:mt-2 sm:text-sm">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>

          <Link
            to="/"
            className="
        mt-5
        inline-flex
        items-center
        justify-center
        rounded-xl
        bg-sky-600
        px-5
        py-2.5
        text-xs
        font-semibold
        text-white
        shadow-sm
        transition-colors
        hover:bg-sky-700
        active:scale-[0.98]
        sm:mt-6
        sm:px-6
        sm:py-3
        sm:text-sm
      "
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 py-8 px-4 mt-8">
      <div className="max-w-6xl mx-auto">
        <h4 className="mb-5 text-left text-xl font-semibold tracking-tight text-slate-900 sm:mb-6 sm:text-2xl">
          Your Cart{" "}
          <span className="ml-1 text-xs font-normal text-slate-400 sm:text-sm">
            ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
        </h4>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-4 lg:col-span-2 lg:space-y-5">
            <AnimatePresence initial={false}>
              {items.map((item, index) => {
                const p = item.product;
                const maxQty = getMaxQtyByPrice(p.price);
                const canIncrease = item.qty < maxQty;

                const productUrl = `/category/${p.category?.slug}/product/${p.slug}`;

                return (
                  <div key={p._id}>
                    {/* ---------------------------------------------------------------- */}
                    {/* Cart item                                                        */}
                    {/* ---------------------------------------------------------------- */}

                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.2 }}
                      className="
              overflow-hidden
              rounded-2xl
              border
              border-neutral-100
              bg-white
              shadow-sm
              transition-shadow
              hover:shadow-md
            "
                    >
                      <div className="flex gap-3 p-3 sm:gap-4 sm:p-4 lg:p-5">
                        {/* ---------------------------------------------------------- */}
                        {/* Product Image                                                */}
                        {/* ---------------------------------------------------------- */}

                        <Link
                          to={productUrl}
                          aria-label={`View ${p.name}`}
                          className="
                  group
                  relative
                  h-24
                  w-24
                  shrink-0
                  overflow-hidden
                  rounded-xl
                  bg-neutral-50
                  sm:h-28
                  sm:w-28
                  lg:h-32
                  lg:w-32
                "
                        >
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            loading="lazy"
                            decoding="async"
                            className="
                    h-full
                    w-full
                    object-contain
                    p-1
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                          />
                        </Link>

                        {/* ---------------------------------------------------------- */}
                        {/* Product Information                                          */}
                        {/* ---------------------------------------------------------- */}

                        <div className="flex min-w-0 flex-1 flex-col">
                          <Link
                            to={productUrl}
                            className="
                    line-clamp-2
                    text-sm
                    font-semibold
                    leading-5
                    tracking-tight
                    text-neutral-900
                    transition-colors
                    hover:text-sky-600
                    sm:text-base
                  "
                          >
                            {p.name}
                          </Link>

                          {/* Price */}
                          <p className="mt-1.5 text-sm font-bold text-sky-600 sm:text-base">
                            ₹{(p.price * item.qty).toLocaleString("en-IN")}
                          </p>

                          {/* -------------------------------------------------------- */}
                          {/* Bottom Actions                                             */}
                          {/* -------------------------------------------------------- */}

                          <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                            {/* Quantity */}
                            <div
                              className="
                      flex
                      h-9
                      items-center
                      overflow-hidden
                      rounded-lg
                      border
                      border-neutral-200
                      bg-white
                      sm:h-10
                    "
                            >
                              <button
                                type="button"
                                onClick={() => updateQty(p._id, item.qty - 1)}
                                disabled={item.qty <= 1}
                                aria-label={`Decrease quantity of ${p.name}`}
                                className="
                        flex
                        h-full
                        w-9
                        items-center
                        justify-center
                        text-base
                        text-neutral-600
                        transition-colors
                        hover:bg-neutral-50
                        disabled:cursor-not-allowed
                        disabled:opacity-35
                        sm:w-10
                      "
                              >
                                −
                              </button>

                              <span
                                className="
                        flex
                        min-w-8
                        items-center
                        justify-center
                        px-1
                        text-sm
                        font-semibold
                        text-neutral-900
                      "
                              >
                                {item.qty}
                              </span>

                              <button
                                type="button"
                                onClick={() => {
                                  if (!canIncrease) {
                                    toast.error(
                                      `Maximum ${maxQty} units allowed`,
                                    );
                                    return;
                                  }

                                  updateQty(p._id, item.qty + 1);
                                }}
                                disabled={!canIncrease}
                                aria-label={`Increase quantity of ${p.name}`}
                                className="
                        flex
                        h-full
                        w-9
                        items-center
                        justify-center
                        text-base
                        text-neutral-600
                        transition-colors
                        hover:bg-neutral-50
                        disabled:cursor-not-allowed
                        disabled:opacity-35
                        sm:w-10
                      "
                              >
                                +
                              </button>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1.5">
                              {/* Wishlist */}
                              {isWishlisted(p._id) && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    void removeWish(p._id);
                                    toast.success("Removed from wishlist");
                                  }}
                                  aria-label={`Remove ${p.name} from wishlist`}
                                  className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          bg-red-50
                          text-red-500
                          transition-colors
                          hover:bg-red-100
                          active:scale-95
                          sm:h-10
                          sm:w-10
                        "
                                >
                                  <Heart
                                    size={18}
                                    strokeWidth={1.8}
                                    className="fill-current"
                                    aria-hidden="true"
                                  />
                                </button>
                              )}

                              {/* Remove */}
                              <button
                                type="button"
                                onClick={() => void removeItem(p._id)}
                                aria-label={`Remove ${p.name} from cart`}
                                className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-red-50
                        text-red-500
                        transition-colors
                        hover:bg-red-100
                        active:scale-95
                        sm:h-10
                        sm:w-10
                      "
                              >
                                <Trash2
                                  size={18}
                                  strokeWidth={1.8}
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* ---------------------------------------------------------------- */}
                    {/* More Items Notice                                                */}
                    {/* ---------------------------------------------------------------- */}

                    {index === 2 && items.length > 3 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="
                mt-4
                flex
                items-start
                gap-2.5
                rounded-xl
                border
                border-amber-100
                bg-amber-50
                px-3.5
                py-3
                text-amber-800
                sm:px-4
              "
                      >
                        <span
                          className="
                  mt-0.5
                  flex
                  h-5
                  w-5
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-amber-100
                  text-[11px]
                  font-bold
                  text-amber-700
                "
                          aria-hidden="true"
                        >
                          !
                        </span>

                        <p className="text-[11px] leading-4 sm:text-xs">
                          You have more items in your cart. Review your
                          quantities before checkout.
                        </p>
                      </motion.div>
                    )}
                  </div>
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
