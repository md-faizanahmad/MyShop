// src/components/product/ProductInfo.tsx
import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";

interface ProductInfoProps {
  name: string;
  description?: string;
  rating?: number;
  reviewsCount?: number;
  verified?: boolean;
}

export default function ProductInfo({
  name,
  description,
  rating = 4.8,
  reviewsCount = 234,
  verified = true,
}: ProductInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-4"
    >
      {/* Product Name */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
        {name}
      </h1>

      {/* Rating + Trust Badge */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={`${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700">
            {rating} ({reviewsCount} reviews)
          </span>
        </div>

        {verified && (
          <div className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
            <CheckCircle2 size={18} className="text-green-600" />
            <span>Verified Purchase Reviews</span>
          </div>
        )}
      </div>

      {/* Description */}
      {description ? (
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl">
          {description}
        </p>
      ) : (
        <div className="space-y-2 text-gray-600">
          <p className="text-base">
            Premium quality • Fast delivery • Easy returns
          </p>
          <p className="text-sm opacity-80">
            Crafted with care for the best experience.
          </p>
        </div>
      )}

      {/* Optional: Subtle Divider */}
      <div className="h-px bg-gray-200 mt-6" />
    </motion.div>
  );
}
