// src/pages/auth/SignupForm.tsx
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
import { type SignupFormType, type SignupInput } from "./SignUp";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";

interface SignupFormProps {
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

export default function SignupForm({
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
}: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-blue-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md sm:max-w-lg"
      >
        <div className="bg-white rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden border border-sky-50">
          {/* Header */}
          <div className="bg-linear-to-r from-sky-500 to-blue-600 px-6 sm:px-8 py-8 sm:py-10 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Create your account
            </h1>
            <p className="mt-2 text-sm sm:text-base text-sky-100">
              Join MyAZ Store today!
            </p>
          </div>

          {/* FORM */}
          <div className="px-5 sm:px-8 py-6 sm:py-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 sm:space-y-7"
            >
              {/* NAME */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User size={18} className="text-sky-600" />
                  Full Name
                </label>
                <input
                  {...register("name")}
                  className={`mt-2 w-full px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl border text-sm sm:text-base ${
                    errors.name ? "border-red-400" : "border-gray-300"
                  } focus:outline-none focus:ring-4 focus:ring-sky-100`}
                  placeholder="John Doe"
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* EMAIL + OTP */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Mail size={18} className="text-sky-600" />
                  Email Address
                </label>

                <div className="mt-2 flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    {...register("email")}
                    disabled={otpSent}
                    className={`flex-1 px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl border text-sm sm:text-base ${
                      errors.email ? "border-red-400" : "border-gray-300"
                    } focus:outline-none focus:ring-4 focus:ring-sky-100 disabled:bg-gray-100`}
                    placeholder="you@gmail.com"
                    autoComplete="email"
                  />

                  <button
                    type="button"
                    onClick={onSendOtp}
                    disabled={sendingOtp || resendTimer > 0 || otpSent}
                    className="w-full sm:w-auto px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 bg-sky-600 text-white text-sm sm:text-base rounded-xl hover:bg-sky-700 disabled:bg-gray-300 disabled:text-gray-600 flex items-center justify-center gap-2"
                  >
                    {sendingOtp ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        <span>Sending</span>
                      </>
                    ) : resendTimer > 0 ? (
                      <>Resend {resendTimer}s</>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </div>

                {errors.email && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* OTP INPUT */}
              {otpSent && !verified && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="text-sm font-semibold text-gray-700 mt-2 block">
                    Enter OTP
                  </label>

                  <div className="mt-2 flex flex-col sm:flex-row gap-3">
                    <input
                      id="otp"
                      maxLength={6}
                      className="flex-1 px-4 py-3 sm:py-3.5 text-center text-xl sm:text-2xl font-mono tracking-[0.3em] rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-sky-100"
                      placeholder="••••••"
                      inputMode="numeric"
                    />

                    <button
                      type="button"
                      onClick={onVerifyOtp}
                      disabled={verifyingOtp}
                      className="w-full sm:w-auto px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 bg-green-600 text-white text-sm sm:text-base rounded-xl hover:bg-green-700 disabled:bg-gray-300 flex items-center justify-center gap-2"
                    >
                      {verifyingOtp ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Verifying</span>
                        </>
                      ) : (
                        "Verify"
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* VERIFIED BADGE */}
              {verified && (
                <p className="flex items-center gap-2 text-green-600 font-medium text-sm">
                  <CheckCircle2 size={20} /> Email verified!
                </p>
              )}

              {/* PHONE */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Phone size={18} className="text-sky-600" />
                  Phone Number (optional)
                </label>
                <input
                  {...register("phone")}
                  className="mt-2 w-full px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-sky-100"
                  placeholder="9876543210"
                  inputMode="tel"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Lock size={18} className="text-sky-600" />
                  Password
                </label>

                <div className="mt-2 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 pr-11 rounded-xl border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-sky-100"
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-2.5 sm:top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="mt-3">
                  <PasswordStrengthMeter password={passwordValue || ""} />
                </div>

                {errors.password && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* SUBMIT */}
              <motion.button
                type="submit"
                disabled={!verified || isMutationPending || isSubmitting}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-linear-to-r from-sky-600 to-blue-600 text-white font-semibold text-base sm:text-lg py-3.5 sm:py-4 rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isMutationPending ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Creating account...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </form>

            {/* ALREADY HAVE ACCOUNT */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-sm sm:text-base text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-sky-600 hover:text-sky-700"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
