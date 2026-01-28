// src/pages/ProfilePage.tsx
import { useAuthStore } from "../store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import DashboardSkeleton from "../shared/DashboardSkeleton";
import ProfilePageView from "./Profile/ProfilePageView";

import type { Order } from "../types/order";
import type { Address } from "../types/address";
// import ProfileAddresses from "./Profile/ProfileAddresses";

const API_URL = import.meta.env.VITE_API_URL as string;

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  /* -----------------------------
     ORDERS
  ----------------------------- */
  const ordersQuery = useQuery<Order[]>({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const res = await axios.get<{ orders: Order[] }>(
        `${API_URL}/v1/orders/my-orders`,
        { withCredentials: true },
      );
      return res.data.orders;
    },
    enabled: !!user, // ⛔ don't run before auth
    staleTime: 30_000,
  });

  /* -----------------------------
     ADDRESSES
  ----------------------------- */
  const addressesQuery = useQuery<Address[]>({
    queryKey: ["my-addresses"],
    queryFn: async () => {
      const res = await axios.get<{ addresses: Address[] }>(
        `${API_URL}/v1/addresses`,
        { withCredentials: true },
      );
      return res.data.addresses;
    },
    enabled: !!user, // ⛔ don't run before auth
    staleTime: 30_000,
  });

  /* -----------------------------
     GLOBAL LOADING (first paint)
  ----------------------------- */
  if (!user || ordersQuery.isLoading || addressesQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  /* -----------------------------
     NORMALIZED DATA (CRITICAL)
  ----------------------------- */
  const orders: Order[] = Array.isArray(ordersQuery.data)
    ? ordersQuery.data
    : [];

  // const addresses: Address[] = Array.isArray(addressesQuery.data)
  //   ? addressesQuery.data
  //   : [];

  return (
    <div className="p-4">
      <ProfilePageView
        user={user}
        orders={orders}
        ordersLoading={ordersQuery.isFetching}
        ordersError={ordersQuery.isError}
      />
      {/* <ProfileAddresses
        addressesLoading={addressesQuery.isFetching}
        addresses={addresses}
        addressesError={addressesQuery.isError}
      /> */}
      {/* <ProfileAddresses /> */}
    </div>
  );
}
