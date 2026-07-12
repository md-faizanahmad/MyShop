// import { motion } from "framer-motion";
// import {
//   Edit3,
//   User,
//   Mail,
//   Phone,
//   Shield,
//   Settings,
//   Package,
//   MapPin,
//   ChevronRight,
//   // Key,
// } from "lucide-react";
// import type { Order } from "../../types/order";
// import ProfileRecentOrders from "../ProfileRecentOrders";
// import { useState } from "react";
// import ProfileEditModal from "./EditProfileModal";
// import ProfileAddresses from "./ProfileAddresses";
// import { Link } from "react-router-dom";

// interface Props {
//   user: { name?: string; email?: string; phone?: string };
//   orders: Order[];
//   ordersLoading: boolean;
//   ordersError: boolean;
// }

// export default function ProfilePageView({
//   user,
//   orders,
//   ordersLoading,
//   ordersError,
// }: Props) {
//   const [showEdit, setShowEdit] = useState(false);

//   return (
//     <div className="min-h-screen bg-[#f8f9fa] pb-12">
//       {/* Top Branding Header - Mobile Optimized */}
//       <div className="bg-white border-b border-gray-100">
//         <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
//           <motion.div
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex flex-col md:flex-row md:items-center justify-between gap-4"
//           >
//             <div>
//               <div className="flex items-center gap-2 mb-1">
//                 <div className="p-1.5 bg-blue-50 rounded-lg">
//                   <Shield size={20} className="text-blue-600" />
//                 </div>
//                 <h1 className="text-2xl md:text-2xl font-black text-gray-900 tracking-tight">
//                   Account Dashboard
//                 </h1>
//               </div>
//               <p className="text-sm  text-gray-500 font-medium ml-9 md:ml-0">
//                 Manage your orders, addresses, and settings.
//               </p>
//             </div>

//             <button className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all">
//               <Settings size={16} /> Preferences
//             </button>
//           </motion.div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 mt-6">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//           {/* Left Column: Profile Card */}
//           <div className="lg:col-span-4 space-y-6">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//               {/* Profile Top Banner */}
//               <div className="h-20 bg-linear-to-r from-blue-600 to-indigo-700" />

//               <div className="px-6 pb-6 text-center">
//                 <div className="relative -mt-10 mb-4 inline-block">
//                   <div className="w-20 h-20 bg-white p-1 rounded-full shadow-md">
//                     <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
//                       <User size={32} />
//                     </div>
//                   </div>
//                 </div>

//                 <h2 className="text-xl font-bold text-gray-900 leading-tight">
//                   {user.name ?? "User Account"}
//                 </h2>
//                 <div className="mt-2 space-y-1.5">
//                   <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
//                     Contact Info
//                   </p>
//                   {user.email && (
//                     <div className="text-sm text-gray-600 flex items-center justify-center gap-2">
//                       <Mail size={14} className="text-gray-400" /> {user.email}
//                     </div>
//                   )}
//                   {user.phone && (
//                     <div className="text-sm text-gray-600 flex items-center justify-center gap-2">
//                       <Phone size={14} className="text-gray-400" /> {user.phone}
//                     </div>
//                   )}
//                 </div>

//                 <div className="mt-6 grid grid-cols-1 gap-2">
//                   <button
//                     onClick={() => setShowEdit(true)}
//                     className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors"
//                   >
//                     <Edit3 size={16} /> Edit Profile
//                   </button>
//                   {/* <button className="flex items-center justify-center gap-2 w-full text-gray-600 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors">
//                     <Key size={16} /> Security Settings
//                   </button> */}
//                 </div>
//               </div>
//             </div>

