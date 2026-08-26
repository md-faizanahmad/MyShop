import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import type { PublicProduct } from "@/types/product";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";

const PRODUCTS_API = "https://api.myazstore.shop/v1/products";

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

        setProducts(data.products.slice(0, 5));
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
      className="py-6 sm:py-8 lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <header className="mb-4 flex items-end justify-between gap-4 sm:mb-6">
          <div>
            <div className="mb-1 flex items-center gap-1.5">
              <Sparkles
                aria-hidden="true"
                className="size-3.5 text-sky-500 sm:size-4"
              />

              <span className="text-[11px] font-semibold text-sky-600 sm:text-xs">
                Fresh picks
              </span>
            </div>

            <h2
              id="new-arrivals-heading"
              className="
                text-lg font-bold
                tracking-tight text-zinc-900
                sm:text-xl lg:text-2xl
              "
            >
              New Arrivals
            </h2>
          </div>

          <Link
            to="/new-arrivals"
            className="
              inline-flex shrink-0
              items-center gap-1
              rounded-lg
              px-2 py-1.5
              text-xs font-semibold
              text-red-600
              transition-colors
              hover:bg-red-50
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-500
              focus-visible:ring-offset-2
              sm:px-3 sm:text-sm
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
              overflow-x-auto px-4 pb-2
              snap-x snap-mandatory
              scrollbar-none

              sm:-mx-6 sm:px-6

              lg:mx-0
              lg:grid lg:grid-cols-4
              lg:gap-4
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
                  w-[150px] shrink-0
                  snap-start
                  overflow-hidden
                  rounded-xl
                  border border-zinc-100
                  bg-white
                  transition-shadow
                  hover:shadow-md

                  sm:w-[170px]
                  lg:w-auto
                "
              >
                {/* Product image */}
                {/* /category/${product.category.slug}/product/${product.slug */}
                <Link
                  to={`/category/${product.category.slug}/product/${product.slug}`}
                  aria-label={`View ${product.name}`}
                  className="
                    relative block
                    aspect-square
                    overflow-hidden
border-b border-gray-100
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
                      group-hover:scale-[1.04]
                    "
                  />

                  <span
                    className="
                      absolute left-2 top-2
                      rounded-md
                      bg-red-500
                      px-1.5 py-0.5
                      text-[9px]
                      font-semibold
                      text-white
                    "
                  >
                    New
                  </span>
                </Link>

                {/* Product information */}
                <div className="p-2.5 sm:p-3">
                  <Link
                    to={`/product/${product.slug}`}
                    className="
                      block
                      line-clamp-2
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

                  <div className="mt-1.5 flex items-baseline gap-1.5">
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
