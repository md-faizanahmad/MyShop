///////////////// update
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import CartIcon from "./CartIcon";
// import WishlistIcon from "./WishlistIcon";
import Brand from "../../shared/Brand";
import UserMenu from "./usermenu/UserMenu";
import SearchBarContainer from "../searchbar/SearchBarContainer";

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
        <div className="relative max-w-7xl mx-auto md:px-4 flex items-center h-16">
          {/* LEFT (Mobile): Menu + Search */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className=" px-4 hover:bg-sky-50 rounded-full"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="p-0 hover:bg-sky-50 rounded-full"
              aria-label="Search"
            >
              <Search className="text-gray-700" />
            </button>
          </div>

          {/* CENTER: Brand (perfect center on mobile) */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <Brand />
          </div>

          {/* DESKTOP NAVBAR */}
          <div className="hidden lg:block flex-1 max-w-3xl mx-8">
            <Navbar />
          </div>

          {/* RIGHT: Cart + User */}
          <div className="ml-auto flex items-center gap-4">
            {/* Desktop Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex  hover:bg-sky-50 rounded-full"
            >
              <Search className="text-gray-700" />
            </button>

            <CartIcon />
            <UserMenu />
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
              className="fixed inset-0  backdrop-blur-lg bg-sky-200 z-40 "
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="fixed top-0 left-0 h-full  w-52 bg-white z-50 shadow-2xl  flex flex-col"
            >
              <div className="flex h-16 items-center justify-between px-4 py-4 shadow-2xl ">
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
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <SearchBarContainer onClose={() => setSearchOpen(false)} />
        )}
      </AnimatePresence>

      <div className="h-16" />
    </>
  );
}
