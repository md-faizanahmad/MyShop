// ////// with zustand
// // src/pages/auth/LoginWithOTPContainer.tsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// import { useAuthStore } from "../../store/useAuthStore";
// import LoginWithOTPForm from "./LoginWithOTPView";

// export default function LoginWithOTPContainer() {
//   const navigate = useNavigate();

//   // Zustand actions (FINAL API)
//   const sendOtp = useAuthStore((s) => s.sendOtp);
//   const loginWithOtp = useAuthStore((s) => s.loginWithOtp);

//   // UI State
//   const [step, setStep] = useState<"email" | "otp">("email");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");

//   const [sending, setSending] = useState(false);
//   const [verifying, setVerifying] = useState(false);

//   const [remaining, setRemaining] = useState(0);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   /* -----------------------------
//      COOLDOWN TIMER
//   ----------------------------- */
//   useEffect(() => {
//     if (remaining <= 0) return;
//     const timer = setInterval(
//       () => setRemaining((s) => Math.max(0, s - 1)),
//       1000,
//     );
//     return () => clearInterval(timer);
//   }, [remaining]);

//   const clearError = () => setErrorMessage(null);

//   /* -----------------------------
//      SEND OTP
//   ----------------------------- */
//   const handleSendOTP = async () => {
//     clearError();

//     if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
//       setErrorMessage("Enter a valid email address.");
//       return;
//     }

//     setSending(true);
//     try {
//       await sendOtp(email);
//       toast.success("If an account exists, an OTP has been sent.");
//       setStep("otp");
//       setOtp("");
//       setRemaining(60);
//     } catch {
//       setErrorMessage("Unable to send OTP.");
//     } finally {
//       setSending(false);
//     }
//   };

//   /* -----------------------------
//      VERIFY OTP
//   ----------------------------- */
//   const handleVerifyOTP = async () => {
//     clearError();

//     if (!otp || otp.length < 4) {
//       setErrorMessage("Enter a valid OTP.");
//       return;
//     }

//     setVerifying(true);
//     try {
//       await loginWithOtp({ email, otp });
//       toast.success("Logged in!");
//       navigate("/", { replace: true });
//     } catch {
//       setErrorMessage("Invalid OTP.");
//     } finally {
//       setVerifying(false);
//     }
//   };

//   const handleResetEmail = () => {
//     setStep("email");
//     setOtp("");
//     clearError();
//   };

//   return (
//     <LoginWithOTPForm
//       step={step}
//       email={email}
//       setEmail={setEmail}
//       otp={otp}
//       setOtp={setOtp}
//       sending={sending}
//       verifying={verifying}
//       remaining={remaining}
//       errorMessage={errorMessage}
//       onSendOTP={() => void handleSendOTP()}
//       onVerifyOTP={() => void handleVerifyOTP()}
//       onResendOTP={() => void handleSendOTP()}
//       onResetEmail={handleResetEmail}
//     />
//   );
// }

/////////////////////////////////////////////////////////////////////////////////////////
////// Refactor 07-nov-2026, refactor & Improvment instead of too many use-

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuthStore } from "../../store/useAuthStore";
import LoginWithOTPForm from "./LoginWithOTPView";

type LoginStep = "email" | "otp";

export default function LoginWithOTPContainer() {
  const navigate = useNavigate();

  const sendOtp = useAuthStore((state) => state.sendOtp);
  const loginWithOtp = useAuthStore((state) => state.loginWithOtp);

  // Form state
  const [form, setForm] = useState({
    email: "",
    otp: "",
  });

  // UI state
  const [ui, setUi] = useState<{
    step: LoginStep;
    sending: boolean;
    verifying: boolean;
    errorMessage: string | null;
  }>({
    step: "email",
    sending: false,
    verifying: false,
    errorMessage: null,
  });

  // Cooldown state
  const [remaining, setRemaining] = useState(0);

  // Clear error
  const clearError = () => {
    setUi((prev) => ({ ...prev, errorMessage: null }));
  };

  // Cooldown timer
  useEffect(() => {
    if (remaining <= 0) return;

    const timer = setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [remaining]);

  // Send OTP
  const handleSendOTP = async () => {
    clearError();

    const email = form.email.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setUi((prev) => ({
        ...prev,
        errorMessage: "Enter a valid email address.",
      }));
      return;
    }

    setUi((prev) => ({ ...prev, sending: true }));

    try {
      await sendOtp(email);

      toast.success("If an account exists, an OTP has been sent.");

      setForm((prev) => ({ ...prev, email, otp: "" }));
      setUi((prev) => ({ ...prev, step: "otp" }));
      setRemaining(60);
    } catch {
      setUi((prev) => ({
        ...prev,
        errorMessage: "Unable to send OTP.",
      }));
    } finally {
      setUi((prev) => ({ ...prev, sending: false }));
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    clearError();

    if (!form.otp || form.otp.length < 4) {
      setUi((prev) => ({
        ...prev,
        errorMessage: "Enter a valid OTP.",
      }));
      return;
    }

    setUi((prev) => ({ ...prev, verifying: true }));

    try {
      await loginWithOtp({
        email: form.email,
        otp: form.otp,
      });

      toast.success("Logged in!");
      navigate("/", { replace: true });
    } catch {
      setUi((prev) => ({
        ...prev,
        errorMessage: "Invalid OTP.",
      }));
    } finally {
      setUi((prev) => ({ ...prev, verifying: false }));
    }
  };

  // Reset email
  const handleResetEmail = () => {
    setForm((prev) => ({ ...prev, otp: "" }));

    setUi((prev) => ({
      ...prev,
      step: "email",
      errorMessage: null,
    }));
  };

  return (
    <LoginWithOTPForm
      step={ui.step}
      email={form.email}
      setEmail={(email) => setForm((prev) => ({ ...prev, email }))}
      otp={form.otp}
      setOtp={(otp) => setForm((prev) => ({ ...prev, otp }))}
      sending={ui.sending}
      verifying={ui.verifying}
      remaining={remaining}
      errorMessage={ui.errorMessage}
      onSendOTP={() => void handleSendOTP()}
      onVerifyOTP={() => void handleVerifyOTP()}
      onResendOTP={() => void handleSendOTP()}
      onResetEmail={handleResetEmail}
    />
  );
}
