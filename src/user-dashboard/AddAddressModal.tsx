import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import type { Address } from "../types/address";

const API = import.meta.env.VITE_API_URL;

interface Props {
  open: boolean;
  onClose: () => void;
  onAdded: () => void;
}

export default function AddAddressModal({ open, onClose, onAdded }: Props) {
  const [form, setForm] = useState<Omit<Address, "_id" | "isDefault">>({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  if (!open) return null;

  async function addNewAddress(e: React.FormEvent) {
    e.preventDefault();

    try {
      await axios.post(`${API}/v1/addresses/add`, form, {
        withCredentials: true,
      });

      toast.success("Address added!");
      onAdded();
      onClose();
    } catch {
      toast.error("Failed to add address");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-999 p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 hover:bg-gray-200 rounded-full"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">Add New Address</h2>

        <form
          onSubmit={addNewAddress}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            className="border p-2 rounded"
            required
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            required
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            className="border p-2 rounded col-span-2"
            required
            placeholder="Street"
            value={form.street}
            onChange={(e) => setForm({ ...form, street: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            required
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            required
            placeholder="State"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            required
            placeholder="Pincode"
            value={form.pincode}
            onChange={(e) => setForm({ ...form, pincode: e.target.value })}
          />

          <input
            className="border p-2 rounded col-span-2"
            placeholder="Landmark (Optional)"
            value={form.landmark}
            onChange={(e) => setForm({ ...form, landmark: e.target.value })}
          />

          <div className="col-span-2 flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Add Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
