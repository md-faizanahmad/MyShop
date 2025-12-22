// components/order/OrderStatusTracker.tsx
import { Check } from "lucide-react";
import { getExpectedDelivery } from "../../utils/getExpectedDelivery";

interface Props {
  status: string;
  createdAt: string;
}

const steps = [
  { key: "placed", label: "Order Placed" },
  { key: "processing", label: "Processing" },
  { key: "shipping", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
] as const;

export default function OrderStatusTracker({ status, createdAt }: Props) {
  const normalize = (s: string) => {
    const v = s.toLowerCase();
    if (v.includes("deliver")) return "delivered";
    if (v.includes("ship")) return "shipping";
    if (v.includes("process")) return "processing";
    return "placed";
  };

  const currentKey = normalize(status);
  const currentIndex = steps.findIndex((s) => s.key === currentKey);

  const expectedDelivery = getExpectedDelivery(status, createdAt);

  return (
    <div className="w-full bg-white border border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="md:text-2xl text-sm font-medium text-gray-900">
          Order Status
        </h3>
      </div>

      {/* Tracker */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={step.key} className="flex-1 flex flex-col items-center">
                {index !== 0 && (
                  <div
                    className={`absolute top-2.5 left-0 right-0 h-0.5 ${
                      isCompleted ? "bg-green-600" : "bg-gray-200"
                    }`}
                  />
                )}

                <div
                  className={`relative z-10 flex h-5 w-5 items-center justify-center rounded-full border ${
                    isCompleted
                      ? "bg-green-600 border-green-600 text-white"
                      : isCurrent
                      ? "border-blue-600 bg-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isCompleted && <Check size={12} />}
                </div>

                <span className="mt-2 text-xs sm:text-sm text-center">
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Expected Delivery */}
        <div className="mt-4 text-sm text-gray-600">
          {expectedDelivery === "Delivered" ? (
            <span className="text-green-600 font-medium">Delivered</span>
          ) : (
            <>
              Expected delivery by{" "}
              <span className="font-medium text-gray-900">
                {expectedDelivery}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
