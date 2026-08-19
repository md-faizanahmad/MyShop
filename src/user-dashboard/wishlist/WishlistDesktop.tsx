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

interface WishlistDesktopProps {
  items: WishlistItem[];
  isInCart: (productId: string) => boolean;
  onRemove: (productId: string) => void;
  onAddToCart: (product: WishlistItem["product"]) => void;
}

export default function WishlistDesktop({
  items,
  isInCart,
  onRemove,
  onAddToCart,
}: WishlistDesktopProps) {
  return (
    <div
      aria-label="Wishlist products"
      className="grid grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
    >
      {items.map((item) => {
        const p = item.product;
        const added = isInCart(p._id);

        return (
          <article
            key={item.productId}
            className="group min-w-0 overflow-hidden border border-slate-200 bg-white transition-shadow duration-200 hover:shadow-sm"
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

            <div className="flex min-w-0 flex-col p-3">
              <div className="flex min-w-0 items-start gap-2">
                <Link
                  to={`/category/${p.category.slug}/product/${p.slug}`}
                  className="min-w-0 flex-1"
                >
                  <h2 className="line-clamp-2 min-h-10 text-sm font-medium leading-5 text-slate-900">
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
                  <X size={15} aria-hidden="true" />
                </button>
              </div>

              <p className="mt-2 text-base font-semibold text-slate-900">
                ₹{p.price.toLocaleString("en-IN")}
              </p>

              <button
                type="button"
                onClick={() => onAddToCart(p)}
                disabled={added}
                className={`mt-3 flex h-9 w-full items-center justify-center gap-1.5 px-2 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 ${
                  added
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-sky-600 text-white hover:bg-sky-700"
                }`}
              >
                <ShoppingCart size={14} aria-hidden="true" />
                {added ? "Added" : "Add to Cart"}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
