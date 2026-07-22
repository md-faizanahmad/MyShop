import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  ShoppingCart,
  Zap,
} from "lucide-react";

// --- Type Definitions ---
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
  color: string;
}

// --- Mock Data ---
const CATEGORIES = [
  "All Deals",
  "⚡ Flash Sales",
  "💻 Electronics",
  "👕 Fashion",
  "🏠 Home & Living",
  "💄 Beauty & Care",
  "👟 Sports",
];

const FLASH_DEALS: FlashDeal[] = [
  {
    id: 1,
    title: "Premium Wireless Over-Ear Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    discount: 40,
    price: 89.99,
    originalPrice: 149.99,
    timeLeft: "02h : 14m : 45s",
    progress: 75,
  },
  {
    id: 2,
    title: "Minimalist Analog Quartz Wristwatch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
    discount: 25,
    price: 45.0,
    originalPrice: 60.0,
    timeLeft: "04h : 32m : 10s",
    progress: 30,
  },
  {
    id: 3,
    title: "Sport Active Running Shoes (Red Edition)",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
    discount: 50,
    price: 65.0,
    originalPrice: 130.0,
    timeLeft: "01h : 05m : 12s",
    progress: 90,
  },
  {
    id: 4,
    title: "Ergonomic Dynamic Gaming Microphone",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80",
    discount: 15,
    price: 38.25,
    originalPrice: 45.0,
    timeLeft: "07h : 55m : 00s",
    progress: 12,
  },
];

const COUPONS: Coupon[] = [
  {
    id: 1,
    discount: "$10 OFF",
    title: "Sitewide Summer Special",
    code: "SUMMER10",
    terms: "Min. spend $50 • Exp. in 3 days",
    color: "text-red-600",
  },
  {
    id: 2,
    discount: "FREE SHIP",
    title: "No Minimum Order",
    code: "FREESHIP",
    terms: "Applicable on first order",
    color: "text-red-600",
  },
  {
    id: 3,
    discount: "15% OFF",
    title: "Tech Category Voucher",
    code: "TECH15",
    terms: "Valid on select accessories",
    color: "text-purple-600",
  },
];

export default function DealsAndOffersPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All Deals");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
      {/* Top Navbar Placeholder */}
      <nav className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="text-xl font-bold text-red-600 tracking-tight">
          MegaDeals
        </div>
        <div className="flex space-x-6 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-red-600 transition">
            Home
          </a>
          <a href="#" className="text-red-600 font-semibold">
            Today's Deals
          </a>
          <a href="#" className="hover:text-red-600 transition">
            Coupons
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* 1. HERO PROMOTIONAL CAROUSEL (Static UI Layout) */}
        <section className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-lg h-[340px] sm:h-[400px] flex items-center">
          <div className="absolute inset-0 bg-linear-to-r from-purple-900 via-indigo-900 to-transparent opacity-90 mix-blend-multiply"></div>
          <div
            className="absolute inset-0 bg-gray-800 opacity-20 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80')",
            }}
          ></div>

          {/* Carousel Content */}
          <div className="relative z-10 max-w-xl px-8 sm:px-12 text-white space-y-4">
            <span className="inline-block bg-red-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Limited Time Event
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              End of Season Clearance
            </h1>
            <p className="text-lg text-gray-200">
              Up to{" "}
              <span className="text-yellow-400 font-bold text-2xl">
                50% OFF
              </span>{" "}
              on all electronics and apparel. Free shipping included.
            </p>
            <button className="bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition shadow-md inline-flex items-center space-x-2">
              <span>Shop The Sale</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Static Navigation Arrows */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition hidden sm:block">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition hidden sm:block">
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Static Pagination Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            <span className="h-2 w-6 bg-yellow-400 rounded-full transition-all"></span>
            <span className="h-2 w-2 bg-white/50 rounded-full"></span>
            <span className="h-2 w-2 bg-white/50 rounded-full"></span>
            <span className="h-2 w-2 bg-white/50 rounded-full"></span>
          </div>
        </section>

        {/* 2. QUICK CATEGORY NAVIGATION (Horizontal Carousel Row) */}
        <section className="relative">
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none snap-x">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`snap-start shrink-0 font-medium px-5 py-2.5 rounded-xl text-sm transition ${
                  activeCategory === category
                    ? "bg-red-600 text-white font-semibold shadow-sm"
                    : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* 3. FLASH DEALS / LIMITED TIME OFFERS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Flash Deals
              </h2>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded flex items-center space-x-1 animate-pulse">
                <span className="h-1.5 w-1.5 bg-red-600 rounded-full"></span>
                <span className="inline-flex items-center gap-0.5">
                  <Zap className="w-3 h-3 fill-current" />
                  LIVE
                </span>
              </span>
            </div>
            <a
              href="#"
              className="text-sm font-semibold text-red-600 hover:text-red-700 transition"
            >
              View All &rarr;
            </a>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FLASH_DEALS.map((deal) => (
              <div
                key={deal.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between p-4 space-y-4"
              >
                <div className="relative bg-gray-100 rounded-xl h-48 w-full flex items-center justify-center overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="object-cover h-full w-full"
                  />
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg">
                    -{deal.discount}%
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-1 text-xs font-mono text-red-600 bg-red-50 px-2 py-1 rounded-md w-max">
                    <span className="font-bold">Ends in:</span>
                    <span>{deal.timeLeft}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 line-clamp-2 text-sm">
                    {deal.title}
                  </h3>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${deal.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${deal.originalPrice}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-red-600 h-1.5 rounded-full"
                        style={{ width: `${deal.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {deal.progress >= 90
                        ? `Almost Gone! ${deal.progress}% claimed`
                        : `${deal.progress}% claimed`}
                    </p>
                  </div>
                </div>

                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 rounded-xl text-sm transition flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 4. COUPON CODE GRID */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Exclusive Coupon Vouchers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COUPONS.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-5 flex items-center justify-between relative shadow-sm"
              >
                {/* Edge Notch Cut-outs */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 border-r border-gray-200 rounded-full"></div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 border-l border-gray-200 rounded-full"></div>

                <div className="space-y-1 pl-4">
                  <p className={`text-2xl font-black ${coupon.color}`}>
                    {coupon.discount}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-800">
                    {coupon.title}
                  </p>
                  <p className="text-[11px] text-gray-400">{coupon.terms}</p>
                </div>

                <div className="flex flex-col items-end space-y-2 pr-4">
                  <div className="bg-gray-100 border border-gray-300 font-mono text-xs font-bold px-3 py-1.5 rounded text-gray-700 tracking-wider">
                    {coupon.code}
                  </div>
                  <button
                    onClick={() => handleCopyCode(coupon.code)}
                    className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center space-x-1 focus:outline-none"
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="w-3 h-3 text-green-600" />
                        <span className="text-green-600 no-underline">
                          Copied!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span className="underline">Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
