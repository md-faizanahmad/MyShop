// // components/order/OrderActions.tsx
// import { motion } from "framer-motion";
// import { Download, Loader2 } from "lucide-react";

// interface Props {
//   cancel: () => void;
//   disabled: boolean;
//   invoiceUrl: string;
//   isCancelling?: boolean;
// }

// export default function OrderActions({
//   cancel,
//   disabled,
//   invoiceUrl,
//   isCancelling = false,
// }: Props) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="flex flex-col sm:flex-row gap-4 mt-8"
//     >
//       <a
//         href={invoiceUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-blue-300 to-sky-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition"
//       >
//         <Download size={22} />
//         Download Invoice
//       </a>

//       {!disabled && (
//         <button
//           onClick={cancel}
//           disabled={isCancelling}
//           className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-red-600 to-rose-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition disabled:opacity-70 disabled:cursor-not-allowed"
//         >
//           {isCancelling ? (
//             <>
//               <Loader2 className="animate-spin" size={22} />
//               Cancelling...
//             </>
//           ) : (
//             "Cancel Order"
//           )}
//         </button>
//       )}
//     </motion.div>
//   );
// }
///////////////////////////////////// update 13072026
// components/order/OrderActions.tsx
import { motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";

interface Props {
  cancel: () => void;
  disabled: boolean;
  invoiceUrl: string;
  isCancelling?: boolean;
}

export default function OrderActions({
  cancel,
  disabled,
  invoiceUrl,
  isCancelling = false,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 flex flex-col gap-3 sm:flex-row"
    >
      <a
        href={invoiceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-blue-300 to-sky-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:shadow-lg"
      >
        <Download size={18} />
        Download Invoice
      </a>

      {!disabled && (
        <button
          onClick={cancel}
          disabled={isCancelling}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-red-600 to-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isCancelling ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Cancelling...
            </>
          ) : (
            "Cancel Order"
          )}
        </button>
      )}
    </motion.div>
  );
}
