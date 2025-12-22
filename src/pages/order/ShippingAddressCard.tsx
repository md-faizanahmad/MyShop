// components/order/ShippingAddressCard.tsx
import type { ShippingAddress } from "../../types/order";

interface Props {
  address: ShippingAddress;
}

export default function ShippingAddressCard({ address }: Props) {
  return (
    <div className="w-full bg-white border border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm sm:text-base font-medium text-gray-900">
          Delivery Address
        </h3>
      </div>

      {/* Content */}
      <div className="px-4 py-4 text-sm text-gray-700 space-y-2">
        <p className="font-medium text-gray-900">{address.fullName}</p>

        <p className="text-gray-700">{address.phone}</p>

        <p className="leading-relaxed">
          {address.street}, {address.city}, {address.state} – {address.pincode}
        </p>

        {address.landmark && (
          <p className="text-gray-500 text-xs">Landmark: {address.landmark}</p>
        )}
      </div>
    </div>
  );
}
