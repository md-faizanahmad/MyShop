import type { PublicProduct } from "@/types/product";
import { Link } from "react-router-dom";

interface DealProductCardProps {
  product: PublicProduct;
}

export default function DealProductCard({ product }: DealProductCardProps) {
  const sellingPrice = product.discountPrice ?? product.price;

  const hasDiscount =
    product.discountPrice !== undefined &&
    product.discountPrice < product.price;

  const saving = hasDiscount ? product.price - sellingPrice : 0;

  const discount = hasDiscount
    ? Math.round(((product.price - sellingPrice) / product.price) * 100)
    : 0;

  const productUrl = `/category/${product.category.slug}/product/${product.slug}`;

  return (
    <Link
      to={productUrl}
      className="group block h-full w-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <article className="flex h-full min-h-[285px] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-colors duration-200 hover:border-zinc-300 sm:min-h-[330px]">
        {/* IMAGE */}
        <div className="relative aspect-square shrink-0 overflow-hidden bg-zinc-50 sm:aspect-[4/5]">
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03] sm:p-5"
          />

          {discount > 0 && (
            <span className="absolute left-2 top-2 rounded bg-red-600 px-2 py-1 text-[10px] font-bold tracking-wide text-white sm:left-3 sm:top-3">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* INFO */}
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          {/* NAME */}
          <h3
            title={product.name}
            className="line-clamp-2 min-h-[36px] text-xs font-medium leading-[18px] text-zinc-800 sm:min-h-[40px] sm:text-sm sm:leading-5"
          >
            {product.name}
          </h3>

          {/* PRICE AREA */}
          <div className="mt-auto min-h-[43px] pt-3">
            <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
              <span className="text-base font-bold text-zinc-950 sm:text-lg">
                ₹{sellingPrice.toLocaleString("en-IN")}
              </span>

              {hasDiscount && (
                <span className="text-[11px] text-zinc-500 line-through sm:text-xs">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* SAVING */}
            <div className="mt-0.5 min-h-[15px] sm:mt-1">
              {saving > 0 && (
                <p className="text-[10px] font-semibold text-emerald-600 sm:text-[11px]">
                  Save ₹{saving.toLocaleString("en-IN")}
                </p>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
