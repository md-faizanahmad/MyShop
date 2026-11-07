import { type FormEvent, type RefObject } from "react";
import { Link } from "react-router-dom";

interface OTPVerificationStepProps {
  email: string;
  otp: string;
  setOtp: (value: string) => void;
  verifying: boolean;
  remaining: number;
  otpRef: RefObject<HTMLInputElement | null>;
  onVerifyOTP: (e?: FormEvent) => void;
  onResendOTP: () => void;
  onResetEmail: () => void;
}

export default function OTPVerificationStep({
  email,
  otp,
  setOtp,
  verifying,
  remaining,
  otpRef,
  onVerifyOTP,
  onResendOTP,
  onResetEmail,
}: OTPVerificationStepProps) {
  return (
    <section>
      <div className="space-y-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void onVerifyOTP(e);
          }}
          className="space-y-5"
        >
          <div className="border border-zinc-200 bg-white px-3.5 py-3">
            <p className="text-xs text-zinc-500">OTP sent to</p>

            <p className="mt-0.5 break-all text-sm font-medium text-zinc-800">
              {email}
            </p>
          </div>

          <div>
            <label
              htmlFor="otp-input"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              One-time password
            </label>

            <input
              id="otp-input"
              ref={otpRef}
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={8}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\s+/g, ""))}
              placeholder="Enter OTP"
              disabled={verifying}
              required
              className="w-full border border-zinc-300 bg-white px-3.5 py-2.5 text-sm font-medium tracking-wider text-zinc-900 outline-none transition placeholder:font-normal placeholder:tracking-normal placeholder:text-zinc-400 focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={verifying}
            className="flex w-full items-center justify-center bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
          >
            {verifying ? "Signing you in..." : "Verify & Login"}
          </button>
        </form>

        {/* RESEND OTP */}
        <p className="text-center text-sm text-zinc-500">
          Didn’t receive OTP?{" "}
          {remaining > 0 ? (
            <span className="text-zinc-400">Resend in {remaining}s</span>
          ) : (
            <button
              type="button"
              onClick={onResendOTP}
              className="font-semibold text-red-600 hover:text-red-700 hover:underline"
            >
              Resend OTP
            </button>
          )}
        </p>

        {/* OTHER OPTIONS */}
        <div className="space-y-3 border-t border-zinc-200 pt-5 text-center text-sm text-zinc-500">
          <p>
            Wrong email?{" "}
            <button
              type="button"
              onClick={onResetEmail}
              className="font-semibold text-red-600 transition-colors hover:text-red-700 hover:underline"
            >
              Change email
            </button>
          </p>

          <p>
            Prefer using your password?{" "}
            <Link
              to="/login"
              className="font-semibold text-red-600 transition-colors hover:text-red-700 hover:underline"
            >
              Login with password
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
