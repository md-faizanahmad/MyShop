// src/components/layout/Header.tsx
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

  return (
    <>
      {/* MAIN HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg shadow-lg border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* LEFT: Logo */}
            <div className="flex items-center">
              <Brand />
            </div>

            {/* CENTER: Desktop Navbar */}
            <div className="hidden lg:block flex-1 max-w-3xl mx-8">
              <Navbar />
            </div>

            {/* RIGHT: Icons + User */}
            <div className="flex items-center gap-3">
              {/* Search Icon */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 hover:bg-sky-50 rounded-full transition"
              >
                <Search size={22} className="text-gray-700" />
              </button>

              {/* Wishlist & Cart (Desktop) */}
              <div className="hidden md:flex items-center gap-3">
                <WishlistIcon />
                <CartIcon />
              </div>

              {/* User Menu (Desktop) */}
              <div className="hidden md:block">
                <UserMenu />
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 hover:bg-sky-50 rounded-full transition"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE BOTTOM BAR + MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-sky-200 shadow-2xl z-40"
            >
              {/* Mobile Navbar - Vertical */}
              <div className="py-4 px-6 space-y-3 bg-linear-to-b from-sky-50 to-white">
                <Navbar onLinkClick={() => setMobileMenuOpen(false)} />
              </div>

              {/* Mobile Bottom Icons */}
              <div className="flex justify-around items-center py-3 border-t border-sky-100">
                <WishlistIcon />
                <CartIcon />
                <UserMenu />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>

      {/* SPACER FOR FIXED HEADER */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
