interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
  isSub: boolean;
  isDeleted: boolean;
}

interface DealsCategoriesProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function DealsCategories({
  categories,
  activeCategory,
  onCategoryChange,
}: DealsCategoriesProps) {
  const parentCategories = categories.filter(
    (category) => !category.isSub && !category.isDeleted,
  );

  return (
    <section className="mt-7 sm:mt-9">
      <h2 className="mb-3 text-base font-semibold tracking-tight text-zinc-900 sm:text-lg">
        Browse Deals
      </h2>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {/* All */}
        <button
          type="button"
          onClick={() => onCategoryChange("All Deals")}
          className={`shrink-0 whitespace-nowrap rounded-sm border px-3.5 py-2 text-xs font-medium transition sm:px-4 sm:text-sm ${
            activeCategory === "All Deals"
              ? "border-red-600 bg-red-600 text-white"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
          }`}
        >
          All Deals
        </button>

        {/* Categories */}
        {parentCategories.map((category) => (
          <button
            key={category._id}
            type="button"
            onClick={() => onCategoryChange(category.name)}
            className={`shrink-0 whitespace-nowrap rounded-sm border px-3.5 py-2 text-xs font-medium transition sm:px-4 sm:text-sm ${
              activeCategory === category.name
                ? "border-red-600 bg-red-600 text-white"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
}
