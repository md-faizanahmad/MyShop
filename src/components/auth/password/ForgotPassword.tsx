import { AnimatePresence } from "framer-motion";
import useForgotPassword from "./components/useForgotPassword";
import ForgotPasswordCard from "./components/ForgotPasswordCard";
import ForgotPasswordEmail from "./components/ForgotPasswordEmail";
import ForgotPasswordOtp from "./components/ForgotPasswordOtp";
import ForgotPasswordReset from "./components/ForgotPasswordReset";
import ForgotPasswordSuccess from "./components/ForgotPasswordSuccess";

export default function ForgotPasswordPage() {
  const {
    step,
    email,
    otp,
    isLoading,
    error,
    successMessage,

    setEmail,
    handleEmailSubmit,

    handleOtpSubmit,
    handleOtpChange,
    resendOtp,
    resendLoading,
    resendCooldown,

    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    handleResetPassword,

    goBack,
    resetForgotPassword,
  } = useForgotPassword();

  return (
    <ForgotPasswordCard>
      <AnimatePresence mode="wait">
        {step === "EMAIL" && (
          <ForgotPasswordEmail
            email={email}
            isLoading={isLoading}
            error={error}
            onEmailChange={setEmail}
            onSubmit={handleEmailSubmit}
          />
        )}

        {step === "OTP" && (
          <ForgotPasswordOtp
            email={email}
            otp={otp}
            isLoading={isLoading}
            error={error}
            successMessage={successMessage}
            resendLoading={resendLoading}
            resendCooldown={resendCooldown}
            onBack={goBack}
            onOtpChange={handleOtpChange}
            onSubmit={handleOtpSubmit}
            onResend={resendOtp}
          />
        )}

        {step === "RESET" && (
          <ForgotPasswordReset
            isLoading={isLoading}
            error={error}
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            onNewPasswordChange={setNewPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onBack={goBack}
            onSubmit={handleResetPassword}
          />
        )}

        {step === "SUCCESS" && (
          <ForgotPasswordSuccess onContinue={resetForgotPassword} />
        )}
      </AnimatePresence>
    </ForgotPasswordCard>
  );
}
