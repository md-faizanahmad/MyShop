import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import NavbarLinkSkeleton from "../../../skeleton/NavbarLinkSkeleton";
import type { DesktopNavbarProps } from "../../../types/nav";

export default function DesktopNavbar({
  categories,
  isLoading,
}: DesktopNavbarProps) {
  const location = useLocation();
  const [hoverCategory, setHoverCategory] = useState<string | null>(null);

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  if (isLoading) {
    return <NavbarLinkSkeleton count={categories?.length || 6} />;
  }

  return (
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
  );
}
