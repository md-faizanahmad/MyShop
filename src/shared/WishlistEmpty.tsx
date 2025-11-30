// components/WishlistEmpty.tsx
import { Link } from "react-router-dom";
import { Heart, Sparkles } from "lucide-react";

export default function WishlistEmpty() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* Animated Heart */}
        <div className="relative w-40 h-40 mx-auto mb-10">
          <div className="absolute inset-0 bg-linear-to-br from-sky-100 to-blue-100 rounded-full shadow-2xl animate-ping" />
          <div className="relative w-full h-full bg-linear-to-br from-sky-100 to-blue-100 rounded-full shadow-2xl flex items-center justify-center border-8 border-white">
            <Heart className="w-24 h-24 text-sky-300" strokeWidth={1.5} />
          </div>
        </div>

        <h6 className="text-4xl md:text-2xl font-black bg-linear-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent mb-4">
          Your Wishlist is Empty
        </h6>
        <p className="text-lg text-gray-600 mb-10">
          Save your favorite items and come back anytime
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-linear-to-r from-sky-500 to-blue-600 text-white  px-12 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
        >
          <Sparkles className="w-6 h-6" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
