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
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";
import type { SignupFormType, SignupInput } from "@/hooks/useSignup";

interface DesktopSignupProps {
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

export default function DesktopSignup({
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
}: DesktopSignupProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="hidden lg:flex min-h-screen items-center justify-center  px-6 ">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-4xl"
      >
        <div className="overflow-hidden ">
          {/* Header */}
          <div className="border-b border-zinc-200 px-8 py-6">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Create your account
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Join AZ Store and start shopping.
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-x-8 gap-y-6"
            >
              {/* LEFT COLUMN */}
              <div className="space-y-5">
                {/* NAME */}
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-zinc-700">
                    <User size={16} className="text-red-600" />
                    Full Name
                  </label>

                  <input
                    {...register("name")}
                    className={`w-full border px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition ${
                      errors.name
                        ? "border-red-400 focus:border-red-500"
                        : "border-zinc-300 focus:border-red-500"
                    }`}
                    placeholder="John Doe"
                    autoComplete="name"
                  />

                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.name.message}
                    </p>
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
                      className={`min-w-0 flex-1 border px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition ${
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
                      className="shrink-0 border border-red-600 bg-red-600 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:border-zinc-200 disabled:bg-zinc-100 disabled:text-zinc-400"
                    >
                      {sendingOtp ? (
                        <span className="flex items-center gap-1.5">
                          <Loader2 size={14} className="animate-spin" />
                          Sending
                        </span>
                      ) : resendTimer > 0 ? (
                        `Resend ${resendTimer}s`
                      ) : (
                        "Send OTP"
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
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                      Verification Code
                    </label>

                    <div className="flex gap-2">
                      <input
                        id="otp"
                        maxLength={6}
                        className="min-w-0 flex-1 border border-zinc-300 px-3 py-2.5 text-center font-mono text-lg tracking-[0.3em] outline-none transition focus:border-red-500"
                        placeholder="••••••"
                      />

                      <button
                        type="button"
                        onClick={onVerifyOtp}
                        disabled={verifyingOtp}
                        className="shrink-0 border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-xs font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500"
                      >
                        {verifyingOtp ? (
                          <span className="flex items-center gap-1.5">
                            <Loader2 size={14} className="animate-spin" />
                            Verifying
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
                  <div className="flex items-center gap-2 border border-green-200 bg-green-50 px-3 py-2.5 text-xs font-medium text-green-700">
                    <CheckCircle2 size={16} />
                    Email successfully verified
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-5">
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
                    className={`w-full border px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition ${
                      errors.phone
                        ? "border-red-400"
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
                      className={`w-full border px-3.5 py-2.5 pr-11 text-sm text-zinc-900 outline-none transition ${
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
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
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
              </div>

              {/* BOTTOM SECTION */}
              <div className="col-span-2 border-t border-zinc-200 pt-6">
                <label className="flex items-start gap-2 text-xs text-zinc-500">
                  <input type="checkbox" className="mt-0.5 accent-red-600" />

                  <span>
                    I agree to the{" "}
                    <span className="font-medium text-zinc-700">
                      Terms & Privacy Policy
                    </span>
                  </span>
                </label>

                <motion.button
                  type="submit"
                  disabled={!verified || isMutationPending || isSubmitting}
                  whileTap={{ scale: 0.99 }}
                  className="mt-5 flex w-full items-center justify-center gap-2 bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400"
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

                <p className="mt-5 text-center text-sm text-zinc-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-red-600 hover:text-red-700"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
