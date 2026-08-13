// import { Link } from "react-router-dom";
// import type { HomeCategory } from "../../types/home";

// interface Props {
//   categories: HomeCategory[];
//   loading: boolean;
//   limit?: number;
// }

// export default function CategoryQuickLinks({
//   categories,
//   loading,
//   limit = 6,
// }: Props) {
//   if (loading) {
//     return (
//       <section className="py-10">
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto px-4">
//           {Array.from({ length: limit }).map((_, i) => (
//             <div
//               key={i}
//               className="rounded-xl bg-gray-200 h-32 animate-pulse"
//             />
//           ))}
//         </div>
//       </section>
//     );
//   }

//   const list = categories.slice(0, limit);

//   return (
//     <section className="py-10">
//       <div className="mx-auto max-w-6xl px-4">
//         <h2 className="text-xl font-semibold tracking-tight sm:text-2xl mb-6">
//           Shop by Category
//         </h2>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//           {list.map((cat) => (
//             <Link
//               key={cat._id}
//               to={`/category/${cat.slug}`}
//               className="group flex flex-col rounded-2xl border bg-white p-3 shadow-sm hover:-translate-y-1 transition"
//             >
//               <div className="relative mb-2 aspect-square rounded-xl overflow-hidden bg-gray-100">
//                 <img
//                   src={cat.image ?? ""}
//                   className="w-full h-full object-cover"
//                   alt={cat.name}
//                 />
//               </div>

//               <span className="text-sm font-medium">{cat.name}</span>
//               <span className="text-xs text-gray-600">Explore →</span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

////////////////////////// Update 16-02-2026
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import type { HomeCategory } from "../../types/home";

// interface Props {
//   categories: HomeCategory[];
//   loading: boolean;
//   limit?: number;
// }

// export default function CategoryQuickLinks({
//   categories,
//   loading,
//   limit = 6,
// }: Props) {
//   if (loading) {
//     return (
//       <section className="py-8 lg:py-12">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="h-4 w-40  rounded-full mb-8 animate-pulse" />
//           <div className="flex gap-4 overflow-hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
//             {Array.from({ length: limit }).map((_, i) => (
//               <div
//                 key={i}
//                 className="shrink-0 w-32 sm:w-auto aspect-4/5 rounded-3xl bg-zinc-100 animate-pulse"
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const list = categories.slice(0, limit);

//   return (
//     <section className="py-8 lg:py-12  overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Header Section */}
//         <div className="flex items-end justify-between mb-8">
//           <div className="space-y-1">
//             <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-sky-600">
//               Collections
//             </h2>
//             <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">
//               Shop by Category
//             </h3>
//           </div>
//         </div>

//         {/* Categories Container: Scrollable on Mobile, Grid on Desktop */}
//         <div className="flex items-center gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
//           {list.map((cat, index) => (
//             <motion.div
//               key={cat._id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.05 }}
//               className="shrink-0 w-36 sm:w-auto"
//             >
//               <Link
//                 to={`/category/${cat.slug}`}
//                 className="group relative block aspect-4/5 overflow-hidden rounded-4xl bg-zinc-100"
//               >
//                 {/* Image Component */}
//                 <img
//                   src={cat.image ?? ""}
//                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   alt={cat.name}
//                 />

//                 {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

//                 {/* Text Content Overlay */}
//                 <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
//                   <p className="text-white font-bold text-sm sm:text-base leading-tight mb-1">
//                     {cat.name}
//                   </p>
//                   <div className="flex items-center gap-1.5 overflow-hidden">
//                     <span className="h-px w-0 group-hover:w-4 bg-sky-400 transition-all duration-300" />
//                     <span className="text-[10px] uppercase font-black tracking-widest text-blue-400 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
//                       Explore
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
///////////////////////////////////////////////17072026
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import type { HomeCategory } from "../../types/home";

// interface Props {
//   categories: HomeCategory[];
//   loading: boolean;
//   limit?: number;
// }

// export default function CategoryQuickLinks({
//   categories,
//   loading,
//   limit = 6,
// }: Props) {
//   // Loading State
//   if (loading) {
//     return (
//       <section className="w-full py-10 lg:py-16 bg-white ">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="space-y-2 mb-8 animate-pulse">
//             <div className="h-3 w-24 rounded bg-zinc-200  tracking-widest" />
//             <div className="h-7 w-48 rounded bg-zinc-200 " />
//           </div>

//           {/* Mirrors the layout grid exactly */}
//           <div className="grid grid-cols-2 gap-3 xs:gap-4 sm:grid-cols-3 lg:grid-cols-6">
//             {Array.from({ length: limit }).map((_, i) => (
//               <div
//                 key={i}
//                 className="w-full aspect-4/5 xs:aspect-[3/4] rounded-2xl bg-zinc-100  animate-pulse"
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const list = categories.slice(0, limit);

//   return (
//     <section className="w-full py-10 lg:py-16 bg-white ">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Header Section */}
//         <div className="mb-8 space-y-1.5">
//           <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-600  block">
//             Collections
//           </span>
//           <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 ">
//             Shop by Category
//           </h2>
//         </div>

