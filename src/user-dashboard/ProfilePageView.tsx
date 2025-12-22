// src/pages/ProfilePageView.tsx
import { motion } from "framer-motion";
import {
  Edit3,
  User,
  Mail,
  Phone,
  Shield,
  Home,
  Building2,
} from "lucide-react";

import type { Order } from "../types/order";
import type { Address } from "../types/address";
import ProfileRecentOrders from "./ProfileRecentOrders";

interface Props {
  user: {
    name?: string;
    email?: string;
    phone?: string;
  };
  orders: Order[];
  addresses: Address[];
  ordersLoading: boolean;
  addressesLoading: boolean;
  ordersError: boolean;
  addressesError: boolean;
}

export default function ProfilePageView({
  user,
  orders,
  addresses,
  ordersLoading,
  addressesLoading,
  ordersError,
  addressesError,
}: Props) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="text-blue-600" />
            My Account
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your profile, orders, and addresses
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl">
                <User />
              </div>

              <h2 className="text-xl font-bold mt-4">{user.name ?? "User"}</h2>

              {user.email && (
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <Mail size={14} /> {user.email}
                </p>
              )}

              {user.phone && (
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <Phone size={14} /> {user.phone}
                </p>
              )}

              <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center gap-2">
                <Edit3 size={16} />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Recent Orders (PROFILE-SPECIFIC COMPONENT) */}
          <ProfileRecentOrders
            orders={orders} // MUST be Order[]
            loading={ordersLoading}
            error={ordersError}
          />

          {/* Addresses */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Saved Addresses</h3>

            {/* Loading */}
            {addressesLoading && (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-24 bg-gray-100 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            )}

            {/* Error */}
            {!addressesLoading && addressesError && (
              <p className="text-sm text-red-600">Failed to load addresses</p>
            )}

            {/* Empty */}
            {!addressesLoading && !addressesError && addresses.length === 0 && (
              <p className="text-sm text-gray-500">No saved addresses yet.</p>
            )}

            {/* List */}
            {!addressesLoading &&
              !addressesError &&
              addresses.map((addr) => (
                <div
                  key={addr._id}
                  className="p-4 mb-3 rounded-xl border bg-gray-50"
                >
                  <div className="flex gap-3">
                    {addr.isDefault ? (
                      <Home className="text-green-600" />
                    ) : (
                      <Building2 className="text-gray-600" />
                    )}

                    <div>
                      <p className="font-semibold">
                        {addr.fullName}
                        {addr.isDefault && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                            Default
                          </span>
                        )}
                      </p>

                      <p className="text-sm text-gray-700">
                        {addr.street}
                        {addr.landmark && `, ${addr.landmark}`}
                      </p>

                      <p className="text-sm text-gray-700">
                        {addr.city}, {addr.state} – {addr.pincode}
                      </p>

                      <p className="text-sm text-gray-600 mt-1">
                        📞 {addr.phone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
