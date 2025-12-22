// pages/OrderDetails.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

import type { Order } from "../types/order.Details";
import OrderHeader from "./order/OrderHeader";
import OrderStatusTracker from "./order/OrderStatusTracker";
import OrderItemsList from "./order/OrderItemsList";
import ShippingAddressCard from "./order/ShippingAddressCard";
import OrderTotal from "./order/OrderTotal";
import OrderActions from "./order/OrderActions";

const API = import.meta.env.VITE_API_URL;

export default function OrderDetails() {
  const { orderId } = useParams<{ orderId: string }>();

  const {
    data: order,
    isLoading,
    refetch,
  } = useQuery<Order>({
    queryKey: ["order-details", orderId],
    enabled: !!orderId,
    queryFn: async () => {
      const res = await axios.get(`${API}/v1/orders/${orderId}`, {
        withCredentials: true,
      });
      return res.data.order;
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-gray-500">Loading order details…</div>
    );
  }

  if (!order) {
    return <div className="p-6 text-sm text-red-600">Order not found.</div>;
  }

  /* ---------------------------------
     PRICE CALCULATION (SAFE)
  ---------------------------------- */
  const itemsTotal = order.items.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  const canCancel = !["cancelled", "delivered", "shipping"].includes(
    order.status.toLowerCase()
  );

  async function cancelOrder() {
    if (!window.confirm("Cancel this order?")) return;

    try {
      await axios.put(
        `${API}/v1/orders/cancel/${orderId}`,
        {},
        { withCredentials: true }
      );
      toast.success("Order cancelled");
      refetch();
    } catch {
      toast.error("Failed to cancel order");
    }
  }

  return (
    <div className="mx-auto max-w-5xl p-4 space-y-6">
      {/* Breadcrumb + header */}
      <OrderHeader orderId={order._id} createdAt={order.createdAt} />

      {/* Status */}
      <OrderStatusTracker status={order.status} createdAt={order.createdAt} />
      {/* Items */}
      <OrderItemsList items={order.items} />

      {/* Address */}
      <ShippingAddressCard address={order.shippingAddress} />

      {/* Price */}
      <OrderTotal itemsTotal={itemsTotal} totalAmount={order.totalAmount} />

      {/* Actions */}
      <OrderActions
        invoiceUrl={`${API}/v1/orders/invoice/${order._id}`}
        cancel={cancelOrder}
        disabled={!canCancel}
      />
    </div>
  );
}
