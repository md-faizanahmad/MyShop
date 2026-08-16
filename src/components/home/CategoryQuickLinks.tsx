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
  if (loading) {
    return (
      <section className="w-full py-8 lg:py-16 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 mb-8 animate-pulse">
            <div className="h-3 w-24 rounded-full bg-slate-200" />
            <div className="h-8 w-48 rounded-md bg-slate-200" />
          </div>
          {/* Mobile: 2 cols, Desktop: 3 cols */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`w-full min-h-[180px] sm:min-h-60 lg:min-h-[280px] rounded-3xl bg-slate-200 animate-pulse col-span-1 ${
                  i === 0 || i === 3 ? "md:col-span-2" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const list = categories.slice(0, 4);

  return (
    <section className="w-full py-4 lg:py-4 ">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-18">
        <div className="mb-8 space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block">
            Collections
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Shop by Category
          </h2>
        </div>

        {/* Mobile: 2 cols, Desktop: 3 cols */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-3">
          {list.map((cat, index) => {
            // isWide now specifically means "is wide on desktop"
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
                className={`w-full h-full min-h-40 sm:min-h-[180px] lg:min-h-[195px] col-span-1 ${
                  isWide ? "md:col-span-2" : ""
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
                    rounded-[1px] md:rounded-sm
                    p-4 sm:p-6 md:p-8
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    hover:shadow-slate-300/50
                    ${
                      isHighlighted
                        ? "bg-linear-to-br from-sky-600 to-white text-white"
                        : "bg-white  text-slate-900 hover:bg-sky-50/50"
                    }
                  `}
                >
                  {/* Text Container: 90% width on mobile, responsive on desktop */}
                  <div
                    className={`relative z-10 flex flex-col h-full ${isWide ? "w-[90%] md:w-[55%]" : "w-[90%] md:w-[85%]"}`}
                  >
                    <h3
                      className={`text-lg sm:text-xl md:text-2xl font-bold leading-tight mb-1 sm:mb-2 ${
                        isHighlighted ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {cat.name}
                    </h3>

                    {/* Hide description completely on mobile to keep the 2x2 grid clean */}
                    <p
                      className={`text-xs md:text-sm mb-6 line-clamp-2 hidden md:[display:-webkit-box] ${
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
                          px-3 py-1.5 md:px-4 md:py-2
                          text-[10px] md:text-xs
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

                  {/* Image Container: Small on mobile, responsive on desktop */}
                  <div
                    className={`absolute right-0 bottom-0 pointer-events-none p-2 sm:p-4 ${
                      isWide
                        ? "h-[62%] w-[75%] md:h-[88%] md:w-[48%]"
                        : "h-[62%] w-[75%] md:h-[72%] md:w-[65%]"
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
