// import { motion } from "framer-motion";
// import { Loader2 } from "lucide-react";
// import { useState } from "react";

// interface Props {
//   open: boolean;
//   onVerify: (otp: string) => Promise<void>;
//   onClose: () => void;
// }

// export default function OtpVerifyModal({ open, onVerify, onClose }: Props) {
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   if (!open) return null;

//   async function submit() {
//     if (otp.length !== 6) return;
//     setLoading(true);
//     await onVerify(otp);
//     setLoading(false);
//   }

//   return (
//     <>
//       {/* Clean overlay without blur or dark bg */}
//       <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />

//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
//         <motion.div
//           initial={{ scale: 0.95, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.95, opacity: 0 }}
//           className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md pointer-events-auto"
//         >
//           <h3 className="text-2xl font-bold text-gray-900 mb-2">
//             Verify Your Identity
//           </h3>
//           <p className="text-gray-600 mb-8">
//             Enter the 6-digit code sent to your email
//           </p>

//           <div className="mb-8">
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value.toUpperCase().slice(0, 6))}
//               maxLength={6}
//               className="w-full px-6 py-5 text-3xl font-mono tracking-widest text-center border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
//               placeholder="------"
//               autoFocus
//             />
//           </div>

//           <div className="space-y-4">
//             <motion.button
//               whileTap={{ scale: 0.97 }}
//               onClick={submit}
//               disabled={loading || otp.length !== 6}
//               className="w-full py-4 bg-linear-to-r from-emerald-600 to-green-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
//             >
//               {loading && <Loader2 size={20} className="animate-spin" />}
//               {loading ? "Verifying..." : "Verify OTP"}
//             </motion.button>

//             <button
//               onClick={onClose}
//               className="w-full py-3 text-gray-600 font-medium hover:text-gray-900 transition-colors"
//             >
//               Cancel
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </>
//   );
// }
///////////////// Refactor 27-08
import { motion } from "framer-motion";
import { Loader2, ShieldCheck, X } from "lucide-react";
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
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-black/45" onClick={onClose} />

      <div className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-3 sm:p-5">
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="pointer-events-auto my-auto w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-zinc-100 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h3 className="text-base font-semibold text-zinc-900">
                  Verify your identity
                </h3>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Confirm your change with OTP
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
            >
              <X size={17} />
            </button>
          </div>

          {/* Content */}
          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <p className="text-center text-sm leading-relaxed text-zinc-500">
              Enter the 6-digit verification code sent to your email.
            </p>

            <div className="mt-5">
              <input
                type="text"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.toUpperCase().slice(0, 6))
                }
                maxLength={6}
                autoFocus
                placeholder="000000"
                aria-label="6-digit verification code"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-center text-2xl font-semibold tracking-[0.45em] text-zinc-900 outline-none transition-all placeholder:text-zinc-300 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
              />
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={submit}
              disabled={loading || otp.length !== 6}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}

              {loading ? "Verifying..." : "Verify OTP"}
            </motion.button>

            <button
              type="button"
              onClick={onClose}
              className="mt-2 w-full rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-800"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
