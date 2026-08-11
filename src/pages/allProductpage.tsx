// // src/pages/AllProductsPage.tsx
// import { useMemo, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { SlidersHorizontal } from "lucide-react";
// import ProductCard from "./ProductCard";

// const API = import.meta.env.VITE_API_URL as string;

// type SortKey = "latest" | "price-low" | "price-high" | "rating";

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   discountPrice?: number;
//   stock: number;
//   imageUrl: string;
//   slug: string;
//   createdAt: string;
//   category: {
//     _id: string;
//     name: string;
//     slug: string;
//   };
//   subcategory?: {
//     _id: string;
//     name: string;
//     slug: string;
//   };
//   rating: {
//     average: number;
//     count: number;
//   };
// }

// export default function AllProductsPage() {
//   /* -----------------------------
//      Filters / Sort (LOCAL STATE)
//   ----------------------------- */
//   const [sort, setSort] = useState<SortKey>("latest");
//   const [category, setCategory] = useState<string>("all");
//   const [inStockOnly, setInStockOnly] = useState<boolean>(false);

//   /* -----------------------------
//      Fetch products
//   ----------------------------- */
//   const { data = [], isLoading } = useQuery<Product[]>({
//     queryKey: ["all-products"],
//     queryFn: async () => {
//       const res = await axios.get<{ products: Product[] }>(
//         `${API}/v1/products`
//       );
//       return res.data.products;
//     },
//   });

//   /* -----------------------------
//      Derived categories
//   ----------------------------- */
//   const categories = useMemo(() => {
//     const set = new Set<string>();
//     data.forEach((p) => set.add(p.category.slug));
//     return Array.from(set);
//   }, [data]);

//   /* -----------------------------
//      Filter + Sort pipeline
//   ----------------------------- */
//   const filteredProducts = useMemo(() => {
//     let products = [...data];

//     // Category filter
//     if (category !== "all") {
//       products = products.filter((p) => p.category.slug === category);
//     }

//     // Stock filter
//     if (inStockOnly) {
//       products = products.filter((p) => p.stock > 0);
//     }

//     // Sort
//     switch (sort) {
//       case "price-low":
//         products.sort(
//           (a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price)
//         );
//         break;

//       case "price-high":
//         products.sort(
//           (a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price)
//         );
//         break;

//       case "rating":
//         products.sort((a, b) => b.rating.average - a.rating.average);
//         break;

//       case "latest":
//       default:
//         products.sort(
//           (a, b) =>
//             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//         );
//     }

//     return products;
//   }, [data, category, inStockOnly, sort]);

//   /* -----------------------------
//      Loading
//   ----------------------------- */
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading products…
//       </div>
//     );
//   }

//   /* -----------------------------
//      Render
//   ----------------------------- */
//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8">
//       <div className="max-w-7xl mx-auto">
//         {/* TOP BAR */}
//         <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
//           <h1 className="text-3xl font-bold">
//             All Products ({filteredProducts.length})
//           </h1>

//           <div className="flex flex-wrap items-center gap-3">
//             {/* Category */}
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="border rounded-lg px-3 py-2"
//             >
//               <option value="all">All Categories</option>
//               {categories.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>

//             {/* Sort */}
//             <select
//               value={sort}
//               onChange={(e) => setSort(e.target.value as SortKey)}
//               className="border rounded-lg px-3 py-2"
//             >
//               <option value="latest">Latest</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//               <option value="rating">Top Rated</option>
//             </select>

//             {/* Stock */}
//             <label className="flex items-center gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={inStockOnly}
//                 onChange={(e) => setInStockOnly(e.target.checked)}
//               />
//               In stock only
//             </label>

//             <SlidersHorizontal className="text-gray-500" />
//           </div>
//         </div>

//         {/* GRID */}
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-20 text-gray-500">
//             No products found
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {filteredProducts.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

////////////////////////////////////////////////////22072026
// src/pages/AllProductsPage.tsx
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SlidersHorizontal, PackageX } from "lucide-react";
import ProductCard from "./ProductCard";

const API = import.meta.env.VITE_API_URL as string;

type SortKey = "latest" | "price-low" | "price-high" | "rating";

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  stock: number;
  imageUrl: string;
  slug: string;
  createdAt: string;
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
  rating: {
    average: number;
    count: number;
  };
}

export default function AllProductsPage() {
  /* -----------------------------
      Filters / Sort (LOCAL STATE)
  ----------------------------- */
  const [sort, setSort] = useState<SortKey>("latest");
  const [category, setCategory] = useState<string>("all");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  /* -----------------------------
      Fetch products
  ----------------------------- */
  const { data = [], isLoading } = useQuery<Product[]>({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axios.get<{ products: Product[] }>(
        `${API}/v1/products`,
      );
      return res.data.products;
    },
  });

  /* -----------------------------
      Derived categories
  ----------------------------- */
  const categories = useMemo(() => {
    const set = new Set<string>();
    data.forEach((p) => set.add(p.category.slug));
    return Array.from(set);
  }, [data]);

  /* -----------------------------
      Filter + Sort pipeline
  ----------------------------- */
  const filteredProducts = useMemo(() => {
    let products = [...data];

    // Category filter
    if (category !== "all") {
      products = products.filter((p) => p.category.slug === category);
    }

    // Stock filter
    if (inStockOnly) {
      products = products.filter((p) => p.stock > 0);
    }

    // Sort
    switch (sort) {
      case "price-low":
        products.sort(
          (a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price),
        );
        break;

      case "price-high":
        products.sort(
          (a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price),
        );
        break;

      case "rating":
        products.sort((a, b) => b.rating.average - a.rating.average);
        break;

      case "latest":
      default:
        products.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }

    return products;
  }, [data, category, inStockOnly, sort]);

  /* -----------------------------
      Loading State
  ----------------------------- */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600 font-medium text-base">
          <div className="h-5 w-5 rounded-full border-2 border-slate-300 border-t-slate-800 animate-spin" />
          Loading products…
        </div>
      </div>
    );
  }

  /* -----------------------------
      Render
  ----------------------------- */
  return (
    <div className="min-h-screen bg-slate-50/60 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 text-slate-900 mt-5">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* TOP BAR */}
        <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          {/* Header Title */}
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            All Products{" "}
            <span className="text-xs font-normal text-slate-400 sm:text-sm">
              ({filteredProducts.length})
            </span>
          </h2>

          {/* Filter & Sort Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {/* Category Dropdown */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-9 shrink-0 rounded-xl border border-slate-200/80 bg-slate-100/80 px-3 text-xs font-medium text-slate-800 transition active:bg-slate-200/70 focus:outline-none focus:ring-2 focus:ring-slate-900 capitalize"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c.replace(/-/g, " ")}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-9 shrink-0 rounded-xl border border-slate-200/80 bg-slate-100/80 px-3 text-xs font-medium text-slate-800 transition active:bg-slate-200/70 focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="latest">Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* In Stock Toggle */}
            <label className="flex h-9 shrink-0 cursor-pointer select-none items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-100/80 px-3 text-xs font-medium text-slate-700 transition active:bg-slate-200/70">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-slate-300 text-slate-900 accent-slate-900 focus:ring-slate-900"
              />
              In stock
            </label>

            {/* Filter Icon */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100/80 text-slate-500">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* GRID */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-3 shadow-xs">
            <PackageX className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-slate-600 font-medium">
              No products found matching your current filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
