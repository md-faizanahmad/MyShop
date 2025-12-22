// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import ProductCard from "./ProductCard";
// import { ChevronDown, SlidersHorizontal } from "lucide-react";
// import { useState } from "react";
// import CategoryProductsSkeleton from "../skeleton/ProductSkeleton";
// import type { PublicProduct } from "../types/product";

// const API = import.meta.env.VITE_API_URL;

// type SortOption =
//   | "latest"
//   | "price-low"
//   | "price-high"
//   | "popular"
//   | "discount";

// const sortOptions: { value: SortOption; label: string }[] = [
//   { value: "latest", label: "Latest" },
//   { value: "price-low", label: "Price: Low to High" },
//   { value: "price-high", label: "Price: High to Low" },
//   { value: "popular", label: "Most Popular" },
//   { value: "discount", label: "Biggest Discount" },
// ];

// export default function CategoryProducts() {
//   const { slug } = useParams<{ slug: string }>();

//   const [sortBy, setSortBy] = useState<SortOption>("latest");
//   const [isSortOpen, setIsSortOpen] = useState(false);

//   const {
//     data: products = [],
//     isLoading,
//     error,
//   } = useQuery<PublicProduct[]>({
//     queryKey: ["category-products", slug],
//     queryFn: async () => {
//       const res = await axios.get(`${API}/v1/products/category/${slug}`);
//       return res.data.products || [];
//     },
//     enabled: !!slug,
//   });

//   // ----- Sorting -----
//   const sortedProducts = [...products].sort((a, b) => {
//     switch (sortBy) {
//       case "price-low":
//         return a.price - b.price;

//       case "price-high":
//         return b.price - a.price;

//       case "latest":
//         return b._id.localeCompare(a._id);

//       case "popular":
//         return (b.rating?.average ?? 0) - (a.rating?.average ?? 0);

//       case "discount": {
//         const discountA = a.discountPrice
//           ? (a.price - a.discountPrice) / a.price
//           : 0;

//         const discountB = b.discountPrice
//           ? (b.price - b.discountPrice) / b.price
//           : 0;

//         return discountB - discountA;
//       }

//       default:
//         return 0;
//     }
//   });

//   // ----- State: Loading -----
//   if (isLoading) return <CategoryProductsSkeleton />;

//   // ----- Error State -----
//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-20 text-center">
//         <p className="text-red-600">Failed to load products. Try again.</p>
//       </div>
//     );
//   }

//   const currentSortLabel =
//     sortOptions.find((o) => o.value === sortBy)?.label || "Sort";

//   // -------------------------------- RENDER --------------------------------
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Sticky Header */}
//       <div className="sticky top-0 z-40 bg-white shadow-sm">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <h2 className="text-lg md:text-2xl font-bold truncate">
//             {products[0]?.category?.name || "Products"}
//             <span className="ml-2 text-sm text-gray-600">
//               ({products.length})
//             </span>
//           </h2>

//           {/* Sort Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setIsSortOpen(!isSortOpen)}
//               className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-lg text-sm font-medium"
//             >
//               <SlidersHorizontal className="w-4 h-4" />
//               <span className="hidden sm:inline">Sort by:</span>
//               <span className="font-semibold">{currentSortLabel}</span>
//               <ChevronDown
//                 className={`w-4 h-4 transition-transform ${
//                   isSortOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </button>

//             {isSortOpen && (
//               <>
//                 <div
//                   className="fixed inset-0 z-10"
//                   onClick={() => setIsSortOpen(false)}
//                 />
//                 <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-xl z-20 overflow-hidden">
//                   {sortOptions.map((option) => (
//                     <button
//                       key={option.value}
//                       onClick={() => {
//                         setSortBy(option.value);
//                         setIsSortOpen(false);
//                       }}
//                       className={`w-full text-left px-5 py-3 text-sm hover:bg-gray-100 ${
//                         sortBy === option.value ? "bg-gray-100 font-medium" : ""
//                       }`}
//                     >
//                       {option.label}
//                     </button>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Products Grid */}
//       <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
//         {sortedProducts.length === 0 ? (
//           <div className="text-center py-24">
//             <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6" />
//             <p className="text-xl font-medium text-gray-700">
//               No products found
//             </p>
//             <p className="text-gray-500 mt-2">
//               This category is empty right now.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
//             {sortedProducts.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

