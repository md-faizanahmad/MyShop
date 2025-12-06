import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;

const CATEGORY_PLACEHOLDER_IMAGE =
  "https://res.cloudinary.com/daqb5wglu/image/upload/v1765033486/category_placeholder_lxynt2.png";

// ---------- Types ----------

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string | null;
  // backend may send more fields, we don't care here (TS is structural)
}

interface CategoriesResponse {
  categories: Category[];
}

interface ErrorResponse {
  message?: string;
}

interface CategorySnapshotSectionProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  onCategoryClick?: (category: Category) => void;
}

export default function CategorySnapshotSection({
  title = "Shop by Category",
  subtitle = "Quickly explore our top categories",
  limit = 6,
  onCategoryClick,
}: CategorySnapshotSectionProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get<CategoriesResponse>(
          `${API_URL}/v1/categories?withSubs=true`
        );

        if (!isMounted) return;

        const list = res.data.categories ?? [];
        // just in case backend returns more than needed
        const sliced = list.slice(0, limit);

        setCategories(sliced);
      } catch (err: unknown) {
        const axiosErr = err as AxiosError<ErrorResponse>;
        const message =
          axiosErr.response?.data?.message ?? "Failed to load categories.";

        if (isMounted) setError(message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  const handleCategoryClick = (category: Category): void => {
    if (onCategoryClick) {
      onCategoryClick(category);
      return;
    }
    // default: you can swap this with navigate(`/category/${category.slug}`)
    console.log("Category clicked:", category);
  };

  const getImageSrc = (category: Category): string => {
    return category.image || CATEGORY_PLACEHOLDER_IMAGE;
  };

  return (
    <section className="w-full py-10">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Error */}
        {error && !loading && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: limit }, (_, i) => (
              <div
                key={i}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white/60 p-3 shadow-sm"
              >
                <div className="mb-2 aspect-square w-full animate-pulse rounded-xl bg-gray-100" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && categories.length === 0 && (
          <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
            No categories found.
          </div>
        )}

        {/* Category grid */}
        {!loading && !error && categories.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.map((cat) => (
              <button
                key={cat._id}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className="group flex flex-col rounded-2xl border border-gray-100 bg-white/80 p-3 text-left shadow-sm transition hover:-translate-y-1 hover:border-gray-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/5"
              >
                <div className="relative mb-2 aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
                  <img
                    src={getImageSrc(cat)}
                    alt={cat.name}
                    loading="lazy"
                    onError={(e): void => {
                      const img = e.currentTarget;
                      if (img.src !== CATEGORY_PLACEHOLDER_IMAGE) {
                        img.src = CATEGORY_PLACEHOLDER_IMAGE;
                      }
                    }}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>

                <span className="line-clamp-1 text-sm font-medium text-gray-900">
                  {cat.name}
                </span>

                <span className="mt-1 text-xs font-medium text-gray-700 group-hover:underline">
                  Explore {cat.name} →
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
