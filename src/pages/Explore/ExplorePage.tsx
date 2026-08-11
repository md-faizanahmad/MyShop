import type { Category } from "../../types/nav";

interface ExplorePageProps {
  categories: Category[];
  loading?: boolean;
}

export default function ExplorePage({
  categories,
  loading = false,
}: ExplorePageProps) {
  return (
    <main className="min-h-screen bg-white pb-20">
      <ExploreHeader />

      <section
        aria-labelledby="explore-categories-title"
        className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6"
      >
        <div className="mb-5">
          <h1
            id="explore-categories-title"
            className="text-xl font-semibold tracking-tight text-neutral-900"
          >
            Explore Categories
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            Discover products by category
          </p>
        </div>

        {loading ? (
          <div
            className="grid grid-cols-2 gap-3"
            aria-busy="true"
            aria-label="Loading categories"
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-48 animate-pulse rounded-2xl bg-neutral-100"
              />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="rounded-2xl border border-neutral-100 px-5 py-12 text-center">
            <p className="text-sm font-medium text-neutral-700">
              No categories available
            </p>

            <p className="mt-1 text-xs text-neutral-400">
              Please try again later.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map((category) => (
              <ExploreCategorySection key={category._id} category={category} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
