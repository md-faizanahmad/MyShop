// import {
//   Home,
//   Building2,
//   Plus,
//   MapPin,
//   Phone,
//   MoreHorizontal,
//   Check,
// } from "lucide-react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import type { Address } from "../../types/address";
// import { Link } from "react-router-dom";

// const API_URL = import.meta.env.VITE_API_URL as string;

// export default function ProfileAddresses() {
//   const { data, isLoading, isFetching, isError } = useQuery<Address[]>({
//     queryKey: ["my-addresses"],
//     queryFn: async () => {
//       const res = await axios.get<{ addresses: Address[] }>(
//         `${API_URL}/v1/addresses`,
//         { withCredentials: true },
//       );
//       return res.data.addresses;
//     },
//     staleTime: 30_000,
//   });

//   const addresses = Array.isArray(data) ? data : [];

//   return (
//     <div className=" mt-8 md:mt-0 lg:mt-0 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//       {/* Header */}
//       <div className="p-4 sm:p-6 border-b border-gray-50 flex items-center justify-between bg-white">
//         <div>
//           <h3 className="text-lg font-bold text-gray-900">
//             Delivery Addresses
//           </h3>
//           <p className="text-xs text-gray-500">
//             Manage where your orders are shipped
//           </p>
//         </div>

//         <button className="flex  items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-sky-700 transition-colors shadow-sm shadow-blue-200">
//           <Link
//             to="/addresses"
//             className="flex items-center text-white hover:text-white"
//           >
//             <Plus size={14} strokeWidth={3} />
//             ADD NEW
//           </Link>
//         </button>
//       </div>

//       <div className="p-4 sm:p-6">
//         {/* Loading / Fetching State */}
//         {(isLoading || isFetching) && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {[1, 2].map((i) => (
//               <div
//                 key={i}
//                 className="h-32 bg-gray-50 rounded-xl animate-pulse border border-gray-100"
//               />
//             ))}
//           </div>
//         )}

//         {/* Error State */}
//         {!isLoading && isError && (
//           <div className="flex flex-col items-center py-10 bg-red-50 rounded-2xl border border-red-100">
//             <p className="text-sm text-red-600 font-medium">
//               Failed to sync addresses
//             </p>
//           </div>
//         )}

//         {/* Empty State */}
//         {!isLoading && !isError && addresses.length === 0 && (
//           <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
//             <div className="p-3 bg-gray-50 rounded-full mb-3">
//               <MapPin size={24} className="text-gray-400" />
//             </div>
//             <p className="text-sm text-gray-500 font-medium">
//               No saved addresses yet.
//             </p>
//           </div>
//         )}

//         {/* List: Mobile-First Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {!isLoading &&
//             !isError &&
//             addresses.map((addr) => (
//               <div
//                 key={addr._id}
//                 className={`relative flex flex-col p-4 rounded-xl border transition-all duration-200 ${
//                   addr.isDefault
//                     ? "border-blue-200 bg-blue-50/40 ring-1 ring-blue-100"
//                     : "border-gray-100 bg-white hover:border-gray-300"
//                 }`}
//               >
//                 <div className="flex items-start justify-between mb-3">
//                   <div className="flex items-center gap-2">
//                     <div
//                       className={`p-1.5 rounded-lg ${addr.isDefault ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}
//                     >
//                       {addr.isDefault ? (
//                         <Home size={14} />
//                       ) : (
//                         <Building2 size={14} />
//                       )}
//                     </div>
//                     <span className="text-sm font-bold text-gray-900 truncate max-w-[120px]">
//                       {addr.fullName}
//                     </span>
//                   </div>

//                   <button className="text-gray-400 hover:text-gray-600 p-1">
//                     <MoreHorizontal size={18} />
//                   </button>
//                 </div>

//                 <div className="space-y-1">
//                   <p className="text-xs sm:text-sm text-gray-600 leading-snug line-clamp-2">
//                     {addr.street}
//                     {addr.landmark && `, ${addr.landmark}`}
//                   </p>
//                   <p className="text-xs sm:text-sm font-semibold text-gray-800">
//                     {addr.city}, {addr.state} {addr.pincode}
//                   </p>

//                   <div className="flex items-center gap-1.5 text-[11px] text-gray-500 pt-2 font-medium">
//                     <Phone size={12} className="text-gray-400" />
//                     {addr.phone}
//                   </div>
//                 </div>

