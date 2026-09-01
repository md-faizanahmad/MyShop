// ///////////////////// Updated ui ux
// // src/user-dashboard/AddressesPage.tsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { Plus, Edit, Trash2, MapPin, Home } from "lucide-react";
// import { toast } from "react-toastify";
// import EditAddressModal from "./EditAddressModal";
// import AddAddressModal from "./AddAddressModal";

// const API = import.meta.env.VITE_API_URL;

// interface Address {
//   _id: string;
//   fullName: string;
//   phone: string;
//   street: string;
//   city: string;
//   state: string;
//   pincode: string;
//   landmark?: string;
//   isDefault: boolean;
// }

// export default function AddressesPage() {
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isAddOpen, setIsAddOpen] = useState(false);
//   const [editingAddress, setEditingAddress] = useState<Address | null>(null);
//   const [isEditOpen, setIsEditOpen] = useState(false);

//   const loadAddresses = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get<{
//         success: boolean;
//         addresses: Address[];
//       }>(`${API}/v1/addresses`, { withCredentials: true });
//       setAddresses(data.addresses || []);
//     } catch {
//       toast.error("Failed to load addresses");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAddresses();
//   }, []);

//   const deleteAddress = async (id: string) => {
//     try {
//       await axios.delete(`${API}/v1/addresses/${id}`, {
//         withCredentials: true,
//       });
//       toast.success("Address removed");
//       setAddresses((prev) => prev.filter((a) => a._id !== id));
//     } catch {
//       toast.error("Failed to delete address");
//     }
//   };

//   const setDefault = async (id: string) => {
//     try {
//       await axios.put(
//         `${API}/v1/addresses/default/${id}`,
//         {},
//         { withCredentials: true },
//       );
//       toast.success("Default address updated");
//       loadAddresses();
//     } catch {
//       toast.error("Failed to set default");
//     }
//   };

//   const openEdit = (addr: Address) => {
//     setEditingAddress(addr);
//     setIsEditOpen(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="w-full bg-transparent pb-3 border-b border-zinc-200 mb-5 text-left antialiased"
//         >
//           <h5 className="text-sm font-bold text-zinc-900 flex items-center gap-2 justify-start uppercase tracking-wider">
//             {/* <MapPin className="text-blue-600" size={40} /> */}
//             Your Addresses
//           </h5>
//           <p className="text-xs text-zinc-500 mt-1 font-normal">
//             Manage your delivery locations
//           </p>
//         </motion.div>
//         {/* Add Button */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="mb-4 text-left antialiased"
//         >
//           <button
//             onClick={() => setIsAddOpen(true)}
//             className="inline-flex items-center gap-2 h-9 px-3 border border-zinc-300 bg-white text-zinc-900 text-xs font-bold uppercase tracking-wider hover:bg-zinc-50 transition-colors select-none"
//           >
//             <Plus size={13} strokeWidth={2.5} />
//             Add New Address
//           </button>
//         </motion.div>
//         {/* Loading State */}
//         {loading && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {[1, 2].map((i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
//               >
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className="w-14 h-14 bg-gray-200 rounded-full" />
//                   <div className="space-y-3 flex-1">
//                     <div className="h-5 bg-gray-200 rounded w-48" />
//                     <div className="h-4 bg-gray-200 rounded w-32" />
//                   </div>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="h-4 bg-gray-200 rounded w-full" />
//                   <div className="h-4 bg-gray-200 rounded w-4/5" />
//                   <div className="h-10 bg-gray-200 rounded-xl w-32 mt-6" />
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//         {/* Empty State */}
//         {!loading && addresses.length === 0 && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="text-center py-24"
//           >
//             <div className="inline-block bg-white rounded-3xl shadow-xl p-12">
//               <MapPin size={90} className="mx-auto text-gray-300 mb-8" />
//               <p className="text-2xl font-medium text-gray-700 mb-4">
//                 No addresses added yet
//               </p>
//               <p className="text-gray-500 mb-8">
//                 Add your first delivery address to get started!
//               </p>
//               <button
//                 onClick={() => setIsAddOpen(true)}
//                 className="inline-flex items-center gap-3 bg-linear-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition"
//               >
//                 <Plus size={24} />
//                 Add Address
//               </button>
//             </div>
//           </motion.div>
//         )}
//         {/* Addresses List */}
//         {/* {!loading && addresses.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="grid grid-cols-1 md:grid-cols-2 gap-6"
//           >
//             <AnimatePresence mode="popLayout">
//               {addresses.map((addr, index) => (
//                 <motion.div
//                   key={addr._id}
//                   layout
//                   initial={{ opacity: 0, y: 30, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, x: -100, scale: 0.9 }}
//                   transition={{ delay: index * 0.08 }}
//                   className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
//                     addr.isDefault ? "border-green-500" : "border-transparent"
//                   }`}
//                 >
//                   {addr.isDefault && (
//                     <div className="absolute top-0 right-0 bg-linear-to-br from-green-500 to-emerald-600 text-white px-6 py-2 rounded-bl-2xl font-semibold text-sm flex items-center gap-2">
//                       <Home size={16} />
//                       Default
//                     </div>
//                   )}

