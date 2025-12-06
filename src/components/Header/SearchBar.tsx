// // src/components/SearchBar.tsx
// import { useState, useRef, useEffect } from "react";
// import { Search, X, Loader2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const API = import.meta.env.VITE_API_URL;

// interface SearchResult {
//   _id: string;
//   name: string;
//   price: number;
//   imageUrl: string;
// }

// export default function SearchBar({ onClose }: { onClose: () => void }) {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<SearchResult[]>([]);
//   const [loading, setLoading] = useState(false);
//   const searchRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => inputRef.current?.focus(), []);

//   useEffect(() => {
//     const handleClick = (e: MouseEvent) => {
//       if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
//         onClose();
//       }
//     };
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, [onClose]);

//   // Debounced search
//   // src/components/SearchBar.tsx - Update the useEffect for debounced search
//   useEffect(() => {
//     if (!query.trim()) {
//       setResults([]);
//       return;
//     }

//     const timer = setTimeout(async () => {
//       setLoading(true);
//       try {
//         // ← CHANGE THIS LINE: Use /api/products instead of /api/products/search
//         const res = await axios.get(`${API}/api/products`, {
//           params: { q: query, limit: 6 }, // Your getProducts handles 'q' for category search
//         });
//         setResults(res.data.products || []);
//       } catch {
//         setResults([]);
//       } finally {
//         setLoading(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [query]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (query.trim()) {
//       window.location.href = `/search?q=${encodeURIComponent(query)}`;
//     }
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.25 }}
//         ref={searchRef}
//         className="fixed inset-x-0 top-16 sm:top-20 left-0 right-0 mx-auto w-full max-w-3xl z-50"
//       >
//         {/* Search Input - Full Width on Mobile */}
//         <form onSubmit={handleSubmit} className="relative">
//           <div className="flex items-center gap-3 px-4 py-4 bg-linear-to-r from-blue-600 to-sky-900 shadow-2xl rounded-t-2xl sm:rounded-2xl">
//             {/* Search Icon */}
//             <Search size={22} className="text-white shrink-0" />

//             {/* Input - Takes full width */}
//             <input
//               ref={inputRef}
//               type="text"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search products..."
//               className="flex-1 bg-transparent text-white placeholder-white/60 text-base sm:text-lg font-medium focus:outline-none"
//             />

//             {/* Clear Button */}
//             {query && (
//               <button
//                 type="button"
//                 onClick={() => setQuery("")}
//                 className="p-2 text-green-700 hover:text-white  rounded-lg transition"
//               >
//                 <X size={20} />
//               </button>
//             )}

//             {/* Close Button - Only on Mobile */}
//             <button
//               type="button"
//               onClick={onClose}
//               className="p-2 text-red-500 hover:text-white  rounded-lg transition sm:hidden"
//             >
//               <X size={22} />
//             </button>
//           </div>
//         </form>

