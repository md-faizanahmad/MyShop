// src/components/auth/LoginWithOTPView.tsx
import { type FormEvent, type JSX, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type LoginWithOTPViewProps = {
  step: "email" | "otp";
  email: string;
  setEmail: (v: string) => void;
  otp: string;
  setOtp: (v: string) => void;
  sending: boolean;
  verifying: boolean;
  remaining: number;
  errorMessage: string | null;
  onSendOTP: (e?: FormEvent) => void;
  onVerifyOTP: (e?: FormEvent) => void;
  onResendOTP: () => void;
  onResetEmail: () => void;
};

export default function LoginWithOTPView({
  step,
  email,
  setEmail,
  otp,
  setOtp,
  sending,
  verifying,
  remaining,
  errorMessage,
  onSendOTP,
  onVerifyOTP,
  onResendOTP,
  onResetEmail,
}: LoginWithOTPViewProps): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const otpRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (step === "email") {
      emailRef.current?.focus();
    } else {
      otpRef.current?.focus();
    }
  }, [step]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg"
        role="form"
        aria-labelledby="login-otp-title"
      >
        <h2
          id="login-otp-title"
          className="text-3xl font-bold text-center mb-4 text-gray-800"
        >
          Login with OTP
        </h2>

        <div aria-live="polite" className="min-h-5 mb-2">
          {errorMessage ? (
            <div
              id="login-otp-error"
              role="alert"
              className="text-sm text-red-600"
            >
              {errorMessage}
            </div>
          ) : null}
        </div>

        {step === "email" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void onSendOTP(e);
            }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="otp-email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="otp-email"
                ref={emailRef}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                disabled={sending}
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                aria-invalid={!!errorMessage}
                aria-describedby={errorMessage ? "login-otp-error" : undefined}
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={sending || remaining > 0}
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {sending
                ? "Sending..."
                : remaining > 0
                ? `Resend in ${remaining}s`
                : "Send OTP"}
            </motion.button>
          </form>
        )}

        {step === "otp" && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="space-y-6"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void onVerifyOTP(e);
                }}
              >
                <p className="text-sm text-gray-600">
                  We sent an OTP to{" "}
                  <span className="font-semibold">{email}</span>
                </p>

                <label htmlFor="otp-input" className="sr-only">
                  One-time password
                </label>
                <input
                  id="otp-input"
                  ref={otpRef}
                  name="otp"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={8}
                  value={otp}
                  onChange={(ev) => setOtp(ev.target.value.replace(/\s+/g, ""))}
                  placeholder="Enter OTP"
                  disabled={verifying}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-2"
                  aria-invalid={!!errorMessage}
                />

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={verifying}
                  className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {verifying ? "Verifying..." : "Login"}
                </motion.button>
              </form>

              <p className="text-center text-sm text-gray-600">
                Didn’t receive OTP?{" "}
                {remaining > 0 ? (
                  <span className="text-gray-400">Resend in {remaining}s</span>
                ) : (
                  <button
                    onClick={onResendOTP}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </p>

              <p className="text-center text-sm text-gray-600">
                Wrong email?{" "}
                <button
                  onClick={onResetEmail}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Change email
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
}
