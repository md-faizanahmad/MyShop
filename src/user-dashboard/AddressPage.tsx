///////////////////// Updated ui ux
// src/user-dashboard/AddressesPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, MapPin, Home } from "lucide-react";
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
        { withCredentials: true }
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center lg:text-left mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 justify-center lg:justify-start">
            <MapPin className="text-blue-600" size={40} />
            My Addresses
          </h1>
          <p className="text-gray-600 mt-2">Manage your delivery locations</p>
        </motion.div>

        {/* Add Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <button
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-3 bg-linear-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            <Plus size={24} />
            Add New Address
          </button>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full" />
                  <div className="space-y-3 flex-1">
                    <div className="h-5 bg-gray-200 rounded w-48" />
                    <div className="h-4 bg-gray-200 rounded w-32" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-4/5" />
                  <div className="h-10 bg-gray-200 rounded-xl w-32 mt-6" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && addresses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="inline-block bg-white rounded-3xl shadow-xl p-12">
              <MapPin size={90} className="mx-auto text-gray-300 mb-8" />
              <p className="text-2xl font-medium text-gray-700 mb-4">
                No addresses added yet
              </p>
              <p className="text-gray-500 mb-8">
                Add your first delivery address to get started!
              </p>
              <button
                onClick={() => setIsAddOpen(true)}
                className="inline-flex items-center gap-3 bg-linear-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition"
              >
                <Plus size={24} />
                Add Address
              </button>
            </div>
          </motion.div>
        )}

        {/* Addresses List */}
        {!loading && addresses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {addresses.map((addr, index) => (
                <motion.div
                  key={addr._id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.9 }}
                  transition={{ delay: index * 0.08 }}
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                    addr.isDefault ? "border-green-500" : "border-transparent"
                  }`}
                >
                  {addr.isDefault && (
                    <div className="absolute top-0 right-0 bg-linear-to-br from-green-500 to-emerald-600 text-white px-6 py-2 rounded-bl-2xl font-semibold text-sm flex items-center gap-2">
                      <Home size={16} />
                      Default
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center ${
                          addr.isDefault ? "bg-green-100" : "bg-blue-100"
                        }`}
                      >
                        <MapPin
                          className={
                            addr.isDefault ? "text-green-600" : "text-blue-600"
                          }
                          size={28}
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">
                          {addr.fullName}
                        </h3>
                        <p className="text-gray-600 mt-1">{addr.phone}</p>

                        <p className="text-gray-700 mt-3 text-sm leading-relaxed">
                          {addr.street}, {addr.city},<br />
                          {addr.state} - {addr.pincode}
                          {addr.landmark && (
                            <span className="block text-gray-500 mt-1">
                              Near {addr.landmark}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-6">
                      <button
                        onClick={() => openEdit(addr)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition"
                      >
                        <Edit size={18} />
                        Edit
                      </button>

                      <button
                        onClick={() => deleteAddress(addr._id)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>

                      {!addr.isDefault && (
                        <button
                          onClick={() => setDefault(addr._id)}
                          className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

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
  );
}
