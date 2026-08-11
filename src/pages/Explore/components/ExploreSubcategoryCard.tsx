import { Link } from "react-router-dom";
import type { Subcategory } from "../../../types/nav";

interface ExploreSubcategoryCardProps {
  categorySlug: string;
  subcategory: Subcategory;
}

export default function ExploreSubcategoryCard({
  categorySlug,
  subcategory,
}: ExploreSubcategoryCardProps) {
  return (
    <Link
      to={`/category/${categorySlug}/sub/${subcategory.slug}`}
      aria-label={`Explore ${subcategory.name}`}
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-neutral-100
        bg-white
        transition-transform
        duration-200
        active:scale-[0.98]
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-red-500
        focus-visible:ring-offset-2
      "
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-50">
        {subcategory.image ? (
          <img
            src={subcategory.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              ease-out
              group-hover:scale-105
            "
          />
        ) : (
          <div className="h-full w-full bg-neutral-100" aria-hidden="true" />
        )}
      </div>

      <div className="px-3 py-3">
        <h3 className="truncate text-sm font-medium tracking-tight text-neutral-900">
          {subcategory.name}
        </h3>

        <p className="mt-0.5 text-xs text-neutral-400">View products</p>
      </div>
    </Link>
  );
}
