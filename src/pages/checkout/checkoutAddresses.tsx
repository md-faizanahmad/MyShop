// src/pages/checkout/CheckoutAddresses.tsx
import type { Address } from "../../types/address";

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
    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>

      {addresses.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No saved addresses. Please add one before checkout.
        </p>
      ) : (
        <div className="space-y-4">
          {addresses.map((a) => {
            const isSelected = selected === a._id;

            return (
              <label
                key={a._id}
                htmlFor={`address-${a._id}`}
                className={`block rounded-xl border p-5 cursor-pointer transition
                  ${
                    isSelected
                      ? "border-sky-600 bg-sky-50 ring-1 ring-sky-500/30"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
              >
                <div className="flex items-start gap-4">
                  {/* Radio */}
                  <input
                    id={`address-${a._id}`}
                    type="radio"
                    name="shippingAddress"
                    checked={isSelected}
                    onChange={() => onSelect(a._id)}
                    className="mt-1 accent-sky-600"
                  />

                  {/* Address Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="font-semibold text-gray-900">
                        {a.fullName}
                      </p>

                      {a.isDefault && (
                        <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {a.street}, {a.city}, {a.state} – {a.pincode}
                    </p>

                    <p className="text-sm text-gray-700 mt-1">
                      Phone: {a.phone}
                    </p>
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
