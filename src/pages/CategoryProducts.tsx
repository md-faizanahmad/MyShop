////// category + subcategory
// src/components/CategoryProducts.tsx
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "./ProductCard";
import { ChevronDown } from "lucide-react";
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
        `${API}/v1/products/category/${slugForProducts}`,
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
        `${API}/v1/categories?withSubs=true`,
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

  const categoryTitle =
    activeCategory?.name || products[0]?.category?.name || "Products";

  const subcategoryTitle = activeSub?.name;

  // const titleText = activeSub
  //   ? `${activeCategory?.name ?? products[0]?.category?.name ?? "Products"} • ${
  //       activeSub.name
  //     }`
  //   : activeCategory?.name || products[0]?.category?.name || "Products";

  // -------------------------------- RENDER --------------------------------
  return (
    <div className="min-h-screen ">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-3.5 sm:py-4">
            {/* Header row */}
            <div className="flex min-w-0 items-center justify-between gap-3 sm:gap-5">
              {/* Title */}
              <div className="flex min-w-0 flex-1 items-center gap-2">
                {/* <h2 className="truncate text-lg font-semibold tracking-tight text-zinc-950 sm:text-xl">
                  {titleText}
                </h2> */}
                <h2 className="flex min-w-0 items-baseline gap-1.5 truncate tracking-tight text-zinc-950">
                  <span
                    className={
                      subcategoryTitle
                        ? "truncate text-lg font-semibold sm:text-xl"
                        : "truncate text-xl font-semibold sm:text-2xl"
                    }
                  >
                    {categoryTitle}
                  </span>

                  {subcategoryTitle && (
                    <>
                      <span className="shrink-0 text-sm font-medium text-zinc-400 sm:text-base">
                        •
                      </span>

                      <span className="truncate text-sm font-medium text-zinc-500 sm:text-base">
                        {subcategoryTitle}
                      </span>
                    </>
                  )}
                </h2>
                <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-red-100 px-1.5 text-[11px] font-semibold leading-none text-zinc-600 sm:h-6 sm:min-w-6 sm:text-xs">
                  {sortedProducts.length}
                </span>
              </div>

              {/* Sort */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  aria-expanded={isSortOpen}
                  aria-haspopup="menu"
                  className="
              group inline-flex h-9 items-center gap-1.5
              rounded-md border border-zinc-200
              bg-white px-2.5
              text-xs font-medium text-zinc-700
              transition-colors duration-200
              hover:border-zinc-300 hover:bg-zinc-50
              focus:outline-none focus:ring-2 focus:ring-zinc-200
              sm:h-10 sm:gap-2 sm:px-3.5 sm:text-sm
            "
                >
                  <span className="hidden font-normal text-zinc-500 sm:inline">
                    Sort:
                  </span>

                  <span className="max-w-[90px] truncate font-medium text-zinc-900 sm:max-w-none">
                    {currentSortLabel}
                  </span>

                  <ChevronDown
                    className={`h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 sm:h-4 sm:w-4 ${
                      isSortOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isSortOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsSortOpen(false)}
                      aria-hidden="true"
                    />

                    <div
                      role="menu"
                      className="
                  absolute right-0 top-full z-20 mt-2
                  w-52 overflow-hidden
                  rounded-lg border border-zinc-200
                  bg-white
                  p-1
                  shadow-lg shadow-zinc-900/8
                "
                    >
                      <div className="px-2.5 py-2 text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                        Sort products
                      </div>

                      {sortOptions.map((option) => {
                        const selected = sortBy === option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              setSortBy(option.value);
                              setIsSortOpen(false);
                            }}
                            className={`
                        flex w-full items-center justify-between
                        rounded-md px-2.5 py-2
                        text-sm transition-colors
                        ${
                          selected
                            ? "bg-zinc-100 font-medium text-zinc-950"
                            : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                        }
                      `}
                          >
                            <span>{option.label}</span>

                            {selected && (
                              <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Subcategory navigation */}
            {activeCategory?.subcategories &&
              activeCategory.subcategories.length > 0 && (
                <div className="relative mt-3.5 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <nav
                    aria-label="Product categories"
                    className="
                flex min-w-max items-center gap-5
                overflow-x-auto
                scroll-smooth
                pb-1
                scrollbar-none
              "
                  >
                    {/* All */}
                    <Link
                      to={`/category/${activeCategory.slug}`}
                      className={`
                  relative shrink-0 py-1
                  text-sm transition-colors duration-200
                  ${
                    !subSlug
                      ? "font-medium text-zinc-950"
                      : "text-zinc-500 hover:text-zinc-900"
                  }
                `}
                    >
                      All Items
                      {!subSlug && (
                        <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-red-600" />
                      )}
                    </Link>

                    {/* Subcategories */}
                    {activeCategory.subcategories.map((sub) => {
                      const active = sub.slug === subSlug;

                      return (
                        <Link
                          key={sub._id}
                          to={`/category/${activeCategory.slug}/sub/${sub.slug}`}
                          className={`
                      relative shrink-0 py-1
                      text-sm transition-colors duration-200
                      ${
                        active
                          ? "font-medium text-zinc-950"
                          : "text-zinc-500 hover:text-zinc-900"
                      }
                    `}
                        >
                          {sub.name}

                          {active && (
                            <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-red-600" />
                          )}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              )}
          </div>
        </div>
      </div>
      {/* Products Grid */}
      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-24">
            <div className=" border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6" />
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

// <div className="sticky top-0 z-40 bg-white ">
//         <div className="container mx-auto px-4 pt-3 pb-2 flex flex-col gap-3">
//           {/* Title + Sort */}
//           <div className="flex items-center justify-between gap-3">
//             <h2 className="text-lg md:text-2xl font-bold truncate">
//               {titleText}
//               <span className="ml-2 text-sm text-gray-600">
//                 ({sortedProducts.length})
//               </span>
//             </h2>

//             {/* Sort Dropdown */}
//             <div className="relative ">
//               <button
//                 onClick={() => setIsSortOpen(!isSortOpen)}
//                 className="flex items-center gap-2 px-4 py-2.5  rounded-lg text-sm font-medium"
//               >
//                 <SlidersHorizontal className="w-4 h-4" />
//                 <span className="hidden sm:inline">Sort by:</span>
//                 <span className="font-semibold">{currentSortLabel}</span>
//                 <ChevronDown
//                   className={`w-4 h-4 transition-transform ${
//                     isSortOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {isSortOpen && (
//                 <>
//                   <div
//                     className="fixed inset-0 z-10"
//                     onClick={() => setIsSortOpen(false)}
//                   />
//                   <div className="absolute right-0 mt-1 w-48  border border-zinc-200 shadow-sm z-20 antialiased">
//                     {sortOptions.map((option) => (
//                       <button
//                         key={option.value}
//                         onClick={() => {
//                           setSortBy(option.value);
//                           setIsSortOpen(false);
//                         }}
//                         className={`w-full text-left px-3 py-2 text-xs transition-colors hover:bg-zinc-50 flex items-center justify-between ${
//                           sortBy === option.value
//                             ? "bg-zinc-50 font-bold text-zinc-900"
//                             : "text-zinc-600"
//                         }`}
//                       >
//                         <span>{option.label}</span>

//                         {/* Subtle indicator for the selected filter state */}
//                         {sortBy === option.value && (
//                           <span className="w-1 h-1 bg-emerald-700 rounded-full" />
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Subcategory Nav (only if main category has subs) */}
//           {activeCategory?.subcategories &&
//             activeCategory.subcategories.length > 0 && (
//               <div className="flex gap-3  overflow-x-auto pb-2 ">
//                 {/* All tab -> main category */}
//                 <Link
//                   to={`/category/${activeCategory.slug}`}
//                   className={`px-3 py-2 text-xs font-medium transition-all whitespace-nowrap border-b-2 flex items-center gap-1.5 ${
//                     !subSlug
//                       ? "border-red-700 text-zinc-900 font-bold"
//                       : "border-transparent text-zinc-500 hover:text-zinc-900 hover:border-zinc-200"
//                   }`}
//                 >
//                   <span>All Items</span>

//                   {/* Subtle indicator dot matching the premium store look */}
//                   {!subSlug && (
//                     <span className="w-1 h-1 bg-red-700 rounded-full" />
//                   )}
//                 </Link>

//                 {activeCategory.subcategories.map((sub) => {
//                   const active = sub.slug === subSlug;
//                   return (
//                     <Link
//                       key={sub._id}
//                       to={`/category/${activeCategory.slug}/sub/${sub.slug}`}
//                       className={`px-3 py-2 text-xs font-medium transition-all whitespace-nowrap border-b-2 flex items-center gap-1.5 ${
//                         active
//                           ? "border-red-700 text-zinc-900 font-bold"
//                           : "border-transparent text-zinc-500 hover:text-zinc-900 hover:border-zinc-200"
//                       }`}
//                     >
//                       <span>{sub.name}</span>

//                       {active && (
//                         <span className="w-1 h-1 bg-red-700 rounded-full" />
//                       )}
//                     </Link>
//                   );
//                 })}
//               </div>
//             )}
//         </div>
//       </div>
