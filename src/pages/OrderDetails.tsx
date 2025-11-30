// // src/pages/OrderDetails.tsx
// import { type JSX } from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { toast } from "react-toastify";

// import type { Order, OrderItem } from "../types/order";
// import OrderStatusTracker from "../components/OrderStatusTracker";

// const API = import.meta.env.VITE_API_URL;

// export default function OrderDetails(): JSX.Element {
//   const { orderId } = useParams<{ orderId?: string }>();

//   const {
//     data: order,
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery<Order>({
//     queryKey: ["order-details", orderId],
//     queryFn: async () => {
//       const res = await axios.get(`${API}/api/orders/${orderId}`, {
//         withCredentials: true,
//       });
//       console.log(res);
//       // adapt to your API shape (res.data.order or res.data)
//       return (res.data?.order ?? res.data) as Order;
//     },
//     enabled: !!orderId,
//     retry: 1,
//   });

//   if (isLoading)
//     return (
//       <div className="p-6 animate-pulse text-gray-500">Loading order…</div>
//     );

//   if (isError)
//     return (
//       <div className="p-6 text-red-500 font-medium">
//         Failed to load order. Try again later.
//       </div>
//     );

//   if (!order)
//     return <div className="p-6 text-red-500 font-medium">Order not found.</div>;

//   async function cancelOrder() {
//     if (!order) return; // TS-safe guard

//     if (!confirm("Do you really want to cancel this order?")) return;

//     try {
//       await axios.put(
//         `${API}/api/orders/cancel/${order._id}`,
//         {},
//         { withCredentials: true }
//       );

//       toast.success("Order cancelled!");
//       await refetch();
//     } catch {
//       toast.error("Unable to cancel order.");
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-6">
//       <h1 className="text-2xl font-bold">Order Details</h1>

//       {/* STATUS TRACKER */}
//       <div className="bg-white shadow p-4 rounded-lg">
//         <h3 className="font-semibold mb-3 text-gray-700">Order Progress</h3>
//         <OrderStatusTracker status={order.status} />
//       </div>

//       {/* ORDER ITEMS */}
//       <div className="bg-white shadow p-4 rounded-lg">
//         <h2 className="text-lg font-semibold mb-3">Items</h2>

//         {order.items.map((item: OrderItem, idx: number) => {
//           // `item.product` may be a populated object or just an id string
//           const product =
//             typeof item.product === "string" ? null : item.product;

//           return (
//             <div
//               key={product?._id ?? `${order._id}-item-${idx}`}
//               className="flex gap-4 mb-4 border-b pb-4"
//             >
//               {product?.imageUrl ? (
//                 <img
//                   src={product.imageUrl}
//                   className="w-20 h-20 object-cover rounded shadow"
//                   alt={product.name}
//                 />
//               ) : (
//                 <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">
//                   No image
//                 </div>
//               )}

//               <div>
//                 <p className="font-medium">{product?.name ?? "Product"}</p>
//                 <p className="text-blue-600 font-semibold">
//                   ₹{item.price.toLocaleString()} × {item.qty}{" "}
//                   <span className="text-gray-500">
//                     = ₹{(item.price * item.qty).toLocaleString()}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           );
//         })}

//         <p className="text-lg font-bold mt-4">
//           Total Paid: ₹{order.totalAmount.toLocaleString()}
//         </p>

//         <a
//           href={`${API}/api/orders/invoice/${order._id}`}
//           className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//         >
//           Download Invoice (PDF)
//         </a>
//       </div>

//       {/* SHIPPING ADDRESS */}
//       <div className="bg-white shadow p-4 rounded-lg">
//         <h2 className="text-lg font-semibold mb-3">Shipping Address</h2>

//         {order.shippingAddress ? (
//           <p className="text-gray-700 leading-relaxed">
//             <strong>{order.shippingAddress.fullName}</strong> <br />
//             {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
//             {order.shippingAddress.state} - {order.shippingAddress.pincode}{" "}
//             <br />
//             {order.shippingAddress.landmark && (
//               <>
//                 Landmark: {order.shippingAddress.landmark} <br />
//               </>
//             )}
//             Phone: {order.shippingAddress.phone}
//           </p>
//         ) : (
//           <p className="text-gray-500">No shipping address available.</p>
//         )}
//       </div>

//       {/* CANCEL ORDER (only when not final or cancelled) */}
//       {!["Cancelled", "Delivered", "Out for Delivery"].includes(
//         order.status
//       ) && (
//         <button
//           onClick={cancelOrder}
//           className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
//         >
//           Cancel Order
//         </button>
//       )}
//     </div>
//   );
// }
//////////////////////udpated

// src/pages/OrderDetails.tsx
// pages/order/OrderDetails.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

import type { Order } from "../types/order";
import OrderHeader from "./order/OrderHeader";
import OrderStatusTracker from "./order/OrderStatusTracker";
import OrderItemsList from "./order/OrderItemsList";
import ShippingAddressCard from "./order/ShippingAddressCard";
import OrderTotal from "./order/OrderTotal";
import OrderActions from "./order/OrderActions";

const API = import.meta.env.VITE_API_URL;

export default function OrderDetails() {
  const { orderId } = useParams();

  const {
    data: order,
    isLoading,
    refetch,
  } = useQuery<Order>({
    queryKey: ["order-details", orderId],
    queryFn: async () => {
      const res = await axios.get(`${API}/api/orders/${orderId}`, {
        withCredentials: true,
      });
      return res.data.order as Order;
    },
  });

  if (isLoading)
    return (
      <div className="p-6 text-gray-500 animate-pulse">Loading order…</div>
    );

  if (!order) return <div className="p-6 text-red-500">Order not found.</div>;

  async function cancelOrder() {
    if (!confirm("Cancel this order?")) return;

    try {
      await axios.put(
        `${API}/api/orders/cancel/${order?._id}`,
        {},
        { withCredentials: true }
      );

      toast.success("Order cancelled");
      refetch();
    } catch {
      toast.error("Failed to cancel");
    }
  }

  const canCancel = !["cancelled", "delivered", "shipping"].includes(
    order.status.toLowerCase()
  );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <OrderHeader id={order._id} createdAt={order.createdAt} />

      {/* Status */}
      <OrderStatusTracker status={order.status} />

      {/* Items */}
      <OrderItemsList items={order.items} />

      {/* Address */}
      <ShippingAddressCard address={order.shippingAddress} />

      {/* Total */}
      <OrderTotal amount={order.totalAmount} />

      {/* Actions */}
      <OrderActions
        invoiceUrl={`${API}/api/orders/invoice/${order._id}`}
        cancel={cancelOrder}
        disabled={!canCancel}
      />
    </div>
  );
}
