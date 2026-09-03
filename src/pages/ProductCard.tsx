// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Heart, ShoppingCart, Zap } from "lucide-react";
// import toast from "react-hot-toast";

// import type { PublicProduct } from "../types/product";
// import { useCartStore } from "../store/useCartStore";
// import { useWishlistStore } from "../store/useWishlistStore";

// interface Props {
//   product: PublicProduct;
// }

// export default function ProductCard({ product }: Props) {
//   const navigate = useNavigate();

//   /* ✅ SAFE SELECTORS (PRIMITIVES ONLY) */
//   const isInCart = useCartStore((s) =>
//     s.items.some((i) => i.product._id === product._id)
//   );

//   const isWishlisted = useWishlistStore((s) =>
//     s.items.some((i) => i.productId === product._id)
//   );

//   const addToCart = useCartStore((s) => s.addItem);
//   const addWish = useWishlistStore((s) => s.add);
//   const removeWish = useWishlistStore((s) => s.remove);

//   /* -----------------------------
//      Wishlist toggle
//   ----------------------------- */
//   const toggleWishlist = (e: React.MouseEvent): void => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (isWishlisted) {
//       removeWish(product._id);
//       toast.success("Removed from wishlist");
//     } else {
//       addWish(product);
//       toast.success("Added to wishlist");
//     }
//   };

//   /* -----------------------------
//      Add to cart
//   ----------------------------- */
//   const handleAddToCart = (e: React.MouseEvent): void => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!isInCart) {
//       addToCart(product, 1);
//       toast.success("Added to cart");
//     }
//   };

//   /* -----------------------------
//      Quick buy
//   ----------------------------- */
//   const handleQuickBuy = (e: React.MouseEvent): void => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!isInCart) {
//       addToCart(product, 1);
//     }

//     navigate(`/checkout?quickbuy=${product._id}`);
//   };

//   return (
//     <motion.div layout className="group relative h-full">
//       <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition border">
//         <Link
//           to={`/category/${product.category.slug}/product/${product.slug}`}
//           className="block aspect-square bg-gray-50"
//         >
//           <img
//             src={product.imageUrl}
//             alt={product.name}
//             className="w-full h-full object-cover"
//           />
//         </Link>

//         {/* Wishlist */}
//         <button
//           onClick={toggleWishlist}
//           className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
//         >
//           <Heart
//             size={18}
//             className={
//               isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
//             }
//           />
//         </button>

//         <div className="p-3 space-y-2">
//           <h3 className="text-sm font-semibold line-clamp-2">{product.name}</h3>

//           <p className="font-bold text-lg">
//             ₹{product.price.toLocaleString("en-IN")}
//           </p>

//           <div className="flex gap-2">
//             <button
//               onClick={handleAddToCart}
//               className={`flex-1 py-2 rounded-xl text-sm font-bold ${
//                 isInCart
//                   ? "bg-green-100 text-green-700"
//                   : "bg-sky-600 text-white"
//               }`}
//             >
//               <ShoppingCart size={16} className="inline mr-1" />
//               {isInCart ? "Added" : "Add"}
//             </button>

//             <button
//               onClick={handleQuickBuy}
//               className="flex-1 py-2 rounded-xl text-sm font-bold bg-black text-white"
//             >
//               <Zap size={16} className="inline mr-1" />
//               Buy
//             </button>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

//// Above working
////////////// DESIGN UPGRADE
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, Star, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import type { PublicProduct } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useAuthStore } from "@/store/useAuthStore";

interface Props {
  product: PublicProduct;
}

