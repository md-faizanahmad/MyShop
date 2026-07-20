// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { ChevronDown, ChevronLeft } from "lucide-react";
// import type { MobileNavbarProps } from "../../../types/nav";

// const mobileLinkClass =
//   "flex items-center py-3 text-[15px] font-medium text-gray-800 rounded-lg hover:bg-gray-50";

// const mobileHeaderLinkClass =
//   "flex items-center py-3 text-[16px] font-semibold text-sky-900 rounded-lg hover:bg-gray-50";

// const mobileSubLinkClass =
//   "flex items-center py-3 text-[15px] font-medium text-red-500 rounded-lg hover:bg-gray-50";

// export default function MobileNavbar({
//   categories,
//   onClose,
// }: MobileNavbarProps) {
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);

//   return (
//     <div className="flex flex-col h-full">
//       {/* ROOT LEVEL */}
//       {!activeCategory && (
//         <nav className="flex flex-col px-4 py-3">
//           {/* Home */}
//           <Link to="/" onClick={onClose} className={mobileHeaderLinkClass}>
//             Home
//           </Link>

//           <div className="my-2 border-t border-gray-100" />

//           {/* Categories */}
//           <ul className="flex flex-col">
//             {categories.map((cat) => {
//               const hasSub =
//                 Array.isArray(cat.subcategories) &&
//                 cat.subcategories.length > 0;

//               return (
//                 <li key={cat._id}>
//                   {hasSub ? (
//                     <button
//                       onClick={() => setActiveCategory(cat._id)}
//                       className="flex items-center justify-between w-full py-3 text-[15px] font-medium text-gray-800 rounded-lg hover:bg-gray-50"
//                     >
//                       <span>{cat.name}</span>
//                       <ChevronDown size={18} className="text-gray-400" />
//                     </button>
//                   ) : (
//                     <Link
//                       to={`/category/${cat.slug}`}
//                       onClick={onClose}
//                       className={mobileLinkClass}
//                     >
//                       {cat.name}
//                     </Link>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//       )}

//       {/* SUBCATEGORY LEVEL */}
//       {activeCategory && (
//         <div className="flex flex-col h-full">
//           {/* Back Header */}
//           <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-100">
//             <button
//               onClick={() => setActiveCategory(null)}
//               className="flex items-center gap-2 text-[15px] font-medium text-gray-700"
//             >
//               <ChevronLeft size={20} className="text-blue-600" />
//               Categories
//             </button>
//           </div>

//           {(() => {
//             const activeCatObj = categories.find(
//               (c) => c._id === activeCategory,
//             );

//             if (!activeCatObj) return null;

//             return (
//               <div className="flex flex-col px-4 py-3">
//                 {/* All Category */}
//                 <Link
//                   to={`/category/${activeCatObj.slug}`}
//                   onClick={onClose}
//                   className="py-3 text-[15px] font-semibold text-gray-900 rounded-lg hover:bg-gray-50"
//                 >
//                   All {activeCatObj.name}
//                 </Link>

//                 <div className="my-2 border-t border-gray-100" />

//                 {/* Subcategories */}
//                 <ul className="flex flex-col">
//                   {activeCatObj.subcategories?.map((sub) => (
//                     <li key={sub._id}>
//                       <Link
//                         to={`/category/${activeCatObj.slug}/sub/${sub.slug}`}
//                         onClick={onClose}
//                         className={mobileSubLinkClass}
//                       >
//                         {sub.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             );
//           })()}
//         </div>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, X } from "lucide-react";

import Brand from "../../../shared/Brand";
import type { MobileNavbarProps } from "../../../types/nav";

/* -------------------------------------------------------------------------- */
/*                                Style Classes                               */
/* -------------------------------------------------------------------------- */

const rootClass =
  "fixed inset-0 z-50 flex h-screen w-screen flex-col overflow-hidden bg-white text-neutral-900 antialiased selection:bg-neutral-100";

const headerClass =
  "flex h-16 shrink-0 items-center justify-between border-b border-neutral-100 px-5";

const categoryButtonClass =
  "flex w-full items-center justify-between px-5 py-4.5 text-left text-[16px] font-medium tracking-tight text-neutral-900 transition-colors active:bg-neutral-50";

const categoryLinkClass =
  "flex w-full items-center px-5 py-4.5 text-[16px] font-medium tracking-tight text-neutral-900 active:bg-neutral-50";

const featuredLinkClass =
  "flex items-center justify-between rounded-md bg-red-50 px-4 py-3 text-[14px] font-semibold tracking-tight text-red-700 active:opacity-90";

const utilityLinkClass =
  "block text-[13px] font-medium text-neutral-500 transition-colors hover:text-neutral-900 active:underline";

