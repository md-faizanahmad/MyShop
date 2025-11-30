import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface NavbarProps {
  onLinkClick?: () => void;
}

export default function Navbar({ onLinkClick }: NavbarProps) {
  const location = useLocation();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["public-categories"],
    queryFn: async () => {
      const res = await axios.get<{
        categories: { _id: string; name: string; slug: string }[];
      }>(`${API_URL}/api/categories`);

      return res.data.categories ?? [];
    },
  });

  const navItems = [
    { to: "/", label: "Home" },
    ...categories.map((cat) => ({
      to: `/category/${cat.slug}`, // ✔ FIXED — use slug
      label: cat.name,
    })),
  ];

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <nav className="w-full">
      <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
        <AnimatePresence mode="wait">
          {navItems.map((item) => (
            <motion.div
              key={item.to}
              layout
              className="relative"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <Link
                to={item.to}
                onClick={onLinkClick}
                className={`relative block px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive(item.to)
                    ? "text-white"
                    : "text-gray-700 hover:text-sky-600"
                }`}
              >
                {isActive(item.to) && (
                  <motion.div
                    layoutId="navbarActivePill"
                    className="absolute inset-0 bg-linear-to-r from-sky-500 to-blue-600 rounded-full shadow-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <span className="relative z-10">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </nav>
  );
}
