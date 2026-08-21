import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import type { JSX } from "react";

export default function CartEmpty(): JSX.Element {
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
          aria-hidden="true"
        >
          <ShoppingBag size={28} strokeWidth={1.8} className="sm:size-8" />
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
