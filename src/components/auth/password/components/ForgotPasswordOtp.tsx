import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, KeyRound } from "lucide-react";

interface ForgotPasswordOtpStepProps {
  email: string;
  otp: string[];
  isLoading: boolean;
  onBack: () => void;
  onOtpChange: (element: HTMLInputElement, index: number) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onResend?: () => void;
}

export default function ForgotPasswordOtp({
  email,
  otp,
  isLoading,
  onBack,
  onOtpChange,
  onSubmit,
  onResend,
}: ForgotPasswordOtpStepProps) {
  return (
    <motion.div
      key="otp-step"
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 15 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div>
        <button
          type="button"
          onClick={onBack}
          className="mb-3 inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Email</span>
        </button>

        <h3 className="text-lg font-semibold text-slate-900">
          Verify Identity
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          We've sent a code to{" "}
          <span className="font-medium text-slate-800">{email}</span>.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => onOtpChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              className="h-14 w-12 rounded-xl border border-slate-200 bg-slate-50 text-center text-xl font-bold text-slate-900 transition-all focus:border-transparent focus:ring-2 focus:ring-slate-900 focus:outline-none"
            />
          ))}
        </div>

        <div className="text-center text-xs text-slate-500">
          Didn't receive code?{" "}
          <button
            type="button"
            onClick={onResend}
            className="font-semibold text-slate-900 hover:underline"
          >
            Resend Code
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading || otp.join("").length < 6}
          className="flex w-full items-center justify-center space-x-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition-all duration-150 hover:bg-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <KeyRound className="h-4 w-4" />

          <span>{isLoading ? "Verifying..." : "Verify & Continue"}</span>
        </button>
      </form>
    </motion.div>
  );
}
