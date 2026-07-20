import { AnimatePresence } from "framer-motion";
import useForgotPassword from "./components/useForgotPassword";
import ForgotPasswordCard from "./components/ForgotPasswordCard";
import ForgotPasswordEmail from "./components/ForgotPasswordEmail";
import ForgotPasswordOtp from "./components/ForgotPasswordOtp";
import ForgotPasswordSuccess from "./components/ForgotPasswordSuccess";

export default function ForgotPasswordPage() {
  const {
    step,
    email,
    otp,
    isLoading,

    setEmail,

    handleEmailSubmit,
    handleOtpSubmit,
    handleOtpChange,

    goBack,
    resendOtp,
  } = useForgotPassword();

  return (
    <ForgotPasswordCard>
      <AnimatePresence mode="wait">
        {step === "EMAIL" && (
          <ForgotPasswordEmail
            email={email}
            isLoading={isLoading}
            onEmailChange={setEmail}
            onSubmit={handleEmailSubmit}
          />
        )}

        {step === "OTP" && (
          <ForgotPasswordOtp
            email={email}
            otp={otp}
            isLoading={isLoading}
            onBack={goBack}
            onOtpChange={handleOtpChange}
            onSubmit={handleOtpSubmit}
            onResend={resendOtp}
          />
        )}

        {step === "SUCCESS" && (
          <ForgotPasswordSuccess
            onContinue={() => {
              // TODO: navigate("/reset-password");
            }}
          />
        )}
      </AnimatePresence>
    </ForgotPasswordCard>
  );
}
