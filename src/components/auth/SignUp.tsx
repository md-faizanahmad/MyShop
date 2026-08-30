// /// Update
// // src/pages/auth/SignUp.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { validateName, validateCustomEmail } from "../../utils/validation";
import { getErrorMessage } from "../../utils/getErrorMessage";
import SignupForm from "./SignupForm";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL ?? "";

// Validation Schema
const signupSchema = z.object({
  name: z.string().refine((v) => validateName(v) === true, {
    message: validateName("invalid") as string,
  }),
  email: z.string().refine((v) => validateCustomEmail(v) === true, {
    message: validateCustomEmail("bad") as string,
  }),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || /^\d{10,15}$/.test(v), {
      message: "Enter a valid phone number",
    }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SignupFormType = UseFormReturn<SignupInput>;

export default function SignUp() {
  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", phone: "", password: "" },
  });

  const passwordValue = form.watch("password");

  // Resend Timer Countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  // SEND OTP
  const handleSendOtp = async () => {
    const email = form.getValues("email").trim();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setSendingOtp(true);
    try {
      const res = await axios.post(`${API}/v1/users/send-otp`, {
        email,
        purpose: "signup",
      });

      if (res.data.success) {
        setOtpSent(true);
        setResendTimer(45);
        toast.success("OTP sent!");
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSendingOtp(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    const email = form.getValues("email");
    const otp = (
      document.getElementById("otp") as HTMLInputElement | null
    )?.value.trim();

    if (!otp || otp.length < 4) {
      toast.error("Enter valid OTP");
      return;
    }

    setVerifyingOtp(true);

    try {
      const res = await axios.post(`${API}/v1/users/verify-otp`, {
        email,
        otp,
        purpose: "signup",
      });

      if (res.data.success) {
        toast.success("Email verified!");
        setVerified(true);

        if (res.data.otpToken) {
          setOtpToken(res.data.otpToken);
        }
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setVerifyingOtp(false);
    }
  };

  // SIGNUP MUTATION
  const mutation = useMutation({
    mutationFn: async (data: SignupInput) => {
      const res = await axios.post(`${API}/v1/users/signup`, {
        ...data,
        otpToken,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Account created!");
      navigate("/login");
      // window.location.href = "/";
    },
    onError: (err: unknown) => {
      toast.error(getErrorMessage(err));
    },
  });

  const handleSubmit = (data: SignupInput) => {
    mutation.mutate(data);
  };

  return (
    <SignupForm
      form={form}
      passwordValue={passwordValue || ""}
      showPassword={showPassword}
      toggleShowPassword={() => setShowPassword((prev) => !prev)}
      otpSent={otpSent}
      verified={verified}
      resendTimer={resendTimer}
      sendingOtp={sendingOtp}
      verifyingOtp={verifyingOtp}
      isMutationPending={mutation.isPending}
      onSendOtp={handleSendOtp}
      onVerifyOtp={handleVerifyOtp}
      onSubmit={handleSubmit}
    />
  );
}
////////////////////// Refactor with design

// import { useSignup } from "../../hooks/useSignup";
// import SignupForm from "./SignupForm";

// export default function SignUp() {
//   const signup = useSignup();

//   return <SignupForm {...signup} />;
// }
