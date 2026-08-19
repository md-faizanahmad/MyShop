import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Zap,
  Clock3,
  Flame,
  ChevronRight,
} from "lucide-react";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface FlashProduct {
  id: number;
  title: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  claimed: number;
  timeLeft: string;
}

// -----------------------------------------------------------------------------
// Static Data
// -----------------------------------------------------------------------------

const FLASH_PRODUCTS: FlashProduct[] = [
  {
    id: 1,
    title: "Premium Wireless Over-Ear Headphones",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",
    price: 7499,
    originalPrice: 12499,
    discount: 40,
    claimed: 82,
    timeLeft: "02h 14m",
  },
  {
    id: 2,
    title: "Urban Retro Low-Top Sneakers",
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=85",
    price: 3249,
    originalPrice: 6499,
    discount: 50,
    claimed: 91,
    timeLeft: "01h 05m",
  },
  {
    id: 3,
    title: "Minimalist Analog Quartz Watch",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",
    price: 4499,
    originalPrice: 5999,
    discount: 25,
    claimed: 46,
    timeLeft: "04h 32m",
  },
  {
    id: 4,
    title: "Smart Ambient Desk Lamp",
    category: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85",
    price: 1999,
    originalPrice: 2499,
    discount: 20,
    claimed: 38,
    timeLeft: "03h 18m",
  },
  {
    id: 5,
    title: "Ergonomic Gaming Microphone",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=700&q=85",
    price: 2899,
    originalPrice: 3399,
    discount: 15,
    claimed: 27,
    timeLeft: "07h 55m",
  },
  {
    id: 6,
    title: "Premium Travel Daypack",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    claimed: 67,
    timeLeft: "05h 42m",
  },
  {
    id: 7,
    title: "Relaxed Fit Linen Trousers",
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=85",
    price: 2399,
    originalPrice: 2999,
    discount: 20,
    claimed: 54,
    timeLeft: "06h 21m",
  },
  {
    id: 8,
    title: "Classic Everyday Backpack",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85",
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    claimed: 73,
    timeLeft: "02h 48m",
  },
];

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function FlashSalePage() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-10">
        {/* -----------------------------------------------------------------
            Flash Sale Hero
        ----------------------------------------------------------------- */}

        <section className="relative overflow-hidden rounded-2xl bg-slate-950">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-linear-to-br from-red-950 via-slate-950 to-slate-950" />

          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-red-600/20 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative z-10 px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            {/* Label */}
            <div className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white sm:text-xs">
              <Zap className="h-3 w-3 fill-current" />
              Flash Sale
            </div>

            <div className="mt-3 max-w-2xl">
              <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Deals That Won't
                <br />
                <span className="text-red-500">Wait Around.</span>
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300 sm:text-base">
                Limited-time prices on products people are buying right now.
                Once the stock is gone, the deal is over.
              </p>
            </div>

            {/* Countdown */}
            <div className="mt-6">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-xs">
                Sale ends in
              </p>

              <div className="flex items-center gap-2">
                {[
                  ["02", "Hours"],
                  ["14", "Minutes"],
                  ["38", "Seconds"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="min-w-[58px] rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 text-center backdrop-blur-sm sm:min-w-[70px] sm:px-3 sm:py-2.5"
                  >
                    <div className="text-lg font-bold tabular-nums text-white sm:text-xl">
                      {value}
                    </div>
                    <div className="mt-0.5 text-[8px] uppercase tracking-wide text-slate-400 sm:text-[9px]">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              className="mt-6 inline-flex h-10 items-center gap-1.5 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-[0.98] sm:h-11 sm:px-5"
            >
              Shop Flash Deals
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* -----------------------------------------------------------------
            Sale Status
        ----------------------------------------------------------------- */}

        <section className="mt-6 flex items-center justify-between rounded-xl border border-red-100 bg-red-50 px-3.5 py-3 sm:px-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <Flame className="h-4 w-4 fill-current" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 sm:text-sm">
                Flash Sale is live
              </p>
              <p className="truncate text-[10px] text-slate-500 sm:text-xs">
                Prices return to normal when the timer ends.
              </p>
            </div>
          </div>

          <span className="hidden shrink-0 text-xs font-semibold text-red-600 sm:block">
            Limited stock
          </span>
        </section>

        {/* -----------------------------------------------------------------
            Product Header
        ----------------------------------------------------------------- */}

        <section className="mt-8 sm:mt-10">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  Today's Flash Deals
                </h2>

                <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-[9px] font-bold uppercase text-red-600 sm:text-[10px]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-600" />
                  Live
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Grab your favourites before they're gone.
              </p>
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------------
            Products
        ----------------------------------------------------------------- */}

        <section className="mt-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {FLASH_PRODUCTS.map((product) => {
              const isWishlisted = wishlist.includes(product.id);

              return (
                <article
                  key={product.id}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />

                    {/* Discount */}
                    <span className="absolute left-2 top-2 rounded-md bg-red-600 px-1.5 py-1 text-[9px] font-bold text-white sm:px-2 sm:text-xs">
                      -{product.discount}%
                    </span>

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
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 sm:text-[10px]">
                      {product.category}
                    </span>

                    <h3 className="mt-1 line-clamp-2 min-h-8 text-xs font-semibold leading-4 text-slate-800 sm:min-h-10 sm:text-sm sm:leading-5">
                      {product.title}
                    </h3>

                    {/* Timer */}
                    <div className="mt-2 inline-flex w-fit items-center gap-1 rounded-md bg-red-50 px-1.5 py-1 text-[9px] font-semibold text-red-600 sm:text-[10px]">
                      <Clock3 className="h-3 w-3" />
                      {product.timeLeft} left
                    </div>

                    {/* Price */}
                    <div className="mt-2.5 flex items-end justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-slate-950 sm:text-base">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>

                        <p className="text-[10px] text-slate-400 line-through sm:text-xs">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </p>
                      </div>

                      <span className="text-[9px] font-bold text-red-600 sm:text-[10px]">
                        Save {product.discount}%
                      </span>
                    </div>

                    {/* Stock Progress */}
                    <div className="mt-2.5">
                      <div className="h-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${
                            product.claimed >= 85
                              ? "bg-red-600"
                              : "bg-orange-500"
                          }`}
                          style={{
                            width: `${product.claimed}%`,
                          }}
                        />
                      </div>

                      <p
                        className={`mt-1 text-[9px] font-medium sm:text-[10px] ${
                          product.claimed >= 85
                            ? "text-red-600"
                            : "text-slate-500"
                        }`}
                      >
                        {product.claimed >= 85
                          ? "Almost sold out"
                          : `${product.claimed}% claimed`}
                      </p>
                    </div>

                    {/* Add to Cart */}
                    <button
                      type="button"
                      className="mt-3 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 text-[10px] font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98] sm:h-9 sm:text-xs"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* -----------------------------------------------------------------
            Bottom urgency
        ----------------------------------------------------------------- */}

        <section className="mt-8 rounded-xl border border-slate-200 bg-white px-4 py-5 text-center sm:mt-10 sm:py-6">
          <p className="text-sm font-semibold text-slate-900 sm:text-base">
            Don't wait for the next sale.
          </p>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Flash prices are available while stock lasts.
          </p>

          <button
            type="button"
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
          >
            Explore all deals
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </section>
      </div>
    </main>
  );
}
