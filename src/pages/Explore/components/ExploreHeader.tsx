import { Search } from "lucide-react";

export default function ExploreHeader() {
  return (
    <header className="mx-auto w-full max-w-7xl px-4 pt-5 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
            Discover
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950">
            Explore
          </h1>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex h-11 items-center gap-3 rounded-xl bg-neutral-100 px-4">
          <Search
            size={18}
            strokeWidth={1.8}
            className="shrink-0 text-neutral-400"
            aria-hidden="true"
          />

          <span className="text-sm text-neutral-400">
            Search categories & subcategories
          </span>
        </div>
      </div>
    </header>
  );
}
