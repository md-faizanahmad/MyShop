import { Link } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";

export default function MobileCategoryNavbar() {
  const { data: categories = [], isLoading } = useCategories();

  // Unified outer container styling to prevent layout shift during loading
  const containerClasses =
    "border-b border-neutral-200 bg-white lg:hidden mt-20";
  const scrollWrapperClasses =
    "no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-3";

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
              className="flex w-[76px] shrink-0 flex-col items-center"
            >
              <div className="h-[68px] w-[68px] animate-pulse rounded-full bg-neutral-200" />
              <div className="mt-2 h-3 w-14 animate-pulse rounded bg-neutral-200" />
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
            className="group flex w-[76px] shrink-0 snap-start flex-col items-center focus:outline-none"
          >
            <div className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-neutral-50 shadow-sm transition-transform duration-200 group-active:scale-95 group-focus-visible:ring-2 group-focus-visible:ring-neutral-900">
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full  object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <span className="mt-2 line-clamp-2 text-center text-[11px] font-medium leading-tight text-neutral-700">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
