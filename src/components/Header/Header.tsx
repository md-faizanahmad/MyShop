// ///////////////// update
// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Search, Menu, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import CartIcon from "./CartIcon";
// import UserMenu from "@/components/usermenu/UserMenu";
// import SearchBarContainer from "@/components/searchbar/SearchBarContainer";
// import Navbar from "@/components/Navbar/Navbar";
// import Brand from "@/shared/Brand";

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     setMobileMenuOpen(false);
//     setSearchOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
//   }, [mobileMenuOpen]);

//   return (
//     <>
//       {/* FIXED HEADER */}
//       <header
//         className="
//     fixed
//     inset-x-0
//     top-10
//     z-50
//     border-b
//     border-sky-100
//     bg-white/90
//     shadow-md
//     backdrop-blur-lg
//   "
//       >
//         <div className="relative max-w-7xl mx-auto md:px-4 flex items-center h-16">
//           {/* LEFT (Mobile): Menu + Search */}
//           <div className="flex items-center gap-1 lg:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(true)}
//               className=" px-4 hover:bg-sky-50 rounded-full"
//               aria-label="Open menu"
//             >
//               <Menu size={24} />
//             </button>

//             <button
//               onClick={() => setSearchOpen(true)}
//               className="p-0 hover:bg-sky-50 rounded-full"
//               aria-label="Search"
//             >
//               <Search className="text-gray-700" />
//             </button>
//           </div>

//           {/* CENTER: Brand (perfect center on mobile) */}
//           <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
//             <Brand />
//           </div>

//           {/* DESKTOP NAVBAR */}
//           <div className="hidden lg:block flex-1 max-w-3xl mx-8">
//             <Navbar />
//           </div>

//           {/* RIGHT: Cart + User */}
//           <div className="ml-auto flex items-center gap-4">
//             {/* Desktop Search */}
//             <button
//               onClick={() => setSearchOpen(true)}
//               className="hidden lg:flex  hover:bg-sky-50 rounded-full"
//             >
//               <Search className="text-gray-700" />
//             </button>

//             <div className="mr-4 md:mr-0">
//               <CartIcon />
//             </div>
//             <div className="hidden md:block">
//               <UserMenu />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* MOBILE SIDEBAR */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <>
//             {/* Overlay */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.5 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setMobileMenuOpen(false)}
//               className="fixed inset-0  backdrop-blur-lg bg-sky-200 z-40 "
//             />

//             {/* Sidebar */}
//             <motion.aside
//               initial={{ x: "-100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "-100%" }}
//               transition={{ type: "spring", stiffness: 120, damping: 18 }}
//               className="fixed top-0 left-0 h-full  w-52 bg-white z-50 shadow-2xl  flex flex-col"
//             >
//               <div className="flex h-16 items-center justify-between px-4 py-4 shadow-2xl ">
//                 <Brand />
//                 <button
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="p-2 hover:bg-gray-100 rounded-full"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               {/* Scrollable nav only */}
//               <div className="flex-1 overflow-y-auto px-4 py-6">
//                 {/* IMPORTANT: make Navbar flat vertical, no hover */}
//                 <Navbar mobile onClose={() => setMobileMenuOpen(false)} />
//               </div>

//               {/* Fixed bottom icons (keep your exact design/shadow) */}
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>

//       {/* SEARCH OVERLAY */}
//       <AnimatePresence>
//         {searchOpen && (
//           <SearchBarContainer onClose={() => setSearchOpen(false)} />
//         )}
//       </AnimatePresence>

//       {/* <div className="lg:h-16 md:h-16 h-0" /> */}
//       <div aria-hidden="true" className="h-26" />
//     </>
//   );
// }

//////////////////////15-08206
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

import CartIcon from "./CartIcon";
import UserMenu from "@/components/usermenu/UserMenu";
import SearchBarContainer from "@/components/searchbar/SearchBarContainer";
import Navbar from "@/components/Navbar/Navbar";
import Brand from "@/shared/Brand";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const location = useLocation();

  /* Close temporary header UI after navigation */
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  /* Prevent background scrolling while the mobile drawer is open */
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* =========================
          FIXED HEADER
      ========================== */}
      <header
        className="
          fixed inset-x-0 top-10 z-50
          border-b border-sky-100
          bg-white/90
          shadow-md
          backdrop-blur-lg
        "
      >
        <div className="relative mx-auto flex h-16 max-w-7xl items-center px-3 sm:px-4">
          {/* =========================
              MOBILE ACTIONS
          ========================== */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className="
                flex size-10 items-center justify-center
                rounded-full
                text-gray-700
                transition-colors
                hover:bg-sky-50
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-sky-500
              "
            >
              <Menu aria-hidden="true" className="size-5" />
            </button>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="
                flex size-10 items-center justify-center
                rounded-full
                text-gray-700
                transition-colors
                hover:bg-sky-50
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-sky-500
              "
            >
              <Search aria-hidden="true" className="size-5" />
            </button>
          </div>

          {/* =========================
              BRAND
          ========================== */}
          <div
            className="
              absolute left-1/2 -translate-x-1/2
              lg:static lg:translate-x-0
            "
          >
            <Brand />
          </div>

          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}
          <div className="mx-8 hidden max-w-3xl flex-1 lg:block">
            <Navbar />
          </div>

          {/* =========================
              RIGHT ACTIONS
          ========================== */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2 lg:gap-3">
            {/* Desktop search */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="
                hidden size-10 items-center justify-center
                rounded-full
                text-gray-700
                transition-colors
                hover:bg-sky-50
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-sky-500
                lg:flex
              "
            >
              <Search aria-hidden="true" className="size-5" />
            </button>

            <CartIcon />

            <div className="hidden md:flex">
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* =========================
          MOBILE SIDEBAR
      ========================== */}
      {/* =========================
    MOBILE SIDEBAR
========================= */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMobileMenu}
            className="
        fixed inset-0 z-40
        cursor-default
        border-0
        bg-sky-200/50
        p-0
        backdrop-blur-lg
      "
          />

          {/* Sidebar */}
          <aside
            aria-label="Mobile navigation"
            className="
        fixed inset-y-0 left-0 z-50
        flex w-52 flex-col
        bg-white shadow-2xl
      "
          >
            {/* Sidebar header */}
            <div
              className="
          flex h-16 shrink-0
          items-center justify-between
          px-4
          shadow-md
        "
            >
              <Brand />

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close navigation menu"
                className="
            flex size-10 items-center justify-center
            rounded-full
            text-gray-700
            transition-colors
            hover:bg-gray-100
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-sky-500
          "
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            {/* Scrollable navigation */}
            <nav
              aria-label="Mobile navigation links"
              className="
          flex-1
          overflow-y-auto
          overscroll-contain
          px-4 py-6
        "
            >
              <Navbar mobile onClose={closeMobileMenu} />
            </nav>
          </aside>
        </>
      )}
      {/* =========================
          SEARCH OVERLAY
      ========================== */}
      <AnimatePresence>
        {searchOpen && (
          <SearchBarContainer onClose={() => setSearchOpen(false)} />
        )}
      </AnimatePresence>

      {/* Fixed header offset */}
      <div aria-hidden="true" className="h-26" />
    </>
  );
}
