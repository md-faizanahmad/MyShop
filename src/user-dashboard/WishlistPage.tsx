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
    <main className="min-h-dvh bg-slate-50 px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-8">
      <section className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <header className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
          <div className="min-w-0">
            <h1 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl lg:text-2xl">
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
              className="shrink-0 rounded-lg px-2 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:px-3 sm:py-2 sm:text-sm"
            >
              Clear all <Trash2 />
            </button>
          )}
        </header>

        {/* Grid */}
        <div
          aria-label="Wishlist products"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          {items.map((item) => {
            const p = item.product;

            return (
              <article
                key={item.productId}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
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

                <div className="flex flex-col p-3 sm:p-3.5">
                  <h2 className="line-clamp-2 min-h-10 text-sm font-medium leading-5 text-slate-900">
                    {p.name}
                  </h2>

                  <p className="mt-2 text-base font-semibold text-sky-600">
                    ₹{p.price.toLocaleString("en-IN")}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (!isInCart(p._id)) {
                          addToCart(p, 1);
                          toast.success("Added to cart");
                        }
                      }}
                      className={`flex h-9 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 ${
                        isInCart(p._id)
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-sky-600 text-white hover:bg-sky-700"
                      }`}
                    >
                      <ShoppingCart size={14} aria-hidden="true" />
                      {isInCart(p._id) ? "Added" : "Add to Cart"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        void remove(item.productId);
                        toast.success("Removed");
                      }}
                      aria-label={`Remove ${p.name} from wishlist`}
                      title="Remove from wishlist"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                    >
                      <X size={15} aria-hidden="true" />
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
