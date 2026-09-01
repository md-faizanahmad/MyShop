import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useNewArrivals } from "@/hooks/useNewArrivals";
import Skeleton from "./Skeleton";

const NEW_ARRIVAL_DAYS = 60;

export default function NewArrivals() {
  const { products, loading } = useNewArrivals({
    days: NEW_ARRIVAL_DAYS,
    limit: 5,
  });

  return (
    <section
      aria-labelledby="new-arrivals-heading"
      className="border-t border-zinc-100 bg-white py-7 sm:py-9 lg:py-11"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-4 flex items-end justify-between sm:mb-5">
          <div>
            <div className="mb-1 flex items-center gap-1.5">
              <Sparkles aria-hidden="true" className="size-3.5 text-red-600" />

              <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 sm:text-[11px]">
                Just added
              </span>
            </div>

            <h2
              id="new-arrivals-heading"
              className="text-lg font-bold tracking-tight text-zinc-950 sm:text-xl"
            >
              New Arrivals
            </h2>

            <p className="mt-0.5 text-[11px] text-zinc-500 sm:text-xs">
              Discover what's new
            </p>
          </div>

          <Link
            to="/new-arrivals"
            className="
              group flex shrink-0 items-center gap-1
              text-xs font-semibold text-zinc-700
              transition-colors
              hover:text-red-600
              sm:text-sm
            "
          >
            View all
            <ArrowRight
              aria-hidden="true"
              className="
                size-3.5
                transition-transform duration-200
                group-hover:translate-x-0.5
                sm:size-4
              "
            />
          </Link>
        </header>

        {/* Loading */}
        {loading && <Skeleton />}

        {/* Products */}
        {!loading && products.length > 0 && (
          <div
            className="
              grid grid-cols-2 gap-2.5

              sm:grid-cols-3 sm:gap-3

              lg:grid-cols-4 lg:gap-4

              xl:grid-cols-5
            "
          >
            {products.map((product) => {
              const hasDiscount =
                !!product.discountPrice &&
                product.discountPrice < product.price;

              const currentPrice = product.discountPrice ?? product.price;

              const discountPercent = hasDiscount
                ? Math.round(
                    ((product.price - product.discountPrice!) / product.price) *
                      100,
                  )
                : 0;

              const productUrl = `/category/${product.category.slug}/product/${product.slug}`;

              return (
                <article
                  key={product._id}
                  className="
                    group min-w-0
                    overflow-hidden
                    border border-zinc-200
                    bg-white
                    transition-shadow duration-200
                    hover:shadow-sm
                  "
                >
                  {/* Image */}
                  <Link
                    to={productUrl}
                    aria-label={`View ${product.name}`}
                    className="
                      relative block
                      aspect-square
                      overflow-hidden
                      bg-zinc-50
                    "
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="
                        h-full w-full
                        object-contain
                        p-3
                        transition-transform
                        duration-300
                        ease-out
                        group-hover:scale-[1.04]
                        sm:p-4
                      "
                    />

                    {/* NEW */}
                    <span
                      className="
                        absolute left-2 top-2
                        bg-red-600
                        px-1.5 py-1
                        text-[8px]
                        font-bold uppercase
                        tracking-wider
                        text-white
                        sm:left-2.5 sm:top-2.5
                      "
                    >
                      New
                    </span>

                    {/* Discount */}
                    {hasDiscount && (
                      <span
                        className="
                          absolute right-2 top-2
                          bg-white
                          px-1.5 py-1
                          text-[9px]
                          font-bold
                          text-red-600
                          shadow-sm
                          sm:right-2.5 sm:top-2.5
                        "
                      >
                        -{discountPercent}%
                      </span>
                    )}
                  </Link>

                  {/* Product info */}
                  <div className="p-2.5 sm:p-3">
                    <Link
                      to={productUrl}
                      className="
                        block
                        min-h-8
                        line-clamp-2
                        text-[11px]
                        font-medium
                        leading-4
                        text-zinc-800
                        transition-colors
                        hover:text-red-600
                        sm:text-xs
                      "
                    >
                      {product.name}
                    </Link>

                    {/* Price */}
                    <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                      <span
                        className={`
                          text-sm font-bold tracking-tight
                          ${hasDiscount ? "text-red-600" : "text-zinc-950"}
                          sm:text-[15px]
                        `}
                      >
                        ₹{currentPrice.toLocaleString("en-IN")}
                      </span>

                      {hasDiscount && (
                        <span className="text-[10px] text-zinc-400 line-through sm:text-[11px]">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    {/* Discount saving */}
                    {hasDiscount && (
                      <p className="mt-0.5 text-[9px] font-medium text-emerald-600 sm:text-[10px]">
                        Save ₹
                        {(
                          product.price - product.discountPrice!
                        ).toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Empty */}
        {!loading && products.length === 0 && (
          <div className="border border-dashed border-zinc-200 py-8 text-center">
            <p className="text-xs text-zinc-500">
              New arrivals are currently unavailable.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
