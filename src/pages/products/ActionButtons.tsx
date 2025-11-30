// src/components/product/ActionButtons.tsx
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Zap } from "lucide-react";

interface Props {
  productId: string;
  stock: number;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
  onAddToCart: () => void;
  onBuyNow: () => void; // New
}

export default function ActionButtons({
  stock,
  isWishlisted,
  onWishlistToggle,
  onAddToCart,
  onBuyNow,
}: Props) {
  const isOutOfStock = stock === 0;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-3">
      {/* BUY NOW */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onBuyNow}
        disabled={isOutOfStock}
        className="flex-1 flex items-center justify-center gap-3 bg-linear-to-r from-orange-500 to-red-600 
          text-white py-5 rounded-2xl font-bold text-lg shadow-lg 
          hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <Zap size={26} className="animate-pulse" />
        Buy Now
      </motion.button>

      {/* ADD TO CART */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onAddToCart}
        disabled={isOutOfStock}
        className="flex-1 flex items-center justify-center gap-3 bg-blue-600 text-white 
          py-5 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-700 
          disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <ShoppingCart size={26} />
        Add to Cart
      </motion.button>

      {/* WISHLIST */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onWishlistToggle}
        className={`px-10 py-5 rounded-2xl font-bold text-lg shadow-lg transition-all 
          flex items-center gap-3 ${
            isWishlisted
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
      >
        <Heart size={26} fill={isWishlisted ? "currentColor" : "none"} />
        {isWishlisted ? "Wishlisted" : "Wishlist"}
      </motion.button>
    </div>
  );
}
