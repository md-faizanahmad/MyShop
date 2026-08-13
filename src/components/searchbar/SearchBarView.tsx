// // src/components/search/SearchBarView.tsx
// import React, { useEffect, useRef, type KeyboardEvent } from "react";
// import { Search, X, Loader2 } from "lucide-react";
// import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
// import type { ProductSearchResult } from "../../types/search";

// interface Props {
//   query: string;
//   setQuery: (v: string) => void;
//   results: ProductSearchResult[];
//   loading: boolean;
//   error: string | null;
//   onClear: () => void;
//   onSubmit: () => void;
//   onSelect: (item: ProductSearchResult) => void;
//   onClose: () => void;
//   openerRef?: React.RefObject<HTMLElement | null>; // <-- nullable
// }

// export default function SearchBarView({
//   query,
//   setQuery,
//   results,
//   loading,
//   error,
//   onClear,
//   onSubmit,
//   onSelect,
//   onClose,
//   openerRef,
// }: Props) {
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const listRef = useRef<HTMLDivElement | null>(null);
//   const shouldReduceMotion = useReducedMotion();

//   useEffect(() => {
//     inputRef.current?.focus();

//     const openerNode = openerRef?.current ?? null;

//     return () => {
//       try {
//         openerNode?.focus?.();
//       } catch {
//         // noop
//       }
//     };
//   }, [openerRef]);

//   const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Escape") {
//       e.preventDefault();
//       onClose();
//     } else if (e.key === "Enter") {
//       e.preventDefault();
//       onSubmit();
//     }
//   };

//   const handleImgError = (
//     ev: React.SyntheticEvent<HTMLImageElement, Event>,
//   ) => {
//     ev.currentTarget.src = "/images/placeholder-64.png";
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ y: -12, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: -12, opacity: 0 }}
//           transition={{
//             type: "spring",
//             damping: 25,
//             stiffness: 300,
//             duration: shouldReduceMotion ? 0 : 0.22,
//           }}
//           onClick={(e) => e.stopPropagation()}
//           className="absolute top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-3xl"
//           role="dialog"
//           aria-modal="true"
//           aria-label="Search"
//         >
//           <form
//             onSubmit={(ev) => {
//               ev.preventDefault();
//               onSubmit();
//             }}
//             className="relative"
//           >
//             <div className="flex items-center gap-3 px-5 py-3 bg-slate-100 border border-slate-200 rounded-3xl shadow">
//               {loading ? (
//                 <Loader2
//                   size={20}
//                   className="text-slate-500 shrink-0 animate-spin"
//                 />
//               ) : (
//                 <Search size={18} className="text-slate-600 shrink-0" />
//               )}

//               <input
//                 ref={inputRef}
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 onKeyDown={onKeyDown}
//                 placeholder="Search for products..."
//                 aria-label="Search products"
//                 className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 text-base md:text-lg focus:outline-none"
//                 autoComplete="off"
//                 type="search"
//               />

//               {query ? (
//                 <button
//                   type="button"
//                   onClick={onClear}
//                   aria-label="Clear search"
//                   className="p-2 rounded-full hover:bg-slate-200 transition"
//                 >
//                   <X size={18} />
//                 </button>
//               ) : null}

//               <button
//                 type="button"
//                 onClick={onClose}
//                 aria-label="Close search"
//                 className="p-2 rounded-full hover:bg-slate-200 transition"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//           </form>

