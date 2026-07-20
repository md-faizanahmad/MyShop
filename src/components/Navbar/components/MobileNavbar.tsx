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
import { ChevronRight, ArrowLeft, X } from "lucide-react";
import type { MobileNavbarProps } from "../../../types/nav";

interface EnhancedMobileNavbarProps extends MobileNavbarProps {
  user?: {
    name: string;
    avatarUrl?: string;
  } | null;
}

export default function MobileNavbar({
  categories,
  onClose,
  user = null,
}: EnhancedMobileNavbarProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-screen w-screen bg-white fixed inset-0 z-50 overflow-hidden antialiased text-neutral-900 selection:bg-neutral-100">
      {/* BRAND ARCHITECTURE HEADER */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-neutral-100 shrink-0">
        {user ? (
          <Link
            to="/account"
            onClick={onClose}
            className="flex items-center gap-2.5 group"
          >
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt=""
                className="w-7 h-7 rounded-full object-cover bg-neutral-100"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-semibold tracking-wider uppercase">
                {user.name.charAt(0)}
              </div>
            )}
            <span className="text-[14px] font-medium tracking-tight text-neutral-800 group-active:text-neutral-500">
              {user.name}
            </span>
          </Link>
        ) : (
          <div className="flex items-center gap-4 text-[14px] font-medium tracking-tight">
            <Link
              to="/login"
              onClick={onClose}
              className="text-neutral-900 hover:underline"
            >
              Log in
            </Link>
            <span className="text-neutral-300">/</span>
            <Link
              to="/register"
              onClick={onClose}
              className="text-neutral-500 hover:underline"
            >
              Register
            </Link>
          </div>
        )}

        <button
          onClick={onClose}
          className="p-2 -mr-2 text-neutral-400 hover:text-neutral-900 transition-colors active:scale-95"
          aria-label="Close menu"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* ROOT MENU STATE */}
      {!activeCategory && (
        <nav className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col justify-between pb-8">
          {/* Main Department/Category Links */}
          <div className="flex flex-col pt-2">
            <ul className="divide-y divide-neutral-50/60">
              {categories.map((cat) => {
                const hasSub =
                  Array.isArray(cat.subcategories) &&
                  cat.subcategories.length > 0;

                return (
                  <li key={cat._id} className="w-full">
                    {hasSub ? (
                      <button
                        onClick={() => setActiveCategory(cat._id)}
                        className="flex items-center justify-between w-full px-5 py-4.5 text-left transition-all active:bg-neutral-50 text-[16px] font-medium tracking-tight text-neutral-900"
                      >
                        <span>{cat.name}</span>
                        <ChevronRight
                          size={16}
                          strokeWidth={1.5}
                          className="text-neutral-400"
                        />
                      </button>
                    ) : (
                      <Link
                        to={`/category/${cat.slug}`}
                        onClick={onClose}
                        className="flex items-center w-full px-5 py-4.5 text-[16px] font-medium tracking-tight text-neutral-900 active:bg-neutral-50"
                      >
                        {cat.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Core Retail Actions & Secondary Utilities Stacked at Bottom */}
          <div className="mt-auto pt-10 border-t border-neutral-100/60">
            {/* Promo / High-Priority Links */}
            <div className="px-5 mb-6 flex flex-col gap-3">
              <Link
                to="/sale"
                onClick={onClose}
                className="flex items-center justify-between px-4 py-3 bg-red-50 rounded-md text-red-700 font-semibold text-[14px] tracking-tight active:opacity-90"
              >
                <span>Mid-Season Sale</span>
                <span className="text-[11px] uppercase bg-red-600 text-white px-1.5 py-0.5 rounded tracking-widest font-bold">
                  Up to 50%
                </span>
              </Link>
            </div>

            {/* Micro Utility Links */}
            <ul className="px-5 space-y-3.5 text-[13px] font-medium text-neutral-500">
              <li>
                <Link
                  to="/orders"
                  onClick={onClose}
                  className="hover:text-neutral-900 block active:underline"
                >
                  Track Orders & Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/stores"
                  onClick={onClose}
                  className="hover:text-neutral-900 block active:underline"
                >
                  Find a Store
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  onClick={onClose}
                  className="hover:text-neutral-900 block active:underline"
                >
                  Help & Customer Support
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}

      {/* SUB-LEVEL DRILL DOWN */}
      {activeCategory && (
        <div className="flex flex-col flex-1 overflow-hidden bg-white">
          {(() => {
            const activeCatObj = categories.find(
              (c) => c._id === activeCategory,
            );
            if (!activeCatObj) return null;

            return (
              <div className="flex flex-col h-full">
                {/* Back Button Bar */}
                <button
                  onClick={() => setActiveCategory(null)}
                  className="w-full flex items-center gap-2 px-5 h-12 bg-neutral-50/50 border-b border-neutral-100/80 text-[13px] font-semibold text-neutral-600 transition-colors active:bg-neutral-100 shrink-0 uppercase tracking-wider"
                >
                  <ArrowLeft size={14} strokeWidth={2} />
                  <span>Back to categories</span>
                </button>

                {/* Sub-navigation List */}
                <div className="flex-1 overflow-y-auto pb-12">
                  <div className="px-5 pt-6 pb-3 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                    {activeCatObj.name}
                  </div>

                  <ul className="divide-y divide-neutral-50/60">
                    <li>
                      <Link
                        to={`/category/${activeCatObj.slug}`}
                        onClick={onClose}
                        className="flex items-center w-full px-5 py-4 text-[15px] font-semibold text-neutral-900 bg-neutral-50/30 hover:underline"
                      >
                        View All
                      </Link>
                    </li>

                    {activeCatObj.subcategories?.map((sub) => (
                      <li key={sub._id}>
                        <Link
                          to={`/category/${activeCatObj.slug}/sub/${sub.slug}`}
                          onClick={onClose}
                          className="flex items-center justify-between w-full px-5 py-4 text-[15px] text-neutral-700 active:bg-neutral-50 transition-colors"
                        >
                          <span>{sub.name}</span>
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