//                   <div className="p-6">
//                     <div className="flex items-start gap-4">
//                       <div
//                         className={`w-14 h-14 rounded-full flex items-center justify-center ${
//                           addr.isDefault ? "bg-green-100" : "bg-blue-100"
//                         }`}
//                       >
//                         <MapPin
//                           className={
//                             addr.isDefault ? "text-green-600" : "text-blue-600"
//                           }
//                           size={28}
//                         />
//                       </div>

//                       <div className="flex-1">
//                         <h3 className="text-xl font-bold text-gray-900">
//                           {addr.fullName}
//                         </h3>
//                         <p className="text-gray-600 mt-1">{addr.phone}</p>

//                         <p className="text-gray-700 mt-3 text-sm leading-relaxed">
//                           {addr.street}, {addr.city},<br />
//                           {addr.state} - {addr.pincode}
//                           {addr.landmark && (
//                             <span className="block text-gray-500 mt-1">
//                               Near {addr.landmark}
//                             </span>
//                           )}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex flex-wrap gap-3 mt-6">
//                       <button
//                         onClick={() => openEdit(addr)}
//                         className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition"
//                       >
//                         <Edit size={18} />
//                         Edit
//                       </button>

//                       <button
//                         onClick={() => deleteAddress(addr._id)}
//                         className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition"
//                       >
//                         <Trash2 size={18} />
//                         Delete
//                       </button>

//                       {!addr.isDefault && (
//                         <button
//                           onClick={() => setDefault(addr._id)}
//                           className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
//                         >
//                           Set as Default
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         )} */}
//         {/* /// new design */}
//         {!loading && addresses.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left antialiased"
//           >
//             <AnimatePresence mode="popLayout">
//               {addresses.map((addr, index) => (
//                 <motion.div
//                   key={addr._id}
//                   layout
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.98 }}
//                   transition={{ delay: index * 0.05 }}
//                   className={`relative bg-white border p-4 transition-colors ${
//                     addr.isDefault ? "border-sky-500900" : "border-zinc-200"
//                   }`}
//                 >
//                   {/* Top Identifier Row */}
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">
//                       Address Location Block
//                     </span>
//                     {addr.isDefault && (
//                       <span className="bg-zinc-900 text-white text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 font-bold flex items-center gap-1">
//                         <Home size={10} />
//                         Default Selection
//                       </span>
//                     )}
//                   </div>

//                   {/* Customer Shipping Credentials */}
//                   <div className="space-y-1">
//                     <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wide">
//                       {addr.fullName}
//                     </h3>
//                     <p className="text-xs font-mono text-zinc-500">
//                       {addr.phone}
//                     </p>
//                   </div>

//                   {/* Postal Address Geometry Block */}
//                   <p className="text-xs text-zinc-600 mt-2.5 leading-relaxed font-normal">
//                     {addr.street}, {addr.city},<br />
//                     {addr.state} —{" "}
//                     <span className="font-mono">{addr.pincode}</span>
//                     {addr.landmark && (
//                       <span className="block text-zinc-400 mt-0.5 text-[11px]">
//                         Near: Near {addr.landmark}
//                       </span>
//                     )}
//                   </p>

//                   {/* Retail Control Trigger Row */}
//                   <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-zinc-100">
//                     <button
//                       onClick={() => openEdit(addr)}
//                       className="text-[9px] font-bold text-zinc-600 hover:text-zinc-900 transition-colors flex items-center gap-1 uppercase"
//                     >
//                       <Edit size={11} />
//                       <span>Edit</span>
//                     </button>

//                     <button
//                       onClick={() => deleteAddress(addr._id)}
//                       className="text-[9px] font-bold text-red-700 hover:text-red-800 transition-colors flex items-center gap-1 uppercase"
//                     >
//                       <Trash2 size={11} />
//                       <span>Delete</span>
//                     </button>

//                     {!addr.isDefault && (
//                       <button
//                         onClick={() => setDefault(addr._id)}
//                         className="text-[11px] font-mono text-sky-600 hover:text-sky-700 font-bold ml-auto uppercase tracking-wide"
//                       >
//                         Set As Default
//                       </button>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         )}
//       </div>

//       {/* Modals */}
//       <AddAddressModal
//         open={isAddOpen}
//         onClose={() => setIsAddOpen(false)}
//         onAdded={loadAddresses}
//       />

//       {editingAddress && (
//         <EditAddressModal
//           open={isEditOpen}
//           address={editingAddress}
//           onClose={() => {
//             setIsEditOpen(false);
//             setEditingAddress(null);
//           }}
//           onUpdated={loadAddresses}
//         />
//       )}
//     </div>
//   );
// }
//////////////////////// refactor and udpate 27-08
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MapPin, Edit, Trash } from "lucide-react";
import { toast } from "react-toastify";
import EditAddressModal from "./EditAddressModal";
import AddAddressModal from "./AddAddressModal";

