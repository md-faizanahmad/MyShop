// src/components/auth/Login.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/Auth";

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  // Basic state
  const [email, setEmail] = useState("");

  // Password login
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP login
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  // Loading
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  // Error message
  const [error, setError] = useState("");

  // -------------------------------
  // TIMER FOR RESEND OTP
  // -------------------------------
  useEffect(() => {
    if (!otpSent || resendTimer === 0) return;
    const t = setInterval(() => {
      setResendTimer((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [otpSent, resendTimer]);

  // -------------------------------------
  // LOGIN WITH PASSWORD
  // -------------------------------------
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${API}/v1/users/login`,
        { email, password },
        { withCredentials: true }
      );

      toast.success("Logged in!");
      await refreshUser();

      navigate("/", { replace: true });
    } catch (err: any) {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Invalid email or password";

      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------
  // SEND OTP FOR LOGIN
  // -------------------------------------
  const handleSendOtp = async () => {
    if (!email) return toast.error("Enter your email first");

    setOtpLoading(true);
    try {
      await axios.post(
        `${API}/v1/users/send-otp`,
        { email, purpose: "login" },
        { withCredentials: true }
      );

      toast.success("OTP sent to your email");
      setOtpSent(true);
      setResendTimer(30); // 30-sec timer
    } catch (err: any) {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Unable to send OTP";

      toast.error(msg);
    } finally {
      setOtpLoading(false);
    }
  };

  // -------------------------------------
  // VERIFY OTP (LOGIN)
  // -------------------------------------
  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Enter OTP");

    setVerifyLoading(true);
    try {
      await axios.post(
        `${API}/v1/users/verify-otp`,
        { email, otp, purpose: "login" },
        { withCredentials: true }
      );

      toast.success("Logged in!");
      await refreshUser();
      navigate("/", { replace: true });
    } catch (err: any) {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Invalid OTP";

      toast.error(msg);
    } finally {
      setVerifyLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        {/* ERROR BOX */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-600 text-sm text-center mb-4 bg-red-50 py-2 px-4 rounded"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* EMAIL FIELD */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            required
            className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading || otpLoading || verifyLoading}
          />
        </div>

        {/* PASSWORD LOGIN */}
        <form onSubmit={handlePasswordLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="mt-1 w-full px-4 py-3 border rounded-lg pr-12 focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-4 text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login with Password"}
          </button>
        </form>

        {/* OR DIVIDER */}
        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* LOGIN WITH OTP */}
        {!otpSent ? (
          <>
            <button
              onClick={handleSendOtp}
              disabled={otpLoading || !email}
              className="w-full bg-gray-900 text-white font-medium py-3 rounded-lg hover:bg-black transition disabled:opacity-50"
            >
              {otpLoading ? "Sending OTP..." : "Login with OTP"}
            </button>
          </>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={verifyLoading}
              className="w-full bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-700 transition"
            >
              {verifyLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="text-center text-sm">
              {resendTimer > 0 ? (
                <p className="text-gray-500">
                  Resend OTP in <b>{resendTimer}s</b>
                </p>
              ) : (
                <button
                  className="text-blue-600 font-semibold"
                  onClick={handleSendOtp}
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
