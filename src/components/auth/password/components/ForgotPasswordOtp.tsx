import type { FormEvent } from "react";
import { ArrowLeft, KeyRound } from "lucide-react";
import OtpInput from "./OtpInput";

interface ForgotPasswordOtpStepProps {
  email: string;
  otp: string[];
  isLoading: boolean;
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
    <section aria-labelledby="otp-title" className="w-full">
      {/* HEADER */}
      <header className="mb-7">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading || resendLoading}
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Email
        </button>

        <h1
          id="otp-title"
          className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
        >
          Enter verification code
        </h1>

        <p className="mt-1 text-sm leading-5 text-zinc-500">
          Enter the 6-character code sent to{" "}
          <span className="font-medium text-zinc-700 break-all">{email}</span>.
        </p>
      </header>

      {/* OTP FORM */}
      <form onSubmit={onSubmit} noValidate className="space-y-6">
        <OtpInput value={otp} onChange={onOtpChange} />

        {/* RESEND */}
        <div className="text-center text-sm text-zinc-500">
          {resendCooldown > 0 ? (
            <p>
              Didn't receive the code?{" "}
              <span className="font-medium text-zinc-700">
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
                className="font-semibold text-red-600 transition hover:text-red-700 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                {resendLoading ? "Sending..." : "Resend Code"}
              </button>
            </p>
          )}
        </div>

        {/* VERIFY */}
        <button
          type="submit"
          disabled={isVerifyDisabled}
          className="flex w-full items-center justify-center gap-2 bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Verifying...
            </>
          ) : (
            <>
              <KeyRound size={16} aria-hidden="true" />
              Verify & Continue
            </>
          )}
        </button>
      </form>

      {/* EXIT */}
      <div className="mt-7 border-t border-zinc-200 pt-6 text-center">
        <p className="text-sm text-zinc-500">
          Entered the wrong email?{" "}
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading || resendLoading}
            className="font-semibold text-red-600 hover:text-red-700 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          >
            Change email
          </button>
        </p>
      </div>
    </section>
  );
}
