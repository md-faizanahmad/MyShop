// // src/components/OrderCard.tsx
// import { Link } from "react-router-dom";
// import type { Order } from "../types/order";

// /* ----------------------------------
//    Helpers
// ---------------------------------- */

// function statusClasses(status?: string): string {
//   switch ((status ?? "").toLowerCase()) {
//     case "placed":
//       return "bg-orange-100 text-orange-700";
//     case "processing":
//       return "bg-indigo-100 text-indigo-700";
//     case "shipping":
//       return "bg-blue-100 text-blue-700";
//     case "delivered":
//       return "bg-green-100 text-green-700";
//     case "cancelled":
//     case "canceled":
//       return "bg-red-100 text-red-700";
//     default:
//       return "bg-gray-100 text-gray-700";
//   }
// }

// function formatCurrency(amount?: number): string {
//   if (typeof amount !== "number") return "—";
//   return amount.toLocaleString("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   });
// }

// /* ----------------------------------
//    Component
// ---------------------------------- */

// export default function OrderCard({ order }: { order: Order }) {
//   // 🔒 HARD GUARD — never trust backend / first render
//   const items = Array.isArray(order.items) ? order.items : [];

//   return (
//     <article className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 transition border border-gray-100">
//       {/* Header */}
//       <div className="flex justify-between items-start gap-3">
//         <div className="min-w-0">
//           <h3 className="text-sm sm:text-base font-semibold truncate">
//             Order{" "}
//             <span className="text-sky-600">
//               #{order.paymentInfo?.orderId ?? order._id}
//             </span>
//           </h3>

//           <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
//             Placed:{" "}
//             <time dateTime={order.createdAt}>
//               {new Date(order.createdAt).toLocaleString("en-IN")}
//             </time>
//           </p>
//         </div>

//         <span
//           className={`inline-flex items-center text-xs sm:text-sm px-3 py-1 rounded-full font-medium ${statusClasses(
//             order.status
//           )}`}
//         >
//           {order.status}
//         </span>
//       </div>

//       {/* Items */}
//       <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
//         <div className="flex flex-col gap-3">
//           {items.slice(0, 2).map((item, idx) => {
//             const name =
//               "product" in item ? item.product.name : "Unknown product";

//             const image = "product" in item ? item.product.imageUrl : undefined;

//             return (
//               <div key={idx} className="flex items-center gap-3">
//                 {image && (
//                   <img
//                     src={image}
//                     alt={name}
//                     loading="lazy"
//                     decoding="async"
//                     className="w-16 h-16 object-cover rounded-md border border-gray-100 shrink-0"
//                   />
//                 )}

//                 <div className="min-w-0">
//                   <p className="text-sm truncate">{name}</p>
//                   <p className="text-xs text-gray-500">
//                     {item.qty} × {formatCurrency(item.price)}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}

//           {items.length > 2 && (
//             <p className="text-xs text-gray-400">
//               + {items.length - 2} more item(s)
//             </p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex flex-col justify-between items-start sm:items-end gap-3">
//           <p className="text-sm font-semibold">
//             {formatCurrency(order.totalAmount)}
//           </p>

//           <Link
//             to={`/order/${order._id}`}
//             className="inline-flex items-center text-sm font-medium text-sky-600 hover:underline"
//           >
//             View Details →
//           </Link>
//         </div>
//       </div>
//     </article>
//   );
// }
import { Link } from "react-router-dom";
import type { Order, OrderItem } from "../types/order";
import { formatCurrency } from "../utils/formatCurrency";

/* ----------------------------------
   Helpers
---------------------------------- */

function statusClasses(status?: string): string {
  switch ((status ?? "").toLowerCase()) {
    case "placed":
      return "bg-orange-100 text-orange-700";
    case "processing":
      return "bg-indigo-100 text-indigo-700";
    case "shipping":
      return "bg-blue-100 text-blue-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "cancelled":
    case "canceled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function isPopulated(
  item: OrderItem
): item is Extract<OrderItem, { product: unknown }> {
  return "product" in item;
}

/* ----------------------------------
   Component
---------------------------------- */

export default function OrderCard({ order }: { order: Order }) {
  // Defensive guard
  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <article className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-semibold truncate">
            Order{" "}
            <span className="text-sky-600">
              #{order.paymentInfo?.orderId ?? order._id}
            </span>
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
            Placed:{" "}
            <time dateTime={order.createdAt}>
              {new Date(order.createdAt).toLocaleString("en-IN")}
            </time>
          </p>
        </div>

        <span
          className={`inline-flex items-center text-xs sm:text-sm px-3 py-1 rounded-full font-medium ${statusClasses(
            order.status
          )}`}
        >
          {order.status}
        </span>
      </div>

      {/* Items */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-3">
          {items.slice(0, 2).map((item, idx) => {
            const name = isPopulated(item)
              ? item.product.name
              : item.productName;

            const image = isPopulated(item)
              ? item.product.imageUrl
              : item.productImage;

            return (
              <div key={idx} className="flex items-center gap-3">
                {image && (
                  <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-16 object-cover rounded-md border border-gray-100 shrink-0"
                  />
                )}

                <div className="min-w-0">
                  <p className="text-sm truncate">{name}</p>
                  <p className="text-xs text-gray-500">
                    {item.qty} × {formatCurrency(item.price)}
                  </p>
                </div>
              </div>
            );
          })}

          {items.length > 2 && (
            <p className="text-xs text-gray-400">
              + {items.length - 2} more item(s)
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col justify-between items-start sm:items-end gap-3">
          <p className="text-sm font-semibold">
            {formatCurrency(order.totalAmount)}
          </p>

          <Link
            to={`/order/${order._id}`}
            className="inline-flex items-center text-sm font-medium text-sky-600 hover:underline"
          >
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
