import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Category } from "../../../types/nav";

interface ExploreCategoryCardProps {
  category: Category;
}

export default function ExploreCategoryCard({
  category,
}: ExploreCategoryCardProps) {
  return (
    <Link
      to={`/category/${category.slug}`}
      aria-label={`Explore ${category.name}`}
      className="
        group
        relative
        block
        aspect-video
        overflow-hidden
        rounded-2xl
        bg-neutral-100
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-red-500
        focus-visible:ring-offset-2
      "
    >
      {category.image ? (
        <img
          src={category.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="
            absolute
            inset-0
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
        <div className="absolute inset-0 bg-neutral-100" aria-hidden="true" />
      )}

      <div
        className="
          absolute
          inset-0
          bg-linear-to-t
          from-black/70
          via-black/20
          to-transparent
        "
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold tracking-tight text-white">
            {category.name}
          </h3>

          <p className="mt-0.5 text-xs font-medium text-white/75">
            Explore collection
          </p>
        </div>

        <span
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-white/95
            text-neutral-900
            transition-transform
            duration-300
            group-hover:translate-x-0.5
            group-active:scale-95
          "
          aria-hidden="true"
        >
          <ArrowUpRight size={17} strokeWidth={1.8} />
        </span>
      </div>
    </Link>
  );
}
