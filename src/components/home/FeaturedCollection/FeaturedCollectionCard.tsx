import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { clsx } from "clsx";

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

// Extracted styling for a clean, modern app-like UI
const baseCardClass =
  "group relative flex h-full flex-col overflow-hidden bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100";

const mobileCardClass = "rounded-2xl w-full";
const desktopCardClass =
  "rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)] hover:border-slate-200";

const imageContainerClass =
  "relative flex w-full items-center justify-center bg-slate-50 overflow-hidden";

const mobileImageClass = "aspect-square p-2";
const desktopImageClass = "aspect-[4/3] p-4";

export default function FeaturedCollectionCard({
  product,
  config,
  index = 0,
  mobile = false,
}: FeaturedCardProps) {
  const isDesktop = !mobile;

  return (
    <motion.div
      {...(isDesktop && {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: {
          delay: index * 0.05,
          duration: 0.35,
          ease: "easeOut",
        },
      })}
      className={clsx(
        baseCardClass,
        mobile ? mobileCardClass : desktopCardClass,
      )}
    >
      {/* App-Style Floating Badges */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-start justify-between p-3 pointer-events-none">
        <CategoryBadge
          icon={config.icon}
          name={product.category.name}
          className={clsx(
            "shadow-sm backdrop-blur-md bg-white/90",
            config.badgeClass,
          )}
        />
        <span className="shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-emerald-600 backdrop-blur-md">
          IN STOCK
        </span>
      </div>

      {/* Edge-to-Edge Image Focus */}
      <div
        className={clsx(
          imageContainerClass,
          mobile ? mobileImageClass : desktopImageClass,
        )}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className={clsx(
            "max-h-full max-w-full object-contain mix-blend-multiply pointer-events-none",
            isDesktop &&
              "transition-transform duration-700 ease-out group-hover:scale-105",
          )}
        />
      </div>

      {/* Tighter, Crisp Info Section */}
      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="line-clamp-1 text-[15px] font-semibold tracking-tight text-slate-900">
          {product.name}
        </h3>

        <p className="mt-0.5 text-xs font-medium text-slate-500 line-clamp-1">
          {mobile
            ? "Trending collection"
            : "Premium tech at competitive prices"}
        </p>

        {/* Minimal App-Style CTA */}
        <Link
          to={`/category/${product.category.slug}/product/${product.slug}`}
          className={clsx(
            "mt-4 inline-flex h-9 w-full items-center justify-between rounded-lg bg-slate-900 px-3.5 text-[13px] font-semibold text-white",
            "transition-all duration-200 active:scale-[0.98]",
            isDesktop && "hover:bg-indigo-600",
          )}
        >
          <span>Shop {product.category.name}</span>
          <ArrowRight
            size={14}
            className={clsx(
              isDesktop &&
                "transition-transform duration-300 group-hover:translate-x-1",
            )}
          />
        </Link>
      </div>
    </motion.div>
  );
}