export default function ProductCard({ product }: Props) {
  const cartItems = useCartStore((s) => s.items);
  const addToCart = useCartStore((s) => s.addItem);
  const removeFromCart = useCartStore((s) => s.removeItem);

  const { status } = useAuthStore();

  const wishlistItems = useWishlistStore((s) => s.items);
  const addWish = useWishlistStore((s) => s.add);
  const removeWish = useWishlistStore((s) => s.remove);

  const isInCart = cartItems.some((i) => i.product._id === product._id);
  const isWishlisted = wishlistItems.some((w) => w.productId === product._id);
  const isStock = product.stock <= 0;
  const price = product.discountPrice ?? product.price;
  const hasDiscount =
    typeof product.discountPrice === "number" &&
    product.discountPrice < product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice!) / product.price) * 100,
      )
    : 0;

  /* -----------------------------
      Wishlist toggle
  ----------------------------- */
  const toggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      removeWish(product._id);
      toast.success("Removed from wishlist");
    } else {
      addWish(product);
      toast.success("Added to wishlist");
    }
  };

  // Cart toggle (ADD ↔ REMOVE)

  const toggleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (status !== "authenticated") {
      toast.error("Please login first");
      return;
    }

    if (isStock) {
      toast.error("This product is out of stock");
      return;
    }

    if (isInCart) {
      removeFromCart(product._id);
      toast.success("Removed from cart");
    } else {
      addToCart(product, 1);
      toast.success("Added to cart");
    }
  };

  //////////////////////////// Update design 28-08
  // return (
  //   <motion.div
  //     initial={{ opacity: 0 }}
  //     animate={{ opacity: 1 }}
  //     className="group flex h-full w-full flex-col border border-sky-100/80 bg-gray-50/80 p-2 shadow-[0_2px_10px_rgba(14,165,233,0.06)] backdrop-blur-2xl transition-all duration-300 hover:border-sky-200 hover:bg-gray-50/90 hover:shadow-[0_6px_18px_rgba(14,165,233,0.09)] antialiased sm:p-2.5"
  //   >
  //     {/* IMAGE */}
  //     <div className="relative">
  //       <Link
  //         to={`/category/${product.category.slug}/product/${product.slug}`}
  //         className="block"
  //       >
  //         <div className="relative aspect-square w-full overflow-hidden border-b border-neutral-100 pb-1.5 sm:pb-2">
  //           <div
  //             className={`relative flex h-full w-full items-center justify-center transition-transform duration-500 ease-out ${
  //               isStock
  //                 ? "opacity-40"
  //                 : "group-hover:transform-[perspective(900px)_rotateX(2deg)_rotateY(-2deg)_translateY(-2px)]"
  //             }`}
  //           >
  //             <img
  //               src={product.imageUrl}
  //               alt={product.name}
  //               className={`max-h-full max-w-full object-contain filter contrast-[1.01] transition-transform duration-500 ease-out ${
  //                 isStock ? "" : "group-hover:scale-[1.025]"
  //               }`}
  //             />
  //           </div>

  //           {/* OUT OF STOCK */}
  //           {isStock && (
  //             <div className="absolute inset-0 flex items-center justify-center bg-white/10 p-2 backdrop-blur-[1px]">
  //               <div className="flex items-center gap-1 text-red-950">
  //                 <AlertCircle size={11} strokeWidth={2.5} />

  //                 <span className="text-[10px] font-mono font-semibold uppercase tracking-wider sm:text-[12px]">
  //                   Out of Stock
  //                 </span>
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //       </Link>

  //       {/* WISHLIST */}
  //       {status === "authenticated" && (
  //         <button
  //           type="button"
  //           onClick={toggleWishlist}
  //           title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
  //           className="absolute right-1 top-1 flex h-7 w-7 cursor-pointer items-center justify-center border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-50 sm:right-1.5 sm:top-1.5"
  //         >
  //           <Heart
  //             size={14}
  //             strokeWidth={1.5}
  //             className={
  //               isWishlisted ? "fill-red-700 text-red-700" : "text-neutral-500"
  //             }
  //           />
  //         </button>
  //       )}
  //     </div>

  //     {/* PRODUCT INFO */}
  //     <div className="flex flex-1 flex-col pt-2 sm:pt-2.5">
  //       {/* NAME + RATING */}
  //       <div className="flex items-center justify-between gap-1.5 sm:gap-2">
  //         <Link
  //           to={`/category/${product.category.slug}/product/${product.slug}`}
  //           className="min-w-0 flex-1"
  //         >
  //           <h3 className="line-clamp-1 text-[13px] font-medium leading-snug tracking-[-0.01em] text-neutral-950 sm:text-[14px]">
  //             {product.name}
  //           </h3>
  //         </Link>

  //         {(product.rating?.average ?? 0) > 0 &&
  //           (product.rating?.count ?? 0) > 0 && (
  //             <div className="flex shrink-0 items-center gap-1 text-[9px] text-neutral-500">
  //               {" "}
  //               <Star size={9} className="fill-amber-400 text-amber-400" />{" "}
  //               <span className="font-medium text-neutral-900">
  //                 {" "}
  //                 {product.rating?.average.toFixed(1)}{" "}
  //               </span>{" "}
  //               <span>({product.rating?.count})</span>{" "}
  //             </div>
  //           )}
  //       </div>

  //       {/* PRICE + LOGGED-OUT BUY */}
  //       <div className="mt-1.5 flex items-center justify-between gap-1.5 sm:gap-2">
  //         <div className="flex min-w-0 flex-wrap items-baseline gap-x-1 gap-y-0.5 sm:gap-x-1.5">
  //           {/* CURRENT PRICE */}
  //           <span
  //             className={`text-[14px] font-semibold tracking-tight sm:text-[15px] ${
  //               isStock ? "text-neutral-400" : "text-neutral-950"
  //             }`}
  //           >
  //             ₹{price.toLocaleString("en-IN")}
  //           </span>

  //           {/* ORIGINAL PRICE */}
  //           {hasDiscount && (
  //             <span className="text-[9px] font-normal text-neutral-400 line-through sm:text-[10px]">
  //               ₹{product.price.toLocaleString("en-IN")}
  //             </span>
  //           )}

  //           {/* DISCOUNT */}
  //           {hasDiscount && (
  //             <span className="text-[9px] font-bold tracking-tight text-red-900 sm:text-[10px]">
  //               -{discountPercent}%
  //             </span>
  //           )}
  //         </div>

  //         {/* BUY — UNAUTHENTICATED */}
  //         {status !== "authenticated" && (
  //           <Link
  //             to={`/category/${product.category.slug}/product/${product.slug}`}
  //             title="View product"
  //             className={`flex h-7 shrink-0 items-center justify-center border px-2.5 text-[9px] font-semibold transition-colors sm:px-4 sm:text-[10px] ${
  //               isStock
  //                 ? "pointer-events-none cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-400"
  //                 : "border-sky-500 bg-sky-500 text-white hover:border-sky-600 hover:bg-sky-600"
  //             }`}
  //           >
  //             Buy
  //           </Link>
  //         )}
  //       </div>

  //       {/* AUTHENTICATED ACTIONS */}
  //       {status === "authenticated" && (
  //         <div className="mt-2.5 flex items-center justify-end gap-1.5">
  //           {/* CART */}
  //           <button
  //             type="button"
  //             onClick={toggleCart}
  //             disabled={isStock}
  //             title={
  //               isStock
  //                 ? "Unavailable"
  //                 : isInCart
  //                   ? "Remove from cart"
  //                   : "Add to cart"
  //             }
  //             aria-label={
  //               isStock
  //                 ? "Unavailable"
  //                 : isInCart
  //                   ? "Remove from cart"
  //                   : "Add to cart"
  //             }
  //             className={`flex h-7 w-7 shrink-0 items-center justify-center border shadow-sm transition-colors ${
  //               isStock
  //                 ? "cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-400"
  //                 : isInCart
  //                   ? "cursor-pointer border-neutral-300 bg-neutral-50 text-neutral-800 hover:bg-neutral-100"
  //                   : "cursor-pointer border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
  //             }`}
  //           >
  //             {isInCart ? (
  //               <Trash2 size={13} strokeWidth={2} />
  //             ) : (
  //               <ShoppingCart size={14} strokeWidth={1.9} />
  //             )}
  //           </button>

  //           {/* BUY */}
  //           <Link
  //             to={`/category/${product.category.slug}/product/${product.slug}`}
  //             title="View product"
  //             className={`flex h-7 items-center justify-center border px-3 text-[9px] font-semibold transition-colors sm:px-4 sm:text-[10px] ${
  //               isStock
  //                 ? "pointer-events-none cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-400"
  //                 : "border-sky-500 bg-sky-500 text-white hover:border-sky-600 hover:bg-sky-600"
  //             }`}
  //           >
  //             Buy
  //           </Link>
  //         </div>
  //       )}
  //     </div>
  //   </motion.div>
  // );

  //////////////////////////// Update design 02-09
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-sm bg-white/30 backdrop-blur-lg
  shadow-[0_2px_12px_rgba(0,0,0,0.06)]
  transition-all duration-300 ease-out
  hover:-translate-y-1
  hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] antialiased"
    >
      {/* IMAGE */}
      <div className="relative aspect-[1/0.82] w-full overflow-hidden  sm:aspect-[1/0.82]">
        <Link
          to={`/category/${product.category.slug}/product/${product.slug}`}
          className="block h-full w-full"
        >
          <div className="relative flex h-full w-full items-center justify-center p-2.5 sm:p-3">
            <img
              src={product.imageUrl}
              alt={product.name}
              className={`h-full w-[78%] object-contain transition-transform duration-500 ease-out sm:h-full sm:w-full ${
                isStock ? "opacity-50 grayscale-[0.2]" : "group-hover:scale-105"
              }`}
            />
          </div>

          {/* OUT OF STOCK OVERLAY */}
          {isStock && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-[2px] transition-all">
              <div className="flex items-center gap-1 rounded-full bg-white/95 px-1.5 py-0.5 shadow-sm ring-1 ring-neutral-200/50 sm:px-2 sm:py-1">
                <AlertCircle
                  size={9}
                  className="text-neutral-700 sm:h-2.5 sm:w-2.5"
                  strokeWidth={2.5}
                />
                <span className="text-[9px] font-semibold uppercase tracking-wide text-neutral-800 sm:text-[10px]">
                  Out of Stock
                </span>
              </div>
            </div>
          )}
        </Link>

        {/* WISHLIST */}
        {status === "authenticated" && (
          <button
            type="button"
            onClick={toggleWishlist}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-1.5 top-1.5 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-neutral-200/50 transition-transform duration-200 hover:scale-110 active:scale-95 sm:right-2 sm:top-2 sm:h-7 sm:w-7"
          >
            <Heart
              size={12}
              strokeWidth={2}
              className={
                isWishlisted
                  ? "fill-red-500 text-red-500"
                  : "text-neutral-500 hover:text-neutral-700"
              }
            />
          </button>
        )}
      </div>

      {/* PRODUCT INFO */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-3">
        {/* NAME + RATING */}
        <div className="flex items-start justify-between gap-1.5 sm:gap-2">
          <Link
            to={`/category/${product.category.slug}/product/${product.slug}`}
            className="min-w-0 flex-1 outline-none"
          >
            <h3 className="line-clamp-2 text-[12px] font-medium leading-snug text-neutral-900 transition-colors group-hover:text-red-900 sm:text-[13px]">
              {product.name}
            </h3>
          </Link>

          {(product.rating?.average ?? 0) > 0 &&
            (product.rating?.count ?? 0) > 0 && (
              <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-neutral-50 px-1 py-0.5 ring-1 ring-neutral-200/60 sm:px-1.5">
                <Star
                  size={8}
                  className="fill-amber-400 text-amber-400 sm:h-[9px] sm:w-[9px]"
                />

                <span className="ml-0.5 text-[9px] font-medium text-neutral-700 sm:text-[10px]">
                  {product.rating?.average.toFixed(1)}
                </span>
              </div>
            )}
        </div>

        <div className="mt-auto pt-2 sm:pt-2.5">
          {/* PRICE BLOCK */}
          <div className="block items-baseline gap-x-1 gap-y-0.5">
            <div
              className={`text-[14px] font-bold tracking-tight sm:text-[15px] ${
                isStock ? "text-neutral-400" : "text-neutral-900"
              }`}
            >
              ₹{price.toLocaleString("en-IN")}
            </div>

            <div className="flex ms-4">
              {hasDiscount && (
                <div className="text-[10px] font-medium text-neutral-400 line-through sm:text-[11px]">
                  ₹{product.price.toLocaleString("en-IN")}
                </div>
              )}

              {hasDiscount && (
                <span className="rounded bg-emerald-50 px-1 py-0.5 text-[8px] font-bold text-emerald-600 sm:text-[9px]">
                  -{discountPercent}%
                </span>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-2 sm:mt-2.5">
            {status !== "authenticated" ? (
              <Link
                to={`/category/${product.category.slug}/product/${product.slug}`}
                title="View product"
                className={`flex h-7 w-full items-center justify-center rounded-md text-[10px] font-semibold transition-all active:scale-[0.98] sm:h-8 sm:rounded-lg sm:text-[11px] ${
                  isStock
                    ? "pointer-events-none bg-neutral-100 text-neutral-400"
                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                }`}
              >
                Buy Now
              </Link>
            ) : (
              <div className="flex w-full items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleCart}
                  disabled={isStock}
                  title={
                    isStock
                      ? "Unavailable"
                      : isInCart
                        ? "Remove from cart"
                        : "Add to cart"
                  }
                  aria-label={
                    isStock
                      ? "Unavailable"
                      : isInCart
                        ? "Remove from cart"
                        : "Add to cart"
                  }
                  className={`flex h-7 flex-30 shrink-0 items-center justify-center rounded-md border transition-all active:scale-[0.95] sm:h-8 sm:rounded-lg ${
                    isStock
                      ? "cursor-not-allowed border-transparent bg-neutral-100 text-neutral-400"
                      : isInCart
                        ? "border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800"
                        : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  {isInCart ? (
                    <Trash2 size={12} strokeWidth={2} />
                  ) : (
                    <ShoppingCart size={13} strokeWidth={2} />
                  )}
                </button>

                <Link
                  to={`/category/${product.category.slug}/product/${product.slug}`}
                  title="View product"
                  className={`flex h-7 flex-70 items-center justify-center rounded-md text-[10px] font-semibold transition-all active:scale-[0.98] sm:h-8 sm:rounded-lg sm:text-[11px] ${
                    isStock
                      ? "pointer-events-none bg-neutral-100 text-neutral-400"
                      : "bg-neutral-900 text-white hover:bg-neutral-800"
                  }`}
                >
                  Buy Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
