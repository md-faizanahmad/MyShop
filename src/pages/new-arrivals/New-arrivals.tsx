import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronDown,
  Grid2X2,
  List,
  Sparkles,
} from "lucide-react";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface NewProduct {
  id: number;
  title: string;
  category: string;
  image: string;
  price: number;
  originalPrice?: number;
  isNew: boolean;
  tag?: string;
}

// -----------------------------------------------------------------------------
// Static Data
// -----------------------------------------------------------------------------

const FILTER_CATEGORIES = [
  "All Products",
  "Apparel",
  "Footwear",
  "Accessories",
  "Gadgets",
];

const NEW_ARRIVALS: NewProduct[] = [
  {
    id: 1,
    title: "Minimalist Canvas Daypack",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=85",
    price: 2499,
    originalPrice: 3299,
    isNew: true,
    tag: "Trending",
  },
  {
    id: 2,
    title: "Chunky Knit Oversized Sweater",
    category: "Apparel",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=85",
    price: 2899,
    originalPrice: 3799,
    isNew: true,
    tag: "Popular",
  },
  {
    id: 3,
    title: "Urban Retro Low-Top Sneakers",
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=85",
    price: 3499,
    originalPrice: 4499,
    isNew: true,
  },
  {
    id: 4,
    title: "Smart Ambient Desk Lamp",
    category: "Gadgets",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=85",
    price: 1999,
    originalPrice: 2499,
    isNew: true,
    tag: "New Tech",
  },
  {
    id: 5,
    title: "Premium Leather Passport Holder",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=85",
    price: 1299,
    originalPrice: 1699,
    isNew: true,
  },
  {
    id: 6,
    title: "Relaxed Fit Linen Trousers",
    category: "Apparel",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=85",
    price: 2399,
    originalPrice: 2999,
    isNew: true,
  },
];

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function NewArrivalsPage() {
  const [activeFilter, setActiveFilter] = useState("All Products");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const filteredProducts =
    activeFilter === "All Products"
      ? NEW_ARRIVALS
      : NEW_ARRIVALS.filter((product) => product.category === activeFilter);

  return (
    <main className="min-h-screen w-full bg-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-10">
        {/* -----------------------------------------------------------------
            Hero
        ----------------------------------------------------------------- */}

        <section className="relative overflow-hidden rounded-2xl bg-slate-950 px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=85')",
            }}
          />

          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/90 to-slate-950/50" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-sky-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-300 sm:text-xs">
              <Sparkles className="h-3 w-3" />
              Fresh Drops
            </span>

            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              New Arrivals
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Explore the latest products added to MyAZStore. Fresh styles,
              useful essentials and new tech — all in one place.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {NEW_ARRIVALS.length} new products available
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------------
            Filters
        ----------------------------------------------------------------- */}

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-3 sm:mt-8 sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Category tabs */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none">
              {FILTER_CATEGORIES.map((category) => {
                const active = activeFilter === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveFilter(category)}
                    className={`shrink-0 whitespace-nowrap rounded-lg border px-3.5 py-2 text-xs font-medium transition sm:px-4 sm:text-sm ${
                      active
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3 lg:border-0 lg:pt-0">
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
              </button>

              <button
                type="button"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <ArrowUpDown className="h-3.5 w-3.5" />
                Sort
                <ChevronDown className="h-3 w-3" />
              </button>

              <div className="hidden items-center gap-1 border-l border-slate-200 pl-3 sm:flex">
                <button
                  type="button"
                  className="rounded-md bg-slate-100 p-2 text-slate-900"
                  aria-label="Grid view"
                >
                  <Grid2X2 className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  className="rounded-md p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------------
            Product Header
        ----------------------------------------------------------------- */}

        <section className="mt-7 sm:mt-9">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {activeFilter === "All Products"
                  ? "Latest Products"
                  : activeFilter}
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Showing {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              Product Grid
          ----------------------------------------------------------------- */}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);

              return (
                <article
                  key={product.id}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />

                    {/* Badges */}
                    <div className="absolute left-2 top-2 flex max-w-[70%] flex-wrap gap-1.5">
                      {product.isNew && (
                        <span className="rounded-md bg-slate-900 px-1.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white sm:px-2 sm:text-[10px]">
                          New
                        </span>
                      )}

                      {product.tag && (
                        <span className="rounded-md bg-sky-600 px-1.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white sm:px-2 sm:text-[10px]">
                          {product.tag}
                        </span>
                      )}
                    </div>

                    {/* Wishlist */}
                    <button
                      type="button"
                      aria-label={
                        isWishlisted
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute right-2 top-2 rounded-full border border-slate-200 bg-white/95 p-2 text-slate-500 shadow-sm backdrop-blur-sm transition hover:text-red-500 active:scale-95"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isWishlisted
                            ? "fill-red-500 text-red-500"
                            : "text-slate-500"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col p-2.5 sm:p-3.5">
                    <div>
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 sm:text-[10px]">
                        {product.category}
                      </span>

                      <h3 className="mt-1 line-clamp-2 min-h-8 text-xs font-semibold leading-4 text-slate-800 transition group-hover:text-sky-600 sm:min-h-10 sm:text-sm sm:leading-5">
                        {product.title}
                      </h3>
                    </div>

                    <div className="mt-3 flex items-end justify-between gap-2 border-t border-slate-100 pt-2.5">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-950 sm:text-base">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>

                        {product.originalPrice && (
                          <p className="text-[10px] text-slate-400 line-through sm:text-xs">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        aria-label={`Add ${product.title} to cart`}
                        className="inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-lg bg-slate-900 px-2.5 text-[10px] font-semibold text-white transition hover:bg-slate-800 active:scale-[0.97] sm:h-9 sm:px-3 sm:text-xs"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        <span className="hidden min-[400px]:inline">Add</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
              <p className="text-sm font-semibold text-slate-800">
                No products found
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Try another category.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
