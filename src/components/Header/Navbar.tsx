///////////// update design and sub-c
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import NavbarLinkSkeleton from "../../skeleton/NavbarLinkSkeleton";

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

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["public-categories-with-subs"],
    queryFn: async () => {
      const res = await axios.get<{ categories: Category[] }>(
        `${API_URL}/v1/categories?withSubs=true`,
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
      {isLoading ? (
        <NavbarLinkSkeleton count={categories?.length || 6} />
      ) : (
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
                  <Link
                    to={`/category/${cat.slug}`}
                    className={`flex items-center gap-1 text-gray-800 hover:text-blue-600 ${
                      isActive(`/category/${cat.slug}`)
                        ? "text-blue-600 font-semibold"
                        : ""
                    }`}
                  >
                    {cat.name}
                    <ChevronDown size={14} className="opacity-70" />
                  </Link>
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
                          to={`/category/${cat.slug}/sub/${sub.slug}`}
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
      )}

      {/* MOBILE */}
      {mobile && (
        <div className="flex flex-col h-full">
          {/* ROOT LEVEL */}
          {!activeCategory && (
            <nav className="flex flex-col px-4 py-3">
              {/* Home */}
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center py-3 text-[16px] font-semibold text-gray-900 rounded-lg hover:bg-gray-50"
              >
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
                          className="flex items-center py-3 text-[15px] font-medium text-gray-800 rounded-lg hover:bg-gray-50"
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
                            className="flex items-center py-3 text-[15px] font-medium text-gray-700 rounded-lg hover:bg-gray-50"
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
      )}
    </nav>
  );
}
