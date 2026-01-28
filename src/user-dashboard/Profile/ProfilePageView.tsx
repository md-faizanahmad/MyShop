import { motion } from "framer-motion";
import {
  Edit3,
  User,
  Mail,
  Phone,
  Shield,
  Settings,
  Package,
  MapPin,
  ChevronRight,
  Key,
} from "lucide-react";
import type { Order } from "../../types/order";
import ProfileRecentOrders from "../ProfileRecentOrders";
import { useState } from "react";
import ProfileEditModal from "./EditProfileModal";
import ProfileAddresses from "./ProfileAddresses";

interface Props {
  user: { name?: string; email?: string; phone?: string };
  orders: Order[];
  ordersLoading: boolean;
  ordersError: boolean;
}

export default function ProfilePageView({
  user,
  orders,
  ordersLoading,
  ordersError,
}: Props) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-12">
      {/* Top Branding Header - Mobile Optimized */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 bg-blue-50 rounded-lg">
                  <Shield size={20} className="text-blue-600" />
                </div>
                <h1 className="text-2xl md:text-2xl font-black text-gray-900 tracking-tight">
                  Account Dashboard
                </h1>
              </div>
              <p className="text-sm  text-gray-500 font-medium ml-9 md:ml-0">
                Manage your orders, addresses, and settings.
              </p>
            </div>

            <button className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all">
              <Settings size={16} /> Preferences
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Profile Top Banner */}
              <div className="h-20 bg-linear-to-r from-blue-600 to-indigo-700" />

              <div className="px-6 pb-6 text-center">
                <div className="relative -mt-10 mb-4 inline-block">
                  <div className="w-20 h-20 bg-white p-1 rounded-full shadow-md">
                    <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <User size={32} />
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                  {user.name ?? "User Account"}
                </h2>
                <div className="mt-2 space-y-1.5">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Contact Info
                  </p>
                  {user.email && (
                    <div className="text-sm text-gray-600 flex items-center justify-center gap-2">
                      <Mail size={14} className="text-gray-400" /> {user.email}
                    </div>
                  )}
                  {user.phone && (
                    <div className="text-sm text-gray-600 flex items-center justify-center gap-2">
                      <Phone size={14} className="text-gray-400" /> {user.phone}
                    </div>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-2">
                  <button
                    onClick={() => setShowEdit(true)}
                    className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors"
                  >
                    <Edit3 size={16} /> Edit Profile
                  </button>
                  <button className="flex items-center justify-center gap-2 w-full text-gray-600 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">
                    <Key size={16} /> Security Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Navigation Links (Great for Mobile UX) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 space-y-1">
              {[
                {
                  icon: <Package size={18} />,
                  label: "My Orders",
                  count: orders.length,
                },
                {
                  icon: <MapPin size={18} />,
                  label: "Saved Addresses",
                  count: null,
                },
              ].map((link, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 group-hover:text-blue-600">
                      {link.icon}
                    </span>
                    <span className="text-sm font-bold text-gray-700">
                      {link.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {link.count !== null && (
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full font-bold">
                        {link.count}
                      </span>
                    )}
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Main Content */}
          <div className="lg:col-span-8 space-y-6">
            <ProfileRecentOrders
              orders={orders}
              loading={ordersLoading}
              error={ordersError}
            />
            <ProfileAddresses />
          </div>
        </div>
      </div>

      {showEdit && (
        <ProfileEditModal user={user} onClose={() => setShowEdit(false)} />
      )}
    </div>
  );
}
