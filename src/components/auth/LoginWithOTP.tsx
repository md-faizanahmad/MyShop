// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/Auth";

// const API = import.meta.env.VITE_API_URL;

// export default function LoginWithOTP() {
//   const navigate = useNavigate();
//   const { refreshUser } = useAuth();

//   const [step, setStep] = useState<"email" | "otp">("email");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [otpLoading, setOtpLoading] = useState(false);

//   const [remaining, setRemaining] = useState(0); // resend countdown

//   // ------------------------------
//   // Countdown Timer
//   // ------------------------------
//   useEffect(() => {
//     if (remaining <= 0) return;
//     const timer = setInterval(() => setRemaining((s) => s - 1), 1000);
//     return () => clearInterval(timer);
//   }, [remaining]);

//   // ------------------------------
//   // Send OTP
//   // ------------------------------
//   const sendOTP = async () => {
//     if (!email.includes("@")) {
//       toast.error("Enter a valid email");
//       return;
//     }

//     setOtpLoading(true);

//     try {
//       await axios.post(
//         `${API}/v1/auth/login/send-otp`,
//         { email },
//         { withCredentials: true }
//       );

//       toast.success("OTP sent to your email!");
//       setStep("otp");
//       setRemaining(30);
//     } catch (err: any) {
//       const msg = err.response?.data?.message || "Failed to send OTP";
//       toast.error(msg);
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   // ------------------------------
//   // Verify OTP => Login
//   // ------------------------------
//   const verifyOTP = async () => {
//     if (otp.length < 4) {
//       toast.error("OTP must be 4–8 characters");
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.post(
//         `${API}/v1/auth/login/verify-otp`,
//         { email, otp },
//         { withCredentials: true }
//       );

//       toast.success("Logged in!");
//       await refreshUser();

//       navigate("/", { replace: true });
//     } catch (err: any) {
//       const msg = err.response?.data?.message || "Invalid OTP";
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg"
//       >
//         <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
//           Login with OTP
//         </h2>

//         {/* STEP 1: ENTER EMAIL */}
//         {step === "email" && (
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={otpLoading}
//               />
//             </div>

//             <motion.button
//               whileTap={{ scale: 0.98 }}
//               onClick={sendOTP}
//               disabled={otpLoading}
//               className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//             >
//               {otpLoading ? "Sending..." : "Send OTP"}
//             </motion.button>

//             <p className="text-center text-sm text-gray-600">
//               Want to use password login?{" "}
//               <Link to="/login" className="text-blue-600 font-semibold">
//                 Login with password
//               </Link>
//             </p>
//           </div>
//         )}

//         {/* STEP 2: VERIFY OTP */}
//         {step === "otp" && (
//           <AnimatePresence>
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="space-y-6"
//             >
//               <p className="text-sm text-gray-600">
//                 We sent an OTP to <span className="font-semibold">{email}</span>
//               </p>

//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 maxLength={8}
//                 placeholder="Enter OTP"
//                 className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 disabled={loading}
//               />

//               <motion.button
//                 whileTap={{ scale: 0.98 }}
//                 onClick={verifyOTP}
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//               >
//                 {loading ? "Verifying..." : "Login"}
//               </motion.button>

//               {/* Resend OTP */}
//               <p className="text-center text-sm text-gray-600">
//                 Didn’t receive OTP?{" "}
//                 {remaining > 0 ? (
//                   <span className="text-gray-400">Resend in {remaining}s</span>
//                 ) : (
//                   <button
//                     onClick={sendOTP}
//                     className="text-blue-600 font-semibold hover:underline"
//                   >
//                     Resend OTP
//                   </button>
//                 )}
//               </p>

//               <p className="text-center text-sm text-gray-600">
//                 Wrong email?{" "}
//                 <button
//                   onClick={() => setStep("email")}
//                   className="text-blue-600 font-semibold hover:underline"
//                 >
//                   Change email
//                 </button>
//               </p>
//             </motion.div>
//           </AnimatePresence>
//         )}
//       </motion.div>
//     </div>
//   );
// }
// src/components/auth/LoginWithOTPContainer.tsx
////////// update with refactor
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useAuth } from "../../context/Auth";
// import { useLoginWithOTP } from "../../hooks/useLoginWithOTP";
// import LoginWithOTPView from "./LoginWithOTPView";
// import type { JSX } from "react";

// export default function LoginWithOTPContainer(): JSX.Element {
//   const navigate = useNavigate();
//   const { refreshUser } = useAuth();

//   const {
//     step,
//     email,
//     setEmail,
//     otp,
//     setOtp,
//     sending,
//     verifying,
//     remaining,
//     errorMessage,
//     sendOTP,
//     verifyOTP,
//     resetToEmail,
//     clearError,
//   } = useLoginWithOTP({ cooldownSeconds: 60 });

//   // sendOTP is from hook (calls API). For security UX we show generic toast here.
//   const handleSendOTP = async () => {
//     await sendOTP();
//     // show generic toast (do not reveal whether email exists).
//     toast.success("If an account exists, an OTP was sent to that email.");
//   };

//   const handleVerifyOTP = async () => {
//     try {
//       await verifyOTP();
//       // success -> refresh user + redirect (container is app-aware)
//       if (typeof refreshUser === "function") {
//         try {
//           await refreshUser();
//         } catch {
//           // ignore refresh errors
//         }
//       }
//       toast.success("Logged in!");
//       navigate("/", { replace: true });
//     } catch {
//       // verifyOTP already sets errorMessage; optionally show toast
//       // toast.error("Invalid OTP");
//     }
//   };

//   return (
//     <LoginWithOTPView
//       step={step}
//       email={email}
//       setEmail={setEmail}
//       otp={otp}
//       setOtp={setOtp}
//       sending={sending}
//       verifying={verifying}
//       remaining={remaining}
//       errorMessage={errorMessage}
//       onSendOTP={handleSendOTP}
//       onVerifyOTP={handleVerifyOTP}
//       onResendOTP={handleSendOTP}
//       onResetEmail={() => {
//         resetToEmail();
//         clearError();
//       }}
//     />
//   );
// }

////// with zustand
// src/pages/auth/LoginWithOTPContainer.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuthStore } from "../../store/useAuthStore";
import LoginWithOTPView from "./LoginWithOTPView";

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
      1000
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
    <LoginWithOTPView
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
