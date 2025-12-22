// components/order/OrderItemsList.tsx
import { motion } from "framer-motion";
import type { OrderItemPopulated } from "../../types/order.Details";
import { Link } from "react-router-dom";

interface Props {
  items: OrderItemPopulated[];
}

export default function OrderItemsList({ items }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white border border-gray-200"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm sm:text-base font-medium text-gray-900">
          Items in this order ({items.length})
        </h3>
      </div>

      {/* Items */}
      <div className="divide-y divide-gray-200">
        {items.map((item, index) => (
          <motion.div
            key={item.product._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex gap-4 px-4 py-4"
          >
            {/* Product Image */}
            <img
              src={item.product.thumbnail}
              alt={item.product.name}
              className="h-20 w-20 sm:h-24 sm:w-24 object-cover border"
            />

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2">
                {item.product.name}
              </p>

              {/* Highlights */}
              {item.product.highlights?.length > 0 && (
                <ul className="mt-1 space-y-0.5 text-xs sm:text-sm text-gray-600 list-disc list-inside">
                  {item.product.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="line-clamp-1">
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {/* Meta */}
              <div className="mt-2 text-xs sm:text-sm text-gray-600">
                Qty: <span className="font-medium">{item.qty}</span>
              </div>

              {/* Actions */}
              <div className="mt-2">
                <Link
                  to={`/category/laptops/product/${item.product.slug}`}
                  className="text-xs sm:text-sm text-blue-600 hover:underline"
                >
                  View product
                </Link>
              </div>
            </div>

            {/* Price */}
            <div className="text-right shrink-0">
              <p className="text-sm text-gray-600">
                ₹{item.price.toLocaleString()} × {item.qty}
              </p>
              <p className="mt-1 text-base sm:text-lg font-medium text-gray-900">
                ₹{(item.price * item.qty).toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
