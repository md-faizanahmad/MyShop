// src/features/auth/components/OtpLoginSection.tsx

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
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 py-3 font-medium text-white transition-colors hover:bg-black disabled:opacity-60"
      >
        <KeyRound size={18} className={otpLoading ? "animate-pulse" : ""} />

        {otpLoading ? "Sending OTP..." : "Login with OTP"}
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <TextField
        label="Enter OTP"
        value={otp}
        onChange={onOtpChange}
        placeholder="******"
        maxLength={6}
        inputMode="numeric"
        className="text-center tracking-[0.35em]"
      />

      <button
        type="button"
        onClick={onVerifyOtp}
        disabled={verifyLoading}
        className="w-full rounded-lg bg-green-600 py-3 text-white transition-colors hover:bg-green-700 disabled:bg-gray-400"
      >
        {verifyLoading ? "Verifying..." : "Verify OTP"}
      </button>

      <div className="text-center text-sm">
        {resendTimer > 0 ? (
          <p className="text-gray-500">
            Resend OTP in{" "}
            <span className="font-semibold text-gray-700">{resendTimer}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={onSendOtp}
            className="font-semibold text-sky-600 hover:underline"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}