//                 {/* Status Badge & Actions */}
//                 <div className="mt-4 pt-3 border-t border-gray-100/60 flex items-center justify-between">
//                   {addr.isDefault ? (
//                     <span className="flex items-center gap-1 text-[10px] font-bold text-blue-700 uppercase tracking-tighter">
//                       <Check size={10} strokeWidth={4} /> Default Address
//                     </span>
//                   ) : (
//                     <button className="text-[10px] font-bold text-gray-400 hover:text-blue-600 uppercase tracking-tighter">
//                       Set as Default
//                     </button>
//                   )}

//                   <div className="flex gap-3">
//                     <button className="text-[11px] font-bold text-gray-700 hover:text-blue-600 transition-colors uppercase">
//                       Edit
//                     </button>
//                     <button className="text-[11px] font-bold text-red-500 hover:text-red-700 transition-colors uppercase">
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }
///////////////////////// refactor and update 27-08
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
import { Link } from "react-router-dom";

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
    <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-zinc-100 px-4 py-4 sm:px-5">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-zinc-900">
            Delivery Addresses
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500">
            Manage where your orders are shipped
          </p>
        </div>

        <Link
          to="/addresses"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
        >
          <Plus size={14} strokeWidth={2.5} />
          <span className="hidden xs:inline sm:inline">Add New</span>
        </Link>
      </div>

      <div className="p-4 sm:p-5">
        {/* Loading / Fetching State */}
        {(isLoading || isFetching) && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-xl border border-zinc-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 animate-pulse rounded-lg bg-zinc-100" />

                  <div className="flex-1">
                    <div className="h-4 w-28 animate-pulse rounded bg-zinc-100" />
                    <div className="mt-2 h-3 w-20 animate-pulse rounded bg-zinc-100" />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-zinc-100" />
                  <div className="h-3 w-3/4 animate-pulse rounded bg-zinc-100" />
                  <div className="mt-3 h-3 w-24 animate-pulse rounded bg-zinc-100" />
                </div>

                <div className="mt-4 border-t border-zinc-100 pt-3">
                  <div className="h-3 w-32 animate-pulse rounded bg-zinc-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && isError && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50/60 px-5 py-10 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <MapPin size={18} className="text-red-500" />
            </div>

            <p className="text-sm font-medium text-zinc-800">
              Unable to load addresses
            </p>

            <p className="mt-1 text-xs text-red-600">
              Failed to sync addresses
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && addresses.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 px-5 py-10 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
              <MapPin size={21} className="text-zinc-400" />
            </div>

            <p className="text-sm font-medium text-zinc-800">
              No saved addresses
            </p>

            <p className="mt-1 max-w-xs text-xs text-zinc-500">
              Add an address to make checkout faster next time.
            </p>
          </div>
        )}

        {/* Address List */}
        {!isLoading && !isError && addresses.length > 0 && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className={`relative rounded-xl border p-4 transition-colors ${
                  addr.isDefault
                    ? "border-sky-200 bg-sky-50/40"
                    : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/40"
                }`}
              >
                {/* Address Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        addr.isDefault
                          ? "bg-sky-600 text-white"
                          : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      {addr.isDefault ? (
                        <Home size={16} />
                      ) : (
                        <Building2 size={16} />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-zinc-900">
                        {addr.fullName}
                      </p>

                      {addr.isDefault && (
                        <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-sky-700">
                          <Check size={11} strokeWidth={3} />
                          Default address
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="shrink-0 rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                {/* Address Details */}
                <div className="mt-4 space-y-1.5">
                  <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600">
                    {addr.street}
                    {addr.landmark && `, ${addr.landmark}`}
                  </p>

                  <p className="text-sm font-medium text-zinc-800">
                    {addr.city}, {addr.state} {addr.pincode}
                  </p>

                  <div className="flex items-center gap-1.5 pt-1 text-xs text-zinc-500">
                    <Phone size={13} className="shrink-0 text-zinc-400" />
                    <span>{addr.phone}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-zinc-100 pt-3">
                  {addr.isDefault ? (
                    <span className="text-xs font-medium text-sky-700">
                      Ready for delivery
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="text-xs font-medium text-zinc-500 transition-colors hover:text-sky-600"
                    >
                      Set as default
                    </button>
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="text-xs font-semibold text-zinc-600 transition-colors hover:text-sky-600"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="text-xs font-semibold text-red-500 transition-colors hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
