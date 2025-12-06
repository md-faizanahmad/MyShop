import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import WishlistIcon from "./WishlistIcon";
import UserMenu from "./UserMenu";
import Brand from "../../shared/Brand";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  return (
    <>
      {/* FIXED HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg shadow-md border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Brand />

            {/* Desktop Navbar */}
            <div className="hidden lg:block flex-1 max-w-3xl mx-8">
              <Navbar />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-0">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-sky-50 rounded-full"
              >
                <Search size={22} className="text-gray-700" />
              </button>

              <div className="hidden md:flex gap-3">
                <WishlistIcon />
                <CartIcon />
              </div>

              {/* User Menu stays in header always */}
              <UserMenu />

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-sky-50 rounded-full"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl shadow-gray-300 flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-4 shadow-2xl shadow-gray-300">
                <Brand />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable nav only */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                {/* IMPORTANT: make Navbar flat vertical, no hover */}
                <Navbar mobile onClose={() => setMobileMenuOpen(false)} />
              </div>

              {/* Fixed bottom icons (keep your exact design/shadow) */}
              <div className="fixed bottom-0 w-72 bg-gray-300 items-center shadow-blue-900 shadow-2xl p-4 flex justify-around">
                <WishlistIcon />
                <CartIcon />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>

      <div className="h-16" />
    </>
  );
}
