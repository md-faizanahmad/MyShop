import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  onVerify: (otp: string) => Promise<void>;
  onClose: () => void;
}

export default function OtpVerifyModal({ open, onVerify, onClose }: Props) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function submit() {
    if (otp.length !== 6) return;
    setLoading(true);
    await onVerify(otp);
    setLoading(false);
  }

  return (
    <>
      {/* Clean overlay without blur or dark bg */}
      <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md pointer-events-auto"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Verify Your Identity
          </h3>
          <p className="text-gray-600 mb-8">
            Enter the 6-digit code sent to your email
          </p>

          <div className="mb-8">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.toUpperCase().slice(0, 6))}
              maxLength={6}
              className="w-full px-6 py-5 text-3xl font-mono tracking-widest text-center border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
              placeholder="------"
              autoFocus
            />
          </div>

          <div className="space-y-4">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={submit}
              disabled={loading || otp.length !== 6}
              className="w-full py-4 bg-linear-to-r from-emerald-600 to-green-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
            >
              {loading && <Loader2 size={20} className="animate-spin" />}
              {loading ? "Verifying..." : "Verify OTP"}
            </motion.button>

            <button
              onClick={onClose}
              className="w-full py-3 text-gray-600 font-medium hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
