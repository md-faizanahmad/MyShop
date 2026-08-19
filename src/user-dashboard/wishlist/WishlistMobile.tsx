import { Link } from "react-router-dom";
import { ShoppingCart, X } from "lucide-react";

type WishlistItem = {
  productId: string;
  product: {
    _id: string;
    name: string;
    slug: string;
    imageUrl: string;
    price: number;
    category: {
      slug: string;
    };
  };
};

interface WishlistMobileProps {
  items: WishlistItem[];
  isInCart: (productId: string) => boolean;
  onRemove: (productId: string) => void;
  onAddToCart: (product: WishlistItem["product"]) => void;
}

export default function WishlistMobile({
  items,
  isInCart,
  onRemove,
  onAddToCart,
}: WishlistMobileProps) {
  return (
    <div
      aria-label="Wishlist products"
      className="flex flex-col divide-y divide-slate-200 border-y border-slate-200 bg-white"
    >
      {items.map((item) => {
        const p = item.product;
        const added = isInCart(p._id);

        return (
          <article
            key={item.productId}
            className="flex min-w-0 gap-3 px-1 py-3"
          >
            <Link
              to={`/category/${p.category.slug}/product/${p.slug}`}
              aria-label={`View ${p.name}`}
              className="block h-24 w-24 shrink-0 overflow-hidden bg-slate-100"
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex min-w-0 items-start gap-2">
                <Link
                  to={`/category/${p.category.slug}/product/${p.slug}`}
                  className="min-w-0 flex-1"
                >
                  <h2 className="line-clamp-2 text-sm font-medium leading-5 text-slate-900">
                    {p.name}
                  </h2>
                </Link>

                <button
                  type="button"
                  onClick={() => onRemove(item.productId)}
                  aria-label={`Remove ${p.name} from wishlist`}
                  title="Remove from wishlist"
                  className="flex h-8 w-8 shrink-0 items-center justify-center text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <X size={17} aria-hidden="true" />
                </button>
              </div>

              <p className="mt-1.5 text-sm font-semibold text-slate-900">
                ₹{p.price.toLocaleString("en-IN")}
              </p>

              <div className="mt-auto pt-2.5">
                <button
                  type="button"
                  onClick={() => onAddToCart(p)}
                  disabled={added}
                  className={`inline-flex h-9 w-full items-center justify-center gap-1.5 px-3 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 ${
                    added
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-sky-600 text-white hover:bg-sky-700"
                  }`}
                >
                  <ShoppingCart size={14} aria-hidden="true" />
                  {added ? "Added" : "Add to Cart"}
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
