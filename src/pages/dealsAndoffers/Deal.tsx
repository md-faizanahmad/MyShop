import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Check, Copy, Tag, Zap } from "lucide-react";

import DealsHero from "./DealsHero";
import DealsCategories from "./DealsCategories";
import DealProductCard from "./DealProductCard";

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

const API = import.meta.env.VITE_API_URL ?? "";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
  isSub: boolean;
  isDeleted: boolean;
}

interface Product {
  _id: string;

  name: string;

  category: {
    _id: string;
    name: string;
    slug: string;
  };

  subcategory?: {
    _id: string;
    name: string;
    slug: string;
  };

  price: number;
  discountPrice: number;
  stock: number;

  rating: {
    average: number;
    count: number;
  };

  imageUrl: string;

  images?: {
    url: string;
    publicId: string;
  }[];

  slug: string;

  createdAt: string;
}

interface Coupon {
  id: number;
  discount: string;
  title: string;
  code: string;
  terms: string;
}

// -----------------------------------------------------------------------------
// Coupons
// -----------------------------------------------------------------------------

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
// Page
// -----------------------------------------------------------------------------

export default function DealsAndOffersPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [products, setProducts] = useState<Product[]>([]);

  const [activeCategory, setActiveCategory] = useState("All Deals");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // Fetch Products + Categories
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const fetchDealsData = async () => {
      setLoading(true);
      setError("");

      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get(`${API}/v1/products`),
          axios.get(`${API}/v1/categories`),
        ]);

        setProducts(productsResponse.data.products ?? []);

        setCategories(categoriesResponse.data.categories ?? []);
      } catch (err) {
        console.error(err);

        setError("Unable to load deals right now. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void fetchDealsData();
  }, []);

  // ---------------------------------------------------------------------------
  // Filter Deals
  // ---------------------------------------------------------------------------

  const deals = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        product.discountPrice > 0 && product.discountPrice < product.price,
    );

    if (activeCategory !== "All Deals") {
      filtered = filtered.filter(
        (product) => product.category.name === activeCategory,
      );
    }

    return filtered
      .sort((a, b) => {
        const discountA =
          a.price > a.discountPrice
            ? ((a.price - a.discountPrice) / a.price) * 100
            : 0;

        const discountB =
          b.price > b.discountPrice
            ? ((b.price - b.discountPrice) / b.price) * 100
            : 0;

        return discountB - discountA;
      })
      .slice(0, 10);
  }, [products, activeCategory]);

  // ---------------------------------------------------------------------------
  // Copy Coupon
  // ---------------------------------------------------------------------------

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
    <main className="min-h-dvh bg-zinc-50 text-zinc-900">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-9">
        {/* ================================================================
            HERO
        ================================================================= */}

        <DealsHero />

        {/* ================================================================
            CATEGORIES
        ================================================================= */}

        <DealsCategories
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* ================================================================
            DEAL PRODUCTS
        ================================================================= */}

        <section className="mt-8 sm:mt-10">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-zinc-900 sm:text-xl">
                  Flash Deals
                </h2>

                <span className="text-xs font-medium text-red-600">
                  Limited offers
                </span>
              </div>

              <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">
                Current products with active discounts.
              </p>
            </div>

            <button
              type="button"
              className="hidden text-xs font-semibold text-red-600 hover:text-red-700 sm:block sm:text-sm"
            >
              View all
            </button>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-md border border-zinc-200 bg-white p-3 sm:p-4"
                >
                  <div className="aspect-square animate-pulse rounded-sm bg-zinc-100" />

                  <div className="mt-3 space-y-2">
                    <div className="h-2.5 w-20 animate-pulse bg-zinc-100" />

                    <div className="h-3.5 w-full animate-pulse bg-zinc-100" />

                    <div className="h-3.5 w-2/3 animate-pulse bg-zinc-100" />

                    <div className="h-5 w-20 animate-pulse bg-zinc-100" />

                    <div className="h-9 w-full animate-pulse bg-zinc-100" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          {/* PRODUCTS */}
          {!loading && !error && deals.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {deals.map((product) => (
                <DealProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* EMPTY */}
          {!loading && !error && deals.length === 0 && (
            <div className="border border-zinc-200 bg-white px-5 py-12 text-center">
              <Zap className="mx-auto h-7 w-7 text-zinc-300" />

              <p className="mt-3 text-sm font-medium text-zinc-700">
                No deals found
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Try another category.
              </p>
            </div>
          )}
        </section>

        {/* ================================================================
            COUPONS
        ================================================================= */}

        <section className="mt-9 sm:mt-12">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-red-600" />

              <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
                Coupons & Offers
              </h2>
            </div>

            <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
              Apply a coupon at checkout and save more.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {COUPONS.map((coupon) => (
              <article
                key={coupon.id}
                className="relative flex items-center justify-between gap-3 overflow-hidden rounded-md border border-zinc-200 bg-white p-4"
              >
                {/* Cutouts */}
                <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-r border-zinc-200 bg-zinc-50" />

                <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-l border-zinc-200 bg-zinc-50" />

                {/* Coupon information */}
                <div className="min-w-0 pl-1">
                  <p className="text-xl font-bold tracking-tight text-red-600 sm:text-2xl">
                    {coupon.discount}
                  </p>

                  <p className="mt-0.5 truncate text-xs font-semibold text-zinc-800 sm:text-sm">
                    {coupon.title}
                  </p>

                  <p className="mt-1 text-[10px] text-zinc-400 sm:text-xs">
                    {coupon.terms}
                  </p>
                </div>

                {/* Coupon code */}
                <div className="flex shrink-0 flex-col items-end gap-2 pr-1">
                  <span className="border border-dashed border-zinc-300 bg-zinc-50 px-2 py-1 font-mono text-[10px] font-bold tracking-wide text-zinc-700 sm:px-3 sm:text-xs">
                    {coupon.code}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleCopyCode(coupon.code)}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-600 transition hover:text-red-700 sm:text-xs"
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
