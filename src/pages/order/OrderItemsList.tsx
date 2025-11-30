// components/order/OrderItemsList.tsx
import { motion } from "framer-motion";
import type { OrderItem } from "../../types/order";

interface Props {
  items: OrderItem[];
}

export default function OrderItemsList({ items }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl border p-6"
    >
      <h3 className="text-xl font-bold mb-6 text-gray-800">
        Items Ordered ({items.length})
      </h3>

      <div className="space-y-4">
        {items.map((item, i) => (
          <motion.div
            key={item.product._id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-5 bg-gray-50 rounded-xl p-5 hover:shadow-md transition-all border"
          >
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className="w-24 h-24 rounded-lg object-cover shadow-sm"
            />

            <div className="flex-1">
              <h4 className="font-semibold text-lg text-gray-800 line-clamp-2">
                {item.product.name}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                ₹{item.price.toLocaleString()} × {item.qty}
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">
                ₹{(item.price * item.qty).toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
