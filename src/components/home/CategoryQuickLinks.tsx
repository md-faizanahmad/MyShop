import { Link } from "react-router-dom";
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
      <section className="py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto px-4">
          {Array.from({ length: limit }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-gray-200 h-32 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  const list = categories.slice(0, limit);

  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl mb-6">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {list.map((cat) => (
            <Link
              key={cat._id}
              to={`/category/${cat.slug}`}
              className="group flex flex-col rounded-2xl border bg-white p-3 shadow-sm hover:-translate-y-1 transition"
            >
              <div className="relative mb-2 aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={cat.image ?? ""}
                  className="w-full h-full object-cover"
                  alt={cat.name}
                />
              </div>

              <span className="text-sm font-medium">{cat.name}</span>
              <span className="text-xs text-gray-600">Explore →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
