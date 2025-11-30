// // src/user-dashboard/ProfilePage.tsx
// import { motion } from "framer-motion";
// import { Edit3, User, Mail, Phone, Shield } from "lucide-react";
// import DashboardSkeleton from "../shared/DashboardSkeleton";
// import { useAuth } from "../context/Auth";

// export default function ProfilePage() {
//   const { user } = useAuth();

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-4xl mx-auto px-4">
//           <DashboardSkeleton />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center lg:text-left mb-10"
//         >
//           <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 justify-center lg:justify-start">
//             <Shield className="text-blue-600" size={40} />
//             My Profile
//           </h1>
//           <p className="text-gray-600 mt-2">Manage your account details</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white rounded-3xl shadow-xl overflow-hidden border"
//         >
//           <div className="bg-linear-to-r from-blue-600 to-blue-800 h-32" />
//           <div className="relative px-8 pb-10 -mt-16">
//             <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
//               <div className="w-32 h-32 bg-white rounded-full shadow-2xl p-2">
//                 <div className="w-full h-full bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-5xl font-bold">
//                   {user.name}
//                 </div>
//               </div>

//               <div className="text-center sm:text-left flex-1">
//                 <h2 className="text-3xl font-bold text-gray-900">
//                   +{user.name}
//                 </h2>
//                 <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-2 mt-1">
//                   <Mail size={16} /> {user.email}
//                 </p>
//               </div>

//               <button className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:shadow-xl transform hover:scale-105 transition flex items-center gap-2">
//                 <Edit3 size={20} />
//                 Edit Profile
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 bg-gray-50 rounded-2xl p-6">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                   <User className="text-blue-600" size={24} />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Full Name</p>
//                   <p className="font-semibold text-gray-900">{user.name}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                   <Phone className="text-green-600" size={24} />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-600">Phone</p>
//                   <p className="font-semibold text-gray-900">
//                     {user.phone || "Not added"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
///////////////// 27--11
// src/user-dashboard/ProfilePage.tsx
import { motion } from "framer-motion";
import {
  Edit3,
  User,
  Mail,
  Phone,
  Shield,
  Package,
  MapPin,
  ChevronRight,
  Home,
  Building2,
  AlertCircle,
} from "lucide-react";
import DashboardSkeleton from "../shared/DashboardSkeleton";
import { useAuth } from "../context/Auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface Address {
  _id: string;
  type: string;
  address: string;
  isDefault: boolean;
}

interface Order {
  _id: string;
  orderId: string;
  createdAt: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  totalAmount: number;
  currency?: string;
}

export default function ProfilePage() {
  const { user } = useAuth();

  // Fetch Orders
  const {
    data: orders = [],
    isLoading: ordersLoading,
    isError: ordersError,
  } = useQuery<Order[]>({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const res = await axios.get<{ orders: Order[] }>(
        `${API_URL}/api/orders/my-orders`
      );
      return res.data.orders;
    },
  });

  // Fetch Addresses
  const {
    data: addresses = [],
    isLoading: addressesLoading,
    isError: addressesError,
  } = useQuery<Address[]>({
    queryKey: ["my-addresses"],
    queryFn: async () => {
      const res = await axios.get<{ addresses: Address[] }>(
        `${API_URL}/api/addresses`
      );
      return res.data.addresses;
    },
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center sm:text-left"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3 justify-center sm:justify-start">
            <Shield className="text-blue-600" size={36} />
            My Account
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your profile, orders, and delivery addresses
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-linear-to-r from-blue-600 to-indigo-700 h-32" />
              <div className="relative px-6 pb-8 -mt-14">
                <div className="flex flex-col items-center sm:items-start">
                  <div className="w-28 h-28 bg-white rounded-full shadow-2xl p-1.5">
                    <div className="w-full h-full bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                      <User />
                    </div>
                  </div>

                  <div className="mt-5 text-center sm:text-left w-full">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {user.name}
                    </h2>
                    <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-2 mt-1 text-sm">
                      <Mail size={16} /> {user.email}
                    </p>
                    {user.phone && (
                      <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-2 mt-2 text-sm">
                        <Phone size={16} /> {user.phone}
                      </p>
                    )}
                  </div>

                  <button className="mt-6 w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 px-5 rounded-xl font-medium hover:shadow-xl transform hover:scale-105 transition flex items-center justify-center gap-2">
                    <Edit3 size={18} />
                    Edit Profile
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-50 rounded-xl py-3">
                    <p className="text-2xl font-bold text-blue-600">
                      {ordersLoading ? "..." : orders.length}
                    </p>
                    <p className="text-xs text-gray-600">Total Orders</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl py-3">
                    <p className="text-2xl font-bold text-green-600">
                      {addressesLoading ? "..." : addresses.length}
                    </p>
                    <p className="text-xs text-gray-600">Saved Addresses</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Orders & Addresses */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <Package className="text-blue-600" size={24} />
                  Recent Orders
                </h3>
                <button className="text-blue-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  View All <ChevronRight size={16} />
                </button>
              </div>

              {ordersLoading && (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-20 bg-gray-100 rounded-xl animate-pulse"
                    />
                  ))}
                </div>
              )}

              {ordersError && (
                <div className="text-center py-8 text-gray-500 flex flex-col items-center gap-3">
                  <AlertCircle size={40} className="text-red-400" />
                  <p>Failed to load orders</p>
                </div>
              )}

              {!ordersLoading && !ordersError && orders.length === 0 && (
                <p className="text-center py-10 text-gray-500">
                  No orders yet. Start shopping!
                </p>
              )}

              {!ordersLoading && !ordersError && orders.length > 0 && (
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {order.orderId}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">
                          ₹{order.totalAmount.toLocaleString("en-IN")}
                        </p>
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button className="mt-6 w-full border-2 border-dashed border-gray-300 text-gray-600 py-4 rounded-xl font-medium hover:border-blue-400 hover:text-blue-600 transition">
                View Full Order History
              </button>
            </div>

            {/* Delivery Addresses */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <MapPin className="text-green-600" size={24} />
                  Delivery Addresses
                </h3>
                <button className="text-green-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Manage <ChevronRight size={16} />
                </button>
              </div>

              {addressesLoading && (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-24 bg-gray-100 rounded-xl animate-pulse"
                    />
                  ))}
                </div>
              )}

              {addressesError && (
                <div className="text-center py-8 text-gray-500 flex flex-col items-center gap-3">
                  <AlertCircle size={40} className="text-red-400" />
                  <p>Failed to load addresses</p>
                </div>
              )}

              {!addressesLoading &&
                !addressesError &&
                addresses.length === 0 && (
                  <p className="text-center py-10 text-gray-500">
                    No addresses saved yet
                  </p>
                )}

              {!addressesLoading && !addressesError && addresses.length > 0 && (
                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr._id}
                      className={`p-4 rounded-xl border-2 ${
                        addr.isDefault
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {addr.type.toLowerCase().includes("home") ? (
                            <Home className="h-5 w-5 text-gray-600 mt-0.5" />
                          ) : (
                            <Building2 className="h-5 w-5 text-gray-600 mt-0.5" />
                          )}
                          <div>
                            <p className="font-semibold text-gray-900 flex items-center gap-2">
                              {addr.type}
                              {addr.isDefault && (
                                <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                              {addr.address}
                            </p>
                          </div>
                        </div>
                        <button className="text-gray-500 hover:text-gray-700">
                          <Edit3 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button className="mt-6 w-full border-2 border-dashed border-gray-300 text-gray-600 py-4 rounded-xl font-medium hover:border-green-400 hover:text-green-600 transition">
                + Add New Address
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
