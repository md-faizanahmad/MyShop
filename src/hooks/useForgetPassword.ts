import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
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
      toast.error("Please enter your email address.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.post("/v1/users/forgot-password", {
        email: normalizedEmail,
      });

      setEmail(normalizedEmail);
      setOtp(emptyOtp());
      setResendCooldown(RESEND_COOLDOWN);
      setStep("OTP");

      toast.success(
        response.data?.message || "Verification code sent to your email.",
      );
    } catch (error) {
      toast.error(
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
  };

  const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredOtp = otp.join("").trim();

    if (enteredOtp.length !== OTP_LENGTH) {
      toast.error(
        `Please enter the ${OTP_LENGTH}-character verification code.`,
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.post("/v1/users/verify-otp", {
        email: email.trim().toLowerCase(),
        otp: enteredOtp,
        purpose: "password_reset",
      });

      setOtp(emptyOtp());
      setStep("RESET");

      toast.success(response.data?.message || "OTP verified successfully.");
    } catch (error) {
      setOtp(emptyOtp());

      toast.error(
        getErrorMessage(error, "Unable to verify the code. Please try again."),
      );
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
      toast.error("Email address is required.");
      return;
    }

    setResendLoading(true);

    try {
      const response = await apiClient.post("/v1/users/resend-otp", {
        email: normalizedEmail,
        purpose: "password_reset",
      });

      setOtp(emptyOtp());
      setResendCooldown(RESEND_COOLDOWN);

      toast.success(
        response.data?.message || "A new verification code has been sent.",
      );
    } catch (error) {
      toast.error(
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
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.post("/v1/users/reset-password", {
        email: email.trim().toLowerCase(),
        newPassword,
      });

      setNewPassword("");
      setConfirmPassword("");
      setStep("SUCCESS");

      toast.success(response.data?.message || "Password reset successful.");
    } catch (error) {
      toast.error(
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

    // Navigation
    goBack,

    setStep,
  };
}
