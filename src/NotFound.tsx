import { Link } from "react-router-dom";
import { ArrowLeft, Home, Search, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <main
      className="
        flex min-h-[calc(100dvh-6.5rem)]
        items-center justify-center
        px-4 py-8
        sm:px-6 sm:py-12
      "
    >
      <section
        aria-labelledby="not-found-title"
        className="w-full max-w-md text-center"
      >
        {/* Visual */}
        <div
          aria-hidden="true"
          className="
            mx-auto mb-5
            flex size-16 items-center justify-center
            rounded-2xl
            border border-zinc-100
            bg-zinc-50
            text-zinc-300
            sm:size-20
          "
        >
          <ShoppingBag className="size-7 sm:size-8" strokeWidth={1.5} />
        </div>

        {/* Content */}
        <div className="space-y-2.5">
          <p className="text-sm font-semibold text-sky-600">404</p>

          <h1
            id="not-found-title"
            className="
              text-xl font-bold
              leading-tight tracking-tight
              text-zinc-900
              sm:text-2xl
            "
          >
            Page not found
          </h1>

          <p
            className="
              mx-auto max-w-sm
              text-sm leading-5
              text-zinc-500
              sm:text-[15px] sm:leading-6
            "
          >
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        {/* Actions */}
        {/* Actions */}
        <nav
          aria-label="404 page navigation"
          className="
    mt-6 flex
    items-center justify-center
    gap-2.5
  "
        >
          <Link
            to="/"
            className="
      inline-flex h-9
      items-center justify-center gap-1.5
      rounded-lg
      bg-zinc-900
      px-3.5
      text-xs font-semibold text-white
      transition-colors
      hover:bg-zinc-800
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-zinc-900
      focus-visible:ring-offset-2
      active:bg-zinc-700
      sm:h-10
      sm:px-4
      sm:text-sm
    "
          >
            <Home aria-hidden="true" className="size-3.5 sm:size-4" />
            Home
          </Link>

          <Link
            to="/products"
            className="
      inline-flex h-9
      items-center justify-center gap-1.5
      rounded-lg
      border border-zinc-200
      bg-white
      px-3.5
      text-xs font-semibold text-zinc-800
      transition-colors
      hover:bg-zinc-50
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-sky-500
      focus-visible:ring-offset-2
      active:bg-zinc-100
      sm:h-10
      sm:px-4
      sm:text-sm
    "
          >
            <Search aria-hidden="true" className="size-3.5 sm:size-4" />
            Products
          </Link>
        </nav>
        {/* Recovery */}
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="
            mt-5
            inline-flex min-h-10
            items-center justify-center gap-1.5
            px-3
            text-xs font-medium
            text-zinc-400
            transition-colors
            hover:text-sky-600
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-sky-500
            focus-visible:ring-offset-2
          "
        >
          <ArrowLeft aria-hidden="true" className="size-3.5" />
          Try again
        </button>
      </section>
    </main>
  );
}
