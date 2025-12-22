// src/components/ProfileRecentOrders.tsx
import { Package } from "lucide-react";
import type { Order } from "../types/order";

interface Props {
  orders?: Order[]; // optional
  loading: boolean;
  error: boolean;
}

export default function ProfileRecentOrders({ orders, loading, error }: Props) {
  // 🔒 SINGLE SOURCE OF TRUTH
  const safeOrders: Order[] = Array.isArray(orders) ? orders : [];

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-gray-500">Loading recent orders…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-red-600">
        Failed to load orders
      </div>
    );
  }

  if (safeOrders.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-center">
        <Package className="mx-auto text-gray-300 mb-3" />
        <p className="text-gray-600">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-xl font-bold mb-4">Recent Orders</h3>

      <div className="space-y-3">
        {safeOrders.slice(0, 3).map((order) => (
          <div
            key={order._id}
            className="flex justify-between bg-gray-50 p-4 rounded-xl"
          >
            <div>
              <p className="font-semibold text-sm">
                #{order.paymentInfo.orderId}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">
                ₹{order.totalAmount.toLocaleString("en-IN")}
              </p>
              <span className="text-xs capitalize text-gray-600">
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
