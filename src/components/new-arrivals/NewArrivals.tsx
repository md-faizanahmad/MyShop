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
      className="bg-white py-8 sm:py-8 lg:py-7"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex items-end justify-between sm:mb-10">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-red-600">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Just Added
              </span>
            </div>
            <h2
              id="new-arrivals-heading"
              className="text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl"
            >
              New Arrivals
            </h2>
          </div>

          <Link
            to="/new-arrivals"
            className="group hidden items-center gap-2 text-sm font-medium text-zinc-900 transition-colors hover:text-red-600 sm:flex"
          >
            Shop all
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </header>

        {/* Loading State */}
        {loading && <Skeleton />}

        {/* Products List (Mobile: Swipeable Carousel, Desktop: Grid) */}
        {!loading && products.length > 0 && (
          <div className="-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-8 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:px-0 sm:pb-0 lg:grid-cols-4 xl:grid-cols-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                  className="group relative w-[75vw] flex-none snap-start pr-4 sm:w-auto sm:pr-0"
                >
                  {/* Image Container */}
                  <div className="relative mb-4 aspect-4/5 overflow-hidden rounded-2xl bg-zinc-100 sm:aspect-square">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain p-4 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Badges */}
                    <div className="absolute left-3 top-3 flex flex-col gap-2">
                      <span className="block rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-900 shadow-sm">
                        New
                      </span>
                      {hasDiscount && (
                        <span className="block rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold tracking-widest text-white shadow-sm">
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

        {/* Mobile "Shop All" Fallback */}
        {!loading && products.length > 0 && (
          <div className="mt-4 flex sm:hidden">
            <Link
              to="/new-arrivals"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-100 py-3.5 text-sm font-medium text-zinc-900 transition-colors active:bg-zinc-200"
            >
              View all new arrivals
              <ArrowRight className="h-4 w-4" />
            </Link>
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