//             {/* Quick Navigation Links (Great for Mobile UX) */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 space-y-1">
//               {[
//                 {
//                   icon: <Package size={18} />,
//                   label: "My Orders",
//                   count: orders.length,
//                   to: "/orders",
//                 },
//                 {
//                   icon: <MapPin size={18} />,
//                   label: "Saved Addresses",
//                   count: null,
//                   to: "/addresses",
//                 },
//               ].map((link) => (
//                 <Link
//                   to={link.to}
//                   key={link.to}
//                   className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-all group"
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className="text-gray-400 group-hover:text-blue-600">
//                       {link.icon}
//                     </span>
//                     <span className="text-sm font-bold text-gray-700">
//                       {link.label}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     {link.count !== null && (
//                       <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full font-bold">
//                         {link.count}
//                       </span>
//                     )}
//                     <ChevronRight size={16} className="text-gray-300" />
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Right Column: Main Content */}
//           <div className="lg:col-span-8 space-y-6">
//             <ProfileRecentOrders
//               orders={orders}
//               loading={ordersLoading}
//               error={ordersError}
//             />
//             <ProfileAddresses />
//           </div>
//         </div>
//       </div>

//       {showEdit && (
//         <ProfileEditModal user={user} onClose={() => setShowEdit(false)} />
//       )}
//     </div>
//   );
// }

/////////////////////////////////////////////// New design 12072026
import {
  Edit3,
  User,
  Mail,
  Phone,
  Package,
  MapPin,
  ChevronRight,
  // Settings,
} from "lucide-react";
import type { Order } from "../../types/order";
import ProfileRecentOrders from "../ProfileRecentOrders";
import { useState } from "react";
import ProfileEditModal from "./EditProfileModal";
import ProfileAddresses from "./ProfileAddresses";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-zinc-50 pb-12 antialiased">
      {/* Top Breadcrumb Style Title Strip */}
      {/* <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              Portal
            </span>
            <span className="text-zinc-300 text-xs">/</span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
              {user.name} Profile
            </h3>
          </div>
          <button className="flex items-center gap-1.5 px-2.5 py-1 border border-zinc-200 text-[11px] font-medium text-zinc-600 bg-white hover:bg-zinc-50 transition-colors">
            <Settings size={12} />
            <span>Preferences</span>
          </button>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Navigation Console (Flipkart/Amazon Compact Core) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Minimal Identity Matrix */}
            <div className="bg-white border border-zinc-200 p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-900 text-white flex items-center justify-center font-mono text-xs font-bold shrink-0">
                {user.name?.[0]?.toUpperCase() ?? <User size={14} />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">
                  Hello,
                </p>
                <h2 className="text-sm font-bold text-zinc-900 truncate leading-tight">
                  {user.name ?? "User Account"}
                </h2>
              </div>
            </div>

            {/* Core Info & Structural Navigation Stack */}
            <div className="bg-white border border-zinc-200 divide-y divide-zinc-100">
              {/* Account Data Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">
                    Profile Details
                  </span>
                  <button
                    onClick={() => setShowEdit(true)}
                    className="text-[10px] text-sky-600 hover:text-sky-700 font-bold flex items-center gap-1"
                  >
                    <Edit3 size={10} /> Edit
                  </button>
                </div>

                <div className="space-y-1.5 pt-1">
                  {user.email && (
                    <div className="text-xs text-zinc-600 flex items-center gap-2 truncate">
                      <Mail size={12} className="text-zinc-400 shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                  )}
                  {user.phone && (
                    <div className="text-xs text-zinc-600 flex items-center gap-2">
                      <Phone size={12} className="text-zinc-400 shrink-0" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Retail App Route Navigation */}
              <div className="p-1.5 space-y-0.5">
                {[
                  {
                    icon: <Package size={13} />,
                    label: "My Orders",
                    count: orders.length,
                    to: "/orders",
                  },
                  {
                    icon: <MapPin size={13} />,
                    label: "Saved Addresses",
                    count: null,
                    to: "/addresses",
                  },
                ].map((link) => (
                  <Link
                    to={link.to}
                    key={link.to}
                    className="flex items-center justify-between px-2.5 py-2 hover:bg-zinc-50 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-zinc-400 group-hover:text-zinc-900 transition-colors">
                        {link.icon}
                      </span>
                      <span className="text-xs font-bold text-zinc-700 group-hover:text-zinc-900">
                        {link.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {link.count !== null && (
                        <span className="text-[10px] font-mono bg-zinc-100 text-zinc-600 px-1.5 py-0.5 font-bold">
                          {link.count}
                        </span>
                      )}
                      <ChevronRight size={12} className="text-zinc-300" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Main Content Matrix - Expanded Layout Space */}
          <div className="lg:col-span-9 space-y-5">
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