////// category + subcategory
// src/components/CategoryProducts.tsx
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "./ProductCard";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import CategoryProductsSkeleton from "../skeleton/ProductSkeleton";
import type { PublicProduct } from "../types/product";

const API = import.meta.env.VITE_API_URL;

type SortOption =
  | "latest"
  | "price-low"
  | "price-high"
  | "popular"
  | "discount";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
  { value: "discount", label: "Biggest Discount" },
];

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  subcategories?: Subcategory[];
}

export default function CategoryProducts() {
  const params = useParams<{ categorySlug?: string; subSlug?: string }>();
  const categorySlug = params.categorySlug ?? "";
  const subSlug = params.subSlug;

  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // which slug to send to products API
  const slugForProducts = subSlug ?? categorySlug;

  // 1) Products for category or subcategory
  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useQuery<PublicProduct[]>({
    queryKey: ["category-products", slugForProducts],
    queryFn: async () => {
      const res = await axios.get(
        `${API}/v1/products/category/${slugForProducts}`
      );
      return res.data.products || [];
    },
    enabled: !!slugForProducts,
  });

  // 2) Categories with subs for nav
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery<Category[]>({
    queryKey: ["categories-with-subs"],
    queryFn: async () => {
      const res = await axios.get<{ categories: Category[] }>(
        `${API}/v1/categories?withSubs=true`
      );
      return res.data.categories || [];
    },
  });

  const activeCategory = categories.find((c) => c.slug === categorySlug);
  const activeSub =
    activeCategory?.subcategories?.find((s) => s.slug === subSlug) || null;

  const isLoading = productsLoading || categoriesLoading;
  const error = productsError || categoriesError;

  // ----- Sorting -----
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "latest":
        return b._id.localeCompare(a._id);
      case "popular":
        return (b.rating?.average ?? 0) - (a.rating?.average ?? 0);
      case "discount": {
        const discountA = a.discountPrice
          ? (a.price - a.discountPrice) / a.price
          : 0;
        const discountB = b.discountPrice
          ? (b.price - b.discountPrice) / b.price
          : 0;
        return discountB - discountA;
      }
      default:
        return 0;
    }
  });

  // ----- Loading -----
  if (isLoading) return <CategoryProductsSkeleton />;

  // No category in URL (shouldn't happen if routes are correct)
  if (!categorySlug) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-gray-600 text-lg">Category not found.</p>
      </div>
    );
  }

  // ----- Error -----
  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-red-600">Failed to load products. Try again.</p>
      </div>
    );
  }

  const currentSortLabel =
    sortOptions.find((o) => o.value === sortBy)?.label || "Sort";

  const titleText = activeSub
    ? `${activeCategory?.name ?? products[0]?.category?.name ?? "Products"} • ${
        activeSub.name
      }`
    : activeCategory?.name || products[0]?.category?.name || "Products";

  // -------------------------------- RENDER --------------------------------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4 pt-3 pb-2 flex flex-col gap-3">
          {/* Title + Sort */}
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg md:text-2xl font-bold truncate">
              {titleText}
              <span className="ml-2 text-sm text-gray-600">
                ({sortedProducts.length})
              </span>
            </h2>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-lg text-sm font-medium"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Sort by:</span>
                <span className="font-semibold">{currentSortLabel}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isSortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isSortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsSortOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-xl z-20 overflow-hidden">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3 text-sm hover:bg-gray-100 ${
                          sortBy === option.value
                            ? "bg-gray-100 font-medium"
                            : ""
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Subcategory Nav (only if main category has subs) */}
          {activeCategory?.subcategories &&
            activeCategory.subcategories.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2 border-b border-gray-200">
                {/* All tab -> main category */}
                <Link
                  to={`/category/${activeCategory.slug}`}
                  className={`px-3 py-1.5 text-sm rounded-full border whitespace-nowrap ${
                    !subSlug
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                >
                  All
                </Link>

                {activeCategory.subcategories.map((sub) => {
                  const active = sub.slug === subSlug;
                  return (
                    <Link
                      key={sub._id}
                      to={`/category/${activeCategory.slug}/sub/${sub.slug}`}
                      className={`px-3 py-1.5 text-sm rounded-full border whitespace-nowrap ${
                        active
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {sub.name}
                    </Link>
                  );
                })}
              </div>
            )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-24">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6" />
            <p className="text-xl font-medium text-gray-700">
              No products found
            </p>
            <p className="text-gray-500 mt-2">
              This category is empty right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
