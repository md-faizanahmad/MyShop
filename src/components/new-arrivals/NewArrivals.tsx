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
      className="py-7 sm:py-9 lg:py-11"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <header className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
          <div className="min-w-0">
            <div className="mb-1.5 flex items-center gap-1.5">
              <Sparkles
                aria-hidden="true"
                className="size-3.5 text-sky-500 sm:size-4"
              />

              <span className="text-[11px] font-semibold uppercase tracking-wide text-sky-600 sm:text-xs">
                Fresh picks
              </span>
            </div>

            <h2
              id="new-arrivals-heading"
              className="
                text-xl font-bold
                tracking-tight text-zinc-950
                sm:text-2xl
              "
            >
              New Arrivals
            </h2>

            <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
              Recently added to the store
            </p>
          </div>

          <Link
            to="/new-arrivals"
            className="
              inline-flex shrink-0
              items-center gap-1
              rounded-md
              px-1 py-1.5
              text-xs font-semibold
              text-zinc-700
              transition-colors
              hover:text-red-600
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-500
              focus-visible:ring-offset-2
              sm:px-2 sm:text-sm
            "
          >
            View all
            <ArrowRight aria-hidden="true" className="size-3.5 sm:size-4" />
          </Link>
        </header>

        {/* Loading */}
        {loading && <Skeleton />}

        {/* Products */}
        {!loading && products.length > 0 && (
          <div
            className="
              -mx-4 flex gap-3
              overflow-x-auto px-4 pb-3
              snap-x snap-mandatory
              scrollbar-none

              sm:-mx-6 sm:gap-4 sm:px-6

              lg:mx-0
              lg:grid lg:grid-cols-4
              lg:gap-5
              lg:overflow-visible
              lg:px-0

              xl:grid-cols-5
            "
          >
            {products.map((product) => (
              <article
                key={product._id}
                className="
                  group
                  w-[154px] shrink-0
                  snap-start

                  overflow-hidden
                  rounded-lg
                  border border-zinc-200/80
                  bg-white

                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-zinc-300
                  hover:shadow-sm

                  sm:w-[172px]
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
                      p-4
                      transition-transform
                      duration-300
                      ease-out
                      group-hover:scale-[1.035]
                    "
                  />

                  {/* New badge */}
                  <span
                    className="
                      absolute left-2.5 top-2.5
                      rounded-full
                      bg-zinc-950
                      px-2 py-1
                      text-[9px]
                      font-semibold
                      tracking-wide
                      text-white
                      shadow-sm
                    "
                  >
                    NEW
                  </span>
                </Link>

                {/* Product information */}
                <div className="px-3 pb-3 pt-2.5 sm:px-3.5 sm:pb-3.5">
                  <Link
                    to={`/category/${product.category.slug}/product/${product.slug}`}
                    className="
                      block
                      line-clamp-2
                      min-h-8
                      text-xs
                      font-medium
                      leading-4
                      text-zinc-800
                      transition-colors
                      hover:text-red-600
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-red-500
                      focus-visible:ring-offset-1
                      sm:text-sm
                      sm:leading-5
                    "
                  >
                    {product.name}
                  </Link>

                  <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                    <span className="text-sm font-bold text-zinc-950 sm:text-base">
                      ₹
                      {(product.discountPrice ?? product.price).toLocaleString(
                        "en-IN",
                      )}
                    </span>

                    {product.discountPrice &&
                      product.discountPrice < product.price && (
                        <span className="text-[11px] text-zinc-400 line-through">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                      )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <p className="py-8 text-center text-sm text-zinc-500">
            New arrivals are currently unavailable.
          </p>
        )}
      </div>
    </section>
  );
}
