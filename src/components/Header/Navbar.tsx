// // import { Link, useLocation } from "react-router-dom";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { useQuery } from "@tanstack/react-query";
// // import axios from "axios";

// // const API_URL = import.meta.env.VITE_API_URL;

// // interface NavbarProps {
// //   onLinkClick?: () => void;
// // }

// // export default function Navbar({ onLinkClick }: NavbarProps) {
// //   const location = useLocation();

// //   const { data: categories = [], isLoading } = useQuery({
// //     queryKey: ["public-categories"],
// //     queryFn: async () => {
// //       const res = await axios.get<{
// //         categories: { _id: string; name: string; slug: string }[];
// //       }>(`${API_URL}/api/categories`);

// //       return res.data.categories ?? [];
// //     },
// //   });

// //   const navItems = [
// //     { to: "/", label: "Home" },
// //     ...categories.map((cat) => ({
// //       to: `/category/${cat.slug}`, // ✔ FIXED — use slug
// //       label: cat.name,
// //     })),
// //   ];

// //   const isActive = (path: string) =>
// //     location.pathname === path ||
// //     (path !== "/" && location.pathname.startsWith(path));

// //   if (isLoading) {
// //     return (
// //       <div className="flex flex-wrap justify-center gap-3">
// //         {[...Array(6)].map((_, i) => (
// //           <div
// //             key={i}
// //             className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"
// //           />
// //         ))}
// //       </div>
// //     );
// //   }

// //   return (
// //     <nav className="w-full">
// //       <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
// //         <AnimatePresence mode="wait">
// //           {navItems.map((item) => (
// //             <motion.div
// //               key={item.to}
// //               layout
// //               className="relative"
// //               transition={{ type: "spring", stiffness: 400, damping: 30 }}
// //             >
// //               <Link
// //                 to={item.to}
// //                 onClick={onLinkClick}
// //                 className={`relative block px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
// //                   isActive(item.to)
// //                     ? "text-white"
// //                     : "text-gray-700 hover:text-sky-600"
// //                 }`}
// //               >
// //                 {isActive(item.to) && (
// //                   <motion.div
// //                     layoutId="navbarActivePill"
// //                     className="absolute inset-0 bg-linear-to-r from-sky-500 to-blue-600 rounded-full shadow-lg"
// //                     transition={{ type: "spring", stiffness: 400, damping: 30 }}
// //                   />
// //                 )}

// //                 <span className="relative z-10">{item.label}</span>
// //               </Link>
// //             </motion.div>
// //           ))}
// //         </AnimatePresence>
// //       </div>
// //     </nav>
// //   );
// // }

// //// Updated with sub-c
// // components/Navbar.tsx
// import { Link, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { ChevronDown } from "lucide-react";
// import { useState } from "react";

// const API_URL = import.meta.env.VITE_API_URL;

// interface Subcategory {
//   _id: string;
//   name: string;
//   slug: string;
// }

// interface Category {
//   _id: string;
//   name: string;
//   slug: string;
//   subcategories?: Subcategory[];
// }

// interface NavbarProps {
//   onLinkClick?: () => void;
// }

// export default function Navbar({ onLinkClick }: NavbarProps) {
//   const location = useLocation();
//   const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

//   const { data: categories = [], isLoading } = useQuery<Category[]>({
//     queryKey: ["public-categories-with-subs"],
//     queryFn: async () => {
//       const res = await axios.get<{ categories: Category[] }>(
//         `${API_URL}/api/categories?withSubs=true`
//       );
//       return res.data.categories ?? [];
//     },
//   });

//   const isActive = (path: string) =>
//     location.pathname === path ||
//     (path !== "/" && location.pathname.startsWith(path));

//   if (isLoading) {
//     return (
//       <nav className="w-full py-4">
//         <div className="flex flex-wrap justify-center gap-4">
//           {[...Array(6)].map((_, i) => (
//             <div
//               key={i}
//               className="h-10 w-28 bg-gray-200 rounded-full animate-pulse"
//             />
//           ))}
//         </div>
//       </nav>
//     );
//   }

//   return (
//     <nav className="w-full py-4">
//       <div className="flex flex-wrap justify-center gap-3 lg:gap-5">
//         <AnimatePresence mode="wait">
//           {/* Home Link */}
//           <motion.div
//             layout
//             className="relative"
//             transition={{ type: "spring", stiffness: 400, damping: 30 }}
//           >
//             <Link
//               to="/"
//               onClick={onLinkClick}
//               className={`relative block px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
//                 isActive("/") ? "text-" : "text-gray-700 hover:text-sky-600"
//               }`}
//             >
//               {isActive("/") && (
//                 <motion.div
//                   layoutId="navbarActivePill"
//                   className="absolute inset-0 bg-linear-to-r from-sky-300 to-blue-300 rounded-full shadow-lg"
//                   transition={{ type: "spring", stiffness: 400, damping: 30 }}
//                 />
//               )}
//               <span className="relative z-10">Home</span>
//             </Link>
//           </motion.div>

//           {/* Categories with/without Subcategories */}
//           {categories.map((category) => {
//             const hasSubcategories =
//               category.subcategories && category.subcategories.length > 0;
//             const categoryPath = `/category/${category.slug}`;
//             const isCategoryActive = isActive(categoryPath);

