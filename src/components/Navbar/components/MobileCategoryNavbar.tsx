import { Link } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";

export default function MobileCategoryNavbar() {
  const { data: categories = [], isLoading } = useCategories();

  const containerClasses = `
    border-b
    border-neutral-100
    bg-white
    lg:hidden
  `;

  const scrollWrapperClasses = `
    no-scrollbar
    flex
    gap-3
    overflow-x-auto
    px-4
    py-2.5
    sm:gap-4
    sm:px-5
  `;

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
              className="
                flex
                w-14
                shrink-0
                flex-col
                items-center
              "
            >
              <div
                className="
                  h-11
                  w-11
                  animate-pulse
                  rounded-full
                  border
                  border-neutral-100
                  bg-neutral-100
                "
              />

              <div
                className="
                  mt-1.5
                  h-2
                  w-9
                  animate-pulse
                  rounded-full
                  bg-neutral-100
                "
              />
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
            className="
              group
              flex
              w-14
              shrink-0
              flex-col
              items-center
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-500
              focus-visible:ring-offset-1
              sm:w-[60px]
            "
          >
            {/* Category image */}
            <div
              className="
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border
                border-neutral-200
                bg-neutral-50
                p-1
                transition-transform
                duration-200
                group-hover:-translate-y-0.5
                group-active:scale-95
                sm:h-12
                sm:w-12
              "
            >
              {category.image ? (
                <img
                  src={category.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="
                    h-full
                    w-full
                    rounded-full
                    object-contain
                    object-center
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />
              ) : (
                <div
                  className="h-full w-full rounded-full bg-neutral-100"
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Category name */}
            <span
              className="
                mt-1
                w-full
                truncate
                text-center
                text-[10px]
                font-medium
                leading-4
                text-neutral-600
                transition-colors
                group-hover:text-red-600
                sm:text-[11px]
              "
            >
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
