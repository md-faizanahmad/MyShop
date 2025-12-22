import { X, Loader2 } from "lucide-react";
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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  function validate() {
    const errs: Record<string, string> = {};

    if (!form.fullName.trim()) errs.fullName = "Full name is required.";

    if (!/^[6-9]\d{9}$/.test(form.phone))
      errs.phone = "Enter a valid 10-digit phone number.";

    if (!form.street.trim()) errs.street = "Street is required.";
    if (!form.city.trim()) errs.city = "City is required.";
    if (!form.state.trim()) errs.state = "State is required.";

    if (!/^\d{6}$/.test(form.pincode))
      errs.pincode = "Pincode must be 6 digits.";

    return errs;
  }

  async function addNewAddress(e: React.FormEvent) {
    e.preventDefault();

    const validation = validate();
    setErrors(validation);

    if (Object.keys(validation).length > 0) return;

    setLoading(true);

    try {
      await axios.post(`${API}/v1/addresses/add`, form, {
        withCredentials: true,
      });

      toast.success("Address added successfully");
      onAdded();
      onClose();
    } catch {
      toast.error("Failed to add address");
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

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
          {/* Full Name */}
          <div className="col-span-1">
            <input
              className="border p-2 rounded w-full"
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Phone */}
          <div className="col-span-1">
            <input
              className="border p-2 rounded w-full"
              placeholder="Phone (10 digits)"
              value={form.phone}
              maxLength={10}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Street */}
          <div className="col-span-2">
            <input
              className="border p-2 rounded w-full"
              placeholder="Street"
              value={form.street}
              onChange={(e) => handleChange("street", e.target.value)}
            />
            {errors.street && (
              <p className="text-red-600 text-sm mt-1">{errors.street}</p>
            )}
          </div>

          {/* City */}
          <div className="col-span-1">
            <input
              className="border p-2 rounded w-full"
              placeholder="City"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
            {errors.city && (
              <p className="text-red-600 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          {/* State */}
          <div className="col-span-1">
            <input
              className="border p-2 rounded w-full"
              placeholder="State"
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
            />
            {errors.state && (
              <p className="text-red-600 text-sm mt-1">{errors.state}</p>
            )}
          </div>

          {/* Pincode */}
          <div className="col-span-1">
            <input
              className="border p-2 rounded w-full"
              placeholder="Pincode"
              maxLength={6}
              value={form.pincode}
              onChange={(e) => handleChange("pincode", e.target.value)}
            />
            {errors.pincode && (
              <p className="text-red-600 text-sm mt-1">{errors.pincode}</p>
            )}
          </div>

          {/* Landmark */}
          <div className="col-span-2">
            <input
              className="border p-2 rounded w-full"
              placeholder="Landmark (Optional)"
              value={form.landmark}
              onChange={(e) => handleChange("landmark", e.target.value)}
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="col-span-2 flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  Adding...
                </>
              ) : (
                "Add Address"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
