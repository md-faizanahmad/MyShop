import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  Mail,
  Lock,
  User,
  Phone,
} from "lucide-react";

import { validateName, validateCustomEmail } from "../../utils/validation";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
// import { useAuth } from "../../context/Auth";
import { getErrorMessage } from "../../utils/getErrorMessage";

const API = import.meta.env.VITE_API_URL ?? "";

// Validation Schema
const signupSchema = z.object({
  name: z.string().refine((v) => validateName(v) === true, {
    message: validateName("invalid") as string,
  }),
  email: z.string().refine((v) => validateCustomEmail(v) === true, {
    message: validateCustomEmail("bad") as string,
  }),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || /^\d{10,15}$/.test(v), {
      message: "Enter a valid phone number",
    }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupInput = z.infer<typeof signupSchema>;

export default function SignUp() {
  // const { refreshUser } = useAuth();

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  // The OTP JWT token returned after verify
  const [otpToken, setOtpToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", phone: "", password: "" },
  });

  const passwordValue = watch("password");

  // Resend Timer Countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  // -----------------------
  // SEND OTP
  // -----------------------
  const handleSendOtp = async () => {
    const email = getValues("email").trim();

    if (!email) return toast.error("Please enter your email");

    setSendingOtp(true);
    try {
      const res = await axios.post(`${API}/api/users/send-otp`, {
        email,
        purpose: "signup",
      });

      if (res.data.success) {
        setOtpSent(true);
        setResendTimer(45);
        toast.success("OTP sent!");
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSendingOtp(false);
    }
  };

  // -----------------------
  // VERIFY OTP
  // -----------------------
  const handleVerifyOtp = async () => {
    const email = getValues("email");
    const otp = (
      document.getElementById("otp") as HTMLInputElement
    )?.value.trim();

    if (!otp || otp.length < 4) return toast.error("Enter valid OTP");

    setVerifyingOtp(true);

    try {
      const res = await axios.post(`${API}/api/users/verify-otp`, {
        email,
        otp,
        purpose: "signup",
      });

      if (res.data.success) {
        toast.success("Email verified!");
        setVerified(true);

        // Save OTP token for signup
        if (res.data.otpToken) {
          setOtpToken(res.data.otpToken);
        }
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setVerifyingOtp(false);
    }
  };

  // -----------------------
  // SIGNUP MUTATION
  // -----------------------
  const mutation = useMutation({
    mutationFn: async (data: SignupInput) => {
      const res = await axios.post(`${API}/api/users/signup`, {
        ...data,
        otpToken, // IMPORTANT 🔥
      });

      return res.data;
    },

    onSuccess: () => {
      toast.success("Account created!");
      window.location.href = "/";
    },

    onError: (err: string) => {
      toast.error(getErrorMessage(err));
    },
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-blue-100 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-sky-500 to-blue-600 px-8 py-10 text-white">
            <h6 className="text-3xl font-bold">Create your account</h6>
            <p className="mt-2 text-sky-100">Join MyAZ Store today!</p>
          </div>

          {/* FORM */}
          <div className="p-8">
            <form
              onSubmit={handleSubmit((d) => mutation.mutate(d))}
              className="space-y-6"
            >
              {/* ---------------- NAME ---------------- */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User size={18} className="text-sky-600" />
                  Full Name
                </label>
                <input
                  {...register("name")}
                  className={`mt-2 w-full px-4 py-3.5 rounded-xl border ${
                    errors.name ? "border-red-400" : "border-gray-300"
                  } focus:outline-none focus:ring-4 focus:ring-sky-100`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* ---------------- EMAIL + OTP ---------------- */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Mail size={18} className="text-sky-600" />
                  Email Address
                </label>

                <div className="mt-2 flex gap-3">
                  <input
                    type="email"
                    {...register("email")}
                    disabled={otpSent}
                    className={`flex-1 px-4 py-3.5 rounded-xl border ${
                      errors.email ? "border-red-400" : "border-gray-300"
                    }`}
                    placeholder="you@gmail.com"
                  />

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={sendingOtp || resendTimer > 0 || otpSent}
                    className="px-6 py-3.5 bg-sky-600 text-white rounded-xl hover:bg-sky-700 disabled:bg-gray-300"
                  >
                    {sendingOtp ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={18} />
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
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* ---------------- OTP INPUT ---------------- */}
              {otpSent && !verified && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <label className="text-sm font-semibold text-gray-700 mt-2 block">
                    Enter 6-digit OTP
                  </label>

                  <div className="flex gap-3 mt-2">
                    <input
                      id="otp"
                      maxLength={6}
                      className="flex-1 px-4 py-3.5 text-center text-2xl font-mono rounded-xl border border-gray-300"
                      placeholder="••••••"
                    />

                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={verifyingOtp}
                      className="px-6 py-3.5 bg-green-600 text-white rounded-xl hover:bg-green-700"
                    >
                      {verifyingOtp ? (
                        <span className="flex items-center gap-2">
                          <Loader2 size={18} className="animate-spin" />{" "}
                          Verifying
                        </span>
                      ) : (
                        "Verify"
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ---------------- VERIFIED ---------------- */}
              {verified && (
                <p className="flex items-center gap-2 text-green-600 font-medium">
                  <CheckCircle2 size={20} /> Email verified!
                </p>
              )}

              {/* ---------------- PHONE ---------------- */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Phone size={18} className="text-sky-600" />
                  Phone Number (optional)
                </label>
                <input
                  {...register("phone")}
                  className="mt-2 w-full px-4 py-3.5 rounded-xl border border-gray-300"
                  placeholder="9876543210"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              {/* ---------------- PASSWORD ---------------- */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Lock size={18} className="text-sky-600" />
                  Password
                </label>

                <div className="mt-2 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="w-full px-4 py-3.5 pr-12 rounded-xl border border-gray-300"
                    placeholder="Create a strong password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-500"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                <div className="mt-3">
                  <PasswordStrengthMeter password={passwordValue || ""} />
                </div>
              </div>

              {/* ---------------- SUBMIT ---------------- */}
              <motion.button
                type="submit"
                disabled={!verified || mutation.isPending || isSubmitting}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-linear-to-r from-sky-600 to-blue-600 text-white font-bold text-lg py-4 rounded-xl disabled:bg-gray-400"
              >
                {mutation.isPending ? (
                  <span className="flex items-center gap-2 justify-center">
                    <Loader2 className="animate-spin" size={22} />
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </form>

            {/* ALREADY HAVE ACCOUNT */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-sky-600 hover:text-sky-700"
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
