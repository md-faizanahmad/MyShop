// components/ProductFilters.tsx
import { useState } from "react";
import { Filter, X, ChevronDown, SlidersHorizontal } from "lucide-react";

interface Filters {
  priceRange: [number, number];
  categories: string[];
  brands: string[];
  rating: number; // 0 means no filter, otherwise 1-4
  sortBy: "latest" | "price-low" | "price-high" | "popular" | "discount";
}

const sortOptions: { value: Filters["sortBy"]; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
  { value: "discount", label: "Biggest Discount" },
];

const CATEGORIES = [
  "T-Shirts",
  "Shirts",
  "Jeans",
  "Jackets",
  "Shoes",
  "Accessories",
] as const;
const BRANDS = ["Nike", "Adidas", "Zara", "H&M", "Levi's", "Puma"] as const;

interface ProductFiltersProps {
  onFilterChange?: (filters: Filters) => void;
  onSortChange?: (sort: Filters["sortBy"]) => void;
  totalProducts?: number;
}

export default function ProductFilters({
  onFilterChange,
  onSortChange,
  totalProducts = 1240,
}: ProductFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 5000],
    categories: [],
    brands: [],
    rating: 0,
    sortBy: "latest",
  });

  const activeFilterCount =
    filters.categories.length +
    filters.brands.length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000 ? 1 : 0);

  const applyFilters = () => {
    onFilterChange?.(filters);
    setIsFilterOpen(false);
  };

  const clearAll = () => {
    const cleared: Filters = {
      priceRange: [0, 5000],
      categories: [],
      brands: [],
      rating: 0,
      sortBy: "latest",
    };
    setFilters(cleared);
    onFilterChange?.(cleared);
  };

  return (
    <>
      {/* Mobile: Top Filter & Sort Bar */}
      <div className="md:hidden sticky top-0 z-50 bg-white border-b">
        <div className="flex items-center justify-between p-4 gap-3">
          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 border rounded-lg text-sm font-medium hover:bg-gray-50 transition"
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex-1">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="w-full flex items-center justify-center gap-2 py-3 border rounded-lg text-sm font-medium hover:bg-gray-50 transition"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Sort
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sortOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setSortOpen(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-xl z-20">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          sortBy: option.value,
                        }));
                        onSortChange?.(option.value);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition ${
                        filters.sortBy === option.value
                          ? "bg-gray-100 font-medium"
                          : ""
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Desktop: Header + Sidebar */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            All Products ({totalProducts.toLocaleString()})
          </h2>

          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-3 px-5 py-3 border rounded-lg text-sm font-medium hover:bg-gray-50 transition"
            >
              Sort by:{" "}
              <span className="font-semibold">
                {sortOptions.find((o) => o.value === filters.sortBy)?.label}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sortOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setSortOpen(false)}
                />
                <div className="absolute top-full right-0 mt-2 bg-white border rounded-lg shadow-xl w-64 z-20">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          sortBy: option.value,
                        }));
                        onSortChange?.(option.value);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition ${
                        filters.sortBy === option.value
                          ? "bg-gray-100 font-medium"
                          : ""
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="w-72 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Filters</h3>
              <button
                onClick={clearAll}
                className="text-sm text-blue-600 hover:underline"
              >
                Clear all
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onApply={() => onFilterChange?.(filters)}
            />
          </aside>

          <div className="flex-1">{/* Your product grid goes here */}</div>
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white md:hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-bold">Filters</h3>
            <div className="flex items-center gap-4">
              <button onClick={clearAll} className="text-sm text-blue-600">
                Clear all
              </button>
              <button onClick={() => setIsFilterOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Apply Button */}
          <div className="p-4 border-t">
            <button
              onClick={applyFilters}
              className="w-full bg-black text-white py-4 rounded-lg font-medium text-lg hover:bg-gray-900 transition"
            >
              Show Results
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Reusable Filter Sidebar (mobile + desktop)
function FilterSidebar({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onApply?: () => void;
}) {
  return (
    <div className="space-y-8">
      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-4">Price Range</h4>
        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          value={filters.priceRange[1]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              priceRange: [prev.priceRange[0], Number(e.target.value)] as [
                number,
                number
              ],
            }))
          }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
        />
        <div className="flex justify-between mt-3 text-sm text-gray-600">
          <span>₹{filters.priceRange[0].toLocaleString()}</span>
          <span>₹{filters.priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-semibold mb-4">Category</h4>
        <div className="space-y-3">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    categories: e.target.checked
                      ? [...prev.categories, cat]
                      : prev.categories.filter((c) => c !== cat),
                  }));
                }}
                className="w-5 h-5 text-black rounded border-gray-300 focus:ring-2 focus:ring-black"
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="font-semibold mb-4">Brands</h4>
        <div className="space-y-3">
          {BRANDS.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    brands: e.target.checked
                      ? [...prev.brands, brand]
                      : prev.brands.filter((b) => b !== brand),
                  }));
                }}
                className="w-5 h-5 text-black rounded border-gray-300 focus:ring-2 focus:ring-black"
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-semibold mb-4">Minimum Rating</h4>
        <div className="flex flex-wrap gap-2">
          {[4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  rating: prev.rating === star ? 0 : star,
                }))
              }
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                filters.rating === star
                  ? "bg-black text-white border-black"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }`}
            >
              {star} Stars & Up
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
