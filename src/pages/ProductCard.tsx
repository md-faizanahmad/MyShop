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

////////////// DESIGN UPGRADE
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, Star, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import type { PublicProduct } from "../types/product";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { useAuthStore } from "../store/useAuthStore";

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

  /* -----------------------------
      Cart toggle (ADD ↔ REMOVE)
  ----------------------------- */
  // const toggleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (isStock) {
  //     toast.error("This product is out of stock");
  //     return;
  //   }
  //   if (isInCart) {
  //     removeFromCart(product._id);
  //     toast.success("Removed from cart");
  //   } else {
  //     addToCart(product, 1);
  //     toast.success("Added to cart");
  //   }
  // };

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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group flex flex-col justify-between  p-3 transition-colors  antialiased"
    >
      <Link
        to={`/category/${product.category.slug}/product/${product.slug}`}
        className="block"
      >
        {/* IMAGE FRAME - Flat containment architecture */}
        <div className="relative aspect-square w-full overflow-hidden  flex items-center justify-center ">
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`max-h-full max-w-full object-contain filter contrast-[1.01] transition-transform duration-500 ${
              isStock ? "opacity-40" : "group-hover:scale-102"
            }`}
          />

          {/* OUT OF STOCK STICKER */}
          {isStock && (
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] flex items-center justify-center p-2">
              <div className="flex items-center gap-1.5 text-red-950">
                <AlertCircle size={12} strokeWidth={2.5} />
                <span className="text-[15px] font-mono uppercase tracking-wider font-semibold">
                  Out of Stock
                </span>
              </div>
            </div>
          )}

          {/* COMPACT METRIC DISCOUNT LABEL */}
          {hasDiscount && !isStock && (
            <span className="absolute top-2 left-2 bg-sky-700 text-white text-[9px] font-mono tracking-wider px-1.5 py-0.5 uppercase">
              -{discountPercent}%
            </span>
          )}

          {/* MINIMALIST WISHLIST TOGGLE */}
          {status === "authenticated" && (
            <button
              onClick={toggleWishlist}
              className="absolute top-2 right-2 cursor-pointer bg-white border border-neutral-200 p-1.5 transition-colors hover:bg-neutral-50"
            >
              <Heart
                size={18}
                strokeWidth={1}
                className={
                  isWishlisted
                    ? "fill-red-700 text-red-700"
                    : "text-neutral-400"
                }
              />
            </button>
          )}
        </div>

        {/* METADATA CONTENT PANEL */}
        <div className="pt-3 flex flex-col gap-1">
          <h3 className="text-sm font-medium leading-snug text-neutral-900 line-clamp-1">
            {product.name}
          </h3>

          {/* RATING COMPONENT */}
          {/* <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-400">
            <Star size={10} className="fill-amber-400 text-amber-400" />
            <span className="text-neutral-900 font-medium">
              {product.rating?.average?.toFixed(1) ?? "0.0"}
            </span>
            <span>/</span>
            <span>{product.rating?.count ?? 0} </span>
          </div> */}

          {/* PRICE SPECIFICATIONS */}
          {/* <div className="flex items-baseline gap-2 mt-0.5">
            <span
              className={`text-sm font-semibold tracking-tight ${isStock ? "text-neutral-400" : "text-neutral-900"}`}
            >
              ₹{price.toLocaleString("en-IN")}
            </span>
            {hasDiscount && (
              <span className="text-[11px] font-mono text-neutral-400 line-through">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            )}
          </div> */}
          <div className="mt-0.5 flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span
                className={`text-sm font-semibold tracking-tight ${
                  isStock ? "text-neutral-400" : "text-neutral-900"
                }`}
              >
                ₹{price.toLocaleString("en-IN")}
              </span>

              {hasDiscount && (
                <span className="text-[11px] text-neutral-400 line-through">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {(product.rating?.average ?? 0) > 0 &&
              (product.rating?.count ?? 0) > 0 && (
                <div className="flex shrink-0 items-center gap-1 text-[10px] text-neutral-500">
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                  <span className="font-medium text-neutral-900">
                    {product.rating?.average.toFixed(1)}
                  </span>
                  <span>({product.rating?.count})</span>
                </div>
              )}
          </div>
        </div>
      </Link>

      {/* COMPACT ACTION LAYOUT BUTTON */}

      {/* <button
        onClick={toggleCart}
        disabled={isStock}
        className={`mt-4 w-full flex items-center justify-center gap-2 text-xs font-medium h-8 transition-colors ${
          isStock
            ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200/50"
            : isInCart
              ? "bg-neutral-50 text-neutral-900 border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300"
              : "bg-sky-500 text-white hover:bg-sky-700"
        }`}
      >
        {isInCart ? (
          <>
            <Trash2 size={12} strokeWidth={2.5} />
            <span>In Cart</span>
          </>
        ) : (
          <>
            <ShoppingCart size={14} strokeWidth={2.5} />
            <span>{isStock ? "Unavailable" : "Add to Cart"}</span>
          </>
        )}
      </button> */}

      <button
        onClick={toggleCart}
        disabled={isStock}
        className={`mt-4 w-full cursor-pointer flex items-center justify-center gap-2 text-xs font-medium h-8 transition-colors ${
          isStock
            ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200/50"
            : isInCart
              ? "bg-neutral-50 text-neutral-900 border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300"
              : "bg-sky-500 text-white hover:bg-sky-700"
        }`}
      >
        {status !== "authenticated" ? (
          <>
            <ShoppingCart size={14} strokeWidth={2.5} />
            <span>Login First</span>
          </>
        ) : isInCart ? (
          <>
            <Trash2 size={12} strokeWidth={2.5} />
            <span>In Cart</span>
          </>
        ) : (
          <>
            <ShoppingCart size={14} strokeWidth={2.5} />
            <span>{isStock ? "Unavailable" : "Add to Cart"}</span>
          </>
        )}
      </button>
    </motion.div>
  );
}