//         {/* Results Dropdown */}
//         <AnimatePresence>
//           {(loading || results.length > 0 || query) && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="bg-white border-t border-gray-100 max-h-96 overflow-y-auto shadow-2xl rounded-b-2xl"
//             >
//               {loading ? (
//                 <div className="p-10 text-center">
//                   <Loader2
//                     className="mx-auto animate-spin text-blue-600"
//                     size={36}
//                   />
//                 </div>
//               ) : results.length > 0 ? (
//                 <>
//                   {results.map((p) => (
//                     <Link
//                       key={p._id}
//                       to={`/product/${p._id}`}
//                       onClick={onClose}
//                       className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition border-b border-gray-50 last:border-0"
//                     >
//                       <img
//                         src={p.imageUrl}
//                         alt={p.name}
//                         className="w-14 h-14 rounded-lg object-cover border"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <h4 className="font-medium text-gray-900 truncate">
//                           {p.name}
//                         </h4>
//                         <p className="text-lg font-bold text-blue-600">
//                           ₹{p.price.toLocaleString()}
//                         </p>
//                       </div>
//                     </Link>
//                   ))}
//                   <div className="p-4 text-center border-t">
//                     <Link
//                       to={`/search?q=${encodeURIComponent(query)}`}
//                       onClick={onClose}
//                       className="text-blue-600 font-semibold hover:underline"
//                     >
//                       View all results →
//                     </Link>
//                   </div>
//                 </>
//               ) : query ? (
//                 <div className="p-10 text-center text-gray-500">
//                   <Search size={48} className="mx-auto mb-3 opacity-30" />
//                   <p>No results for "{query}"</p>
//                 </div>
//               ) : null}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </AnimatePresence>
//   );
// }
//////////////////////////////////////////////// Design 2
// src/components/Header/SearchBar.tsx
import { useState, useRef, useEffect } from "react";
import { Search, X, Loader2, KeyboardIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

interface SearchResult {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: {
    slug: string;
  };
  slug: string;
}

export default function SearchBar({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => inputRef.current?.focus(), []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Debounced Search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/v1/products`, {
          params: { q: query, limit: 6 },
        });
        setResults(res.data.products || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          ref={searchRef}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-3xl"
        >
          {/* Search Input */}
          {/* <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center gap-4 px-6 py-5 backdrop-blur-sm bg-blue-700 shadow-2xl rounded-3xl">
              <Search size={26} className="text-white shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="flex-1  bg-transparent text-white placeholder-white/70 text-lg font-medium focus:outline-none"
              />
              {query && (
                // clear btn for search
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-2 hover:bg-white/20 rounded-full transition"
                >
                  <KeyboardIcon size={22} className="text-white " />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition"
              >
                <X size={26} className="text-white" />
              </button>
            </div>
          </form> */}

          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center gap-4 px-6 py-5 bg-slate-100 border border-slate-200 shadow-xl rounded-3xl">
              <Search size={26} className="text-slate-600 shrink-0" />

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 text-lg font-medium focus:outline-none"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-2 hover:bg-slate-200 rounded-full transition"
                >
                  <KeyboardIcon size={22} className="text-slate-600" />
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-full transition"
              >
                <X size={26} className="text-slate-700" />
              </button>
            </div>
          </form>

          {/* Results */}
          <AnimatePresence>
            {(loading || results.length > 0 || query) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-b-3xl shadow-2xl overflow-hidden border-x border-b border-gray-200"
              >
                {loading ? (
                  <div className="p-12 text-center">
                    <Loader2
                      className="mx-auto animate-spin text-blue-700"
                      size={40}
                    />
                  </div>
                ) : results.length > 0 ? (
                  <>
                    {results.map((p) => (
                      <Link
                        key={p._id}
                        to={`/category/${p.category.slug}/${p.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition"
                      >
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 line-clamp-1">
                            {p.name}
                          </h4>
                          <p className="text-xl font-bold text-purple-600">
                            ₹{p.price.toLocaleString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <div className="p-4 text-center border-t bg-gray-50">
                      <Link
                        to={`/search?q=${encodeURIComponent(query)}`}
                        onClick={onClose}
                        className="text-purple-600 font-bold hover:underline"
                      >
                        View all results
                      </Link>
                    </div>
                  </>
                ) : query ? (
                  <div className="p-12 text-center text-gray-500">
                    <Search size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="text-lg">
                      No products found for "
                      <span className="font-semibold">{query}</span>"
                    </p>
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
/////////////////////////////// Design 3
// // src/components/Header/SearchBar.tsx
// import { useState, useRef, useEffect } from "react";
// import { Search, X, Loader2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const API = import.meta.env.VITE_API_URL;

// interface SearchResult {
//   _id: string;
//   name: string;
//   price: number;
//   imageUrl: string;
// }

// export default function SearchBar({ onClose }: { onClose: () => void }) {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<SearchResult[]>([]);
//   const [loading, setLoading] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   // Close on Escape
//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
//     document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, [onClose]);

//   // Search
//   useEffect(() => {
//     if (!query.trim()) {
//       setResults([]);
//       return;
//     }

//     const timer = setTimeout(async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`${API}/api/products`, {
//           params: { q: query, limit: 6 },
//         });
//         setResults(res.data.products || []);
//       } catch {
//         setResults([]);
//       } finally {
//         setLoading(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [query]);

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 bg-black/50"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ y: -100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: -100, opacity: 0 }}
//           transition={{ type: "spring", damping: 30, stiffness: 400 }}
//           className="absolute top-0 left-0 right-0 bg-white shadow-2xl"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Search Input */}
//           <div className="flex items-center gap-3 px-4 py-4 border-b">
//             <Search className="w-6 h-6 text-gray-600" />
//             <input
//               ref={inputRef}
//               type="text"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search products..."
//               className="flex-1 text-lg font-medium outline-none"
//             />
//             {query && (
//               <button onClick={() => setQuery("")} className="p-1">
//                 <X className="w-5 h-5 text-gray-500" />
//               </button>
//             )}
//             <button onClick={onClose} className="text-gray-600 font-medium">
//               Cancel
//             </button>
//           </div>

//           {/* Results */}
//           {(loading || results.length > 0 || query) && (
//             <div className="max-h-96 overflow-y-auto">
//               {loading ? (
//                 <div className="p-8 text-center">
//                   <Loader2 className="mx-auto animate-spin text-blue-600" size={36} />
//                 </div>
//               ) : results.length > 0 ? (
//                 results.map((p) => (
//                   <Link
//                     key={p._id}
//                     to={`/product/${p._id}`}
//                     onClick={onClose}
//                     className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50 border-b"
//                   >
//                     <img
//                       src={p.imageUrl}
//                       alt={p.name}
//                       className="w-14 h-14 rounded-lg object-cover border"
//                     />
//                     <div>
//                       <h4 className="font-medium text-gray-900">{p.name}</h4>
//                       <p className="text-lg font-bold text-blue-600">₹{p.price}</p>
//                     </div>
//                   </Link>
//                 ))
//               ) : query ? (
//                 <div className="p-10 text-center text-gray-500">
//                   No results found for "<span className="font-medium">{query}</span>"
//                 </div>
//               ) : null}
//             </div>
//           )}
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }
