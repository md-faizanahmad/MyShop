import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import type { PublicProduct } from "@/types/product";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";

const PRODUCTS_API = "https://api.myazstore.shop/v1/products";
const NEW_ARRIVAL_DAYS = 60;

export default function NewArrivals() {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await fetch(PRODUCTS_API);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: { products: PublicProduct[] } = await response.json();

        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - NEW_ARRIVAL_DAYS);

        const newArrivals = data.products
          .filter((product) => {
            const createdAt = new Date(product.createdAt);
            return createdAt >= cutoffDate;
          })
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 5);

        setProducts(newArrivals);
      } catch (error) {
        console.error("Failed to load new arrivals:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <section
      aria-labelledby="new-arrivals-heading"
      className="py-6 sm:py-8 lg:py-9"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <header className="mb-4 flex items-end justify-between gap-4 sm:mb-5">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-1.5">
              <Sparkles aria-hidden="true" className="size-3.5 text-sky-600" />

              <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-sky-600 sm:text-[11px]">
                Fresh picks
              </span>
            </div>

            <h2
              id="new-arrivals-heading"
              className="text-lg font-bold tracking-tight text-zinc-950 sm:text-xl"
            >
              New Arrivals
            </h2>

            <p className="mt-0.5 text-[11px] text-zinc-500 sm:text-xs">
              Recently added to the store
            </p>
          </div>

          <Link
            to="/new-arrivals"
            className="
            group inline-flex shrink-0 items-center gap-1
            border-b border-transparent
            pb-0.5
            text-xs font-semibold text-zinc-700
            transition-colors
            hover:border-red-600 hover:text-red-600
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-red-500
            focus-visible:ring-offset-2
            sm:text-sm
          "
          >
            View all
            <ArrowRight
              aria-hidden="true"
              className="
              size-3.5
              transition-transform
              duration-200
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
            -mx-4 flex gap-2.5
            overflow-x-auto px-4 pb-2
            snap-x snap-mandatory
            scrollbar-none

            sm:-mx-6 sm:gap-3 sm:px-6

            lg:mx-0
            lg:grid lg:grid-cols-4
            lg:gap-4
            lg:overflow-visible
            lg:px-0

            xl:grid-cols-5
          "
          >
            {products.map((product) => {
              const hasDiscount =
                !!product.discountPrice &&
                product.discountPrice < product.price;

              return (
                <article
                  key={product._id}
                  className="
        group relative
        w-[148px] shrink-0 snap-start
        overflow-hidden
        border border-zinc-200
        bg-white

        transition-colors duration-200
        hover:border-red-300

        sm:w-[165px]
        lg:w-auto
      "
                >
                  {/* Product image */}
                  <Link
                    to={`/category/${product.category.slug}/product/${product.slug}`}
                    aria-label={`View ${product.name}`}
                    className="
          relative block
          aspect-square
          overflow-hidden
          bg-red-50/60
        "
                  >
                    {/* Red accent */}
                    <span
                      className="
            absolute left-0 top-0
            h-0.5 w-10
            bg-red-600
          "
                      aria-hidden="true"
                    />

                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="
            h-full w-full
            object-contain
            p-3.5
            transition-transform
            duration-300
            ease-out
            group-hover:scale-[1.05]
          "
                    />

                    {/* NEW badge */}
                    <span
                      className="
            absolute left-2 top-2
            bg-red-600
            px-1.5 py-1
            text-[8px]
            font-bold
            tracking-[0.08em]
            text-white
          "
                    >
                      NEW
                    </span>

                    {/* Hover action */}
                    <span
                      className="
            absolute bottom-2 right-2
            hidden
            items-center justify-center
            border border-red-100
            bg-white
            p-1.5
            text-red-600

            opacity-0
            transition-all duration-200

            group-hover:flex
            group-hover:opacity-100
          "
                      aria-hidden="true"
                    >
                      <ArrowRight className="size-3.5" />
                    </span>
                  </Link>

                  {/* Product information */}
                  <div className="px-2.5 pb-2.5 pt-2 sm:px-3 sm:pb-3">
                    <Link
                      to={`/category/${product.category.slug}/product/${product.slug}`}
                      className="
            block
            line-clamp-2
            min-h-8
            text-[11px]
            font-medium
            leading-4
            text-zinc-800

            transition-colors
            hover:text-red-600

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-red-500
            focus-visible:ring-offset-1

            sm:text-xs
          "
                    >
                      {product.name}
                    </Link>

                    <div className="mt-1.5 flex items-baseline gap-1.5">
                      <span
                        className={`
              text-sm font-bold tracking-tight
              ${hasDiscount ? "text-red-600" : "text-zinc-950"}
              sm:text-[15px]
            `}
                      >
                        ₹
                        {(
                          product.discountPrice ?? product.price
                        ).toLocaleString("en-IN")}
                      </span>

                      {hasDiscount && (
                        <span className="text-[10px] text-zinc-400 line-through">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <p className="py-6 text-center text-xs text-zinc-500">
            New arrivals are currently unavailable.
          </p>
        )}
      </div>
    </section>
  );
}
