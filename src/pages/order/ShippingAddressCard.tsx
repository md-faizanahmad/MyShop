// components/order/ShippingAddressCard.tsx
import { motion } from "framer-motion";
import { MapPin, User, Phone } from "lucide-react";
import type { ShippingAddress } from "../../types/order";

interface Props {
  address: ShippingAddress;
}

export default function ShippingAddressCard({ address }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="text-blue-600" size={28} />
        <h3 className="text-xl font-bold text-gray-800">Delivery Address</h3>
      </div>

      <div className="space-y-3 text-gray-700">
        <div className="flex items-center gap-3">
          <User size={18} className="text-gray-500" />
          <p className="font-semibold text-lg">{address.fullName}</p>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={18} className="text-gray-500" />
          <p>{address.phone}</p>
        </div>

        <p className="leading-relaxed pl-8">
          {address.street}, {address.city},<br />
          {address.state} - {address.pincode}
          {address.landmark && (
            <>
              <br />
              <span className="text-sm text-gray-600">
                Near {address.landmark}
              </span>
            </>
          )}
        </p>
      </div>
    </motion.div>
  );
}
