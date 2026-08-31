// src/components/search/SearchBarView.tsx
import React, { useEffect, useRef, type KeyboardEvent } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { ProductSearchResult } from "../../types/search";

interface Props {
  query: string;
  setQuery: (v: string) => void;
  results: ProductSearchResult[];
  loading: boolean;
  error: string | null;
  onClear: () => void;
  onSubmit: () => void;
  onSelect: (item: ProductSearchResult) => void;
  onClose: () => void;
  openerRef?: React.RefObject<HTMLElement | null>;
}

export default function SearchBarView({
  query,
  setQuery,
  results,
  loading,
  error,
  onClear,
  onSubmit,
  onSelect,
  onClose,
  openerRef,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Handle Focus & Prevent Background Scrolling
  useEffect(() => {
    // Lock background scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // Auto-focus input
    inputRef.current?.focus();
    const openerNode = openerRef?.current ?? null;

    return () => {
      // Restore background scroll and focus
      document.body.style.overflow = originalStyle;
      try {
        openerNode?.focus?.();
      } catch {
        // noop
      }
    };
  }, [openerRef]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleImgError = (
    ev: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    ev.currentTarget.src = "/images/placeholder-64.png";
  };

  // return (
  //   <AnimatePresence>
  //     {/*
  //       Overlay Container:
  //       Uses flex + items-start + top padding to keep the search bar anchored.
  //       Increased z-index to 100 to ensure it sits above all navbars.
  //     */}
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       exit={{ opacity: 0 }}
  //       className="fixed inset-0 z-100 flex items-start justify-center bg-slate-900/60 p-4 pt-16 backdrop-blur-sm md:p-6 md:pt-24 lg:pt-32"
  //       onClick={onClose}
  //     >
  //       <motion.div
  //         initial={{ y: -16, opacity: 0 }}
  //         animate={{ y: 0, opacity: 1 }}
  //         exit={{ y: -16, opacity: 0 }}
  //         transition={{
  //           type: "spring",
  //           damping: 25,
  //           stiffness: 300,
  //           duration: shouldReduceMotion ? 0 : 0.22,
  //         }}
  //         onClick={(e) => e.stopPropagation()}
  //         className="flex w-full max-w-3xl flex-col"
  //         role="dialog"
  //         aria-modal="true"
  //         aria-label="Search"
  //       >
  //         {/* Search Input Form */}
  //         <form
  //           onSubmit={(ev) => {
  //             ev.preventDefault();
  //             onSubmit();
  //           }}
  //           className="relative"
  //         >
  //           <div className="flex items-center gap-2 md:gap-3 rounded-2xl md:rounded-3xl border border-slate-200 bg-white px-4 md:px-5 py-3 md:py-3.5 shadow-lg">
  //             {loading ? (
  //               <Loader2
  //                 size={20}
  //                 className="shrink-0 animate-spin text-slate-500"
  //               />
  //             ) : (
  //               <Search size={20} className="shrink-0 text-slate-400" />
  //             )}

  //             <input
  //               ref={inputRef}
  //               value={query}
  //               onChange={(e) => setQuery(e.target.value)}
  //               onKeyDown={onKeyDown}
  //               placeholder="Search for products..."
  //               aria-label="Search products"
  //               className="flex-1 bg-transparent text-base md:text-lg text-slate-900 placeholder-slate-400 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
  //               autoComplete="off"
  //               type="search"
  //             />

  //             {query && (
  //               <button
  //                 type="button"
  //                 onClick={onClear}
  //                 aria-label="Clear search"
  //                 className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors md:p-2"
  //               >
  //                 <X size={18} />
  //               </button>
  //             )}

  //             {/* Added a subtle divider between clear and close for better UI structure */}
  //             <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

  //             <button
  //               type="button"
  //               onClick={onClose}
  //               aria-label="Close search"
  //               className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors md:p-2"
  //             >
  //               <X size={20} />
  //             </button>
  //           </div>
  //         </form>

  //         {/* Search Results Dropdown */}
  //         <AnimatePresence>
  //           {(loading || results.length > 0 || query) && (
  //             <motion.div
  //               initial={{ opacity: 0, y: -10 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               exit={{ opacity: 0, y: -10 }}
  //               transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
  //               className="mt-2 md:mt-3 overflow-hidden rounded-2xl md:rounded-3xl border border-slate-200 bg-white shadow-2xl"
  //               ref={listRef}
  //               role="list"
  //               aria-label="Search results"
  //               style={{ maxHeight: "65vh", overflowY: "auto" }}
  //             >
  //               {loading ? (
  //                 <div className="p-8 text-center">
  //                   <Loader2
  //                     className="mx-auto animate-spin text-slate-400"
  //                     size={32}
  //                   />
  //                 </div>
  //               ) : error ? (
  //                 <div className="p-6 text-center text-sm font-medium text-red-500">
  //                   {error}
  //                 </div>
  //               ) : results.length > 0 ? (
  //                 <>
  //                   <div className="py-2">
  //                     {results.map((p) => (
  //                       <button
  //                         key={p._id}
  //                         onClick={() => onSelect(p)}
  //                         data-id={p._id}
  //                         role="listitem"
  //                         className="flex w-full items-center gap-4 px-4 md:px-5 py-3 text-left transition hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
  //                       >
  //                         <img
  //                           src={p.imageUrl}
  //                           alt={p.name}
  //                           onError={handleImgError}
  //                           loading="lazy"
  //                           className="h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-xl border border-slate-100 object-cover"
  //                         />
  //                         <div className="min-w-0 flex-1">
  //                           <div className="truncate text-sm md:text-base font-semibold text-slate-900">
  //                             {p.name}
  //                           </div>
  //                           <div className="text-xs md:text-sm font-bold text-sky-600 mt-0.5">
  //                             ₹{p.price.toLocaleString("en-IN")}
  //                           </div>
  //                         </div>
  //                       </button>
  //                     ))}
  //                   </div>
  //                   <div className="border-t border-slate-100 bg-slate-50 p-3 text-center">
  //                     <button
  //                       onClick={() => onSubmit()}
  //                       className="text-xs md:text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors hover:underline underline-offset-2"
  //                     >
  //                       View all results
  //                     </button>
  //                   </div>
  //                 </>
  //               ) : query ? (
  //                 <div className="p-10 text-center text-slate-500">
  //                   <Search size={40} className="mx-auto mb-4 opacity-20" />
  //                   <div className="text-sm md:text-base">
  //                     No results found for{" "}
  //                     <span className="font-bold text-slate-700">
  //                       "{query}"
  //                     </span>
  //                   </div>
  //                 </div>
  //               ) : null}
  //             </motion.div>
  //           )}
  //         </AnimatePresence>
  //       </motion.div>
  //     </motion.div>
  //   </AnimatePresence>
  // );

  /////////////// Update refactor Design 31-08-2026
  return (
    <AnimatePresence>
      {/* SEARCH OVERLAY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-900/60 p-3 pt-14 backdrop-blur-sm sm:p-4 sm:pt-16 md:p-6 md:pt-24 lg:pt-28"
        onClick={onClose}
      >
        {/* SEARCH CONTAINER */}
        <motion.div
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            duration: shouldReduceMotion ? 0 : 0.2,
          }}
          onClick={(e) => e.stopPropagation()}
          className="flex w-full max-w-2xl flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          {/* SEARCH INPUT */}
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              onSubmit();
            }}
            className="relative"
          >
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-lg sm:gap-3 sm:px-4 sm:py-3">
              {loading ? (
                <Loader2
                  size={19}
                  className="shrink-0 animate-spin text-slate-500"
                />
              ) : (
                <Search size={19} className="shrink-0 text-slate-400" />
              )}

              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search for products..."
                aria-label="Search products"
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none sm:text-base [&::-webkit-search-cancel-button]:hidden"
                autoComplete="off"
                type="search"
              />

              {query && (
                <button
                  type="button"
                  onClick={onClear}
                  aria-label="Clear search"
                  className="shrink-0 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={17} />
                </button>
              )}

              <div className="hidden h-5 w-px bg-slate-200 sm:block" />

              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="shrink-0 rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={19} />
              </button>
            </div>
          </form>

          {/* SEARCH RESULTS */}
          <AnimatePresence>
            {(loading || results.length > 0 || query) && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.14,
                }}
                className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl sm:mt-2.5 sm:rounded-2xl"
                ref={listRef}
                role="list"
                aria-label="Search results"
                style={{
                  maxHeight: "65vh",
                  overflowY: "auto",
                }}
              >
                {/* LOADING */}
                {loading ? (
                  <div className="p-7 text-center">
                    <Loader2
                      className="mx-auto animate-spin text-slate-400"
                      size={28}
                    />
                  </div>
                ) : error ? (
                  /* ERROR */
                  <div className="p-5 text-center text-sm font-medium text-red-500">
                    {error}
                  </div>
                ) : results.length > 0 ? (
                  <>
                    {/* RESULTS */}
                    <div className="py-1.5">
                      {results.map((p) => (
                        <button
                          key={p._id}
                          onClick={() => onSelect(p)}
                          data-id={p._id}
                          role="listitem"
                          className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors hover:bg-slate-50 focus:bg-slate-50 focus:outline-none sm:gap-3.5 sm:px-4 sm:py-3"
                        >
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            onError={handleImgError}
                            loading="lazy"
                            className="h-11 w-11 shrink-0 rounded-lg border border-slate-100 object-cover sm:h-12 sm:w-12"
                          />

                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-medium text-slate-900">
                              {p.name}
                            </div>

                            <div className="mt-0.5 text-xs font-semibold text-sky-600">
                              ₹{p.price.toLocaleString("en-IN")}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* VIEW ALL */}
                    <div className="border-t border-slate-100 bg-slate-50 px-3 py-2.5 text-center">
                      <button
                        onClick={() => onSubmit()}
                        className="text-xs font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline hover:underline-offset-2 sm:text-sm"
                      >
                        View all results
                      </button>
                    </div>
                  </>
                ) : query ? (
                  /* NO RESULTS */
                  <div className="p-8 text-center text-slate-500 sm:p-10">
                    <Search size={34} className="mx-auto mb-3 opacity-20" />

                    <div className="text-sm">
                      No results found for{" "}
                      <span className="font-semibold text-slate-700">
                        "{query}"
                      </span>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
