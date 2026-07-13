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
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading wishlist…
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
    <div className="min-h-screen bg-sky-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">
            My Wishlist
            {/* ({items.length}) */}
            <span className="ml-2 text-base font-medium text-gray-500">
              ({items.length})
            </span>
          </h1>

          <button
            onClick={() => {
              void clear();
              toast.success("Wishlist cleared");
            }}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl"
          >
            <Trash2 size={18} />
            Clear All
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {items.map((item) => {
            const p = item.product;

            return (
              <div
                key={item.productId}
                className="bg-white overflow-hidden rounded-lg border  shadow-sm"
              >
                <Link to={`/category/${p.category.slug}/product/${p.slug}`}>
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="aspect-square object-cover"
                  />
                </Link>

                <div className="p-1.5 space-y-2.5">
                  <h3 className="text-sm  line-clamp-2 min-h-10  font-medium leading-5">
                    {p.name}
                  </h3>

                  <p className="text-base font-bold  text-sky-600">
                    ₹{p.price.toLocaleString("en-IN")}
                  </p>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        if (!isInCart(p._id)) {
                          addToCart(p, 1);
                          toast.success("Added to cart");
                        }
                      }}
                      className={`flex h-9 flex-1 items-center justify-center gap-1 rounded-md text-xs font-semibold ${
                        isInCart(p._id)
                          ? "bg-green-100 text-green-700"
                          : "bg-sky-600 text-white"
                      }`}
                    >
                      <ShoppingCart size={13} className="inline mr-1" />
                      {isInCart(p._id) ? "Added" : "Add"}
                    </button>

                    <button
                      onClick={() => {
                        void remove(item.productId);
                        toast.success("Removed");
                      }}
                      className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white "
                    >
                      <X size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
