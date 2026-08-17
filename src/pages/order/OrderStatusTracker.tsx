// // components/order/OrderStatusTracker.tsx
// import { Check } from "lucide-react";
// import { getExpectedDelivery } from "../../utils/getExpectedDelivery";

// interface Props {
//   status: string;
//   createdAt: string;
// }

// const steps = [
//   { key: "placed", label: "Order Placed" },
//   { key: "processing", label: "Processing" },
//   { key: "shipping", label: "Shipped" },
//   { key: "delivered", label: "Delivered" },
// ] as const;

// export default function OrderStatusTracker({ status, createdAt }: Props) {
//   const normalize = (s: string) => {
//     const v = s.toLowerCase();
//     if (v.includes("deliver")) return "delivered";
//     if (v.includes("ship")) return "shipping";
//     if (v.includes("process")) return "processing";
//     return "placed";
//   };

//   const currentKey = normalize(status);
//   const currentIndex = steps.findIndex((s) => s.key === currentKey);

//   const expectedDelivery = getExpectedDelivery(status, createdAt);

//   return (
//     <div className="w-full bg-white border border-gray-200">
//       {/* Header */}
//       <div className="px-4 py-3 border-b border-gray-200">
//         <h3 className="md:text-2xl text-sm font-medium text-gray-900">
//           Order Status
//         </h3>
//       </div>

//       {/* Tracker */}
//       <div className="px-4 py-4">
//         <div className="flex items-center justify-between relative">
//           {steps.map((step, index) => {
//             const isCompleted = index < currentIndex;
//             const isCurrent = index === currentIndex;

//             return (
//               <div key={step.key} className="flex-1 flex flex-col items-center">
//                 {index !== 0 && (
//                   <div
//                     className={`absolute top-2.5 left-0 right-0 h-0.5 ${
//                       isCompleted ? "bg-green-600" : "bg-gray-200"
//                     }`}
//                   />
//                 )}

//                 <div
//                   className={`relative z-10 flex h-5 w-5 items-center justify-center rounded-full border ${
//                     isCompleted
//                       ? "bg-green-600 border-green-600 text-white"
//                       : isCurrent
//                       ? "border-blue-600 bg-white"
//                       : "border-gray-300 bg-white"
//                   }`}
//                 >
//                   {isCompleted && <Check size={12} />}
//                 </div>

//                 <span className="mt-2 text-xs sm:text-sm text-center">
//                   {step.label}
//                 </span>
//               </div>
//             );
//           })}
//         </div>

//         {/* Expected Delivery */}
//         <div className="mt-4 text-sm text-gray-600">
//           {expectedDelivery === "Delivered" ? (
//             <span className="text-green-600 font-medium">Delivered</span>
//           ) : (
//             <>
//               Expected delivery by{" "}
//               <span className="font-medium text-gray-900">
//                 {expectedDelivery}
//               </span>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

/////////// 17-08
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
  const isDelivered = expectedDelivery === "Delivered";

  return (
    <section
      className="rounded-xl border border-slate-200 bg-white shadow-sm"
      aria-labelledby="order-status-title"
    >
      <header className="border-b border-slate-100 px-4 py-3 sm:px-5">
        <h2
          id="order-status-title"
          className="text-base font-semibold text-slate-900 sm:text-lg"
        >
          Order Status
        </h2>
      </header>

      <div className="px-4 py-5 sm:px-5">
        <ol className="flex items-start" aria-label="Order progress">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isLast = index === steps.length - 1;

            return (
              <li key={step.key} className="flex min-w-0 flex-1 items-start">
                <div className="flex min-w-0 flex-1 flex-col items-center">
                  <div className="flex w-full items-center">
                    <div
                      className={`h-0.5 flex-1 ${
                        index === 0
                          ? "bg-transparent"
                          : index <= currentIndex
                            ? "bg-sky-600"
                            : "bg-slate-200"
                      }`}
                    />

                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        isCompleted
                          ? "border-sky-600 bg-sky-600 text-white"
                          : isCurrent
                            ? "border-sky-600 bg-white text-sky-600 ring-4 ring-sky-50"
                            : "border-slate-300 bg-white text-slate-400"
                      }`}
                      aria-current={isCurrent ? "step" : undefined}
                    >
                      {isCompleted ? (
                        <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                      ) : (
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isCurrent ? "bg-sky-600" : "bg-slate-300"
                          }`}
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <div
                      className={`h-0.5 flex-1 ${
                        isLast
                          ? "bg-transparent"
                          : index < currentIndex
                            ? "bg-sky-600"
                            : "bg-slate-200"
                      }`}
                    />
                  </div>

                  <span
                    className={`mt-2 max-w-[72px] text-center text-[11px] leading-4 sm:max-w-none sm:text-xs ${
                      isCurrent || isCompleted
                        ? "font-medium text-slate-800"
                        : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-5 rounded-lg bg-slate-50 px-3.5 py-3">
          {isDelivered ? (
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-600">Delivery status</span>

              <span className="text-sm font-semibold text-emerald-600">
                Delivered
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-600">Expected delivery</span>

              <span className="text-sm font-semibold text-slate-900">
                {expectedDelivery}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
