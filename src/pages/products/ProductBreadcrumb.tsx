import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

interface ProductBreadcrumbProps {
  categorySlug?: string;
  product: {
    name: string;
    category?: {
      name?: string;
    };
  };
}

export default function ProductBreadcrumb({
  categorySlug,
  product,
}: ProductBreadcrumbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 flex min-w-0 items-center gap-1.5 text-xs text-gray-500 sm:mb-6 sm:gap-2 sm:text-sm"
    >
      <a
        href="/"
        className="flex shrink-0 items-center gap-1 hover:text-blue-600"
      >
        <ChevronLeft size={16} className="sm:size-[18px]" />
        <span>Home</span>
      </a>

      {categorySlug && (
        <>
          <span>/</span>

          <a
            href={`/category/${categorySlug}`}
            className="max-w-24 shrink-0 truncate hover:text-blue-600 sm:max-w-none"
          >
            {product.category?.name ?? categorySlug}
          </a>

          <span>/</span>
        </>
      )}

      <span className="min-w-0 truncate font-medium text-gray-900">
        {product.name}
      </span>
    </motion.div>
  );
}
