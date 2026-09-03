import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, CheckCircle2, KeyRound } from "lucide-react";
import OtpInput from "./OtpInput";

interface ForgotPasswordOtpStepProps {
  email: string;
  otp: string[];
  isLoading: boolean;
  error: string;
  successMessage: string;
  resendLoading: boolean;
  resendCooldown: number;
  onBack: () => void;
  onOtpChange: (value: string[]) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onResend: () => void;
}

export default function ForgotPasswordOtp({
  email,
  otp,
  isLoading,
  error,
  successMessage,
  resendLoading,
  resendCooldown,
  onBack,
  onOtpChange,
  onSubmit,
  onResend,
}: ForgotPasswordOtpStepProps) {
  const isResendDisabled = resendLoading || resendCooldown > 0;

  return (
    <motion.div
      key="otp-step"
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 1, x: -15 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div>
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading || resendLoading}
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Email</span>
        </button>

        <h3 className="text-lg font-semibold text-slate-900">
          Enter Verification Code
        </h3>

        <p className="mt-1 text-sm leading-5 text-slate-500">
          We've sent a code to{" "}
          <span className="font-medium text-slate-800">{email}</span>.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && !error && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs text-emerald-700"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <OtpInput value={otp} onChange={onOtpChange} />

        <div className="text-center text-xs text-slate-500">
          {resendCooldown > 0 ? (
            <span>
              Resend code in{" "}
              <span className="font-semibold text-slate-700">
                {resendCooldown}s
              </span>
            </span>
          ) : (
            <>
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={onResend}
                disabled={isResendDisabled}
                className="font-semibold text-slate-900 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                {resendLoading ? "Sending..." : "Resend Code"}
              </button>
            </>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || otp.join("").length !== 6}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <KeyRound className="h-4 w-4" />
          <span>{isLoading ? "Verifying..." : "Verify & Continue"}</span>
        </button>
      </form>
    </motion.div>
  );
}
