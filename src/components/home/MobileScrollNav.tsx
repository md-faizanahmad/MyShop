import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string; // Adjust based on your actual API field name
}

export default function MobileCategoryScroll() {
  const location = useLocation();

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["horizontal-categories-images"],
    queryFn: async () => {
      const res = await axios.get("https://api.myazstore.shop/v1/categories");
      return res.data.categories ?? [];
    },
  });

  if (isLoading) {
    return (
      <div className="lg:hidden flex gap-6 px-4 py-4 overflow-hidden bg-white">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 flex-shrink-0"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full animate-pulse" />
            <div className="h-3 w-12 bg-gray-100 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="lg:hidden w-full  border-b border-gray-100 overflow-hidden">
      <div className="flex items-start gap-5 overflow-x-auto px-4 py-4 no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const isActive = location.pathname.includes(`/category/${cat.slug}`);

          return (
            <Link
              key={cat._id}
              to={`/category/${cat.slug}`}
              className="flex flex-col items-center gap-2 flex-shrink-0 transition-transform active:scale-90"
            >
              {/* Image Container */}
              <div
                className={`relative w-16 h-16 rounded-full p-0.5 border-2 transition-all ${
                  isActive ? "border-blue-600 p-[3px]" : "border-transparent"
                }`}
              >
                <div className="w-full h-full rounded-full bg-gray-50 overflow-hidden border border-gray-100">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-400">
                      {/* Fallback Icon or Initials */}
                      <span className="text-xs font-bold uppercase">
                        {cat.name.slice(0, 2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Label */}
              <span
                className={`text-[11px] font-bold text-center tracking-tight transition-colors ${
                  isActive ? "text-blue-600" : "text-gray-700"
                }`}
              >
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
