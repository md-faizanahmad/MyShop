// src/pages/auth/LoginForm.tsx
import type { FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, KeyRound } from "lucide-react";

export interface LoginFormProps {
  email: string;
  password: string;
  otp: string;

  showPassword: boolean;
  otpSent: boolean;
  resendTimer: number;

  loading: boolean;
  otpLoading: boolean;
  verifyLoading: boolean;

  error: string;

  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOtpChange: (e: ChangeEvent<HTMLInputElement>) => void;

  onSubmitPassword: (e: FormEvent<HTMLFormElement>) => void;
  onSendOtp: () => void;
  onVerifyOtp: () => void;

  toggleShowPassword: () => void;
}

export default function LoginForm({
  email,
  password,
  otp,
  showPassword,
  otpSent,
  resendTimer,
  loading,
  otpLoading,
  verifyLoading,
  error,
  onEmailChange,
  onPasswordChange,
  onOtpChange,
  onSubmitPassword,
  onSendOtp,
  onVerifyOtp,
  toggleShowPassword,
}: LoginFormProps) {
  const isGlobalDisabled = loading || otpLoading || verifyLoading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-sky-100 px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-md sm:max-w-lg rounded-2xl shadow-xl border border-sky-50 px-5 sm:px-8 py-6 sm:py-8"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Login to continue to MyAZ Store
          </p>
        </div>

        {/* ERROR BOX */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-red-600 text-xs sm:text-sm text-center mb-4 bg-red-50 py-2 px-4 rounded-lg border border-red-100"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* EMAIL FIELD */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <Mail size={18} />
            </span>

            <input
              type="email"
              required
              className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={onEmailChange}
              disabled={isGlobalDisabled}
              autoComplete="email"
            />
          </div>
        </div>

        {/* PASSWORD LOGIN */}
        <form onSubmit={onSubmitPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Lock size={18} />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full pl-10 pr-11 py-2.5 border rounded-lg focus:ring-2 focus:ring-sky-500"
                placeholder="••••••••"
                value={password}
                onChange={onPasswordChange}
                disabled={loading}
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 text-white font-medium py-2.5 rounded-lg hover:bg-sky-700 disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login with Password"}
          </button>
        </form>

        {/* OR */}
        <div className="my-5 flex items-center">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-gray-400 text-xs">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* LOGIN WITH OTP */}
        {!otpSent ? (
          <button
            onClick={onSendOtp}
            disabled={otpLoading || !email}
            className="w-full bg-gray-900 text-white font-medium py-3 rounded-lg hover:bg-black disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {otpLoading ? (
              <>
                <KeyRound size={18} className="animate-pulse" />
                Sending OTP...
              </>
            ) : (
              <>
                <KeyRound size={18} />
                Login with OTP
              </>
            )}
          </button>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 text-center tracking-[0.35em]"
                placeholder="*******"
                value={otp}
                onChange={onOtpChange}
                maxLength={6}
                inputMode="numeric"
              />
            </div>

            <button
              onClick={onVerifyOtp}
              disabled={verifyLoading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              {verifyLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="text-center text-sm">
              {resendTimer > 0 ? (
                <p className="text-gray-500">
                  Resend OTP in{" "}
                  <span className="font-semibold text-gray-700">
                    {resendTimer}s
                  </span>
                </p>
              ) : (
                <button
                  onClick={onSendOtp}
                  className="text-sky-600 font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-sky-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
