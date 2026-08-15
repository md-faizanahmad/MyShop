import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import CategoryBadge from "./CategoryBadge";
import type { FeaturedProduct } from "../../../types/featureProducts";

interface FeaturedCardProps {
  product: FeaturedProduct;
  config: {
    icon: React.ReactNode;
    badgeClass: string;
  };
  index?: number;
  mobile?: boolean;
}

export default function FeaturedCollectionCard({
  product,
  config,
  index = 0,
  mobile = false,
}: FeaturedCardProps) {
  return (
    <article
      className="
        group flex h-full w-80 items-center flex-col
        overflow-hidden
        rounded-lg
        border border-zinc-200
        bg-white
        transition-shadow duration-200
        hover:shadow-sm
      "
    >
      {/* Product image */}
      <Link
        to={`/category/${product.category.slug}/product/${product.slug}`}
        aria-label={`Explore ${product.category.name} products`}
        className="
          relative block
          aspect-square
          overflow-hidden
          bg-zinc-50
        "
      >
        {/* Category */}
        <div className="absolute left-2 top-2 z-10">
          <CategoryBadge
            icon={config.icon}
            name={product.category.name}
            className={`border-0 ${config.badgeClass}`}
          />
        </div>

        <img
          src={product.imageUrl}
          alt={product.name}
          loading={mobile || index < 3 ? "eager" : "lazy"}
          decoding="async"
          className="
            block
            h-full w-full
            object-contain
            transition-transform
            duration-300
            ease-out
            group-hover:scale-[1.02]
          "
        />
      </Link>

      {/* Product information */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-3">
        <span className="text-[10px] font-medium text-zinc-400">
          {product.category.name}
        </span>

        <h3
          className="
            mt-0.5
            line-clamp-2
            text-xs
            font-semibold
            leading-4
            text-zinc-900
            sm:text-[13px]
          "
        >
          {product.name}
        </h3>

        {/* Explore */}
        <Link
          to={`/category/${product.category.slug}/product/${product.slug}`}
          className="
            mt-2
            flex min-h-8
            items-center justify-between
            gap-2
            border-t border-zinc-100
            pt-2
            text-[11px]
            font-semibold
            text-zinc-600
            transition-colors
            hover:text-red-600
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-red-500
            focus-visible:ring-offset-1
            sm:text-xs
          "
        >
          <span>Explore</span>

          <ArrowRight
            aria-hidden="true"
            className="
              size-3
              transition-transform
              duration-200
              group-hover:translate-x-0.5
            "
          />
        </Link>
      </div>
    </article>
  );
}
