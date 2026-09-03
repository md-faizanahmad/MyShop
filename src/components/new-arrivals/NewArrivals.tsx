import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useNewArrivals } from "@/hooks/useNewArrivals";
import Skeleton from "./Skeleton";

const NEW_ARRIVAL_DAYS = 60;

export default function NewArrivals() {
  const { products, loading } = useNewArrivals({
    days: NEW_ARRIVAL_DAYS,
    limit: 10,
  });

  return (
    <section
      aria-labelledby="new-arrivals-heading"
      className="py-6 sm:py-8 lg:py-4"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-4 flex items-end justify-between sm:mb-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1 text-red-600">
              <Sparkles
                className="h-4 w-4 animate-pulse text-sky-600"
                aria-hidden="true"
              />

              <span className="text-xs font-bold uppercase tracking-widest">
                <span className="text-sky-600">Just</span>{" "}
                <span className="text-red-600">Added</span>
              </span>
            </div>
          </div>

          {/* Shop All */}
          <Link
            to="/new-arrivals"
            className="group flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-red-600"
          >
            <span className="sm:hidden font-bold">View all</span>
            <span className="hidden sm:inline">Shop all</span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </header>

        {/* Loading State */}
        {loading && <Skeleton />}

        {/* Products */}
        {!loading && products.length > 0 && (
          <div
            className="
              -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-5
              sm:mx-0 sm:gap-5 sm:px-0 sm:pb-3
              [&::-webkit-scrollbar]:hidden
              [-ms-overflow-style:none]
              [scrollbar-width:none]
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
                <Link
                  key={product._id}
                  to={productUrl}
                  className="
                    group relative w-[43vw] min-w-[43vw] flex-none snap-start
                    sm:w-[30vw] sm:min-w-[30vw]
                    lg:w-[22vw] lg:min-w-[22vw]
                    xl:w-[18vw] xl:min-w-[18vw]
                  "
                >
                  {/* Image Container */}
                  <div className="relative mb-4 aspect-4/5 overflow-hidden rounded-sm bg-zinc-100 sm:aspect-square">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain p-4 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Badges */}
                    <div className="absolute inset-1">
                      {/* New */}
                      <span className="absolute left-0 top-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-900 shadow-sm">
                        New
                      </span>

                      {/* Discount */}
                      {hasDiscount && (
                        <span className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold tracking-wider text-white shadow-sm">
                          -{discountPercent}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col gap-1 px-1">
                    <h3 className="line-clamp-1 text-sm font-medium text-zinc-900 transition-colors group-hover:text-red-600">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-zinc-900">
                        ₹{currentPrice.toLocaleString("en-IN")}
                      </span>

                      {hasDiscount && (
                        <span className="text-xs text-zinc-500 line-through">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    {hasDiscount && (
                      <p className="mt-1 text-xs font-medium text-emerald-600">
                        Save ₹
                        {(
                          product.price - product.discountPrice!
                        ).toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-zinc-50 py-16 text-center">
            <p className="text-sm font-medium text-zinc-500">
              No new arrivals right now. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