//         {/* Pure Grid Layout — No scrolling under any circumstances */}
//         <div className="grid grid-cols-2 gap-3 xs:gap-4 sm:grid-cols-3 lg:grid-cols-6">
//           {list.map((cat, index) => (
//             <motion.div
//               key={cat._id}
//               initial={{ opacity: 0, y: 12 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-20px" }}
//               transition={{
//                 duration: 0.4,
//                 delay: index * 0.03,
//                 ease: [0.215, 0.61, 0.355, 1.0],
//               }}
//               className="w-full"
//             >
//               <Link
//                 to={`/category/${cat.slug}`}
//                 className="group relative block aspect-4/5 xs:aspect-[3/4] w-full overflow-hidden rounded-2xl bg-zinc-100  isolation-isolate"
//               >
//                 {/* Image asset component */}
//                 <img
//                   src={
//                     cat.image ||
//                     "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
//                   }
//                   className="absolute inset-0 h-full w-full object-cover transform-gpu transition-transform duration-700 ease-out group-hover:scale-105"
//                   alt={cat.name}
//                   loading="lazy"
//                 />

//                 {/* Deep premium overlay protecting text readability */}
//                 <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-black/0 opacity-90 transition-opacity duration-300 group-hover:opacity-95" />

//                 {/* Content Overlay */}
//                 <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-3.5 xs:p-5 text-left transform-gpu">
//                   <p className="text-xs xs:text-sm sm:text-base font-semibold text-white tracking-wide leading-tight mb-1">
//                     {cat.name}
//                   </p>

//                   {/* Exploded interaction element */}
//                   <div className="flex items-center gap-1.5 h-4 overflow-hidden opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 transform-gpu translate-y-0.5 sm:translate-y-2 group-hover:translate-y-0">
//                     <span className="text-[8px] xs:text-[9px] uppercase font-bold tracking-widest text-sky-400">
//                       Explore
//                     </span>
//                     <svg
//                       className="w-2 h-2 xs:w-2.5 xs:h-2.5 text-sky-400 stroke-[2.5px] transform-gpu transition-transform duration-300 group-hover:translate-x-0.5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
//////////////////////////////////03082026
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { HomeCategory } from "../../types/home";

interface Props {
  categories: HomeCategory[];
  loading: boolean;
  limit?: number;
}

export default function CategoryQuickLinks({ categories, loading }: Props) {
  // Loading State matches the new strict 2x2 layout
  if (loading) {
    return (
      <section className="w-full py-8 lg:py-16 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 mb-8 animate-pulse">
            <div className="h-3 w-24 rounded-full bg-slate-200" />
            <div className="h-8 w-48 rounded-md bg-slate-200" />
          </div>
          {/* Strictly 3 columns to force the 2x2 bento wrap */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`w-full min-h-60 lg:min-h-[280px] rounded-3xl bg-slate-200 animate-pulse ${
                  i === 0 || i === 3 ? "md:col-span-2" : "md:col-span-1"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Ensure we only ever show exactly 4 items for this layout
  const list = categories.slice(0, 4);

  return (
    <section className="w-full py-8 lg:py-16 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block">
            Collections
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Shop by Category
          </h2>
        </div>

        {/* Strictly 3 columns to force the 2x2 bento wrap */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {list.map((cat, index) => {
            // Index 0 & 3 span 2 columns. Index 1 & 2 span 1 column.
            // This creates the perfect Checkerboard: [Wide][Small] over [Small][Wide]
            const isWide = index === 0 || index === 3;
            const isHighlighted = index === 0;

            return (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className={`w-full h-full min-h-60 lg:min-h-[280px] ${
                  isWide ? "md:col-span-2" : "md:col-span-1"
                }`}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className={`
                    group
                    relative
                    flex
                    h-full
                    w-full
                    flex-col
                    overflow-hidden
                    rounded-3xl
                    p-6 md:p-8
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    hover:shadow-slate-200/50
                    ${
                      isHighlighted
                        ? "bg-linear-to-br from-sky-600 to-white text-white"
                        : "bg-white text-slate-900 border border-slate-100"
                    }
                  `}
                >
                  {/* Content Container - Adjusted widths so text isn't hidden */}
                  <div
                    className={`relative z-10 flex flex-col h-full ${isWide ? "w-[55%]" : "w-[85%]"}`}
                  >
                    <h3
                      className={`text-xl md:text-2xl font-bold leading-tight mb-2 ${
                        isHighlighted ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {cat.name}
                    </h3>

                    <p
                      className={`text-xs md:text-sm mb-6 line-clamp-2 ${
                        isHighlighted ? "text-white/90" : "text-slate-500"
                      }`}
                    >
                      Explore the latest in {cat.name.toLowerCase()} technology
                      and accessories.
                    </p>

                    <div className="mt-auto items-start flex">
                      <span
                        className={`
                          inline-flex
                          items-center
                          justify-center
                          rounded-full
                          px-4 py-2
                          text-xs
                          font-bold
                          transition-transform
                          duration-300
                          group-hover:scale-105
                          ${
                            isHighlighted
                              ? "bg-white text-sky-600 shadow-sm"
                              : "bg-slate-50 text-slate-900 border border-slate-200"
                          }
                        `}
                      >
                        Shop Now
                      </span>
                    </div>
                  </div>

                  {/* Absolute Positioned Image - Smaller height on small boxes to prevent overlap */}
                  <div
                    className={`absolute right-0 bottom-0 pointer-events-none p-4 ${
                      isWide ? "h-full w-[45%] md:w-[50%]" : "h-[60%] w-[70%]"
                    }`}
                  >
                    <img
                      src={
                        cat.image ||
                        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                      }
                      alt={cat.name}
                      loading="lazy"
                      className={`
                        h-full
                        w-full
                        object-contain
                        object-bottom
                        md:object-bottom-right
                        transform-gpu
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:scale-110
                        ${isHighlighted ? "translate-x-2 translate-y-2" : ""}
                      `}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
