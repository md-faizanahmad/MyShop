import { Link } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";

export default function MobileCategoryNavbar() {
  const { data: categories = [], isLoading } = useCategories();

  // Outer container styling optimized for mobile
  const containerClasses =
    "border-b border-neutral-200/80 bg-white lg:hidden mt-12";
  const scrollWrapperClasses =
    "no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 py-3";

  if (isLoading) {
    return (
      <section
        className={containerClasses}
        aria-label="Category navigation loading"
      >
        <div className={scrollWrapperClasses}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex w-[60px] shrink-0 flex-col items-center"
            >
              <div className="h-[52px] w-[52px] animate-pulse rounded-full bg-slate-100 border border-slate-200/60 shadow-xs" />
              <div className="mt-1.5 h-2 w-10 animate-pulse rounded bg-slate-200/70" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  return (
    <section className={containerClasses} aria-label="Categories">
      <div className={scrollWrapperClasses}>
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category.slug}`}
            className="group flex w-[60px] shrink-0 snap-start flex-col items-center focus:outline-none"
          >
            {/* Small & Crisp Circle Badge */}
            <div className="relative flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full border border-slate-200/90 bg-slate-50 p-1.5 shadow-xs transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:border-blue-200 group-active:scale-95 group-focus-visible:ring-2 group-focus-visible:ring-blue-600">
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full rounded-full object-contain object-center transition-transform duration-300 ease-out group-hover:scale-110"
              />
            </div>

            {/* Compact Category Label */}
            <span className="mt-1 line-clamp-1 text-center text-[10px] font-semibold tracking-tight text-slate-700 group-hover:text-blue-600 transition-colors">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
