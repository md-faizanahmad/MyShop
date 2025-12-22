// src/pages/auth/Login.tsx
import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginForm from "./LoginForm";
import { useAuthStore } from "../../store/useAuthStore";

const API_BASE = import.meta.env.VITE_API_URL as string;

export default function Login() {
  const navigate = useNavigate();

  // Zustand actions
  const loginWithPassword = useAuthStore((s) => s.loginWithPassword);
  const loginWithOtp = useAuthStore((s) => s.loginWithOtp);

  // UI state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const [error, setError] = useState("");

  // ----------------------------
  // OTP RESEND TIMER
  // ----------------------------
  useEffect(() => {
    if (!otpSent || resendTimer === 0) return;

    const timer = setInterval(() => {
      setResendTimer((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [otpSent, resendTimer]);

  // ----------------------------
  // LOGIN WITH PASSWORD
  // ----------------------------
  const handlePasswordLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) return;

    setLoading(true);
    setError("");

    try {
      await loginWithPassword({ email, password });
      toast.success("Logged in successfully");
      navigate("/", { replace: true });
    } catch {
      setError("Invalid email or password");
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // SEND OTP (API ONLY)
  // ----------------------------
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Enter your email first");
      return;
    }

    setOtpLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/v1/users/send-otp`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          purpose: "login",
        }),
      });

      if (!res.ok) {
        throw new Error("OTP_SEND_FAILED");
      }

      toast.success("OTP sent to your email");
      setOtpSent(true);
      setResendTimer(30);
    } catch {
      toast.error("Unable to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  // ----------------------------
  // VERIFY OTP (LOGIN)
  // ----------------------------
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Enter OTP");
      return;
    }

    setVerifyLoading(true);
    setError("");

    try {
      await loginWithOtp({ email, otp });
      toast.success("Logged in successfully");
      navigate("/", { replace: true });
    } catch {
      setError("Invalid OTP");
      toast.error("Invalid OTP");
    } finally {
      setVerifyLoading(false);
    }
  };

  // ----------------------------
  // Input handlers
  // ----------------------------
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) =>
    setOtp(e.target.value);

  return (
    <LoginForm
      email={email}
      password={password}
      otp={otp}
      showPassword={showPassword}
      otpSent={otpSent}
      resendTimer={resendTimer}
      loading={loading}
      otpLoading={otpLoading}
      verifyLoading={verifyLoading}
      error={error}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onOtpChange={handleOtpChange}
      onSubmitPassword={handlePasswordLogin}
      onSendOtp={handleSendOtp}
      onVerifyOtp={handleVerifyOtp}
      toggleShowPassword={() => setShowPassword((prev) => !prev)}
    />
  );
}
