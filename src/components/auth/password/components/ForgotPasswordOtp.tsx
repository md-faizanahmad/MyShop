import type { FormEvent } from "react";
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
  const isVerifyDisabled = isLoading || otp.join("").length !== 6;

  return (
    <section aria-labelledby="otp-title" className="relative w-full space-y-6">
      {/* Feedback Toast */}
      {(error || successMessage) && (
        <div
          role={error ? "alert" : "status"}
          className={`fixed right-3 top-3 z-50 flex w-[calc(100%-1.5rem)] max-w-sm items-start gap-2.5 rounded-xl border px-3.5 py-3 text-xs shadow-lg transition-all duration-200 sm:right-5 sm:top-5 ${
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {error ? (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          )}

          <span className="leading-5">{error || successMessage}</span>
        </div>
      )}

      {/* Header */}
      <header>
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading || resendLoading}
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Back to Email</span>
        </button>

        <h2
          id="otp-title"
          className="text-base font-semibold text-slate-900 sm:text-lg"
        >
          Enter Verification Code
        </h2>

        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
          Enter the 6-character code sent to{" "}
          <span className="font-medium text-slate-800 break-all">{email}</span>.
        </p>
      </header>

      {/* OTP Form */}
      <form onSubmit={onSubmit} noValidate className="space-y-6">
        <div>
          <OtpInput value={otp} onChange={onOtpChange} />
        </div>

        {/* Resend */}
        <div className="text-center text-xs text-slate-500">
          {resendCooldown > 0 ? (
            <p>
              Didn't receive the code?{" "}
              <span className="font-medium text-slate-700">
                Resend in {resendCooldown}s
              </span>
            </p>
          ) : (
            <p>
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={onResend}
                disabled={isResendDisabled}
                className="font-semibold text-slate-900 underline-offset-2 transition-colors hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                {resendLoading ? "Sending..." : "Resend Code"}
              </button>
            </p>
          )}
        </div>

        {/* Verify */}
        <button
          type="submit"
          disabled={isVerifyDisabled}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition-all duration-150 hover:bg-slate-950 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <KeyRound className="h-4 w-4" aria-hidden="true" />

          <span>{isLoading ? "Verifying..." : "Verify & Continue"}</span>
        </button>
      </form>
    </section>
  );
}
