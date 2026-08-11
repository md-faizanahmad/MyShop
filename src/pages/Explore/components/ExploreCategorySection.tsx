import ExploreCategoryCard from "./ExploreCategoryCard";
import ExploreSubcategoryCard from "./ExploreSubcategoryCard";

import type { Category } from "../../types/category";

interface ExploreCategorySectionProps {
  category: Category;
}

export default function ExploreCategorySection({
  category,
}: ExploreCategorySectionProps) {
  const subcategories = category.subcategories ?? [];

  return (
    <section aria-labelledby={`category-${category._id}`}>
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h2
            id={`category-${category._id}`}
            className="text-base font-semibold tracking-tight text-neutral-900"
          >
            {category.name}
          </h2>

          {subcategories.length > 0 && (
            <p className="mt-0.5 text-xs text-neutral-400">
              Explore {subcategories.length}{" "}
              {subcategories.length === 1 ? "subcategory" : "subcategories"}
            </p>
          )}
        </div>
      </div>

      <ExploreCategoryCard category={category} />

      {subcategories.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3">
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
