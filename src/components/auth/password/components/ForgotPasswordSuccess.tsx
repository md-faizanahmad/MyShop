import { motion } from "framer-motion";
import { CheckCircle2, LogIn } from "lucide-react";

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
      <div className="flex justify-center text-emerald-500">
        <CheckCircle2 aria-hidden="true" className="h-14 w-14 stroke-[1.5]" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-900">
          Password Reset Successful
        </h3>

        <p className="mx-auto max-w-xs text-sm leading-5 text-slate-500">
          Your password has been updated successfully. You can now log in with
          your new password.
        </p>
      </div>

      <div className="pt-4">
        <button
          type="button"
          onClick={onContinue}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-950"
        >
          <LogIn className="h-4 w-4" />
          <span>Continue to Login</span>
        </button>
      </div>
    </motion.div>
  );
}
