import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { AxiosError } from "axios";
import apiClient from "@/lib/axios";

export type ForgotPasswordStep = "EMAIL" | "OTP" | "RESET" | "SUCCESS";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

const emptyOtp = () => Array(OTP_LENGTH).fill("");

export default function useForgotPassword() {
  const [step, setStep] = useState<ForgotPasswordStep>("EMAIL");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(emptyOtp());

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [resendCooldown, setResendCooldown] = useState(0);

  /* -----------------------------
     RESEND COUNTDOWN
  ----------------------------- */

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = window.setInterval(() => {
      setResendCooldown((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  /* -----------------------------
     ERROR MESSAGE
  ----------------------------- */

  const getErrorMessage = (error: unknown, fallback: string) => {
    if (error instanceof AxiosError) {
      return error.response?.data?.message || error.message || fallback;
    }

    return fallback;
  };

  /* -----------------------------
     EMAIL
  ----------------------------- */

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await apiClient.post("/forgot-password", {
        email: normalizedEmail,
      });

      setEmail(normalizedEmail);
      setOtp(emptyOtp());
      setResendCooldown(RESEND_COOLDOWN);

      setSuccessMessage(
        response.data?.message || "Verification code sent to your email.",
      );

      setStep("OTP");
    } catch (error) {
      setError(
        getErrorMessage(
          error,
          "Unable to send verification code. Please try again.",
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* -----------------------------
     OTP
  ----------------------------- */

  const handleOtpChange = (value: string[]) => {
    setOtp(value);

    if (error) {
      setError("");
    }
  };

  const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredOtp = otp.join("").trim().toLowerCase();

    if (enteredOtp.length !== OTP_LENGTH) {
      setError(`Please enter the ${OTP_LENGTH}-character verification code.`);
      return;
    }

    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await apiClient.post("/verify-otp", {
        email: email.trim().toLowerCase(),
        otp: enteredOtp,
        purpose: "password_reset",
      });

      setOtp(emptyOtp());

      setSuccessMessage(response.data?.message || "OTP verified successfully.");

      setStep("RESET");
    } catch (error) {
      const message = getErrorMessage(
        error,
        "Unable to verify the code. Please try again.",
      );

      // Wrong / expired OTP → clear entered code
      setOtp(emptyOtp());
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  /* -----------------------------
     RESEND OTP
  ----------------------------- */

  const resendOtp = async () => {
    if (resendLoading || resendCooldown > 0) return;

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Email address is required.");
      return;
    }

    setError("");
    setSuccessMessage("");
    setResendLoading(true);

    try {
      const response = await apiClient.post("/resend-otp", {
        email: normalizedEmail,
        purpose: "password_reset",
      });

      setOtp(emptyOtp());
      setResendCooldown(RESEND_COOLDOWN);

      setSuccessMessage(
        response.data?.message || "A new verification code has been sent.",
      );
    } catch (error) {
      setError(
        getErrorMessage(error, "Unable to resend the code. Please try again."),
      );
    } finally {
      setResendLoading(false);
    }
  };

  /* -----------------------------
     RESET PASSWORD
  ----------------------------- */

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);

    if (error) {
      setError("");
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);

    if (error) {
      setError("");
    }
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await apiClient.post("/reset-password", {
        email: email.trim().toLowerCase(),
        newPassword,
      });

      setNewPassword("");
      setConfirmPassword("");

      setSuccessMessage(response.data?.message || "Password reset successful.");

      setStep("SUCCESS");
    } catch (error) {
      setError(
        getErrorMessage(
          error,
          "Unable to reset your password. Please try again.",
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* -----------------------------
     NAVIGATION
  ----------------------------- */

  const goBack = () => {
    setError("");
    setSuccessMessage("");

    if (step === "OTP") {
      setOtp(emptyOtp());
      setStep("EMAIL");
      return;
    }

    if (step === "RESET") {
      setNewPassword("");
      setConfirmPassword("");
      setStep("OTP");
    }
  };

  const resetForgotPassword = () => {
    setStep("EMAIL");
    setEmail("");
    setOtp(emptyOtp());
    setNewPassword("");
    setConfirmPassword("");
    setIsLoading(false);
    setResendLoading(false);
    setResendCooldown(0);
    setError("");
    setSuccessMessage("");
  };

  return {
    // Step
    step,

    // Email
    email,
    setEmail,
    handleEmailSubmit,

    // OTP
    otp,
    handleOtpChange,
    handleOtpSubmit,
    resendOtp,
    resendLoading,
    resendCooldown,

    // Password
    newPassword,
    confirmPassword,
    setNewPassword: handleNewPasswordChange,
    setConfirmPassword: handleConfirmPasswordChange,
    handleResetPassword,

    // UI state
    isLoading,
    error,
    successMessage,

    // Navigation
    goBack,
    resetForgotPassword,

    setStep,
  };
}
