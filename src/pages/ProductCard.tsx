import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import type { PublicProduct } from "../types/product";
import { useCartStore } from "../store/CartStore";
import { useWishlistStore } from "../store/WishlistStore";

interface Props {
  product: PublicProduct;
}

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate();
  const { items: cartItems, addItem } = useCartStore();
  const { items: wishlistItems, toggle } = useWishlistStore();

  // Sync wishlist state
  const [isLiked, setIsLiked] = useState(
    wishlistItems.some((i) => i._id === product._id)
  );

  useEffect(() => {
    setIsLiked(wishlistItems.some((i) => i._id === product._id));
  }, [wishlistItems, product._id]);

  // Cart check
  const isInCart = cartItems.some((i) => i?.product?._id === product._id);

  // Safe price
  const safePrice = Number(product?.price ?? 0).toLocaleString("en-IN");

  // No NodeJS typing issue
  const tapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDoubleTap = () => {
    if (tapTimeout.current) {
      clearTimeout(tapTimeout.current);
      tapTimeout.current = null;

      if (!isLiked) {
        toggle(product);
        setIsLiked(true);
        toast.success("Saved to wishlist", { duration: 1200 });
      }
    } else {
      tapTimeout.current = setTimeout(() => {
        tapTimeout.current = null;
      }, 250);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from wishlist" : "Saved to wishlist", {
      duration: 1200,
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ product, qty: 1 });
    toast.success("Added to cart!");
  };

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInCart) addItem({ product, qty: 1 });
    navigate(`/checkout?quickbuy=${product._id}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileTap={{ scale: 0.98 }}
      className="group relative"
      onClick={handleDoubleTap}
    >
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Link
            to={`/category/${product.category.slug}/${product.slug}`}
            className="block w-full h-full"
          >
            <img
              src={product.imageUrl || "/placeholder.jpg"}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </Link>

          {/* Heart animation */}
          {isLiked && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <Heart className="w-24 h-24 fill-white text-white drop-shadow-2xl" />
            </motion.div>
          )}

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 z-10 p-3 bg-white/90 backdrop-blur-lg rounded-full shadow-xl hover:scale-110 transition-all duration-300"
          >
            <Heart
              size={22}
              className={
                isLiked
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-gray-700 hover:text-red-500"
              }
            />
          </button>

          {/* Hover actions */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            <div className="flex gap-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white text-black font-bold py-3 rounded-full shadow-xl hover:bg-gray-100 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                <span>Cart</span>
              </button>

              <button
                onClick={handleQuickBuy}
                className="flex-1 bg-linear-to-r from-sky-500 to-blue-500 text-white font-bold py-3 rounded-full shadow-xl hover:shadow-2xl transition flex items-center justify-center gap-2"
              >
                <Zap size={18} />
                <span>Buy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="p-4 space-y-2">
          <Link to={`/product/${product._id}`}>
            <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight hover:text-blue-600 transition">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-gray-900">₹{safePrice}</p>

            {/* Mobile Buttons */}
            <div className="flex gap-2 md:hidden">
              <button
                onClick={handleAddToCart}
                className={`p-3 rounded-full shadow-lg transition ${
                  isInCart
                    ? "bg-green-100 text-green-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ShoppingCart size={18} />
              </button>

              <button
                onClick={handleQuickBuy}
                className="p-3 bg-linear-to-r from-sky-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition"
              >
                <Zap size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
