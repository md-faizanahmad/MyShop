import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";
import type { SignupFormType, SignupInput } from "../SignUp";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";

interface MobileSignupProps {
  form: SignupFormType;
  passwordValue: string;
  showPassword: boolean;
  toggleShowPassword: () => void;

  otpSent: boolean;
  verified: boolean;
  resendTimer: number;
  sendingOtp: boolean;
  verifyingOtp: boolean;
  isMutationPending: boolean;

  onSendOtp: () => void;
  onVerifyOtp: () => void;
  onSubmit: (data: SignupInput) => void;
}

export default function MobileSignup({
  form,
  passwordValue,
  showPassword,
  toggleShowPassword,
  otpSent,
  verified,
  resendTimer,
  sendingOtp,
  verifyingOtp,
  isMutationPending,
  onSendOtp,
  onVerifyOtp,
  onSubmit,
}: MobileSignupProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-6 sm:px-5 lg:hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Create your account
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Join AZ Store and start shopping.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* NAME */}
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-zinc-700">
              <User size={16} className="text-red-600" />
              Full Name
            </label>

            <input
              {...register("name")}
              className={`w-full border bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition ${
                errors.name
                  ? "border-red-400 focus:border-red-500"
                  : "border-zinc-300 focus:border-red-500"
              }`}
              placeholder="John Doe"
              autoComplete="name"
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-zinc-700">
              <Mail size={16} className="text-red-600" />
              Email Address
            </label>

            <div className="flex gap-2">
              <input
                type="email"
                {...register("email")}
                disabled={otpSent}
                className={`min-w-0 flex-1 border bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition ${
                  errors.email
                    ? "border-red-400"
                    : "border-zinc-300 focus:border-red-500"
                } disabled:bg-zinc-100 disabled:text-zinc-500`}
                placeholder="you@gmail.com"
                autoComplete="email"
              />

              <button
                type="button"
                onClick={onSendOtp}
                disabled={sendingOtp || resendTimer > 0 || otpSent}
                className="shrink-0 border border-red-600 bg-red-600 px-3.5 py-2.5 text-xs font-medium text-white transition hover:bg-red-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:border-zinc-200 disabled:bg-zinc-100 disabled:text-zinc-400"
              >
                {sendingOtp ? (
                  <span className="flex items-center gap-1">
                    <Loader2 size={14} className="animate-spin" />
                    Sending
                  </span>
                ) : resendTimer > 0 ? (
                  `${resendTimer}s`
                ) : (
                  "Send"
                )}
              </button>
            </div>

            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* OTP */}
          {otpSent && !verified && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="overflow-hidden"
            >
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Verification Code
              </label>

              <div className="flex gap-2">
                <input
                  id="otp"
                  maxLength={6}
                  className="min-w-0 flex-1 border border-zinc-300 bg-white px-3 py-2.5 text-center font-mono text-lg tracking-[0.3em] text-zinc-900 outline-none transition focus:border-red-500"
                  placeholder="••••••"
                  autoComplete="one-time-code"
                />

                <button
                  type="button"
                  onClick={onVerifyOtp}
                  disabled={verifyingOtp}
                  className="shrink-0 border border-zinc-900 bg-zinc-900 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-zinc-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500"
                >
                  {verifyingOtp ? (
                    <span className="flex items-center gap-1">
                      <Loader2 size={14} className="animate-spin" />
                      Verify
                    </span>
                  ) : (
                    "Verify"
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* VERIFIED */}
          {verified && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 border border-green-200 bg-green-50 px-3 py-2.5 text-xs font-medium text-green-700"
            >
              <CheckCircle2 size={16} className="shrink-0" />
              <span>Email successfully verified</span>
            </motion.div>
          )}

          {/* PHONE */}
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-zinc-700">
              <Phone size={16} className="text-red-600" />
              Phone Number
              <span className="text-xs font-normal text-zinc-400">
                (optional)
              </span>
            </label>

            <input
              {...register("phone")}
              className={`w-full border bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition ${
                errors.phone
                  ? "border-red-400 focus:border-red-500"
                  : "border-zinc-300 focus:border-red-500"
              }`}
              placeholder="9876543210"
              inputMode="tel"
              autoComplete="tel"
            />

            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-zinc-700">
              <Lock size={16} className="text-red-600" />
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full border bg-white px-3.5 py-2.5 pr-11 text-sm text-zinc-900 outline-none transition ${
                  errors.password
                    ? "border-red-400"
                    : "border-zinc-300 focus:border-red-500"
                }`}
                placeholder="Create a strong password"
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 transition hover:text-zinc-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            <div className="mt-2">
              <PasswordStrengthMeter password={passwordValue} />
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* TERMS */}
          <label className="flex items-start gap-2 text-xs leading-5 text-zinc-500">
            <input type="checkbox" className="mt-1 shrink-0 accent-red-600" />

            <span>
              I agree to the{" "}
              <span className="font-medium text-zinc-700">
                Terms & Privacy Policy
              </span>
            </span>
          </label>

          {/* SUBMIT */}
          <motion.button
            type="submit"
            disabled={!verified || isMutationPending || isSubmitting}
            whileTap={{ scale: 0.99 }}
            className="flex w-full items-center justify-center gap-2 bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400"
          >
            {isMutationPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>

        {/* LOGIN */}
        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-red-600 hover:text-red-700"
            >
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
