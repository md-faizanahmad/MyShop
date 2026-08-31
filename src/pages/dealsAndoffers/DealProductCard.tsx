import type { PublicProduct } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface DealProductCardProps {
  product: PublicProduct;
}

export default function DealProductCard({ product }: DealProductCardProps) {
  // discountPrice is optional in PublicProduct.
  // If there is no discount price, use the regular price.
  const sellingPrice = product.discountPrice ?? product.price;

  const hasDiscount =
    product.discountPrice !== undefined &&
    product.discountPrice < product.price;

  const discount = hasDiscount
    ? Math.round(((product.price - sellingPrice) / product.price) * 100)
    : 0;

  const saving = hasDiscount ? product.price - sellingPrice : 0;

  const productUrl = `/category/${product.category.slug}/product/${product.slug}`;

  return (
    <article className="group flex min-w-0 flex-col rounded-md border border-zinc-200 bg-white p-3 sm:p-4">
      {/* IMAGE */}
      <Link
        to={productUrl}
        className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-sm bg-zinc-50"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain p-2 transition-transform duration-200 group-hover:scale-[1.03] sm:p-3"
        />

        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded-sm bg-red-600 px-1.5 py-1 text-[10px] font-semibold text-white sm:text-xs">
            {discount}% off
          </span>
        )}
      </Link>

      {/* DETAILS */}
      <div className="flex flex-1 flex-col pt-3">
        {/* CATEGORY */}
        <p className="mb-1 truncate text-[10px] font-medium uppercase tracking-wide text-zinc-400">
          {product.category.name}
        </p>

        {/* TITLE */}
        <Link
          to={productUrl}
          className="line-clamp-2 min-h-10 text-sm leading-5 text-zinc-800 transition-colors hover:text-red-600"
        >
          {product.name}
        </Link>

        {/* RATING */}
        <div className="mt-2 min-h-5">
          {product.rating && product.rating.count > 0 ? (
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-0.5 rounded-sm bg-emerald-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {product.rating.average.toFixed(1)}
                <span>★</span>
              </span>

              <span className="text-[10px] text-zinc-400">
                {product.rating.count} ratings
              </span>
            </div>
          ) : (
            <span className="text-[10px] text-zinc-400">No ratings yet</span>
          )}
        </div>

        {/* PRICE */}
        <div className="mt-2 min-h-[27px]">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-lg font-semibold leading-6 text-zinc-950">
              ₹{sellingPrice.toLocaleString("en-IN")}
            </span>

            {hasDiscount && (
              <span className="text-xs text-zinc-400 line-through">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>

        {/* SAVING */}
        <div className="mt-1 min-h-[16px]">
          {saving > 0 && (
            <span className="text-[10px] font-medium text-emerald-600">
              Save ₹{saving.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* STOCK */}
        <div className="mt-1 min-h-[16px]">
          {product.stock === 0 ? (
            <p className="text-[10px] font-medium text-red-600">Out of stock</p>
          ) : product.stock <= 5 ? (
            <p className="text-[10px] font-medium text-red-600">
              Only {product.stock} left
            </p>
          ) : (
            <span className="text-[10px] text-transparent">Available</span>
          )}
        </div>

        {/* ACTION */}
        <Link
          to={productUrl}
          className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-sm border border-zinc-300 bg-white text-xs font-semibold text-zinc-800 transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          View Product
        </Link>
      </div>
    </article>
  );
}