//           <AnimatePresence>
//             {(loading || results.length > 0 || query) && (
//               <motion.div
//                 initial={{ opacity: 0, y: -6 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -6 }}
//                 transition={{ duration: shouldReduceMotion ? 0 : 0.14 }}
//                 className="bg-white rounded-b-3xl shadow-2xl border border-t-0 border-gray-200 overflow-hidden mt-2"
//                 ref={listRef}
//                 role="list"
//                 aria-label="Search results"
//                 style={{ maxHeight: 48 * 6 + 24, overflowY: "auto" }}
//               >
//                 {loading ? (
//                   <div className="p-8 text-center">
//                     <Loader2 className="mx-auto animate-spin" size={36} />
//                   </div>
//                 ) : error ? (
//                   <div className="p-6 text-center text-red-600">{error}</div>
//                 ) : results.length > 0 ? (
//                   <>
//                     {results.map((p) => (
//                       <button
//                         key={p._id}
//                         onClick={() => onSelect(p)}
//                         data-id={p._id}
//                         role="listitem"
//                         className="w-full text-left flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition"
//                       >
//                         <img
//                           src={p.imageUrl}
//                           alt={p.name}
//                           onError={handleImgError}
//                           loading="lazy"
//                           className="w-14 h-14 rounded-lg object-cover border border-gray-200 shrink-0"
//                         />
//                         <div className="min-w-0">
//                           <div className="font-semibold text-gray-900 truncate">
//                             {p.name}
//                           </div>
//                           <div className="text-sm font-semibold text-purple-600">
//                             ₹{p.price.toLocaleString()}
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                     <div className="p-3 text-center border-t bg-gray-50">
//                       <button
//                         onClick={() => {
//                           onSubmit();
//                         }}
//                         className="text-purple-600 font-semibold hover:underline"
//                       >
//                         View all results
//                       </button>
//                     </div>
//                   </>
//                 ) : query ? (
//                   <div className="p-8 text-center text-gray-500">
//                     <Search size={48} className="mx-auto mb-3 opacity-30" />
//                     <div className="text-base">
//                       No results for{" "}
//                       <span className="font-semibold">"{query}"</span>
//                     </div>
//                   </div>
//                 ) : null}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }
/////////////////////////////////14082026
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

  return (
    <AnimatePresence>
      {/* 
        Overlay Container: 
        Uses flex + items-start + top padding to keep the search bar anchored.
        Increased z-index to 100 to ensure it sits above all navbars.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-100 flex items-start justify-center bg-slate-900/60 p-4 pt-16 backdrop-blur-sm md:p-6 md:pt-24 lg:pt-32"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
            duration: shouldReduceMotion ? 0 : 0.22,
          }}
          onClick={(e) => e.stopPropagation()}
          className="flex w-full max-w-3xl flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          {/* Search Input Form */}
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              onSubmit();
            }}
            className="relative"
          >
            <div className="flex items-center gap-2 md:gap-3 rounded-2xl md:rounded-3xl border border-slate-200 bg-white px-4 md:px-5 py-3 md:py-3.5 shadow-lg">
              {loading ? (
                <Loader2
                  size={20}
                  className="shrink-0 animate-spin text-slate-500"
                />
              ) : (
                <Search size={20} className="shrink-0 text-slate-400" />
              )}

              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search for products..."
                aria-label="Search products"
                className="flex-1 bg-transparent text-base md:text-lg text-slate-900 placeholder-slate-400 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
                autoComplete="off"
                type="search"
              />

              {query && (
                <button
                  type="button"
                  onClick={onClear}
                  aria-label="Clear search"
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors md:p-2"
                >
                  <X size={18} />
                </button>
              )}

              {/* Added a subtle divider between clear and close for better UI structure */}
              <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors md:p-2"
              >
                <X size={20} />
              </button>
            </div>
          </form>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {(loading || results.length > 0 || query) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
                className="mt-2 md:mt-3 overflow-hidden rounded-2xl md:rounded-3xl border border-slate-200 bg-white shadow-2xl"
                ref={listRef}
                role="list"
                aria-label="Search results"
                style={{ maxHeight: "65vh", overflowY: "auto" }}
              >
                {loading ? (
                  <div className="p-8 text-center">
                    <Loader2
                      className="mx-auto animate-spin text-slate-400"
                      size={32}
                    />
                  </div>
                ) : error ? (
                  <div className="p-6 text-center text-sm font-medium text-red-500">
                    {error}
                  </div>
                ) : results.length > 0 ? (
                  <>
                    <div className="py-2">
                      {results.map((p) => (
                        <button
                          key={p._id}
                          onClick={() => onSelect(p)}
                          data-id={p._id}
                          role="listitem"
                          className="flex w-full items-center gap-4 px-4 md:px-5 py-3 text-left transition hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
                        >
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            onError={handleImgError}
                            loading="lazy"
                            className="h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-xl border border-slate-100 object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm md:text-base font-semibold text-slate-900">
                              {p.name}
                            </div>
                            <div className="text-xs md:text-sm font-bold text-sky-600 mt-0.5">
                              ₹{p.price.toLocaleString("en-IN")}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-slate-100 bg-slate-50 p-3 text-center">
                      <button
                        onClick={() => onSubmit()}
                        className="text-xs md:text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors hover:underline underline-offset-2"
                      >
                        View all results
                      </button>
                    </div>
                  </>
                ) : query ? (
                  <div className="p-10 text-center text-slate-500">
                    <Search size={40} className="mx-auto mb-4 opacity-20" />
                    <div className="text-sm md:text-base">
                      No results found for{" "}
                      <span className="font-bold text-slate-700">
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
