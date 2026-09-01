// import { Link } from "react-router-dom";
// import type { Order, OrderItem } from "../types/order";
// import { formatCurrency } from "../utils/formatCurrency";

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

// function isPopulated(
//   item: OrderItem,
// ): item is Extract<OrderItem, { product: unknown }> {
//   return "product" in item;
// }

// /* ----------------------------------
//    Component
// ---------------------------------- */

// export default function OrderCard({ order }: { order: Order }) {
//   // Defensive guard
//   const items = Array.isArray(order.items) ? order.items : [];

//   return (
//     <article className="bg-white shadow-sm p-4 sm:p-5 border border-gray-100">
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
//             order.status,
//           )}`}
//         >
//           {order.status}
//         </span>
//       </div>

//       {/* Items */}
//       <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
//         <div className="flex flex-col gap-3">
//           {items.slice(0, 2).map((item, idx) => {
//             const name = isPopulated(item)
//               ? item.product.name
//               : item.productName;

//             const image = isPopulated(item)
//               ? item.product.imageUrl
//               : item.productImage;

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
//         <div className="flex flex-col items-end justify-between gap-3">
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

////////////////////////////////// Refactor 01-09
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
  item: OrderItem,
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
    <article className="border border-gray-100 bg-white p-3.5 shadow-sm sm:p-4 md:p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-2.5 sm:gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-xs font-semibold sm:text-sm md:text-base">
            Order{" "}
            <span className="text-sky-600">
              #{order.paymentInfo?.orderId ?? order._id}
            </span>
          </h3>

          <p className="mt-0.5 truncate text-[11px] text-gray-500 sm:mt-1 sm:text-xs md:text-sm">
            Placed:{" "}
            <time dateTime={order.createdAt}>
              {new Date(order.createdAt).toLocaleString("en-IN")}
            </time>
          </p>
        </div>

        <span
          className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[10px] font-medium sm:px-3 sm:text-xs md:text-sm ${statusClasses(
            order.status,
          )}`}
        >
          {order.status}
        </span>
      </div>

      {/* Items */}
      <div className="mt-3.5 grid grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {items.slice(0, 2).map((item, idx) => {
            const name = isPopulated(item)
              ? item.product.name
              : item.productName;

            const image = isPopulated(item)
              ? item.product.imageUrl
              : item.productImage;

            return (
              <div key={idx} className="flex items-center gap-2.5 sm:gap-3">
                {image && (
                  <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                    className="h-14 w-14 shrink-0 rounded-md border border-gray-100 object-cover sm:h-16 sm:w-16"
                  />
                )}

                <div className="min-w-0">
                  <p className="truncate text-xs sm:text-sm">{name}</p>
                  <p className="text-[11px] text-gray-500 sm:text-xs">
                    {item.qty} × {formatCurrency(item.price)}
                  </p>
                </div>
              </div>
            );
          })}

          {items.length > 2 && (
            <p className="text-[11px] text-gray-400 sm:text-xs">
              + {items.length - 2} more item(s)
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-between">
          <p className="text-xs font-semibold sm:text-sm">
            {formatCurrency(order.totalAmount)}
          </p>

          <Link
            to={`/order/${order._id}`}
            className="inline-flex items-center text-xs font-medium text-sky-600 hover:underline sm:text-sm"
          >
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
