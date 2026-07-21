import { useState } from "react";
import type { FormEvent } from "react";

export type ResetPasswordStep = "EMAIL" | "VERIFY_OTP" | "NEW_PASSWORD";

export default function useResetPassword() {
  const [step, setStep] = useState<ResetPasswordStep>("EMAIL");

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  /* ---------------- Email ---------------- */

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return;

    setIsLoading(true);

    try {
      /**
       * POST /forgot-password
       */

      setStep("VERIFY_OTP");
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- OTP ---------------- */

  const handleOtpChange = (value: string[]) => {
    setOtp(value);
  };

  const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.join("").length !== 6) return;

    setIsLoading(true);

    try {
      /**
       * POST /verify-otp
       *
       * {
       *   email,
       *   otp,
       *   purpose:"password_reset"
       * }
       */

      setStep("NEW_PASSWORD");
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- Password ---------------- */

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) return;

    setIsLoading(true);

    try {
      /**
       * POST /reset-password
       */
      /**
       * navigate("/login")
       */
    } finally {
      setIsLoading(false);
    }
  };

  const goBackToEmail = () => {
    setStep("EMAIL");
  };

  const goBackToOtp = () => {
    setStep("VERIFY_OTP");
  };

  const resendOtp = async () => {
    /**
     * POST /resend-otp
     */
  };

  return {
    step,
    email,
    otp,
    newPassword,
    confirmPassword,
    isLoading,
    setEmail,

    setNewPassword,
    setConfirmPassword,

    handleEmailSubmit,

    handleOtpChange,
    handleOtpSubmit,

    handleResetPassword,

    goBackToEmail,
    goBackToOtp,

    resendOtp,
  };
}
