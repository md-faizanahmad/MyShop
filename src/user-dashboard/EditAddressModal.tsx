// src/user-dashboard/EditAddressModal.tsx
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import type { Address } from "../types/address";

const API = import.meta.env.VITE_API_URL;

interface EditAddressModalProps {
  open: boolean;
  onClose: () => void;
  address: Address;
  onUpdated: () => void;
}

interface AddressFormState {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
}

export default function EditAddressModal({
  open,
  onClose,
  address,
  onUpdated,
}: EditAddressModalProps) {
  const [form, setForm] = useState<AddressFormState>({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (address) {
      setForm({
        fullName: address.fullName,
        phone: address.phone,
        street: address.street,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        landmark: address.landmark ?? "",
      });
    }
  }, [address]);

  if (!open) return null;

  async function updateAddress(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;

    setSaving(true);
    try {
      await axios.put(`${API}/v1/addresses/update/${address._id}`, form, {
        withCredentials: true,
      });

      toast.success("Address updated!");
      onUpdated();
      onClose();
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
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

        <h2 className="text-xl font-bold mb-4">Edit Address</h2>

        <form
          onSubmit={updateAddress}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            value={form.fullName}
            onChange={(e) =>
              setForm((f) => ({ ...f, fullName: e.target.value }))
            }
            required
            className="border p-2 rounded"
            placeholder="Full Name"
          />

          <input
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            required
            className="border p-2 rounded"
            placeholder="Phone"
          />

          <input
            value={form.street}
            onChange={(e) => setForm((f) => ({ ...f, street: e.target.value }))}
            required
            className="border p-2 rounded col-span-2"
            placeholder="Street"
          />

          <input
            value={form.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            required
            className="border p-2 rounded"
            placeholder="City"
          />

          <input
            value={form.state}
            onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
            required
            className="border p-2 rounded"
            placeholder="State"
          />

          <input
            value={form.pincode}
            onChange={(e) =>
              setForm((f) => ({ ...f, pincode: e.target.value }))
            }
            required
            className="border p-2 rounded"
            placeholder="Pincode"
          />

          <input
            value={form.landmark}
            onChange={(e) =>
              setForm((f) => ({ ...f, landmark: e.target.value }))
            }
            className="border p-2 rounded col-span-2"
            placeholder="Landmark (Optional)"
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
              disabled={saving}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? "Saving changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
