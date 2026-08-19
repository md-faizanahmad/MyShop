import { useState } from "react";
import {
  Copy,
  Check,
  Tag,
  Gift,
  Truck,
  Percent,
  ShoppingBag,
  ChevronRight,
  Sparkles,
} from "lucide-react";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface Offer {
  id: number;
  title: string;
  description: string;
  discount: string;
  code?: string;
  validUntil: string;
  type: "coupon" | "shipping" | "category" | "bundle";
}

// -----------------------------------------------------------------------------
// Static Data
// -----------------------------------------------------------------------------

const OFFER_CATEGORIES = [
  "All Offers",
  "Coupons",
  "Free Shipping",
  "Category Deals",
  "Bundle Offers",
];

const OFFERS: Offer[] = [
  {
    id: 1,
    title: "Save ₹500 on Your Order",
    description: "Get ₹500 off when you spend ₹2,999 or more across the store.",
    discount: "₹500 OFF",
    code: "SAVE500",
    validUntil: "Valid until Aug 31",
    type: "coupon",
  },
  {
    id: 2,
    title: "Free Delivery",
    description:
      "Enjoy free shipping on your next order with no delivery charges.",
    discount: "FREE SHIP",
    code: "FREESHIP",
    validUntil: "Valid until Aug 28",
    type: "shipping",
  },
  {
    id: 3,
    title: "Extra 15% Off Electronics",
    description:
      "Get an additional 15% discount on selected electronics and gadgets.",
    discount: "15% OFF",
    code: "TECH15",
    validUntil: "Valid until Aug 30",
    type: "category",
  },
  {
    id: 4,
    title: "Buy More, Save More",
    description:
      "Buy any 2 selected products and unlock an additional discount.",
    discount: "UP TO 20%",
    validUntil: "Limited time offer",
    type: "bundle",
  },
  {
    id: 5,
    title: "Fashion Weekend Offer",
    description: "Save up to ₹1,000 on selected fashion and footwear products.",
    discount: "₹1,000 OFF",
    code: "STYLE1000",
    validUntil: "Valid until Sep 01",
    type: "category",
  },
  {
    id: 6,
    title: "First Order Special",
    description:
      "New to MyAZStore? Get a special discount on your first purchase.",
    discount: "10% OFF",
    code: "WELCOME10",
    validUntil: "For new customers",
    type: "coupon",
  },
];

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const offerIcon = (type: Offer["type"]) => {
  switch (type) {
    case "shipping":
      return Truck;
    case "category":
      return Percent;
    case "bundle":
      return Gift;
    default:
      return Tag;
  }
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function OffersPage() {
  const [activeCategory, setActiveCategory] = useState("All Offers");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredOffers =
    activeCategory === "All Offers"
      ? OFFERS
      : OFFERS.filter((offer) => {
          if (activeCategory === "Coupons") {
            return offer.type === "coupon";
          }

          if (activeCategory === "Free Shipping") {
            return offer.type === "shipping";
          }

          if (activeCategory === "Category Deals") {
            return offer.type === "category";
          }

          if (activeCategory === "Bundle Offers") {
            return offer.type === "bundle";
          }

          return true;
        });

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);

      setTimeout(() => {
        setCopiedCode(null);
      }, 2000);
    } catch {
      // Clipboard unavailable.
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-10">
        {/* -----------------------------------------------------------------
            Hero
        ----------------------------------------------------------------- */}

        <section className="relative overflow-hidden rounded-2xl bg-slate-950">
          <div className="absolute inset-0 bg-linear-to-br from-sky-950 via-slate-950 to-slate-950" />

          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl" />

          <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />

          <div className="relative z-10 px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-sky-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-300 sm:text-xs">
              <Sparkles className="h-3 w-3" />
              MyAZStore Offers
            </span>

            <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              More Ways to
              <br />
              <span className="text-sky-400">Save More.</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Discover exclusive coupons, free shipping, category discounts and
              special offers available across MyAZStore.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-base font-bold text-white">6+</p>
                <p className="text-[9px] uppercase tracking-wide text-slate-400">
                  Active Offers
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-base font-bold text-white">₹1,000</p>
                <p className="text-[9px] uppercase tracking-wide text-slate-400">
                  Max Savings
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------------
            Category Navigation
        ----------------------------------------------------------------- */}

        <section className="mt-6 sm:mt-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {OFFER_CATEGORIES.map((category) => {
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
            Offers Header
        ----------------------------------------------------------------- */}

        <section className="mt-7 sm:mt-9">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {activeCategory}
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                {filteredOffers.length} offers available right now
              </p>
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------------
            Offer Cards
        ----------------------------------------------------------------- */}

        <section className="mt-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredOffers.map((offer) => {
              const Icon = offerIcon(offer.type);

              return (
                <article
                  key={offer.id}
                  className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* Accent */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-sky-500 to-red-500" />

                  <div className="p-4 sm:p-5">
                    {/* Top */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="rounded-md bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">
                        {offer.discount}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mt-4">
                      <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                        {offer.title}
                      </h3>

                      <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm">
                        {offer.description}
                      </p>
                    </div>

                    {/* Bottom */}
                    <div className="mt-5 border-t border-dashed border-slate-200 pt-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          {offer.code ? (
                            <>
                              <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                                Coupon code
                              </p>

                              <div className="mt-1 rounded-md border border-dashed border-slate-300 bg-slate-50 px-2.5 py-1.5 font-mono text-[10px] font-bold tracking-wide text-slate-700">
                                {offer.code}
                              </div>
                            </>
                          ) : (
                            <p className="text-[10px] font-medium text-slate-500">
                              No coupon required
                            </p>
                          )}
                        </div>

                        {offer.code ? (
                          <button
                            type="button"
                            onClick={() => handleCopyCode(offer.code!)}
                            className="inline-flex items-center gap-1 text-[10px] font-semibold text-sky-600 transition hover:text-sky-700 sm:text-xs"
                          >
                            {copiedCode === offer.code ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-emerald-600" />
                                <span className="text-emerald-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" />
                                Copy
                              </>
                            )}
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 text-[10px] font-semibold text-sky-600 sm:text-xs"
                          >
                            Shop Now
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>

                      <p className="mt-3 text-[10px] text-slate-400">
                        {offer.validUntil}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredOffers.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
              <Tag className="mx-auto h-7 w-7 text-slate-300" />

              <p className="mt-3 text-sm font-semibold text-slate-800">
                No offers available
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Check another offer category.
              </p>
            </div>
          )}
        </section>

        {/* -----------------------------------------------------------------
            Shopping CTA
        ----------------------------------------------------------------- */}

        <section className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white sm:mt-10">
          <div className="flex flex-col items-center gap-4 px-5 py-6 text-center sm:px-8 sm:py-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sky-600">
              <ShoppingBag className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                Ready to save?
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Find something you love and apply an offer at checkout.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-slate-900 px-4 text-xs font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]"
            >
              Start Shopping
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
