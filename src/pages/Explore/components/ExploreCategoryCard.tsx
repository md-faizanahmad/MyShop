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
        h-52
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
        <div className="absolute inset-0 bg-neutral-100" />
      )}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/65
          via-black/10
          to-transparent
        "
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {category.name}
          </h3>

          <p className="mt-0.5 text-xs text-white/75">Explore collection</p>
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
          "
        >
          <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
