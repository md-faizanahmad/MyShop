import { useState } from "react";
import type { FormEvent } from "react";

export type ForgotPasswordStep = "EMAIL" | "OTP" | "SUCCESS";

export default function useForgotPassword() {
  const [step, setStep] = useState<ForgotPasswordStep>("EMAIL");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return;

    setIsLoading(true);

    // TODO: Call Send OTP API
    setTimeout(() => {
      setIsLoading(false);
      setStep("OTP");
    }, 1200);
  };

  const handleOtpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.join("").length < 6) return;

    setIsLoading(true);

    // TODO: Call Verify OTP API
    setTimeout(() => {
      setIsLoading(false);
      setStep("SUCCESS");
    }, 1200);
  };

  const handleOtpChange = (value: string[]) => {
    setOtp(value);
  };

  const goBack = () => {
    setStep("EMAIL");
  };

  const resendOtp = () => {
    // TODO: Call Resend OTP API
  };

  return {
    step,

    email,
    otp,

    isLoading,

    setEmail,

    handleOtpChange,

    handleEmailSubmit,
    handleOtpSubmit,

    goBack,
    resendOtp,

    setStep,
  };
}
