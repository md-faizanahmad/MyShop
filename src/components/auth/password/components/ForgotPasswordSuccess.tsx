import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface ForgotPasswordSuccessStepProps {
  onContinue: () => void;
}

export default function ForgotPasswordSuccess({
  onContinue,
}: ForgotPasswordSuccessStepProps) {
  return (
    <motion.div
      key="success-step"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="space-y-4 py-6 text-center"
    >
      <div className="flex justify-center text-green-500">
        <CheckCircle2 className="h-14 w-14 stroke-[1.5]" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-900">
          Identity Verified
        </h3>

        <p className="mx-auto max-w-xs text-sm text-slate-500">
          Your account has been verified successfully. You can now reset your
          password safely.
        </p>
      </div>

      <div className="pt-4">
        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition-all duration-150 hover:bg-slate-950"
        >
          Proceed to Reset Password
        </button>
      </div>
    </motion.div>
  );
}
