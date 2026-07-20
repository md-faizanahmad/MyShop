import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  KeyRound,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

type FormStep = "EMAIL" | "OTP" | "SUCCESS";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<FormStep>("EMAIL");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP array
  const [isLoading, setIsLoading] = useState(false);

  // Handle email submission form logic
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API request buffer
    setTimeout(() => {
      setIsLoading(false);
      setStep("OTP");
    }, 1200);
  };

  // Handle individual OTP inputs and auto-focus next fields
  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input automatically
    if (element.value !== "" && element.nextElementSibling) {
      (element.nextElementSibling as HTMLInputElement).focus();
    }
  };

  // Handle OTP verification submission logic
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length < 6) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("SUCCESS");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="sm:mx-auto w-full max-w-md">
        {/* Form Container Card */}
        <div className="mt-8 bg-white py-8 px-4 border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-2xl sm:px-10 relative overflow-hidden min-h-[380px]">
          <AnimatePresence mode="wait">
            {/* STEP 1: Email Request Entry */}
            {step === "EMAIL" && (
              <motion.div
                key="email-step"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Forgot Password?
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Enter your email addresses below and we will send you a
                    6-digit verification code.
                  </p>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="block w-full pl-10 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-slate-900 hover:bg-slate-950 text-white font-medium py-3 px-4 rounded-xl text-sm transition-all duration-150 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span>
                      {isLoading ? "Sending..." : "Send Verification Code"}
                    </span>
                    {!isLoading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 2: One-Time Password Verification */}
            {step === "OTP" && (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <button
                    onClick={() => setStep("EMAIL")}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition mb-3"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Email</span>
                  </button>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Verify Identity
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    We've sent a code to{" "}
                    <span className="font-medium text-slate-800">{email}</span>.
                  </p>
                </div>

                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  {/* Pin Inputs Block */}
                  <div className="flex justify-between gap-2">
                    {otp.map((data, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={data}
                        onChange={(e) => handleOtpChange(e.target, index)}
                        onFocus={(e) => e.target.select()}
                        className="w-12 h-14 bg-slate-50 border border-slate-200 rounded-xl text-center text-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                      />
                    ))}
                  </div>

                  <div className="text-center text-xs text-slate-500">
                    Didn't receive code?{" "}
                    <button
                      type="button"
                      className="font-semibold text-slate-900 hover:underline"
                    >
                      Resend Code
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || otp.join("").length < 6}
                    className="w-full bg-slate-900 hover:bg-slate-950 text-white font-medium py-3 px-4 rounded-xl text-sm transition-all duration-150 flex items-center justify-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>
                      {isLoading ? "Verifying..." : "Verify & Continue"}
                    </span>
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 3: Verification Successful State */}
            {step === "SUCCESS" && (
              <motion.div
                key="success-step"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="text-center py-6 space-y-4"
              >
                <div className="flex justify-center text-green-500">
                  <CheckCircle2 className="w-14 h-14 stroke-[1.5]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900">
                    Identity Verified
                  </h3>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">
                    Your account code has been verified successfully. You can
                    now reset your account credentials safely.
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => alert("Redirecting to reset view logic...")}
                    className="w-full bg-slate-900 hover:bg-slate-950 text-white font-medium py-3 px-4 rounded-xl text-sm transition-all duration-150"
                  >
                    Proceed to Reset Password
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
