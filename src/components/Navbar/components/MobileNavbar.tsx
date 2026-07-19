import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronLeft } from "lucide-react";
import type { MobileNavbarProps } from "../../../types/nav";

const mobileLinkClass =
  "flex items-center py-3 text-[15px] font-medium text-gray-800 rounded-lg hover:bg-gray-50";

const mobileHeaderLinkClass =
  "flex items-center py-3 text-[16px] font-semibold text-sky-900 rounded-lg hover:bg-gray-50";

const mobileSubLinkClass =
  "flex items-center py-3 text-[15px] font-medium text-red-500 rounded-lg hover:bg-gray-50";

export default function MobileNavbar({
  categories,
  onClose,
}: MobileNavbarProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full">
      {/* ROOT LEVEL */}
      {!activeCategory && (
        <nav className="flex flex-col px-4 py-3">
          {/* Home */}
          <Link to="/" onClick={onClose} className={mobileHeaderLinkClass}>
            Home
          </Link>

          <div className="my-2 border-t border-gray-100" />

          {/* Categories */}
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
                      className="flex items-center justify-between w-full py-3 text-[15px] font-medium text-gray-800 rounded-lg hover:bg-gray-50"
                    >
                      <span>{cat.name}</span>
                      <ChevronDown size={18} className="text-gray-400" />
                    </button>
                  ) : (
                    <Link
                      to={`/category/${cat.slug}`}
                      onClick={onClose}
                      className={mobileLinkClass}
                    >
                      {cat.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {/* SUBCATEGORY LEVEL */}
      {activeCategory && (
        <div className="flex flex-col h-full">
          {/* Back Header */}
          <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-100">
            <button
              onClick={() => setActiveCategory(null)}
              className="flex items-center gap-2 text-[15px] font-medium text-gray-700"
            >
              <ChevronLeft size={20} className="text-blue-600" />
              Categories
            </button>
          </div>

          {(() => {
            const activeCatObj = categories.find(
              (c) => c._id === activeCategory,
            );

            if (!activeCatObj) return null;

            return (
              <div className="flex flex-col px-4 py-3">
                {/* All Category */}
                <Link
                  to={`/category/${activeCatObj.slug}`}
                  onClick={onClose}
                  className="py-3 text-[15px] font-semibold text-gray-900 rounded-lg hover:bg-gray-50"
                >
                  All {activeCatObj.name}
                </Link>

                <div className="my-2 border-t border-gray-100" />

                {/* Subcategories */}
                <ul className="flex flex-col">
                  {activeCatObj.subcategories?.map((sub) => (
                    <li key={sub._id}>
                      <Link
                        to={`/category/${activeCatObj.slug}/sub/${sub.slug}`}
                        onClick={onClose}
                        className={mobileSubLinkClass}
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
