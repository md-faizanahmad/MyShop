import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  forgotPassword,
  verifyOtp,
  resetPassword,
  resendOtp,
} from "../api/resetPasswordApi";
import {
  INITIAL_OTP,
  RESET_PASSWORD_STEP,
  type ResetPasswordStep,
} from "../types/resetPassword";

export default function useResetPassword() {
  const navigate = useNavigate();

  /* -------------------------------------------------------------------------- */
  /*                                   State                                    */
  /* -------------------------------------------------------------------------- */

  const [step, setStep] = useState<ResetPasswordStep>(
    RESET_PASSWORD_STEP.EMAIL,
  );
  // const [step, setStep] = useState(RESET_PASSWORD_STEP.EMAIL);

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState<string[]>(INITIAL_OTP);

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                              Computed Values                               */
  /* -------------------------------------------------------------------------- */

  const isOtpComplete = useMemo(
    () => otp.every((digit) => digit !== ""),
    [otp],
  );

  const isPasswordMatched = useMemo(() => {
    return (
      newPassword.length > 0 &&
      confirmPassword.length > 0 &&
      newPassword === confirmPassword
    );
  }, [newPassword, confirmPassword]);

  const canResetPassword = useMemo(() => {
    return (
      newPassword.trim().length >= 6 &&
      confirmPassword.trim().length >= 6 &&
      isPasswordMatched
    );
  }, [newPassword, confirmPassword, isPasswordMatched]);

  /* -------------------------------------------------------------------------- */
  /*                              Helper Functions                              */
  /* -------------------------------------------------------------------------- */

  const clearError = () => setError("");

  const resetOtp = () => setOtp([...INITIAL_OTP]);

  const resetFlow = () => {
    setStep(RESET_PASSWORD_STEP.EMAIL);

    setEmail("");

    resetOtp();

    setNewPassword("");

    setConfirmPassword("");

    setShowPassword(false);

    setShowConfirmPassword(false);

    setError("");
  };

  /* -------------------------------------------------------------------------- */
  /*                                OTP Handler                                 */
  /* -------------------------------------------------------------------------- */

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const nextOtp = [...otp];
    nextOtp[index] = value;

    setOtp(nextOtp);

    clearError();
  };

  /* -------------------------------------------------------------------------- */
  /*                              Password Toggle                               */
  /* -------------------------------------------------------------------------- */

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  /* -------------------------------------------------------------------------- */
  /*                              Navigation Step                               */
  /* -------------------------------------------------------------------------- */

  const goBackToEmail = () => {
    resetOtp();
    setStep(RESET_PASSWORD_STEP.EMAIL);
    clearError();
  };

  const goBackToOtp = () => {
    setNewPassword("");
    setConfirmPassword("");
    setStep(RESET_PASSWORD_STEP.VERIFY_OTP);
    clearError();
  };

  /* -------------------------------------------------------------------------- */
  /*                               Send OTP                                     */
  /* -------------------------------------------------------------------------- */

  const handleEmailSubmit = async () => {
    try {
      clearError();

      setIsLoading(true);

      await forgotPassword({
        email: email.trim(),
      });

      resetOtp();

      setStep(RESET_PASSWORD_STEP.VERIFY_OTP);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to send OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               Verify OTP                                   */
  /* -------------------------------------------------------------------------- */

  const handleOtpSubmit = async () => {
    try {
      clearError();

      setIsLoading(true);

      await verifyOtp({
        email: email.trim(),
        otp: otp.join(""),
      });

      setStep(RESET_PASSWORD_STEP.RESET_PASSWORD);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Invalid OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                            Reset Password                                  */
  /* -------------------------------------------------------------------------- */

  const handleResetPassword = async () => {
    if (!canResetPassword) return;

    try {
      clearError();

      setIsLoading(true);

      await resetPassword({
        email: email.trim(),
        newPassword,
      });

      navigate("/login", {
        replace: true,
      });
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Unable to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               Resend OTP                                   */
  /* -------------------------------------------------------------------------- */

  const handleResendOtp = async () => {
    try {
      clearError();

      setIsLoading(true);

      resetOtp();

      await resendOtp({
        email: email.trim(),
      });
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Unable to resend OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Return                                   */
  /* -------------------------------------------------------------------------- */

  return {
    // State
    step,
    email,
    otp,
    newPassword,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    isLoading,
    error,

    // Computed
    isOtpComplete,
    isPasswordMatched,
    canResetPassword,

    // Setters
    setEmail,
    setNewPassword,
    setConfirmPassword,

    // Actions
    handleOtpChange,
    handleEmailSubmit,
    handleOtpSubmit,
    handleResetPassword,
    handleResendOtp,

    goBackToEmail,
    goBackToOtp,

    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,

    resetFlow,
  };
}
