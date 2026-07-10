import type { ChangeEvent } from "react";
import { KeyRound } from "lucide-react";
import TextField from "./TextField";

interface OtpLoginSectionProps {
  email: string;
  otp: string;
  otpSent: boolean;
  resendTimer: number;
  otpLoading: boolean;
  verifyLoading: boolean;
  onOtpChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSendOtp: () => void;
  onVerifyOtp: () => void;
}

export default function OtpLoginSection({
  email,
  otp,
  otpSent,
  resendTimer,
  otpLoading,
  verifyLoading,
  onOtpChange,
  onSendOtp,
  onVerifyOtp,
}: OtpLoginSectionProps) {
  if (!otpSent) {
    return (
      <button
        type="button"
        onClick={onSendOtp}
        disabled={otpLoading || !email}
        className="flex w-full items-center justify-center gap-2 border border-neutral-200 bg-white py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 disabled:opacity-50 "
      >
        <KeyRound size={14} className={otpLoading ? "animate-pulse" : ""} />
        <span>{otpLoading ? "Sending OTP" : "Login with OTP"}</span>
      </button>
    );
  }

  return (
    <div className="space-y-4 pt-2 border-t border-neutral-100 d">
      <TextField
        label="Security Verification Code"
        value={otp}
        onChange={onOtpChange}
        placeholder="••••••"
        maxLength={6}
        inputMode="numeric"
        className="text-center tracking-[0.4em] font-mono text-base"
      />

      <button
        type="button"
        onClick={onVerifyOtp}
        disabled={verifyLoading}
        className="w-full bg-neutral-900 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 "
      >
        {verifyLoading ? "Verifying..." : "Confirm Verification Code"}
      </button>

      <div className="text-center text-xs">
        {resendTimer > 0 ? (
          <p className="text-neutral-400">
            Resend operational window locks for{" "}
            <span className="font-mono font-medium text-neutral-600 dark:text-neutral-300">
              {resendTimer}s
            </span>
          </p>
        ) : (
          <button
            type="button"
            onClick={onSendOtp}
            className="text-neutral-600 font-medium hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors underline underline-offset-4"
          >
            Request alternative token
          </button>
        )}
      </div>
    </div>
  );
}
