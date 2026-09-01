import { Heart, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useNewArrivals } from "@/hooks/useNewArrivals";
import Skeleton from "@/components/new-arrivals/Skeleton";

const NEW_ARRIVAL_DAYS = 60;

export default function NewArrivalsPage() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [wishlist, setWishlist] = useState<string[]>([]);

  const { products, loading } = useNewArrivals({
    days: NEW_ARRIVAL_DAYS,
  });

  /*
   * Build categories from the actual products.
   * No hardcoded Apparel / Footwear / Gadgets etc.
   */
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Map(
        products.map((product) => [
          product.category._id,
          {
            id: product.category._id,
            name: product.category.name,
          },
        ]),
      ).values(),
    );

    return [{ id: "all", name: "All Products" }, ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All Products") {
      return products;
    }

    return products.filter(
      (product) => product.category._id === activeCategory,
    );
  }, [products, activeCategory]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-9">
        {/* Hero */}
        <section
          className="
            relative overflow-hidden
            border border-zinc-200
            bg-zinc-950
            px-4 py-7
            sm:px-7 sm:py-9
            lg:px-10 lg:py-10
          "
        >
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -right-20 -top-20
              size-56
              rounded-full
              bg-red-600/20
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -bottom-24 -left-20
              size-64
              rounded-full
              bg-sky-600/10
              blur-3xl
            "
          />

          <div className="relative max-w-2xl">
            <div className="mb-2 flex items-center gap-1.5">
              <Sparkles aria-hidden="true" className="size-3.5 text-red-500" />

              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-red-500 sm:text-[11px]">
                Fresh picks
              </span>
            </div>

            <h1
              className="
                text-2xl font-bold
                leading-tight tracking-tight
                text-white
                sm:text-3xl
                lg:text-4xl
              "
            >
              New Arrivals
            </h1>

            <p
              className="
                mt-2 max-w-lg
                text-xs leading-5
                text-zinc-400
                sm:text-sm sm:leading-6
              "
            >
              Discover the latest products recently added to MyAZStore.
            </p>

            {!loading && (
              <div className="mt-4 flex items-center gap-2 text-[10px] font-medium text-zinc-400 sm:text-xs">
                <span
                  className="
                    size-1.5 rounded-full
                    bg-emerald-500
                  "
                />
                {products.length}{" "}
                {products.length === 1 ? "product" : "products"} available
              </div>
            )}
          </div>
        </section>

        {/* Category navigation */}
        {!loading && products.length > 0 && (
          <section
            aria-label="Product categories"
            className="
              mt-5
              -mx-3 px-3
              sm:mx-0 sm:px-0
            "
          >
            <div
              className="
                flex gap-2
                overflow-x-auto
                pb-1
                scrollbar-none
              "
            >
              {categories.map((category) => {
                const active =
                  activeCategory === category.name ||
                  (category.id !== "all" && activeCategory === category.id);

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                      setActiveCategory(
                        category.id === "all" ? "All Products" : category.id,
                      )
                    }
                    className={`
                      shrink-0
                      border
                      px-3.5 py-2
                      text-[11px]
                      font-semibold
                      transition-colors
                      sm:px-4
                      sm:text-xs

                      ${
                        active
                          ? "border-zinc-950 bg-zinc-950 text-white"
                          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-950"
                      }
                    `}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Product section */}
        <section className="mt-6 sm:mt-8">
          {/* Heading */}
          <header className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2
                className="
                  text-lg font-bold
                  tracking-tight text-zinc-950
                  sm:text-xl
                "
              >
                {activeCategory === "All Products"
                  ? "Latest Products"
                  : (categories.find(
                      (category) => category.id === activeCategory,
                    )?.name ?? "Products")}
              </h2>

              {!loading && (
                <p className="mt-0.5 text-[11px] text-zinc-500 sm:text-xs">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "product" : "products"}
                </p>
              )}
            </div>
          </header>

          {/* Loading */}
          {loading && <Skeleton />}

          {/* Products */}
          {!loading && filteredProducts.length > 0 && (
            <div
              className="
                grid
                grid-cols-2
                gap-2.5

                min-[480px]:gap-3

                sm:grid-cols-3
                sm:gap-4

                lg:grid-cols-4
                lg:gap-5
              "
            >
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.includes(product._id);

                const hasDiscount =
                  !!product.discountPrice &&
                  product.discountPrice < product.price;

                const currentPrice = product.discountPrice ?? product.price;

                const discountPercent = hasDiscount
                  ? Math.round(
                      ((product.price - product.discountPrice!) /
                        product.price) *
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
                      transition-shadow
                      duration-200
                      hover:shadow-md
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

                      {/* New badge */}
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

                      {/* Wishlist */}
                      <button
                        type="button"
                        aria-label={
                          isWishlisted
                            ? `Remove ${product.name} from wishlist`
                            : `Add ${product.name} to wishlist`
                        }
                        onClick={(event) => {
                          event.preventDefault();
                          toggleWishlist(product._id);
                        }}
                        className="
                          absolute bottom-2 right-2
                          flex size-8
                          items-center justify-center
                          border border-zinc-200
                          bg-white/95
                          text-zinc-600
                          shadow-sm
                          backdrop-blur-sm
                          transition
                          hover:text-red-600
                          active:scale-95
                          sm:size-9
                        "
                      >
                        <Heart
                          className={`
                            size-4
                            ${isWishlisted ? "fill-red-600 text-red-600" : ""}
                          `}
                        />
                      </button>
                    </Link>

                    {/* Information */}
                    <div className="p-2.5 sm:p-3.5">
                      {/* Category */}
                      <p
                        className="
                          truncate
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-wider
                          text-zinc-400
                          sm:text-[10px]
                        "
                      >
                        {product.category.name}
                      </p>

                      {/* Name */}
                      <Link
                        to={productUrl}
                        className="
                          mt-1
                          block
                          line-clamp-2
                          min-h-8
                          text-[11px]
                          font-medium
                          leading-4
                          text-zinc-800
                          transition-colors
                          hover:text-red-600
                          sm:min-h-10
                          sm:text-sm
                          sm:leading-5
                        "
                      >
                        {product.name}
                      </Link>

                      {/* Price */}
                      <div className="mt-2.5">
                        <div className="flex items-baseline gap-1.5">
                          <span
                            className={`
                              text-sm
                              font-bold
                              tracking-tight
                              sm:text-base
                              ${hasDiscount ? "text-red-600" : "text-zinc-950"}
                            `}
                          >
                            ₹{currentPrice.toLocaleString("en-IN")}
                          </span>

                          {hasDiscount && (
                            <span
                              className="
                                text-[10px]
                                text-zinc-400
                                line-through
                                sm:text-xs
                              "
                            >
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>

                        {hasDiscount && (
                          <p className="mt-0.5 text-[9px] font-medium text-emerald-600 sm:text-[10px]">
                            Save ₹
                            {(
                              product.price - product.discountPrice!
                            ).toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredProducts.length === 0 && (
            <div
              className="
                border border-dashed
                border-zinc-300
                bg-white
                px-5 py-12
                text-center
              "
            >
              <p className="text-sm font-semibold text-zinc-800">
                No products found
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Try another category.
              </p>

              {activeCategory !== "All Products" && (
                <button
                  type="button"
                  onClick={() => setActiveCategory("All Products")}
                  className="
                    mt-4
                    text-xs
                    font-semibold
                    text-red-600
                    hover:text-red-700
                  "
                >
                  View all products
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
