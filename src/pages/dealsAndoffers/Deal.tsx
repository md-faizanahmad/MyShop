import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  ShoppingCart,
  Zap,
  Tag,
} from "lucide-react";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface FlashDeal {
  id: number;
  title: string;
  image: string;
  discount: number;
  price: number;
  originalPrice: number;
  timeLeft: string;
  progress: number;
}

interface Coupon {
  id: number;
  discount: string;
  title: string;
  code: string;
  terms: string;
}

// -----------------------------------------------------------------------------
// Static Data
// -----------------------------------------------------------------------------

const CATEGORIES = [
  "All Deals",
  "⚡ Flash Sales",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty & Care",
  "Sports",
];

const FLASH_DEALS: FlashDeal[] = [
  {
    id: 1,
    title: "Premium Wireless Over-Ear Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=85",
    discount: 40,
    price: 7499,
    originalPrice: 12499,
    timeLeft: "02h 14m",
    progress: 75,
  },
  {
    id: 2,
    title: "Minimalist Analog Quartz Wristwatch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=85",
    discount: 25,
    price: 4499,
    originalPrice: 5999,
    timeLeft: "04h 32m",
    progress: 30,
  },
  {
    id: 3,
    title: "Sport Active Running Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85",
    discount: 50,
    price: 3249,
    originalPrice: 6499,
    timeLeft: "01h 05m",
    progress: 90,
  },
  {
    id: 4,
    title: "Ergonomic Dynamic Gaming Microphone",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=85",
    discount: 15,
    price: 2899,
    originalPrice: 3399,
    timeLeft: "07h 55m",
    progress: 12,
  },
];

const COUPONS: Coupon[] = [
  {
    id: 1,
    discount: "₹500 OFF",
    title: "Sitewide Summer Special",
    code: "SUMMER500",
    terms: "Min. spend ₹2,999",
  },
  {
    id: 2,
    discount: "FREE SHIP",
    title: "Free Delivery Offer",
    code: "FREESHIP",
    terms: "Applicable on first order",
  },
  {
    id: 3,
    discount: "15% OFF",
    title: "Tech Category Voucher",
    code: "TECH15",
    terms: "Valid on selected products",
  },
];

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function DealsAndOffersPage() {
  const [activeCategory, setActiveCategory] = useState("All Deals");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);

      setTimeout(() => {
        setCopiedCode(null);
      }, 2000);
    } catch {
      // Clipboard can fail in unsupported environments.
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-10">
        {/* -----------------------------------------------------------------
            Hero
        ----------------------------------------------------------------- */}

        <section className="relative min-h-[300px] overflow-hidden rounded-2xl bg-slate-950 sm:min-h-[360px] lg:min-h-[430px]">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=85')",
            }}
          />

          {/* Theme overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/85 to-slate-900/30" />

          <div className="relative z-10 flex min-h-[300px] items-center px-5 py-8 sm:min-h-[360px] sm:px-8 lg:min-h-[430px] lg:px-12">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white sm:text-xs">
                <Zap className="h-3 w-3 fill-current" />
                Limited Time Offer
              </span>

              <h1 className="mt-3 text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Big Deals.
                <br />
                Better Prices.
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-200 sm:text-base">
                Save more on electronics, fashion, accessories and everyday
                essentials with our limited-time offers.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-[0.98] sm:h-11 sm:px-5"
                >
                  Shop Deals
                  <ChevronRight className="h-4 w-4" />
                </button>

                <span className="text-xs font-medium text-slate-300 sm:text-sm">
                  Up to <strong className="text-yellow-400">50% OFF</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Desktop arrows */}
          <button
            type="button"
            aria-label="Previous offer"
            className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/20 sm:block"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Next offer"
            className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/20 sm:block"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-white" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          </div>
        </section>

        {/* -----------------------------------------------------------------
            Category Filter
        ----------------------------------------------------------------- */}

        <section className="mt-6 sm:mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
              Browse Deals
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
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
        </section>

        {/* -----------------------------------------------------------------
            Flash Deals
        ----------------------------------------------------------------- */}

        <section className="mt-8 sm:mt-10">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  Flash Deals
                </h2>

                <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-[10px] font-bold uppercase text-red-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-600" />
                  Live
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Limited stock. Grab them before they're gone.
              </p>
            </div>

            <button
              type="button"
              className="hidden text-sm font-semibold text-sky-600 hover:text-sky-700 sm:block"
            >
              View all →
            </button>
          </div>

          {/* Mobile: 2 columns / Tablet: 2 / Desktop: 4 */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {FLASH_DEALS.map((deal) => (
              <article
                key={deal.id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />

                  <span className="absolute left-2 top-2 rounded-md bg-red-600 px-1.5 py-1 text-[10px] font-bold text-white sm:px-2 sm:text-xs">
                    -{deal.discount}%
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-2.5 sm:p-3">
                  <div className="mb-2 flex items-center gap-1 text-[9px] font-semibold text-red-600 sm:text-[10px]">
                    <Zap className="h-3 w-3 fill-current" />
                    Ends in {deal.timeLeft}
                  </div>

                  <h3 className="line-clamp-2 min-h-8 text-xs font-semibold leading-4 text-slate-800 sm:min-h-10 sm:text-sm sm:leading-5">
                    {deal.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
                    <span className="text-sm font-bold text-slate-950 sm:text-base">
                      ₹{deal.price.toLocaleString("en-IN")}
                    </span>

                    <span className="text-[10px] text-slate-400 line-through sm:text-xs">
                      ₹{deal.originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mt-2.5">
                    <div className="h-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-red-600"
                        style={{ width: `${deal.progress}%` }}
                      />
                    </div>

                    <p className="mt-1 text-[9px] font-medium text-slate-500 sm:text-[10px]">
                      {deal.progress >= 90
                        ? "Almost gone"
                        : `${deal.progress}% claimed`}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="mt-3 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 text-[10px] font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98] sm:h-9 sm:text-xs"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Mobile View All */}
          <button
            type="button"
            className="mt-4 w-full rounded-lg border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 sm:hidden"
          >
            View All Deals
          </button>
        </section>

        {/* -----------------------------------------------------------------
            Coupons
        ----------------------------------------------------------------- */}

        <section className="mt-9 sm:mt-12">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-sky-600" />

              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Coupons & Offers
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Apply a coupon at checkout and save more.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {COUPONS.map((coupon) => (
              <article
                key={coupon.id}
                className="relative flex items-center justify-between gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-4"
              >
                {/* Coupon cutouts */}
                <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-r border-slate-200 bg-slate-50" />
                <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-l border-slate-200 bg-slate-50" />

                <div className="min-w-0 pl-1">
                  <p className="text-xl font-black tracking-tight text-red-600 sm:text-2xl">
                    {coupon.discount}
                  </p>

                  <p className="mt-0.5 truncate text-xs font-semibold text-slate-800 sm:text-sm">
                    {coupon.title}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                    {coupon.terms}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2 pr-1">
                  <span className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-2 py-1 font-mono text-[10px] font-bold tracking-wide text-slate-700 sm:px-3 sm:text-xs">
                    {coupon.code}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleCopyCode(coupon.code)}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-sky-600 transition hover:text-sky-700 sm:text-xs"
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
