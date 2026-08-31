////// with zustand
// src/pages/auth/LoginWithOTPContainer.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuthStore } from "../../store/useAuthStore";
import LoginWithOTPForm from "./LoginWithOTPView";

export default function LoginWithOTPContainer() {
  const navigate = useNavigate();

  // Zustand actions (FINAL API)
  const sendOtp = useAuthStore((s) => s.sendOtp);
  const loginWithOtp = useAuthStore((s) => s.loginWithOtp);

  // UI State
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [remaining, setRemaining] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /* -----------------------------
     COOLDOWN TIMER
  ----------------------------- */
  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setInterval(
      () => setRemaining((s) => Math.max(0, s - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, [remaining]);

  const clearError = () => setErrorMessage(null);

  /* -----------------------------
     SEND OTP
  ----------------------------- */
  const handleSendOTP = async () => {
    clearError();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage("Enter a valid email address.");
      return;
    }

    setSending(true);
    try {
      await sendOtp(email);
      toast.success("If an account exists, an OTP has been sent.");
      setStep("otp");
      setOtp("");
      setRemaining(60);
    } catch {
      setErrorMessage("Unable to send OTP.");
    } finally {
      setSending(false);
    }
  };

  /* -----------------------------
     VERIFY OTP
  ----------------------------- */
  const handleVerifyOTP = async () => {
    clearError();

    if (!otp || otp.length < 4) {
      setErrorMessage("Enter a valid OTP.");
      return;
    }

    setVerifying(true);
    try {
      await loginWithOtp({ email, otp });
      toast.success("Logged in!");
      navigate("/", { replace: true });
    } catch {
      setErrorMessage("Invalid OTP.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResetEmail = () => {
    setStep("email");
    setOtp("");
    clearError();
  };

  return (
    <LoginWithOTPForm
      step={step}
      email={email}
      setEmail={setEmail}
      otp={otp}
      setOtp={setOtp}
      sending={sending}
      verifying={verifying}
      remaining={remaining}
      errorMessage={errorMessage}
      onSendOTP={() => void handleSendOTP()}
      onVerifyOTP={() => void handleVerifyOTP()}
      onResendOTP={() => void handleSendOTP()}
      onResetEmail={handleResetEmail}
    />
  );
}
