// // src/pages/checkout/CheckoutAddresses.tsx
// import type { Address } from "@/types/address";

// interface Props {
//   addresses: Address[];
//   selected: string;
//   onSelect: (id: string) => void;
// }

// export default function CheckoutAddresses({
//   addresses,
//   selected,
//   onSelect,
// }: Props) {
//   return (
//     <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
//       <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>

//       {addresses.length === 0 ? (
//         <p className="text-gray-500 text-sm">
//           No saved addresses. Please add one before checkout.
//         </p>
//       ) : (
//         <div className="space-y-4">
//           {addresses.map((a) => {
//             const isSelected = selected === a._id;

//             return (
//               <label
//                 key={a._id}
//                 htmlFor={`address-${a._id}`}
//                 className={`block rounded-xl border p-5 cursor-pointer transition
//                   ${
//                     isSelected
//                       ? "border-sky-600 bg-sky-50 ring-1 ring-sky-500/30"
//                       : "border-gray-300 hover:border-gray-400"
//                   }`}
//               >
//                 <div className="flex items-start gap-4">
//                   {/* Radio */}
//                   <input
//                     id={`address-${a._id}`}
//                     type="radio"
//                     name="shippingAddress"
//                     checked={isSelected}
//                     onChange={() => onSelect(a._id)}
//                     className="mt-1 accent-sky-600"
//                   />

//                   {/* Address Info */}
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 flex-wrap">
//                       <p className="font-semibold text-gray-900">
//                         {a.fullName}
//                       </p>

//                       {a.isDefault && (
//                         <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
//                           Default
//                         </span>
//                       )}
//                     </div>

//                     <p className="text-sm text-gray-600 mt-1 leading-relaxed">
//                       {a.street}, {a.city}, {a.state} – {a.pincode}
//                     </p>

//                     <p className="text-sm text-gray-700 mt-1">
//                       Phone: {a.phone}
//                     </p>
//                   </div>
//                 </div>
//               </label>
//             );
//           })}
//         </div>
//       )}
//     </section>
//   );
// }

import type { Address } from "@/types/address";

interface Props {
  addresses: Address[];
  selected: string;
  onSelect: (id: string) => void;
}

export default function CheckoutAddresses({
  addresses,
  selected,
  onSelect,
}: Props) {
  return (
    <section
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      aria-labelledby="delivery-address-title"
    >
      <header className="mb-4">
        <h2
          id="delivery-address-title"
          className="text-lg font-semibold text-slate-900"
        >
          Delivery Address
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Choose where you want your order delivered.
        </p>
      </header>

      {addresses.length === 0 ? (
        <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-500">
          No saved addresses. Please add one before checkout.
        </p>
      ) : (
        <div className="space-y-3">
          {addresses.map((a) => {
            const isSelected = selected === a._id;

            return (
              <label
                key={a._id}
                htmlFor={`address-${a._id}`}
                className={`block cursor-pointer rounded-lg border p-3.5 transition-colors sm:p-4 ${
                  isSelected
                    ? "border-sky-500 bg-sky-50/70"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    id={`address-${a._id}`}
                    type="radio"
                    name="shippingAddress"
                    checked={isSelected}
                    onChange={() => onSelect(a._id)}
                    className="mt-1.5 h-4 w-4 shrink-0 accent-sky-600"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-slate-900">
                        {a.fullName}
                      </span>

                      {a.isDefault && (
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                          Default
                        </span>
                      )}
                    </div>

                    <address className="mt-1.5 not-italic text-sm leading-5 text-slate-600">
                      {a.street}, {a.city}, {a.state} – {a.pincode}
                    </address>

                    <p className="mt-1 text-sm text-slate-600">{a.phone}</p>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      )}
    </section>
  );
}
