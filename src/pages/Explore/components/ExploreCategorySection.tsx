import type { Category } from "../../../types/nav";
import ExploreCategoryCard from "./ExploreCategoryCard";
import ExploreSubcategoryCard from "./ExploreSubcategoryCard";

interface ExploreCategorySectionProps {
  category: Category;
}

export default function ExploreCategorySection({
  category,
}: ExploreCategorySectionProps) {
  const subcategories = category.subcategories ?? [];

  return (
    <section
      aria-labelledby={`explore-category-${category._id}`}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <h2
          id={`explore-category-${category._id}`}
          className="text-base font-semibold tracking-tight text-neutral-900"
        >
          {category.name}
        </h2>

        {subcategories.length > 0 && (
          <span className="text-xs font-medium text-neutral-400">
            {subcategories.length}{" "}
            {subcategories.length === 1 ? "subcategory" : "subcategories"}
          </span>
        )}
      </div>

      <ExploreCategoryCard category={category} />

      {subcategories.length > 0 && (
        <div
          className="grid grid-cols-2 gap-3"
          aria-label={`${category.name} subcategories`}
        >
          {subcategories.map((subcategory) => (
            <ExploreSubcategoryCard
              key={subcategory._id}
              categorySlug={category.slug}
              subcategory={subcategory}
            />
          ))}
        </div>
      )}
    </section>
  );
}
