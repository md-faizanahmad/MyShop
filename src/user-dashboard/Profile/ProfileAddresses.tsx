import {
  Home,
  Building2,
  Plus,
  MapPin,
  Phone,
  MoreHorizontal,
  Check,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Address } from "../../types/address";

const API_URL = import.meta.env.VITE_API_URL as string;

export default function ProfileAddresses() {
  const { data, isLoading, isFetching, isError } = useQuery<Address[]>({
    queryKey: ["my-addresses"],
    queryFn: async () => {
      const res = await axios.get<{ addresses: Address[] }>(
        `${API_URL}/v1/addresses`,
        { withCredentials: true },
      );
      return res.data.addresses;
    },
    staleTime: 30_000,
  });

  const addresses = Array.isArray(data) ? data : [];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-50 flex items-center justify-between bg-white">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Delivery Addresses
          </h3>
          <p className="text-xs text-gray-500">
            Manage where your orders are shipped
          </p>
        </div>

        <button className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
          <Plus size={14} strokeWidth={3} />
          ADD NEW
        </button>
      </div>

      <div className="p-4 sm:p-6">
        {/* Loading / Fetching State */}
        {(isLoading || isFetching) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-32 bg-gray-50 rounded-xl animate-pulse border border-gray-100"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && isError && (
          <div className="flex flex-col items-center py-10 bg-red-50 rounded-2xl border border-red-100">
            <p className="text-sm text-red-600 font-medium">
              Failed to sync addresses
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && addresses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
            <div className="p-3 bg-gray-50 rounded-full mb-3">
              <MapPin size={24} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 font-medium">
              No saved addresses yet.
            </p>
          </div>
        )}

        {/* List: Mobile-First Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!isLoading &&
            !isError &&
            addresses.map((addr) => (
              <div
                key={addr._id}
                className={`relative flex flex-col p-4 rounded-xl border transition-all duration-200 ${
                  addr.isDefault
                    ? "border-blue-200 bg-blue-50/40 ring-1 ring-blue-100"
                    : "border-gray-100 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1.5 rounded-lg ${addr.isDefault ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}
                    >
                      {addr.isDefault ? (
                        <Home size={14} />
                      ) : (
                        <Building2 size={14} />
                      )}
                    </div>
                    <span className="text-sm font-bold text-gray-900 truncate max-w-[120px]">
                      {addr.fullName}
                    </span>
                  </div>

                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-gray-600 leading-snug line-clamp-2">
                    {addr.street}
                    {addr.landmark && `, ${addr.landmark}`}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-gray-800">
                    {addr.city}, {addr.state} {addr.pincode}
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 pt-2 font-medium">
                    <Phone size={12} className="text-gray-400" />
                    {addr.phone}
                  </div>
                </div>

                {/* Status Badge & Actions */}
                <div className="mt-4 pt-3 border-t border-gray-100/60 flex items-center justify-between">
                  {addr.isDefault ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-700 uppercase tracking-tighter">
                      <Check size={10} strokeWidth={4} /> Default Address
                    </span>
                  ) : (
                    <button className="text-[10px] font-bold text-gray-400 hover:text-blue-600 uppercase tracking-tighter">
                      Set as Default
                    </button>
                  )}

                  <div className="flex gap-3">
                    <button className="text-[11px] font-bold text-gray-700 hover:text-blue-600 transition-colors uppercase">
                      Edit
                    </button>
                    <button className="text-[11px] font-bold text-red-500 hover:text-red-700 transition-colors uppercase">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
