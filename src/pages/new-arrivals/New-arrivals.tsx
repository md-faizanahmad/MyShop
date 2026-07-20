import { useState } from "react";
import {
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronDown,
  Grid,
  List,
} from "lucide-react";

// --- Type Definitions ---
interface NewProduct {
  id: number;
  title: string;
  category: string;
  image: string;
  price: number;
  isNew: boolean;
  tag?: string;
}

// --- Mock Data ---
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
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
    price: 65.0,
    isNew: true,
    tag: "Trending",
  },
  {
    id: 2,
    title: "Chunky Knit Oversized Sweater",
    category: "Apparel",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    price: 78.0,
    isNew: true,
    tag: "Eco-Friendly",
  },
  {
    id: 3,
    title: "Urban Retro Low-Top Sneakers",
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80",
    price: 110.0,
    isNew: true,
  },
  {
    id: 4,
    title: "Smart Ambient Desk Lamp",
    category: "Gadgets",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80",
    price: 49.99,
    isNew: true,
    tag: "New Tech",
  },
  {
    id: 5,
    title: "Premium Leather Passport Holder",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=80",
    price: 35.0,
    isNew: true,
  },
  {
    id: 6,
    title: "Relaxed Fit Linen Trousers",
    category: "Apparel",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80",
    price: 85.0,
    isNew: true,
  },
];

export default function NewArrivalsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All Products");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
      {/* Top Navbar Placeholder */}
      <nav className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <span>MegaDeals</span>
          <span className="text-xs font-normal bg-black text-white px-2 py-0.5 rounded">
            Store
          </span>
        </div>
        <div className="flex space-x-6 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-black transition">
            Home
          </a>
          <a href="#" className="hover:text-black transition">
            Today's Deals
          </a>
          <a
            href="#"
            className="text-black font-semibold underline underline-offset-4"
          >
            New Arrivals
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 1. MINIMALIST NEW ARRIVALS HEADER BANNER */}
        <section className="relative bg-black rounded-2xl overflow-hidden shadow-sm h-[200px] flex items-center justify-between px-8 sm:px-16 text-white">
          <div className="space-y-2 z-10 max-w-lg">
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
              Fresh Drops
            </span>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight">
              The{" "}
              <span className="font-extrabold text-white">Latest Arrivals</span>
            </h1>
            <p className="text-sm text-gray-400">
              Discover this week's curated selection of premium apparel, tech
              accessories, and daily essentials.
            </p>
          </div>
          <div className="hidden md:flex space-x-2 text-sm font-mono opacity-20 text-right select-none  absolute right-16 pointer-events-none">
            <span className="text-7xl font-black tracking-tighter">NEW IN</span>
          </div>
        </section>

        {/* 2. FILTER & SORT CONTROLS BAR */}
        <section className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Quick Filters */}
          <div className="flex space-x-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            {FILTER_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`shrink-0 text-xs font-medium px-4 py-2 rounded-lg transition-all ${
                  activeFilter === category
                    ? "bg-black text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Action Tools */}
          <div className="flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
            <button className="text-xs font-semibold flex items-center space-x-1.5 text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg transition">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            <button className="text-xs font-semibold flex items-center space-x-1.5 text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg transition">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort By</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            <div className="hidden lg:flex items-center space-x-1 border-l border-gray-200 pl-4 text-gray-400">
              <button className="p-1.5 text-black bg-gray-100 rounded-md">
                <Grid className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:text-black transition">
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 3. PRODUCT NEW ARRIVALS GRID */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-gray-500">
              Showing {NEW_ARRIVALS.length} fresh designs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {NEW_ARRIVALS.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
              >
                {/* Product Media Block */}
                <div className="relative bg-gray-50 h-80 overflow-hidden flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover h-full w-full group-hover:scale-105 transition duration-500 ease-out"
                  />

                  {/* Absolute Top Overlays */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-1.5">
                    {product.isNew && (
                      <span className="bg-black text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                        Just In
                      </span>
                    )}
                    {product.tag && (
                      <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                        {product.tag}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button Toggle */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full border border-gray-100 shadow-sm text-gray-400 hover:text-red-500 transition active:scale-95 group/heart"
                  >
                    <Heart
                      className={`w-4 h-4 transition ${
                        wishlist.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>

                {/* Info Text Elements Container */}
                <div className="p-5 space-y-3 grow flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                      {product.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition text-base leading-snug">
                      {product.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>

                    <button className="bg-gray-900 hover:bg-black text-white text-xs font-medium px-4 py-2 rounded-xl transition flex items-center space-x-1.5">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Collect</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
