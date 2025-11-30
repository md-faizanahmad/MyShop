// src/components/pincode/PincodeResult.tsx
import { motion } from "framer-motion";

export default function PincodeResult({
  result,
  error,
}: {
  result: {
    block: string;
    district: string;
    state: string;
    eta: string;
  } | null;
  error: string | null;
}) {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 flex items-center gap-2 text-red-600 text-sm"
      >
        <span className="text-lg">Not Available</span>{" "}
        <span className="text-xs">({error})</span>
      </motion.div>
    );
  }

  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-4 p-4 bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-900">
            {result.block}, {result.district}
          </p>
          <p className="text-xs text-gray-600">
            {result.state} • {result.eta}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-emerald-600">{result.eta}</p>
          <p className="text-xs text-emerald-700">Delivery</p>
        </div>
      </div>
    </motion.div>
  );
}
