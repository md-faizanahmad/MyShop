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
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { HomeCategory } from "../../types/home";

interface Props {
  categories: HomeCategory[];
  loading: boolean;
  limit?: number;
}

export default function CategoryQuickLinks({
  categories,
  loading,
  limit = 6,
}: Props) {
  if (loading) {
    return (
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-4 w-40 bg-zinc-100 rounded-full mb-8 animate-pulse" />
          <div className="flex gap-4 overflow-hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: limit }).map((_, i) => (
              <div
                key={i}
                className="shrink-0 w-32 sm:w-auto aspect-4/5 rounded-3xl bg-zinc-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const list = categories.slice(0, limit);

  return (
    <section className="py-8 lg:py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">
              Collections
            </h2>
            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Shop by Category
            </h3>
          </div>
        </div>

        {/* Categories Container: Scrollable on Mobile, Grid on Desktop */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {list.map((cat, index) => (
            <motion.div
              key={cat._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="shrink-0 w-36 sm:w-auto"
            >
              <Link
                to={`/category/${cat.slug}`}
                className="group relative block aspect-4/5 overflow-hidden rounded-4xl bg-zinc-100"
              >
                {/* Image Component */}
                <img
                  src={cat.image ?? ""}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={cat.name}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                {/* Text Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <p className="text-white font-bold text-sm sm:text-base leading-tight mb-1">
                    {cat.name}
                  </p>
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <span className="h-px w-0 group-hover:w-4 bg-blue-400 transition-all duration-300" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-blue-400 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Explore
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
