import { Link } from "react-router-dom";
import { Trash2, X, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

import { useWishlistStore } from "../store/useWishlistStore";
import { useCartStore } from "../store/useCartStore";
import WishlistEmpty from "../shared/WishlistEmpty";

export default function WishlistPage() {
  /* -----------------------------
     Stores
  ----------------------------- */
  const items = useWishlistStore((s) => s.items);
  const loading = useWishlistStore((s) => s.loading);
  const remove = useWishlistStore((s) => s.remove);
  const clear = useWishlistStore((s) => s.clear);

  const cartItems = useCartStore((s) => s.items);
  const addToCart = useCartStore((s) => s.addItem);

  /* -----------------------------
     Derived helpers
  ----------------------------- */
  const isInCart = (productId: string): boolean =>
    cartItems.some((i) => i.product._id === productId);

  /* -----------------------------
     Loading state (FIX)
  ----------------------------- */
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

          <span className="text-xs font-medium md:text-sm">
            Loading wishlist…
          </span>
        </div>
      </div>
    );
  }

  /* -----------------------------
     Empty state (REAL empty)
  ----------------------------- */
  if (items.length === 0) {
    return <WishlistEmpty />;
  }

  /* -----------------------------
     Render
  ----------------------------- */
  return (
    <main className="min-h-dvh  px-2.5 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
      <section className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <header className="mb-4 flex items-center justify-between gap-3 sm:mb-6">
          <div className="min-w-0">
            <h1 className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg lg:text-xl">
              My Wishlist
              <span className="ml-1.5 text-sm font-normal text-slate-400">
                ({items.length})
              </span>
            </h1>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={() => {
                void clear();
                toast.success("Wishlist cleared");
              }}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 sm:px-2.5 sm:text-sm"
            >
              <span>Clear all</span>
              <Trash2 size={14} aria-hidden="true" />
            </button>
          )}
        </header>

        {/* Grid */}
        <div
          aria-label="Wishlist products"
          className="grid grid-cols-2 gap-2.5 xs:gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          {items.map((item) => {
            const p = item.product;

            return (
              <article
                key={item.productId}
                className="group min-w-0 overflow-hidden rounded-md border border-slate-200 bg-white transition-shadow duration-200 hover:shadow-sm"
              >
                <Link
                  to={`/category/${p.category.slug}/product/${p.slug}`}
                  className="block overflow-hidden bg-slate-100"
                  aria-label={`View ${p.name}`}
                >
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </Link>

                <div className="flex min-w-0 flex-col p-2.5 sm:p-3">
                  <h2 className="line-clamp-2 min-h-10 text-[13px] font-medium leading-5 text-slate-900 sm:text-sm">
                    {p.name}
                  </h2>

                  <p className="mt-1.5 text-sm font-semibold text-sky-600 sm:text-base">
                    ₹{p.price.toLocaleString("en-IN")}
                  </p>

                  <div className="mt-2.5 flex items-center gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (!isInCart(p._id)) {
                          addToCart(p, 1);
                          toast.success("Added to cart");
                        }
                      }}
                      className={`flex h-9 min-w-0 flex-1 items-center justify-center gap-1 rounded-md px-1.5 text-[11px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 sm:gap-1.5 sm:px-2 sm:text-xs ${
                        isInCart(p._id)
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-sky-600 text-white hover:bg-sky-700"
                      }`}
                    >
                      <ShoppingCart
                        size={13}
                        className="shrink-0 sm:h-3.5 sm:w-3.5"
                        aria-hidden="true"
                      />

                      <span className="truncate">
                        {isInCart(p._id) ? "Added" : "Add to Cart"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        void remove(item.productId);
                        toast.success("Removed");
                      }}
                      aria-label={`Remove ${p.name} from wishlist`}
                      title="Remove from wishlist"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                    >
                      <X size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
