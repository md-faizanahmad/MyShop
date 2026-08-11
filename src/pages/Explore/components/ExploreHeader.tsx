import { useState } from "react";
import { Search } from "lucide-react";
import SearchBarContainer from "../../../components/searchbar/SearchBarContainer";

export default function ExploreHeader() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="mx-auto w-full max-w-7xl px-4 pt-5 sm:px-6">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-400">
            Discover
          </p>

          <h1 className="mt-1 text-[21px] font-semibold leading-tight tracking-tight text-neutral-950">
            Explore
          </h1>

          <p className="mt-1 text-[13px] leading-5 text-neutral-500">
            Discover categories and find something you’ll love.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          aria-label="Search products"
          className="
            mt-4
            flex
            h-11
            w-full
            items-center
            gap-3
            rounded-xl
            border
            border-neutral-200
            bg-neutral-50
            px-3.5
            text-left
            transition-colors
            active:bg-neutral-100
            focus:outline-none
            focus-visible:border-red-500
            focus-visible:ring-2
            focus-visible:ring-red-500/20
          "
        >
          <Search
            size={18}
            strokeWidth={1.8}
            className="shrink-0 text-neutral-400"
            aria-hidden="true"
          />

          <span className="truncate text-[13px] text-neutral-400">
            Search products...
          </span>
        </button>
      </header>

      {searchOpen && (
        <SearchBarContainer onClose={() => setSearchOpen(false)} />
      )}
    </>
  );
}
