// components/WishlistEmpty.tsx
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";

export default function WishlistEmpty() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5 py-12 sm:min-h-[65vh]">
      <div className="w-full max-w-sm text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sky-50">
          <Heart className="h-9 w-9 text-sky-500" strokeWidth={1.7} />
        </div>

        {/* Content */}
        <h2 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
          Your wishlist is empty
        </h2>

        <p className="mx-auto mb-7 max-w-xs text-sm leading-6 text-gray-500 sm:text-base">
          Save products you love and find them here anytime.
        </p>

        {/* CTA */}
        <Link
          to="/"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 text-sm font-medium text-white transition-colors hover:bg-sky-700 active:bg-sky-800"
        >
          Start Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