const backButtonClass =
  "flex h-12 w-full shrink-0 items-center gap-2 border-b border-neutral-100/80 bg-neutral-50/50 px-5 text-[13px] font-semibold uppercase tracking-wider text-neutral-600 transition-colors active:bg-neutral-100";

const subcategoryLinkClass =
  "flex w-full items-center justify-between px-5 py-4 text-[15px] text-neutral-700 transition-colors active:bg-neutral-50";

/* -------------------------------------------------------------------------- */
/*                            Bottom Navigation                               */
/* -------------------------------------------------------------------------- */

interface BottomNavigationItem {
  label: string;
  to: string;
  featured?: boolean;
  badge?: string;
}

const bottomNavigation: BottomNavigationItem[] = [
  {
    label: "Mid-Season Sale",
    to: "/sale",
    featured: true,
    badge: "Up to 50%",
  },
  {
    label: "Track Orders & Returns",
    to: "/orders",
  },
  {
    label: "Find a Store",
    to: "/stores",
  },
  {
    label: "Help & Customer Support",
    to: "/support",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

export default function MobileNavbar({
  categories,
  onClose,
}: MobileNavbarProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const activeCategoryData = categories.find(
    ({ _id }) => _id === activeCategory,
  );

  return (
    <div className={rootClass}>
      {/* Header */}
      <header className={headerClass}>
        <Brand />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="-mr-2 p-2 text-neutral-400 transition-colors hover:text-neutral-900 active:scale-95"
        >
          <X size={24} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </header>

      <main className="flex-1 overflow-hidden">
        {!activeCategory && (
          <nav
            aria-label="Mobile navigation"
            className="flex h-full flex-col justify-between overflow-y-auto overflow-x-hidden pb-8"
          >
            <section aria-labelledby="mobile-categories-heading">
              <h2 id="mobile-categories-heading" className="sr-only">
                Shop Categories
              </h2>

              <ul className="divide-y divide-neutral-50/60">
                {categories.map((category) => {
                  const hasSubcategories =
                    Array.isArray(category.subcategories) &&
                    category.subcategories.length > 0;

                  return (
                    <li key={category._id}>
                      {hasSubcategories ? (
                        <button
                          type="button"
                          onClick={() => setActiveCategory(category._id)}
                          aria-label={`Open ${category.name}`}
                          aria-haspopup="true"
                          aria-expanded={activeCategory === category._id}
                          className={categoryButtonClass}
                        >
                          <span>{category.name}</span>

                          <ChevronRight
                            size={16}
                            strokeWidth={1.5}
                            aria-hidden="true"
                            className="text-neutral-400"
                          />
                        </button>
                      ) : (
                        <Link
                          to={`/category/${category.slug}`}
                          onClick={onClose}
                          className={categoryLinkClass}
                        >
                          {category.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
            <footer className="mt-auto border-t border-neutral-100/60 pt-10">
              <div className="px-5">
                {bottomNavigation
                  .filter(({ featured }) => featured)
                  .map(({ label, to, badge }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={onClose}
                      className={featuredLinkClass}
                    >
                      <span>{label}</span>

                      <span className="rounded bg-red-600 px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-widest text-white">
                        {badge}
                      </span>
                    </Link>
                  ))}

                <nav aria-label="Customer services" className="mt-6">
                  <ul className="space-y-3.5">
                    {bottomNavigation
                      .filter(({ featured }) => !featured)
                      .map(({ label, to }) => (
                        <li key={to}>
                          <Link
                            to={to}
                            onClick={onClose}
                            className={utilityLinkClass}
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </nav>
              </div>
            </footer>
          </nav>
        )}
      </main>
      {activeCategoryData && (
        <section
          className="flex h-full flex-col bg-white"
          aria-labelledby="subcategory-heading"
        >
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            aria-label="Back to categories"
            className={backButtonClass}
          >
            <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />

            <span>Back to categories</span>
          </button>

          <nav
            aria-label={`${activeCategoryData.name} categories`}
            className="flex-1 overflow-y-auto pb-12"
          >
            <h2
              id="subcategory-heading"
              className="px-5 pb-3 pt-6 text-xs font-bold uppercase tracking-widest text-neutral-400"
            >
              {activeCategoryData.name}
            </h2>

            <ul className="divide-y divide-neutral-50/60">
              <li>
                <Link
                  to={`/category/${activeCategoryData.slug}`}
                  onClick={onClose}
                  className={categoryLinkClass}
                >
                  View All
                </Link>
              </li>

              {activeCategoryData.subcategories?.map((subcategory) => (
                <li key={subcategory._id}>
                  <Link
                    to={`/category/${activeCategoryData.slug}/sub/${subcategory.slug}`}
                    onClick={onClose}
                    className={subcategoryLinkClass}
                  >
                    <span>{subcategory.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      )}
    </div>
  );
}