const API = import.meta.env.VITE_API_URL;

interface Address {
  _id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<{
        success: boolean;
        addresses: Address[];
      }>(`${API}/v1/addresses`, { withCredentials: true });
      setAddresses(data.addresses || []);
    } catch {
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const deleteAddress = async (id: string) => {
    try {
      await axios.delete(`${API}/v1/addresses/${id}`, {
        withCredentials: true,
      });
      toast.success("Address removed");
      setAddresses((prev) => prev.filter((a) => a._id !== id));
    } catch {
      toast.error("Failed to delete address");
    }
  };

  const setDefault = async (id: string) => {
    try {
      await axios.put(
        `${API}/v1/addresses/default/${id}`,
        {},
        { withCredentials: true },
      );
      toast.success("Default address updated");
      loadAddresses();
    } catch {
      toast.error("Failed to set default");
    }
  };

  const openEdit = (addr: Address) => {
    setEditingAddress(addr);
    setIsEditOpen(true);
  };

  return (
    <div className="min-h-screen  px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-5 border-b border-zinc-200 pb-3"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <h5 className="text-sm font-bold tracking-wide text-zinc-900">
                Your Addresses
              </h5>
              <p className="mt-1 text-xs text-zinc-500">
                Manage your delivery locations
              </p>
            </div>

            <MapPin
              size={18}
              strokeWidth={1.8}
              className="shrink-0 text-sky-600"
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* Add Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-5"
        >
          <button
            onClick={() => setIsAddOpen(true)}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-sky-600 px-3.5 text-xs font-semibold text-white transition hover:bg-sky-700 active:scale-[0.98]"
          >
            <Plus size={14} strokeWidth={2.5} />
            Add New Address
          </button>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                className="animate-pulse border border-zinc-200 bg-white p-4"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-md bg-zinc-100" />

                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-32 rounded bg-zinc-100" />
                    <div className="h-3 w-24 rounded bg-zinc-100" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-zinc-100" />
                  <div className="h-3 w-4/5 rounded bg-zinc-100" />
                </div>

                <div className="mt-4 border-t border-zinc-100 pt-3">
                  <div className="h-3 w-24 rounded bg-zinc-100" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && addresses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-dashed border-zinc-300 bg-white px-5 py-12 text-center"
          >
            <MapPin
              size={30}
              strokeWidth={1.5}
              className="mx-auto mb-3 text-zinc-300"
            />

            <p className="text-sm font-semibold text-zinc-800">
              No addresses added yet
            </p>

            <p className="mx-auto mt-1.5 max-w-xs text-xs leading-relaxed text-zinc-500">
              Add a delivery address to make checkout faster.
            </p>

            <button
              onClick={() => setIsAddOpen(true)}
              className="mt-5 inline-flex h-9 items-center gap-2 rounded-md bg-sky-600 px-4 text-xs font-semibold text-white transition hover:bg-sky-700 active:scale-[0.98]"
            >
              <Plus size={14} />
              Add Address
            </button>
          </motion.div>
        )}

        {/* Addresses List */}
        {!loading && addresses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-3 text-left md:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {addresses.map((addr, index) => (
                <motion.div
                  key={addr._id}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`border bg-white p-4 ${
                    addr.isDefault ? "border-sky-300" : "border-zinc-200"
                  }`}
                >
                  {/* Name + Default */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-zinc-900">
                          {addr.fullName}
                        </h3>

                        {addr.isDefault && (
                          <span className="rounded-sm bg-sky-50 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-sky-700">
                            Default
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs text-zinc-500">{addr.phone}</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mt-3">
                    <p className="text-sm leading-5 text-zinc-700">
                      {addr.street}, {addr.city}, {addr.state}{" "}
                      <span className="font-medium text-zinc-900">
                        - {addr.pincode}
                      </span>
                    </p>

                    {addr.landmark && (
                      <p className="mt-1 text-xs text-zinc-500">
                        Landmark: {addr.landmark}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-zinc-100 pt-3">
                    <button
                      type="button"
                      onClick={() => openEdit(addr)}
                      className="text-xs font-medium text-zinc-700 transition-colors hover:text-sky-600"
                    >
                      Edit <Edit />
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteAddress(addr._id)}
                      className="text-xs font-medium text-zinc-500 transition-colors hover:text-red-600"
                    >
                      Delete <Trash />
                    </button>

                    {!addr.isDefault && (
                      <button
                        type="button"
                        onClick={() => setDefault(addr._id)}
                        className="ml-auto text-xs font-medium text-sky-600 transition-colors hover:text-sky-700"
                      >
                        Set as default
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Modals */}
        <AddAddressModal
          open={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onAdded={loadAddresses}
        />

        {editingAddress && (
          <EditAddressModal
            open={isEditOpen}
            address={editingAddress}
            onClose={() => {
              setIsEditOpen(false);
              setEditingAddress(null);
            }}
            onUpdated={loadAddresses}
          />
        )}
      </div>
    </div>
  );
}
