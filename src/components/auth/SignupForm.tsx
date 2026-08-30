// ///////////////////////////////////////////////////////03082026
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
import type { SignupFormType, SignupInput } from "@/hooks/useSignup";

interface SignupFormProps {
  form: SignupFormType;
  passwordValue: string;
  showPassword: boolean;
  toggleShowPassword: () => void;

  otpSent: boolean;
  verified: boolean;
  resendTimer: number;
  sendingOtp: boolean;
  verifyingOtp: boolean;
  isMutationPending: boolean;

  onSendOtp: () => void;
  onVerifyOtp: () => void;
  onSubmit: (data: SignupInput) => void;
}

export default function SignupForm({
  form,
  passwordValue,
  showPassword,
  toggleShowPassword,
  otpSent,
  verified,
  resendTimer,
  sendingOtp,
  verifyingOtp,
  isMutationPending,
  onSendOtp,
  onVerifyOtp,
  onSubmit,
}: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="min-h-screen lg:mt-0 md:mt-0 mt-8  flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md sm:max-w-lg lg:max-w-xl"
      >
        <div className=" rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden border border-sky-100/60">
          {/* Header */}
          <div className="bg-sky-600 px-4 xs:px-6 sm:px-8 py-5 sm:py-7 text-white text-center sm:text-left">
            <h3 className="text-2xl xs:text-xl sm:text-2xl font-bold tracking-tight">
              Create your account
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-sky-100 font-medium">
              Join AZ Store today!
            </p>
          </div>

          {/* FORM */}
          <div className="px-6 sm:px-10 py-6 sm:py-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 sm:space-y-6"
            >
              {/* NAME */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                  <User size={18} className="text-sky-600 shrink-0" />
                  Full Name
                </label>
                <input
                  {...register("name")}
                  className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-sm sm:text-base transition-colors ${
                    errors.name ? "border-red-400" : "border-gray-300"
                  } focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20`}
                  placeholder="John Doe"
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* EMAIL + OTP */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                  <Mail size={18} className="text-sky-600 shrink-0" />
                  Email Address
                </label>

                <div className="flex gap-2.5 sm:gap-3">
                  <input
                    type="email"
                    {...register("email")}
                    disabled={otpSent}
                    className={`flex-1 min-w-0 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-sm sm:text-base transition-colors ${
                      errors.email ? "border-red-400" : "border-gray-300"
                    } focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 disabled:bg-gray-100 disabled:text-gray-500`}
                    placeholder="you@gmail.com"
                    autoComplete="email"
                  />

                  <button
                    type="button"
                    onClick={onSendOtp}
                    disabled={sendingOtp || resendTimer > 0 || otpSent}
                    className="shrink-0 px-4 sm:px-5 py-2.5 sm:py-3 bg-sky-600 text-white text-xs sm:text-sm font-medium rounded-xl hover:bg-sky-700 active:scale-[0.98] transition-all disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    {sendingOtp ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        <span>Sending</span>
                      </>
                    ) : resendTimer > 0 ? (
                      <>Resend {resendTimer}s</>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </div>

                {errors.email && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* OTP INPUT */}
              {otpSent && !verified && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-1.5"
                >
                  <label className="text-sm font-semibold text-gray-700 block">
                    Enter OTP
                  </label>

                  <div className="flex gap-2.5 sm:gap-3">
                    <input
                      id="otp"
                      maxLength={6}
                      className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 text-center text-lg sm:text-xl font-mono tracking-[0.3em] rounded-xl border border-gray-300 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      placeholder="••••••"
                      inputMode="numeric"
                    />

                    <button
                      type="button"
                      onClick={onVerifyOtp}
                      disabled={verifyingOtp}
                      className="shrink-0 px-4 sm:px-5 py-2.5 sm:py-3 bg-green-600 text-white text-xs sm:text-sm font-medium rounded-xl hover:bg-green-700 active:scale-[0.98] transition-all disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      {verifyingOtp ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Verifying</span>
                        </>
                      ) : (
                        "Verify"
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* VERIFIED BADGE */}
              {verified && (
                <div className="flex items-center gap-2 text-green-600 font-medium text-xs sm:text-sm bg-green-50 px-3.5 py-2 rounded-xl border border-green-200">
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span>Email successfully verified!</span>
                </div>
              )}

              {/* PHONE */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                  <Phone size={18} className="text-sky-600 shrink-0" />
                  Phone Number{" "}
                  <span className="text-gray-400 font-normal text-xs">
                    (optional)
                  </span>
                </label>
                <input
                  {...register("phone")}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 text-sm sm:text-base focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-colors"
                  placeholder="9876543210"
                  inputMode="tel"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1.5">
                  <Lock size={18} className="text-sky-600 shrink-0" />
                  Password
                </label>

                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 pr-11 rounded-xl border border-gray-300 text-sm sm:text-base focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-colors"
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="mt-2.5">
                  <PasswordStrengthMeter password={passwordValue || ""} />
                </div>

                {errors.password && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* SUBMIT */}
              <motion.button
                type="submit"
                disabled={!verified || isMutationPending || isSubmitting}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-medium text-xs xs:text-sm sm:text-base py-2.5 xs:py-3 sm:py-3.5 rounded-xl shadow-sm hover:shadow transition-all duration-200 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:shadow-none disabled:border disabled:border-zinc-200 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {isMutationPending ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    <span>Creating account...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </form>

            {/* ALREADY HAVE ACCOUNT */}
            <div className="mt-6 text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-sky-600 hover:text-sky-700 underline-offset-2 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
/////////////////////////////////////////// Refactor Design adn Code

// import { Link } from "react-router-dom";
// import {
//   CheckCircle2,
//   Eye,
//   EyeOff,
//   Loader2,
//   Lock,
//   Mail,
//   Phone,
//   User,
// } from "lucide-react";

// import type { SignupFormType, SignupInput } from "../../hooks/useSignup";

// import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";

// interface SignupFormProps {
//   form: SignupFormType;
//   passwordValue: string;

//   showPassword: boolean;
//   toggleShowPassword: () => void;

//   otp: string;
//   setOtp: (value: string) => void;

//   otpSent: boolean;
//   verified: boolean;
//   resendTimer: number;

//   sendingOtp: boolean;
//   verifyingOtp: boolean;
//   isMutationPending: boolean;

//   onSendOtp: () => void;
//   onVerifyOtp: () => void;
//   onSubmit: (data: SignupInput) => void;
// }

// export default function SignupForm({
//   form,
//   passwordValue,
//   showPassword,
//   toggleShowPassword,

//   otp,
//   setOtp,

//   otpSent,
//   verified,
//   resendTimer,

//   sendingOtp,
//   verifyingOtp,
//   isMutationPending,

//   onSendOtp,
//   onVerifyOtp,
//   onSubmit,
// }: SignupFormProps) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = form;

//   return (
//     <main className="min-h-screen bg-zinc-50 px-4 py-8 sm:px-6 lg:px-8">
//       <div className="mx-auto w-full max-w-4xl">
//         {/* HEADER */}
//         <header className="mb-7">
//           <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
//             Create your account
//           </h1>

//           <p className="mt-1 text-sm text-zinc-500">
//             Join AZ Store and start shopping.
//           </p>
//         </header>

//         {/* FORM */}
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="grid grid-cols-1 gap-x-8 gap-y-5 lg:grid-cols-2"
//         >
//           {/* =========================
//               LEFT COLUMN
//           ========================== */}

//           <div className="space-y-5">
//             {/* NAME */}
//             <div>
//               <label
//                 htmlFor="signup-name"
//                 className="mb-1.5 flex items-center gap-2 text-sm font-medium text-zinc-700"
//               >
//                 <User size={16} className="text-red-600" />
//                 Full Name
//               </label>

//               <input
//                 id="signup-name"
//                 {...register("name")}
//                 type="text"
//                 placeholder="John Doe"
//                 autoComplete="name"
//                 className={`w-full border bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition ${
//                   errors.name
//                     ? "border-red-400 focus:border-red-500"
//                     : "border-zinc-300 focus:border-red-500"
//                 }`}
//               />

//               {errors.name && (
//                 <p className="mt-1 text-xs text-red-600">
//                   {errors.name.message}
//                 </p>
//               )}
//             </div>

//             {/* EMAIL */}
//             <div>
//               <label
//                 htmlFor="signup-email"
//                 className="mb-1.5 flex items-center gap-2 text-sm font-medium text-zinc-700"
//               >
//                 <Mail size={16} className="text-red-600" />
//                 Email Address
//               </label>

//               <div className="flex gap-2">
//                 <input
//                   id="signup-email"
//                   {...register("email")}
//                   type="email"
//                   disabled={otpSent}
//                   placeholder="you@gmail.com"
//                   autoComplete="email"
//                   className={`min-w-0 flex-1 border bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition ${
//                     errors.email
//                       ? "border-red-400"
//                       : "border-zinc-300 focus:border-red-500"
//                   } disabled:bg-zinc-100 disabled:text-zinc-500`}
//                 />

//                 <button
//                   type="button"
//                   onClick={onSendOtp}
//                   disabled={sendingOtp || resendTimer > 0 || otpSent}
//                   className="shrink-0 border border-red-600 bg-red-600 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:border-zinc-200 disabled:bg-zinc-100 disabled:text-zinc-400"
//                 >
//                   {sendingOtp ? (
//                     <span className="flex items-center gap-1.5">
//                       <Loader2 size={14} className="animate-spin" />
//                       Sending
//                     </span>
//                   ) : resendTimer > 0 ? (
//                     `${resendTimer}s`
//                   ) : (
//                     "Send OTP"
//                   )}
//                 </button>
//               </div>

//               {errors.email && (
//                 <p className="mt-1 text-xs text-red-600">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             {/* OTP */}
//             {otpSent && !verified && (
//               <div>
//                 <label
//                   htmlFor="signup-otp"
//                   className="mb-1.5 block text-sm font-medium text-zinc-700"
//                 >
//                   Verification Code
//                 </label>

//                 <div className="flex gap-2">
//                   <input
//                     id="signup-otp"
//                     type="text"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     maxLength={6}
//                     autoComplete="one-time-code"
//                     placeholder="Enter OTP"
//                     className="min-w-0 flex-1 border border-zinc-300 bg-white px-3 py-2.5 text-center font-mono text-lg tracking-[0.2em] text-zinc-900 outline-none focus:border-red-500"
//                   />

//                   <button
//                     type="button"
//                     onClick={onVerifyOtp}
//                     disabled={verifyingOtp}
//                     className="shrink-0 border border-zinc-900 bg-zinc-900 px-5 py-2.5 text-xs font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500"
//                   >
//                     {verifyingOtp ? (
//                       <span className="flex items-center gap-1.5">
//                         <Loader2 size={14} className="animate-spin" />
//                         Verifying
//                       </span>
//                     ) : (
//                       "Verify"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* VERIFIED */}
//             {verified && (
//               <div className="flex items-center gap-2 border border-green-200 bg-green-50 px-3 py-2.5 text-xs font-medium text-green-700">
//                 <CheckCircle2 size={16} className="shrink-0" />

//                 <span>Email successfully verified</span>
//               </div>
//             )}
//           </div>

//           {/* =========================
//               RIGHT COLUMN
//           ========================== */}

//           <div className="space-y-5">
//             {/* PHONE */}
//             <div>
//               <label
//                 htmlFor="signup-phone"
//                 className="mb-1.5 flex items-center gap-2 text-sm font-medium text-zinc-700"
//               >
//                 <Phone size={16} className="text-red-600" />
//                 Phone Number
//                 <span className="text-xs font-normal text-zinc-400">
//                   (optional)
//                 </span>
//               </label>

//               <input
//                 id="signup-phone"
//                 {...register("phone")}
//                 type="tel"
//                 inputMode="tel"
//                 placeholder="9876543210"
//                 autoComplete="tel"
//                 className={`w-full border bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition ${
//                   errors.phone
//                     ? "border-red-400 focus:border-red-500"
//                     : "border-zinc-300 focus:border-red-500"
//                 }`}
//               />

//               {errors.phone && (
//                 <p className="mt-1 text-xs text-red-600">
//                   {errors.phone.message}
//                 </p>
//               )}
//             </div>

//             {/* PASSWORD */}
//             <div>
//               <label
//                 htmlFor="signup-password"
//                 className="mb-1.5 flex items-center gap-2 text-sm font-medium text-zinc-700"
//               >
//                 <Lock size={16} className="text-red-600" />
//                 Password
//               </label>

//               <div className="relative">
//                 <input
//                   id="signup-password"
//                   {...register("password")}
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Create a strong password"
//                   autoComplete="new-password"
//                   className={`w-full border bg-white px-3.5 py-2.5 pr-11 text-sm text-zinc-900 outline-none transition ${
//                     errors.password
//                       ? "border-red-400 focus:border-red-500"
//                       : "border-zinc-300 focus:border-red-500"
//                   }`}
//                 />

//                 <button
//                   type="button"
//                   onClick={toggleShowPassword}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700"
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
//                 </button>
//               </div>

//               <div className="mt-2">
//                 <PasswordStrengthMeter password={passwordValue} />
//               </div>

//               {errors.password && (
//                 <p className="mt-1 text-xs text-red-600">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* =========================
//               BOTTOM
//           ========================== */}

//           <div className="border-t border-zinc-200 pt-5 lg:col-span-2">
//             {/* TERMS */}
//             <label className="flex items-start gap-2 text-xs leading-5 text-zinc-500">
//               <input type="checkbox" className="mt-1 shrink-0 accent-red-600" />

//               <span>
//                 I agree to the{" "}
//                 <span className="font-medium text-zinc-700">
//                   Terms & Privacy Policy
//                 </span>
//               </span>
//             </label>

//             {/* SUBMIT */}
//             <button
//               type="submit"
//               disabled={!verified || isMutationPending || isSubmitting}
//               className="mt-5 flex w-full items-center justify-center gap-2 bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400"
//             >
//               {isMutationPending ? (
//                 <>
//                   <Loader2 size={16} className="animate-spin" />
//                   Creating account...
//                 </>
//               ) : (
//                 "Create Account"
//               )}
//             </button>

//             {/* LOGIN */}
//             <p className="mt-5 text-center text-sm text-zinc-500">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="font-semibold text-red-600 hover:text-red-700"
//               >
//                 Log in
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }
