import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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

const cardClass =
  "flex h-full flex-col bg-white border border-slate-200/80 shadow-sm";

const mobileCardClass = "absolute inset-0 rounded-2xl p-4";

const desktopCardClass =
  "rounded-xl p-4 transition-[border-color,box-shadow] duration-300 hover:border-slate-300 hover:shadow-md";

const imageWrapClass =
  "relative flex w-full items-center justify-center overflow-hidden border border-slate-100 bg-slate-50/70";

const mobileImageClass = "my-3 aspect-[4/3] rounded-xl p-5";

const desktopImageClass = "my-4 aspect-[4/3] rounded-lg p-6";

const productImageClass =
  "max-h-full max-w-full object-contain pointer-events-none";

const titleClass =
  "line-clamp-1 text-[15px] font-semibold tracking-tight text-slate-900";

const descriptionClass = "mt-1 text-[11px] font-medium text-slate-500";

const shopButtonClass =
  "mt-3 inline-flex h-11 w-full items-center justify-between rounded-lg bg-slate-900 px-4 text-xs font-semibold text-white transition-colors duration-200 hover:bg-blue-600 active:bg-blue-700";

export default function FeaturedCollectionCard({
  product,
  config,
  index = 0,
  mobile = false,
}: FeaturedCardProps) {
  const cardClasses = mobile
    ? `${cardClass} ${mobileCardClass}`
    : `${cardClass} ${desktopCardClass}`;

  const imageClasses = mobile
    ? `${imageWrapClass} ${mobileImageClass}`
    : `${imageWrapClass} ${desktopImageClass}`;

  return (
    <motion.div
      {...(!mobile && {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: {
          delay: index * 0.06,
          duration: 0.3,
        },
      })}
      className={cardClasses}
    >
      {/* Top */}
      <div className="flex items-center justify-between gap-3">
        <CategoryBadge
          icon={config.icon}
          name={product.category.name}
          className={config.badgeClass}
        />

        <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">
          In Stock
        </span>
      </div>

      {/* Product Image */}
      <div className={imageClasses}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`${productImageClass} ${
            !mobile
              ? "transition-transform duration-500 group-hover:scale-105"
              : ""
          }`}
        />
      </div>

      {/* Product Info */}
      <div className="mt-auto">
        <h3 className={titleClass}>{product.name}</h3>

        <p className={descriptionClass}>
          {mobile
            ? "Explore this collection"
            : "Quality tech at competitive prices"}
        </p>

        <Link
          to={`/category/${product.category.slug}/product/${product.slug}`}
          className={shopButtonClass}
        >
          <span>Shop {product.category.name}</span>

          <ArrowRight
            size={15}
            className={
              !mobile
                ? "transition-transform duration-200 group-hover:translate-x-1"
                : ""
            }
          />
        </Link>
      </div>
    </motion.div>
  );
}
