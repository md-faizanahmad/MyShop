// src/components/CategoryQuickLinks.tsx
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface Category {
  _id: string;
  name: string;
}

export default function CategoryQuickLinks() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["public-categories"], // SAME KEY as your Navbar → auto shared cache!
    queryFn: async () => {
      const res = await axios.get<{ categories: Category[] }>(
        `${API_URL}/api/categories`
      );
      return res.data.categories ?? [];
    },
  });

  return (
    <section className="py-16 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          Shop by Category
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-5">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-white border border-gray-200 rounded-2xl animate-pulse shadow-sm"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/category/${cat._id}`}
                className="group flex items-center justify-center px-6 py-8 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-3"
              >
                <span className="text-center font-semibold text-gray-800 group-hover:text-blue-600 transition-colors text-sm sm:text-base leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
