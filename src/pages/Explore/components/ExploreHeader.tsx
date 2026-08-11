import { useState } from "react";
import { Search, LayoutGrid } from "lucide-react";
import SearchBarContainer from "../../../components/searchbar/SearchBarContainer";

export default function ExploreHeader() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-white px-4 pt-4 pb-2 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Header Title */}
          <h4 className="text-xl font-extrabold tracking-tight text-neutral-900 sm:text-2xl">
            Explore Categories
          </h4>

          {/* Search & Grid Filter Row */}
          <div className="mt-3.5 flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search categories"
              className="
                flex 
                h-12 
                flex-1 
                items-center 
                gap-2.5 
                rounded-2xl 
                bg-neutral-100/90 
                px-4 
                text-left 
                transition-colors 
                active:bg-neutral-200/70 
                focus:outline-none 
                focus-visible:ring-2 
                focus-visible:ring-neutral-900
              "
            >
              <Search
                size={20}
                strokeWidth={2}
                className="shrink-0 text-neutral-400"
                aria-hidden="true"
              />
              <span className="truncate text-sm font-normal text-neutral-400">
                Search categories
              </span>
            </button>

            {/* Category / Filter Button */}
            <button
              type="button"
              aria-label="Filter or switch category view"
              className="
                flex 
                h-12 
                w-12 
                shrink-0 
                items-center 
                justify-center 
                rounded-2xl 
                bg-neutral-100/90 
                text-neutral-800 
                transition-colors 
                active:bg-neutral-200/70 
                focus:outline-none 
                focus-visible:ring-2 
                focus-visible:ring-neutral-900
              "
            >
              <LayoutGrid size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {searchOpen && (
        <SearchBarContainer onClose={() => setSearchOpen(false)} />
      )}
    </>
  );
}
