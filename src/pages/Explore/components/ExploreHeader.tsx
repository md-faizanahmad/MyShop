import { Search } from "lucide-react";

export default function ExploreHeader() {
  return (
    <header className="mx-auto w-full max-w-7xl px-4 pt-5 sm:px-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
          Discover
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950">
          Explore
        </h1>

        <p className="mt-1 text-sm leading-5 text-neutral-500">
          Discover categories and find something you’ll love.
        </p>
      </div>

      <div className="mt-5">
        <div
          role="search"
          className="
            flex h-11 items-center gap-3
            rounded-xl
            border border-neutral-200
            bg-neutral-50
            px-4
            text-neutral-400
            transition-colors
            focus-within:border-neutral-300
            focus-within:bg-white
          "
        >
          <Search
            size={18}
            strokeWidth={1.8}
            className="shrink-0"
            aria-hidden="true"
          />

          <span className="text-sm">Search categories &amp; subcategories</span>
        </div>
      </div>
    </header>
  );
}
