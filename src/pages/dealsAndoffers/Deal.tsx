import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  ShoppingCart,
  Zap,
  Tag,
} from "lucide-react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL ?? "";

interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
  isSub: boolean;
  isDeleted: boolean;
  subcategories?: {
    _id: string;
    name: string;
    slug: string;
    isDeleted: boolean;
    image?: string;
  }[];
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

export default function DealsAndOffersPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [activeCategory, setActiveCategory] = useState("All Deals");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // FETCH DATA
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
  // CALCULATE DISCOUNT
  // ---------------------------------------------------------------------------

  const getDiscount = (price: number, discountPrice: number) => {
    if (!price || !discountPrice || discountPrice >= price) {
      return 0;
    }

    return Math.round(((price - discountPrice) / price) * 100);
  };

  // ---------------------------------------------------------------------------
  // FILTER + SORT DEALS
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
        const discountA = getDiscount(a.price, a.discountPrice);

        const discountB = getDiscount(b.price, b.discountPrice);

        return discountB - discountA;
      })
      .slice(0, 8);
  }, [products, activeCategory]);

  // ---------------------------------------------------------------------------
  // COPY COUPON
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

        <section className="relative overflow-hidden border border-zinc-200 bg-zinc-900">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=85')",
            }}
          />

          <div className="absolute inset-0 bg-zinc-950/65" />

          <div className="relative flex min-h-[270px] items-center px-5 py-8 sm:min-h-[310px] sm:px-8 lg:min-h-[330px] lg:px-12">
            <div className="max-w-lg">
              <span className="inline-flex items-center gap-1.5 bg-red-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                <Zap className="h-3 w-3 fill-current" />
                Limited Time Offer
              </span>

              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[42px]">
                Big Deals.
                <br />
                Better Prices.
              </h1>

              <p className="mt-3 max-w-md text-sm leading-5 text-zinc-200 sm:text-base">
                Save more on electronics, fashion, accessories and everyday
                essentials.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-1.5 bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-[0.98]"
                >
                  Shop Deals
                  <ChevronRight className="h-4 w-4" />
                </button>

                <span className="text-xs font-medium text-zinc-300 sm:text-sm">
                  Up to <strong className="text-white">50% OFF</strong>
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label="Previous offer"
            className="absolute left-4 top-1/2 hidden -translate-y-1/2 border border-white/20 bg-black/20 p-2 text-white transition hover:bg-white/10 md:block"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Next offer"
            className="absolute right-4 top-1/2 hidden -translate-y-1/2 border border-white/20 bg-black/20 p-2 text-white transition hover:bg-white/10 md:block"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            <span className="h-1.5 w-6 bg-white" />
            <span className="h-1.5 w-1.5 bg-white/40" />
            <span className="h-1.5 w-1.5 bg-white/40" />
          </div>
        </section>

        {/* ================================================================
            CATEGORIES
        ================================================================= */}

        <section className="mt-7 sm:mt-9">
          <div className="mb-3">
            <h2 className="text-base font-semibold tracking-tight text-zinc-900 sm:text-lg">
              Browse Deals
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveCategory("All Deals")}
              className={`shrink-0 whitespace-nowrap border px-3.5 py-2 text-xs font-medium transition sm:px-4 sm:text-sm ${
                activeCategory === "All Deals"
                  ? "border-red-600 bg-red-600 text-white"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
              }`}
            >
              All Deals
            </button>

            {categories
              .filter((category) => !category.isSub && !category.isDeleted)
              .map((category) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => setActiveCategory(category.name)}
                  className={`shrink-0 whitespace-nowrap border px-3.5 py-2 text-xs font-medium transition sm:px-4 sm:text-sm ${
                    activeCategory === category.name
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
                  }`}
                >
                  {category.name}
                </button>
              ))}
          </div>
        </section>

        {/* ================================================================
            FLASH DEALS
        ================================================================= */}

        <section className="mt-8 sm:mt-10">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
                  Flash Deals
                </h2>

                <span className="inline-flex items-center gap-1 bg-red-50 px-2 py-1 text-[10px] font-semibold uppercase text-red-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-600" />
                  Live
                </span>
              </div>

              <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                Current products with active discounts.
              </p>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden border border-zinc-200 bg-white"
                >
                  <div className="aspect-square animate-pulse bg-zinc-200" />

                  <div className="space-y-2 p-3">
                    <div className="h-3 w-16 animate-pulse bg-zinc-200" />
                    <div className="h-4 w-full animate-pulse bg-zinc-200" />
                    <div className="h-4 w-2/3 animate-pulse bg-zinc-200" />
                    <div className="h-8 w-full animate-pulse bg-zinc-200" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PRODUCTS */}
          {!loading && !error && deals.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {deals.map((product) => {
                const discount = getDiscount(
                  product.price,
                  product.discountPrice,
                );

                return (
                  <article
                    key={product._id}
                    className="group flex min-w-0 flex-col border border-zinc-200 bg-white"
                  >
                    {/* IMAGE */}
                    <Link
                      to={`/category/${product.category.slug}/product/${product.slug}`}
                      className="relative block aspect-square overflow-hidden bg-zinc-100"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      />

                      {discount > 0 && (
                        <span className="absolute left-2 top-2 bg-red-600 px-1.5 py-1 text-[10px] font-bold text-white sm:px-2 sm:text-xs">
                          -{discount}%
                        </span>
                      )}
                    </Link>

                    {/* CONTENT */}
                    <div className="flex flex-1 flex-col p-2.5 sm:p-3">
                      {product.stock <= 5 && (
                        <div className="mb-1.5 text-[9px] font-semibold text-red-600 sm:text-[10px]">
                          Only {product.stock} left
                        </div>
                      )}

                      <Link
                        to={`/category/${product.category.slug}/product/${product.slug}`}
                        className="line-clamp-2 min-h-8 text-xs font-medium leading-4 text-zinc-800 hover:text-red-600 sm:min-h-10 sm:text-sm sm:leading-5"
                      >
                        {product.name}
                      </Link>

                      {/* PRICE */}
                      <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
                        <span className="text-sm font-bold text-zinc-950 sm:text-base">
                          ₹{product.discountPrice.toLocaleString("en-IN")}
                        </span>

                        <span className="text-[10px] text-zinc-400 line-through sm:text-xs">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* SAVING */}
                      {discount > 0 && (
                        <p className="mt-1 text-[9px] font-medium text-emerald-600 sm:text-[10px]">
                          Save{" "}
                          {(
                            product.price - product.discountPrice
                          ).toLocaleString("en-IN")}{" "}
                          rupees
                        </p>
                      )}

                      <Link
                        to={`/category/${product.category.slug}/product/${product.slug}`}
                        className="mt-3 inline-flex h-8 w-full items-center justify-center gap-1.5 bg-zinc-900 text-[10px] font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98] sm:h-9 sm:text-xs"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        View Product
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* EMPTY */}
          {!loading && !error && deals.length === 0 && (
            <div className="border border-zinc-200 bg-white px-5 py-12 text-center">
              <Zap className="mx-auto h-8 w-8 text-zinc-300" />

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
                className="relative flex items-center justify-between gap-3 overflow-hidden border border-zinc-200 bg-white p-4"
              >
                <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-r border-zinc-200 bg-zinc-50" />

                <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-l border-zinc-200 bg-zinc-50" />

                <div className="min-w-0 pl-1">
                  <p className="text-xl font-black tracking-tight text-red-600 sm:text-2xl">
                    {coupon.discount}
                  </p>

                  <p className="mt-0.5 truncate text-xs font-semibold text-zinc-800 sm:text-sm">
                    {coupon.title}
                  </p>

                  <p className="mt-1 text-[10px] text-zinc-400 sm:text-xs">
                    {coupon.terms}
                  </p>
                </div>

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