//             return (
//               <motion.div
//                 key={category._id}
//                 layout
//                 className="relative"
//                 onHoverStart={() =>
//                   hasSubcategories && setHoveredCategory(category._id)
//                 }
//                 onHoverEnd={() => setHoveredCategory(null)}
//                 transition={{ type: "spring", stiffness: 400, damping: 30 }}
//               >
//                 <Link
//                   to={hasSubcategories ? "#" : categoryPath}
//                   onClick={(e) => {
//                     if (hasSubcategories) {
//                       e.preventDefault();
//                     } else {
//                       onLinkClick?.();
//                     }
//                   }}
//                   className={`relative flex items-center gap-1.5 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
//                     isCategoryActive
//                       ? "text-white"
//                       : "text-gray-700 hover:text-sky-600"
//                   }`}
//                 >
//                   {/* Active Pill Background */}
//                   {(isCategoryActive || hoveredCategory === category._id) && (
//                     <motion.div
//                       layoutId="navbarActivePill"
//                       className="absolute inset-0 bg-linear-to-r from-sky-500 to-blue-600 rounded-full shadow-lg"
//                       transition={{
//                         type: "spring",
//                         stiffness: 400,
//                         damping: 30,
//                       }}
//                     />
//                   )}

//                   <span className="relative z-10">{category.name}</span>

//                   {/* Dropdown Arrow - Only if has subcategories */}
//                   {hasSubcategories && (
//                     <ChevronDown
//                       size={16}
//                       className={`relative z-10 transition-transform duration-300 ${
//                         hoveredCategory === category._id ? "rotate-180" : ""
//                       }`}
//                     />
//                   )}
//                 </Link>

//                 {/* Dropdown Menu */}
//                 <AnimatePresence>
//                   {hasSubcategories && hoveredCategory === category._id && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <div className="py-2">
//                         {category.subcategories!.map((sub) => (
//                           <Link
//                             key={sub._id}
//                             to={`/category/${category.slug}/${sub.slug}`}
//                             onClick={onLinkClick}
//                             className="block px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//                           >
//                             {sub.name}
//                           </Link>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>
//       </div>
//     </nav>
//   );
// }

///////////// update design and sub-c
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

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

interface NavbarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export default function Navbar({ mobile = false, onClose }: NavbarProps) {
  const location = useLocation();
  const [hoverCategory, setHoverCategory] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["public-categories-with-subs"],
    queryFn: async () => {
      const res = await axios.get<{ categories: Category[] }>(
        `${API_URL}/v1/categories?withSubs=true`
      );
      return res.data.categories ?? [];
    },
  });

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  return (
    <nav className="w-full">
      {/* DESKTOP */}
      <div className="hidden lg:flex items-center gap-8 h-16">
        <Link
          to="/"
          className={`text-gray-800 hover:text-blue-600 ${
            isActive("/") ? "text-blue-600 font-semibold" : ""
          }`}
        >
          Home
        </Link>

        {categories.map((cat) => {
          const hasSub =
            Array.isArray(cat.subcategories) && cat.subcategories.length > 0;

          return (
            <div
              key={cat._id}
              className="relative"
              onMouseEnter={() => hasSub && setHoverCategory(cat._id)}
              onMouseLeave={() => setHoverCategory(null)}
            >
              {hasSub ? (
                <button
                  className={`flex items-center gap-1 text-gray-800 hover:text-blue-600 ${
                    isActive(`/category/${cat.slug}`)
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  {cat.name}
                  <ChevronDown size={14} className="opacity-70" />
                </button>
              ) : (
                <Link
                  to={`/category/${cat.slug}`}
                  className={`text-gray-800 hover:text-blue-600 ${
                    isActive(`/category/${cat.slug}`)
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  {cat.name}
                </Link>
              )}

              {/* DROPDOWN */}
              <AnimatePresence>
                {hasSub && hoverCategory === cat._id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-3 w-52 bg-white shadow-lg rounded-md py-2 z-50"
                  >
                    {cat.subcategories!.map((sub) => (
                      <Link
                        key={sub._id}
                        to={`/category/${cat.slug}/${sub.slug}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* MOBILE */}
      {mobile && (
        <div className="flex flex-col py-3">
          {!activeCategory && (
            <div className="flex flex-col gap-3 px-2">
              <Link
                to="/"
                onClick={onClose}
                className="text-gray-800 text-[16px] font-medium py-2"
              >
                Home
              </Link>

              {categories.map((cat) => {
                const hasSub =
                  Array.isArray(cat.subcategories) &&
                  cat.subcategories.length > 0;

                return hasSub ? (
                  <button
                    key={cat._id}
                    onClick={() => setActiveCategory(cat._id)}
                    className="flex justify-between items-center w-full text-gray-800 text-[16px] font-medium py-2"
                  >
                    {cat.name}
                    <ChevronDown size={16} className="opacity-60" />
                  </button>
                ) : (
                  <Link
                    key={cat._id}
                    to={`/category/${cat.slug}`}
                    onClick={onClose}
                    className="block w-full text-gray-800 text-[15px] font-medium py-2"
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          )}

          {activeCategory && (
            <div className="flex flex-col">
              <button
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-2 text-[15px] font-medium text-gray-700 px-2 py-3"
              >
                <ChevronLeft size={20} className="text-blue-500" />
                Back
              </button>

              <div className="flex flex-col gap-2 mt-1 px-4 pb-4">
                {categories
                  .find((c) => c._id === activeCategory)!
                  .subcategories!.map((sub) => (
                    <Link
                      key={sub._id}
                      to={`/category/${
                        categories.find((c) => c._id === activeCategory)!.slug
                      }/${sub.slug}`}
                      onClick={onClose}
                      className="text-gray-700 text-[15px] font-medium py-1.5"
                    >
                      {sub.name}
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
