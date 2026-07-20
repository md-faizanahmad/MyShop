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
///////////////////// Update 20072026
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Home,
  User,
  HelpCircle,
  Flame,
  Percent,
  X,
  Bell,
  Package,
} from "lucide-react";
import type { MobileNavbarProps } from "../../../types/nav";

const sectionHeadingClass =
  "px-6 pt-5 pb-2 text-xs font-bold text-gray-400 uppercase tracking-widest";

const navItemClass =
  "flex items-center gap-4 px-6 py-4 text-[16px] font-medium text-gray-800 transition-colors hover:bg-gray-50 active:bg-gray-100 border-b border-gray-50";

const subcategoryItemClass =
  "flex items-center justify-between px-6 py-4 text-[16px] text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100 border-b border-gray-50";

export default function MobileNavbar({
  categories,
  onClose,
}: MobileNavbarProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-screen w-screen bg-white fixed inset-0 z-50 overflow-hidden">
      {/* E-COMMERCE BRAND HEADER */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-slate-900 text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center font-bold text-sm text-white">
            U
          </div>
          <div>
            <p className="text-xs text-gray-300 leading-none">Hello, Sign In</p>
            <p className="text-sm font-bold mt-0.5">Your Account</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-slate-800 text-gray-300 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>

      {/* ROOT LEVEL */}
      {!activeCategory && (
        <nav className="flex-1 overflow-y-auto pb-10">
          {/* Quick Shortcuts Grid */}
          <div className="grid grid-cols-3 border-b border-gray-100 text-center bg-gray-50/50">
            <Link
              to="/"
              onClick={onClose}
              className="flex flex-col items-center gap-1 py-4 text-xs font-medium text-gray-700 border-r border-gray-100 hover:bg-gray-100"
            >
              <Home size={20} className="text-gray-500" />
              <span>Home</span>
            </Link>
            <Link
              to="/account/orders"
              onClick={onClose}
              className="flex flex-col items-center gap-1 py-4 text-xs font-medium text-gray-700 border-r border-gray-100 hover:bg-gray-100"
            >
              <Package size={20} className="text-gray-500" />
              <span>Orders</span>
            </Link>
            <Link
              to="/notifications"
              onClick={onClose}
              className="flex flex-col items-center gap-1 py-4 text-xs font-medium text-gray-700 hover:bg-gray-100"
            >
              <Bell size={20} className="text-gray-500" />
              <span>Alerts</span>
            </Link>
          </div>

          {/* Highlights Section */}
          <div className="flex flex-col">
            <div className={sectionHeadingClass}>Trending & Offers</div>
            <Link to="/trending" onClick={onClose} className={navItemClass}>
              <Flame size={22} className="text-orange-500" />
              <span>Best Sellers</span>
            </Link>
            <Link to="/offers" onClick={onClose} className={navItemClass}>
              <Percent size={22} className="text-emerald-600" />
              <span>Deals & Clearance</span>
            </Link>
          </div>

          {/* Shop By Category Section */}
          <div className="flex flex-col">
            <div className={sectionHeadingClass}>Shop Department</div>
            <ul className="flex flex-col">
              {categories.map((cat) => {
                const hasSub =
                  Array.isArray(cat.subcategories) &&
                  cat.subcategories.length > 0;

                return (
                  <li key={cat._id}>
                    {hasSub ? (
                      <button
                        onClick={() => setActiveCategory(cat._id)}
                        className="flex items-center justify-between w-full text-left transition-colors hover:bg-gray-50 active:bg-gray-100 border-b border-gray-50"
                      >
                        <div className="flex items-center gap-4 px-6 py-4 text-[16px] font-medium text-gray-800">
                          <span>{cat.name}</span>
                        </div>
                        <ChevronRight
                          size={20}
                          className="text-gray-400 mr-6"
                        />
                      </button>
                    ) : (
                      <Link
                        to={`/category/${cat.slug}`}
                        onClick={onClose}
                        className={navItemClass}
                      >
                        {cat.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Help & Settings Section */}
          <div className="flex flex-col">
            <div className={sectionHeadingClass}>Help & Settings</div>
            <Link to="/account" onClick={onClose} className={navItemClass}>
              <User size={20} className="text-gray-400" />
              <span>Your Profile</span>
            </Link>
            <Link to="/support" onClick={onClose} className={navItemClass}>
              <HelpCircle size={20} className="text-gray-400" />
              <span>Customer Service</span>
            </Link>
          </div>
        </nav>
      )}

      {/* SUBCATEGORY LEVEL */}
      {activeCategory && (
        <div className="flex flex-col flex-1 overflow-hidden bg-white">
          {(() => {
            const activeCatObj = categories.find(
              (c) => c._id === activeCategory,
            );
            if (!activeCatObj) return null;

            return (
              <div className="flex flex-col h-full">
                {/* Dynamic Back Header */}
                <button
                  onClick={() => setActiveCategory(null)}
                  className="w-full flex items-center gap-3 px-6 py-4 bg-gray-50 border-b border-gray-100 text-[16px] font-bold text-gray-800 transition-colors hover:bg-gray-100 shrink-0"
                >
                  <ChevronLeft size={22} className="text-gray-600" />
                  <span>Main Menu</span>
                </button>

                {/* Subcategories Scrolling Area */}
                <div className="flex-1 overflow-y-auto pb-10">
                  <div className="px-6 pt-5 pb-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {activeCatObj.name}
                  </div>

                  <ul className="flex flex-col">
                    {/* Primary "See All" Option */}
                    <li>
                      <Link
                        to={`/category/${activeCatObj.slug}`}
                        onClick={onClose}
                        className="flex items-center px-6 py-4 text-[16px] font-semibold text-sky-600 border-b border-gray-100 hover:bg-sky-50/30"
                      >
                        See All {activeCatObj.name}
                      </Link>
                    </li>

                    {/* Subcategories */}
                    {activeCatObj.subcategories?.map((sub) => (
                      <li key={sub._id}>
                        <Link
                          to={`/category/${activeCatObj.slug}/sub/${sub.slug}`}
                          onClick={onClose}
                          className={subcategoryItemClass}
                        >
                          <span>{sub.name}</span>
                          <ChevronRight size={16} className="text-gray-300" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
