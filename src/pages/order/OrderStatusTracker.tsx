// import { PackageCheck, Cog, Truck, CheckCircle2 } from "lucide-react";

// interface Props {
//   status: string;
// }

// /* Normalize backend statuses */
// const steps = [
//   { key: "placed", label: "Placed", icon: PackageCheck },
//   { key: "processing", label: "Processing", icon: Cog },
//   { key: "shipping", label: "Shipping", icon: Truck },
//   { key: "delivered", label: "Delivered", icon: CheckCircle2 },
// ] as const;

// export default function OrderStatusTracker({ status }: Props) {
//   const normalize = (s: string) => {
//     const n = s.toLowerCase();
//     if (n === "placed") return "placed";
//     if (n === "confirmed") return "processing";
//     if (n === "processing") return "processing";
//     if (n === "shipped" || n === "out for delivery") return "shipping";
//     if (n === "delivered") return "delivered";
//     return "placed";
//   };

//   const currentKey = normalize(status);
//   const currentIndex = steps.findIndex((s) => s.key === currentKey);

//   return (
//     <div className="w-full max-w-3xl mx-auto py-4">
//       <h3 className="font-semibold mb-4 text-gray-800 text-lg">Order Status</h3>

//       <div className="relative flex justify-between items-center">
//         {/* Progress Bar Background */}
//         <div className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 bg-gray-200 rounded-full" />

//         {/* Progress Bar Fill */}
//         <div
//           className="absolute top-1/2 left-0 h-2 -translate-y-1/2 bg-blue-600 rounded-full transition-all duration-700 ease-out"
//           style={{
//             width: `${((currentIndex + 1) / steps.length) * 100}%`,
//           }}
//         />

//         {/* Steps */}
//         {steps.map((step, index) => {
//           const Icon = step.icon;
//           const isActive = index <= currentIndex;
//           const isCurrent = index === currentIndex;

//           return (
//             <div
//               key={step.key}
//               className="flex flex-col items-center z-10 w-20 text-center"
//             >
//               <div
//                 className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
//                   isActive
//                     ? "bg-blue-600 border-blue-600 text-white shadow-md scale-110"
//                     : "bg-white border-gray-300 text-gray-400"
//                 }`}
//               >
//                 <Icon size={22} className={isCurrent ? "animate-pulse" : ""} />
//               </div>

//               <span
//                 className={`mt-1 text-sm font-medium capitalize ${
//                   isActive ? "text-blue-700" : "text-gray-500"
//                 }`}
//               >
//                 {step.label}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
////////////////Update ui and ux
// components/order/OrderStatusTracker.tsx
import { motion } from "framer-motion";
import { PackageCheck, Cog, Truck, CheckCircle2 } from "lucide-react";

interface Props {
  status: string;
}

const steps = [
  { key: "placed", label: "Order Placed", icon: PackageCheck },
  { key: "processing", label: "Processing", icon: Cog },
  { key: "shipping", label: "On the Way", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
] as const;

export default function OrderStatusTracker({ status }: Props) {
  const normalize = (s: string): string => {
    const lower = s.toLowerCase();
    if (lower.includes("place") || lower === "confirmed") return "placed";
    if (lower.includes("process") || lower === "confirmed") return "processing";
    if (lower.includes("ship") || lower.includes("out")) return "shipping";
    if (lower.includes("deliver")) return "delivered";
    return "placed";
  };

  const currentKey = normalize(status);
  const currentIndex = steps.findIndex((s) => s.key === currentKey);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 border"
    >
      <h3 className="text-2xl font-bold text-center mb-10 text-gray-800">
        Order Journey
      </h3>

      <div className="relative">
        {/* Background Line */}
        <div className="absolute top-8 left-8 right-8 h-1 bg-gray-200 rounded-full" />

        {/* Progress Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-8 left-8 h-1 bg-linear-to-r from-blue-500 to-green-500 rounded-full shadow-lg"
        />

        <div className="grid grid-cols-4 gap-4 relative z-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <motion.div
                key={step.key}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  animate={{
                    scale: isCurrent ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ repeat: isCurrent ? Infinity : 0, duration: 2 }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    isActive
                      ? "bg-linear-to-br from-blue-500 to-green-500 text-white ring-4 ring-green-200"
                      : "bg-gray-100 text-gray-400 border-2 border-gray-300"
                  }`}
                >
                  <Icon size={28} />
                </motion.div>

                <p
                  className={`mt-3 text-sm font-medium ${
                    isActive ? "text-gray-800" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
                {isCurrent && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-green-600 font-bold mt-1"
                  >
                    Current Status
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
