// // components/order/OrderItemsList.tsx
// import { motion } from "framer-motion";
// import type { OrderItemPopulated } from "@/types/order.Details";
// import { Link } from "react-router-dom";

// interface Props {
//   items: OrderItemPopulated[];
// }

// export default function OrderItemsList({ items }: Props) {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.3 }}
//       className="w-full"
//     >
//       {/* Header */}
//       <div className="px-4 py-3 border-b border-gray-200">
//         <h3 className="text-sm sm:text-base font-medium text-gray-900">
//           Items in this order ({items.length})
//         </h3>
//       </div>

//       {/* Items */}
//       <div className="divide-y divide-gray-200">
//         {items.map((item, index) => (
//           <motion.div
//             key={item.product._id}
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.05 }}
//             className="flex gap-4 px-4 py-4"
//           >
//             {/* Product Image */}
//             <img
//               src={item.product.thumbnail}
//               alt={item.product.name}
//               className="h-20 w-20 sm:h-24 sm:w-24 object-cover border"
//             />

//             {/* Product Info */}
//             <div className="flex-1 min-w-0">
//               <p className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2">
//                 {item.product.name}
//               </p>

//               {/* Highlights */}
//               {item.product.highlights?.length > 0 && (
//                 <ul className="mt-1 space-y-0.5 text-xs sm:text-sm text-gray-600 list-disc list-inside">
//                   {item.product.highlights.slice(0, 3).map((h, i) => (
//                     <li key={i} className="line-clamp-1">
//                       {h}
//                     </li>
//                   ))}
//                 </ul>
//               )}

//               {/* Meta */}
//               <div className="mt-2 text-xs sm:text-sm text-gray-600">
//                 Qty: <span className="font-medium">{item.qty}</span>
//               </div>

//               {/* Actions */}
//               <div className="mt-2">
//                 <Link
//                   to={`/category/laptops/product/${item.product.slug}`}
//                   className="text-xs sm:text-sm text-blue-600 hover:underline"
//                 >
//                   View product
//                 </Link>
//               </div>
//             </div>

//             {/* Price */}
//             <div className="text-right shrink-0">
//               <p className="text-sm text-gray-600">
//                 ₹{item.price.toLocaleString()} × {item.qty}
//               </p>
//               <p className="mt-1 text-base sm:text-lg font-medium text-gray-900">
//                 ₹{(item.price * item.qty).toLocaleString()}
//               </p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

//////////////// 19-08-2026 update with correct route
// components/order/OrderItemsList.tsx
import type { OrderItemPopulated } from "@/types/order.Details";
import { Link } from "react-router-dom";

interface Props {
  items: OrderItemPopulated[];
}

export default function OrderItemsList({ items }: Props) {
  return (
    <section className="w-full" aria-labelledby="order-items-title">
      {/* Header */}
      <header className="border-b border-slate-200 px-4 py-3 sm:px-5">
        <h2
          id="order-items-title"
          className="text-base font-semibold text-slate-900"
        >
          Items in this order
          <span className="ml-1 text-sm font-normal text-slate-400">
            ({items.length})
          </span>
        </h2>
      </header>

      {/* Items */}
      <div className="divide-y divide-slate-200">
        {items.map((item) => {
          const itemTotal = item.price * item.qty;

          return (
            <article
              key={item.product._id}
              className="flex gap-3 px-4 py-4 sm:gap-4 sm:px-5"
            >
              {/* Product Image */}
              <Link
                to={`/category/${item.categorySlug}/product/${item.productSlug}`}
                className="block h-20 w-20 shrink-0 overflow-hidden border border-slate-200 bg-slate-50 sm:h-24 sm:w-24"
                aria-label={`View ${item.product.name}`}
              >
                <img
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </Link>

              {/* Product Info */}
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm font-medium leading-5 text-slate-900 sm:text-base">
                  {item.product.name}
                </h3>

                {/* Highlights */}
                {item.product.highlights?.length > 0 && (
                  <ul className="mt-1.5 hidden space-y-0.5 text-xs text-slate-500 sm:block">
                    {item.product.highlights
                      .slice(0, 3)
                      .map((highlight, index) => (
                        <li
                          key={`${item.product._id}-highlight-${index}`}
                          className="line-clamp-1"
                        >
                          {highlight}
                        </li>
                      ))}
                  </ul>
                )}

                {/* Quantity */}
                <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                  Qty:{" "}
                  <span className="font-medium text-slate-700">{item.qty}</span>
                </p>

                {/* Product Link */}
                <Link
                  to={`/category/${item.categorySlug}/product/${item.productSlug}`}
                  className="mt-2 inline-block text-xs font-medium text-sky-600 hover:text-sky-700 hover:underline sm:text-sm"
                >
                  View product
                </Link>
              </div>

              {/* Price */}
              <div className="shrink-0 text-right">
                <p className="text-xs text-slate-500 sm:text-sm">
                  ₹{item.price.toLocaleString("en-IN")} × {item.qty}
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900 sm:text-base">
                  ₹{itemTotal.toLocaleString("en-IN")}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
