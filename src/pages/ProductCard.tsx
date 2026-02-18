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

///// on above working - we jsut redesign
// src/components/ProductCard.tsx
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, Star, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import type { PublicProduct } from "../types/product";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";

interface Props {
  product: PublicProduct;
}

export default function ProductCard({ product }: Props) {
  const cartItems = useCartStore((s) => s.items);
  const addToCart = useCartStore((s) => s.addItem);
  const removeFromCart = useCartStore((s) => s.removeItem);

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
  const toggleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
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
    <motion.div whileHover={{ y: -2 }} className="group">
      <Link
        to={`/category/${product.category.slug}/product/${product.slug}`}
        className="block"
      >
        {/* IMAGE */}
        <div className="relative bg-gray-50 rounded-xl overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`w-full aspect-square object-cover group-hover:scale-105 transition ${
              isStock ? "opacity-60" : "group-hover:scale-105"
            }`}
          />
          {/* OUT OF STOCK OVERLAY */}
          {isStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center">
                <AlertCircle size={40} className="mx-auto text-white mb-2" />
                <p className="text-white font-bold text-lg">Out of Stock</p>
              </div>
            </div>
          )}
          {/* DISCOUNT BADGE */}
          {hasDiscount && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">
              {discountPercent}% OFF
            </span>
          )}

          {/* WISHLIST */}
          <button
            onClick={toggleWishlist}
            className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full p-2 shadow"
          >
            <Heart
              size={16}
              className={
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
              }
            />
          </button>
        </div>

        {/* CONTENT */}
        <div className="pt-3 space-y-1">
          <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>

          {/* RATING */}
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span>{product.rating?.average?.toFixed(1) ?? "0.0"}</span>
            <span className="text-gray-400">
              ({product.rating?.count ?? 0})
            </span>
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-2">
            <span
              className={`font-bold text-base ${
                isStock ? "text-gray-500" : ""
              }`}
            >
              ₹{price.toLocaleString("en-IN")}
            </span>

            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* ADD / REMOVE CART */}
      <button
        onClick={toggleCart}
        className={`mt-3 w-full flex items-center justify-center gap-2
    rounded-xl text-sm font-bold transition-all
    py-3 sm:py-2.5
    ${
      isStock
        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
        : isInCart
          ? "bg-red-100 text-red-700 hover:bg-red-200"
          : "bg-sky-600 text-white hover:bg-sky-700"
    }`}
      >
        {isInCart ? (
          <>
            <Trash2 size={18} />
            <span className="hidden sm:inline">Remove from Cart</span>
          </>
        ) : (
          <>
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">
              {isStock ? "Out of Stock" : "Add to Cart"}
            </span>
          </>
        )}
      </button>
    </motion.div>
  );
}
