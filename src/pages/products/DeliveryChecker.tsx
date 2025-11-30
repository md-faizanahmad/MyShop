// src/components/product/DeliveryChecker.tsx
import { Truck } from "lucide-react";
import PincodeChecker from "../../shared/PincodeChecker";

export default function DeliveryChecker() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-3">
        <Truck className="text-blue-600" size={24} />
        Check Delivery Availability
      </h3>
      <PincodeChecker />
    </div>
  );
}
