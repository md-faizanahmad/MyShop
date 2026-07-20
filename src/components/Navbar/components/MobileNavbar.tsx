import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Home,
  ShoppingBag,
  User,
  HelpCircle,
  Flame,
  Percent,
} from "lucide-react";
import type { MobileNavbarProps } from "../../../types/nav";

const sectionHeadingClass =
  "px-4 pt-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider";

const navItemClass =
  "flex items-center gap-3 px-4 py-3 text-[15px] font-medium text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100";

const subcategoryItemClass =
  "flex items-center px-4 py-3 text-[15px] text-gray-600 transition-colors hover:bg-gray-50 active:bg-gray-100";

export default function MobileNavbar({
  categories,
  onClose,
}: MobileNavbarProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* ROOT LEVEL */}
      {!activeCategory && (
        <nav className="flex flex-col flex-1 overflow-y-auto pb-6">
          {/* Quick Core Links */}
          <div className="flex flex-col border-b border-gray-100 py-2">
            <Link to="/" onClick={onClose} className={navItemClass}>
              <Home size={20} className="text-gray-400" />
              <span>Home</span>
            </Link>
            <Link to="/shop" onClick={onClose} className={navItemClass}>
              <ShoppingBag size={20} className="text-gray-400" />
              <span>Shop All Products</span>
            </Link>
          </div>

          {/* Trending Section */}
          <div className="flex flex-col border-b border-gray-100 py-2">
            <div className={sectionHeadingClass}>Trending</div>
            <Link to="/trending" onClick={onClose} className={navItemClass}>
              <Flame size={20} className="text-orange-500" />
              <span>Best Sellers</span>
            </Link>
            <Link to="/offers" onClick={onClose} className={navItemClass}>
              <Percent size={20} className="text-red-500" />
              <span>Deals & Offers</span>
            </Link>
          </div>

          {/* Shop By Category Section */}
          <div className="flex flex-col border-b border-gray-100 py-2">
            <div className={sectionHeadingClass}>Shop By Category</div>
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
                        className="flex items-center justify-between w-full text-left transition-colors hover:bg-gray-50 active:bg-gray-100"
                      >
                        <div className={navItemClass}>
                          <span>{cat.name}</span>
                        </div>
                        <ChevronRight
                          size={18}
                          className="text-gray-400 mr-4"
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

          {/* Account & Support Section */}
          <div className="flex flex-col py-2">
            <div className={sectionHeadingClass}>Help & Settings</div>
            <Link to="/account" onClick={onClose} className={navItemClass}>
              <User size={20} className="text-gray-400" />
              <span>My Account</span>
            </Link>
            <Link to="/support" onClick={onClose} className={navItemClass}>
              <HelpCircle size={20} className="text-gray-400" />
              <span>Customer Support</span>
            </Link>
          </div>
        </nav>
      )}

      {/* SUBCATEGORY LEVEL */}
      {activeCategory && (
        <div className="flex flex-col h-full bg-white">
          {(() => {
            const activeCatObj = categories.find(
              (c) => c._id === activeCategory,
            );
            if (!activeCatObj) return null;

            return (
              <div className="flex flex-col flex-1 overflow-y-auto">
                {/* Back Header */}
                <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b border-gray-100 flex items-center">
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="flex items-center gap-2 text-[15px] font-semibold text-gray-800"
                  >
                    <ChevronLeft size={20} className="text-gray-600" />
                    <span>Main Menu</span>
                  </button>
                </div>

                {/* All Products in Category Link */}
                <div className="flex flex-col py-2 border-b border-gray-100 bg-gray-50/50">
                  <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {activeCatObj.name}
                  </div>
                  <Link
                    to={`/category/${activeCatObj.slug}`}
                    onClick={onClose}
                    className="flex items-center px-4 py-3 text-[15px] font-medium text-sky-900 hover:underline"
                  >
                    See All {activeCatObj.name}
                  </Link>
                </div>

                {/* Subcategories */}
                <ul className="flex flex-col py-2">
                  {activeCatObj.subcategories?.map((sub) => (
                    <li key={sub._id}>
                      <Link
                        to={`/category/${activeCatObj.slug}/sub/${sub.slug}`}
                        onClick={onClose}
                        className={subcategoryItemClass}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
