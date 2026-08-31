// src/components/auth/LoginWithOTPView.tsx
import { type FormEvent, type JSX, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export type LoginWithOTPViewProps = {
  step: "email" | "otp";
  email: string;
  setEmail: (v: string) => void;
  otp: string;
  setOtp: (v: string) => void;
  sending: boolean;
  verifying: boolean;
  remaining: number;
  errorMessage: string | null;
  onSendOTP: (e?: FormEvent) => void;
  onVerifyOTP: (e?: FormEvent) => void;
  onResendOTP: () => void;
  onResetEmail: () => void;
};

export default function LoginWithOTPView({
  step,
  email,
  setEmail,
  otp,
  setOtp,
  sending,
  verifying,
  remaining,
  errorMessage,
  onSendOTP,
  onVerifyOTP,
  onResendOTP,
  onResetEmail,
}: LoginWithOTPViewProps): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const otpRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (step === "email") {
      emailRef.current?.focus();
    } else {
      otpRef.current?.focus();
    }
  }, [step]);

  // return (
  //   <main className="min-h-dvh  px-4 py-6 flex items-center justify-center sm:py-8">
  //     <section className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
  //       <h2
  //         id="login-otp-title"
  //         className="text-xl font-semibold text-center text-slate-900"
  //       >
  //         Login with OTP
  //       </h2>

  //       <div aria-live="polite" className="min-h-5 mb-2">
  //         {errorMessage ? (
  //           <div
  //             id="login-otp-error"
  //             role="alert"
  //             className="text-sm text-red-600"
  //           >
  //             {errorMessage}
  //           </div>
  //         ) : null}
  //       </div>

  //       {step === "email" && (
  //         <form
  //           onSubmit={(e) => {
  //             e.preventDefault();
  //             void onSendOTP(e);
  //           }}
  //           className="space-y-6"
  //         >
  //           <div>
  //             <label
  //               htmlFor="otp-email"
  //               className="block text-sm font-medium text-gray-700"
  //             >
  //               Email address
  //             </label>
  //             <input
  //               id="otp-email"
  //               ref={emailRef}
  //               name="email"
  //               type="email"
  //               inputMode="email"
  //               autoComplete="email"
  //               value={email}
  //               onChange={(ev) => setEmail(ev.target.value)}
  //               disabled={sending}
  //               className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500"
  //               placeholder="you@example.com"
  //               aria-invalid={!!errorMessage}
  //               aria-describedby={errorMessage ? "login-otp-error" : undefined}
  //             />
  //           </div>

  //           <button
  //             type="submit"
  //             disabled={sending || remaining > 0}
  //             className="w-full bg-sky-600 text-white font-medium py-3 rounded-lg hover:brightness-110 transition disabled:opacity-50"
  //           >
  //             {sending
  //               ? "Sending..."
  //               : remaining > 0
  //                 ? `Resend in ${remaining}s`
  //                 : "Send OTP"}
  //           </button>
  //           <p>
  //             Prefer using your password?{" "}
  //             <Link
  //               to="/login"
  //               className="font-medium text-sky-600 transition-colors hover:text-sky-700 hover:underline"
  //             >
  //               Login with password
  //             </Link>
  //           </p>
  //         </form>
  //       )}

  //       {step === "otp" && (
  //         <section>
  //           <div className="space-y-6">
  //             <form
  //               onSubmit={(e) => {
  //                 e.preventDefault();
  //                 void onVerifyOTP(e);
  //               }}
  //             >
  //               <p className="text-sm text-slate-500 mb-4 text-center">
  //                 OTP sent to{" "}
  //                 <span className="font-medium text-slate-700">{email}</span>
  //               </p>

  //               <label htmlFor="otp-input" className="sr-only">
  //                 One-time password
  //               </label>
  //               <input
  //                 id="otp-input"
  //                 ref={otpRef}
  //                 name="otp"
  //                 maxLength={8}
  //                 value={otp}
  //                 onChange={(ev) => setOtp(ev.target.value.replace(/\s+/g, ""))}
  //                 placeholder="Enter OTP"
  //                 disabled={verifying}
  //                 className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 mb-2"
  //                 aria-invalid={!!errorMessage}
  //               />

  //               <button
  //                 type="submit"
  //                 disabled={verifying}
  //                 className="w-full bg-sky-600 text-white font-medium py-3 rounded-lg hover:bg-sky-700 transition disabled:opacity-50"
  //               >
  //                 {verifying ? "Verifying..." : "Login"}
  //               </button>
  //             </form>

  //             <p className="text-center text-sm text-gray-600">
  //               Didn’t receive OTP?{" "}
  //               {remaining > 0 ? (
  //                 <span className="text-gray-400">Resend in {remaining}s</span>
  //               ) : (
  //                 <button
  //                   onClick={onResendOTP}
  //                   className="text-sky-600 font-semibold hover:underline"
  //                 >
  //                   Resend OTP
  //                 </button>
  //               )}
  //             </p>

  //             <div className="mt-4 space-y-2 text-center text-sm text-slate-500">
  //               <p>
  //                 Wrong email?{" "}
  //                 <button
  //                   type="button"
  //                   onClick={onResetEmail}
  //                   className="font-medium text-sky-600 transition-colors hover:text-sky-700 hover:underline"
  //                 >
  //                   Change email
  //                 </button>
  //               </p>

  //               <p>
  //                 Prefer using your password?{" "}
  //                 <Link
  //                   to="/login"
  //                   className="font-medium text-sky-600 transition-colors hover:text-sky-700 hover:underline"
  //                 >
  //                   Login with password
  //                 </Link>
  //               </p>
  //             </div>
  //           </div>
  //         </section>
  //       )}
  //     </section>
  //   </main>
  // );

  /// update with design
  return (
    <main className="min-h-dvh bg-zinc-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <section className="mx-auto w-full max-w-md">
        {/* HEADER */}
        <header className="mb-7">
          <h1
            id="login-otp-title"
            className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
          >
            Login with OTP
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Sign in securely with a one-time code.
          </p>
        </header>

        {/* ERROR */}
        <div aria-live="polite" className="min-h-5 mb-5">
          {errorMessage ? (
            <div
              id="login-otp-error"
              role="alert"
              className="border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs text-red-600 sm:text-sm"
            >
              {errorMessage}
            </div>
          ) : null}
        </div>

        {/* EMAIL STEP */}
        {step === "email" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void onSendOTP(e);
            }}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="otp-email"
                className="mb-1.5 block text-sm font-medium text-zinc-700"
              >
                Email address
              </label>

              <input
                id="otp-email"
                ref={emailRef}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                disabled={sending}
                className="w-full border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-red-500"
                placeholder="you@example.com"
                aria-invalid={!!errorMessage}
                aria-describedby={errorMessage ? "login-otp-error" : undefined}
              />
            </div>

            <button
              type="submit"
              disabled={sending || remaining > 0}
              className="flex w-full items-center justify-center bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
            >
              {sending
                ? "Sending..."
                : remaining > 0
                  ? `Resend in ${remaining}s`
                  : "Send OTP"}
            </button>

            <p className="text-center text-sm text-zinc-500">
              Prefer using your password?{" "}
              <Link
                to="/login"
                className="font-semibold text-red-600 transition-colors hover:text-red-700 hover:underline"
              >
                Login with password
              </Link>
            </p>
          </form>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <section>
            <div className="space-y-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void onVerifyOTP(e);
                }}
                className="space-y-5"
              >
                <div className="border border-zinc-200 bg-white px-3.5 py-3">
                  <p className="text-xs text-zinc-500">OTP sent to</p>

                  <p className="mt-0.5 break-all text-sm font-medium text-zinc-800">
                    {email}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="otp-input"
                    className="mb-1.5 block text-sm font-medium text-zinc-700"
                  >
                    One-time password
                  </label>

                  <input
                    id="otp-input"
                    ref={otpRef}
                    name="otp"
                    maxLength={8}
                    value={otp}
                    onChange={(ev) =>
                      setOtp(ev.target.value.replace(/\s+/g, ""))
                    }
                    placeholder="Enter OTP"
                    disabled={verifying}
                    className="w-full border border-zinc-300 bg-white px-3.5 py-2.5 text-sm font-medium tracking-wider text-zinc-900 outline-none transition placeholder:font-normal placeholder:tracking-normal placeholder:text-zinc-400 focus:border-red-500"
                    aria-invalid={!!errorMessage}
                  />
                </div>

                <button
                  type="submit"
                  disabled={verifying}
                  className="flex w-full items-center justify-center bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
                >
                  {verifying ? "Verifying..." : "Login"}
                </button>
              </form>

              {/* RESEND */}
              <p className="text-center text-sm text-zinc-500">
                Didn’t receive OTP?{" "}
                {remaining > 0 ? (
                  <span className="text-zinc-400">Resend in {remaining}s</span>
                ) : (
                  <button
                    onClick={onResendOTP}
                    className="font-semibold text-red-600 hover:text-red-700 hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </p>

              {/* OTHER OPTIONS */}
              <div className="space-y-3 border-t border-zinc-200 pt-5 text-center text-sm text-zinc-500">
                <p>
                  Wrong email?{" "}
                  <button
                    type="button"
                    onClick={onResetEmail}
                    className="font-semibold text-red-600 transition-colors hover:text-red-700 hover:underline"
                  >
                    Change email
                  </button>
                </p>

                <p>
                  Prefer using your password?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-red-600 transition-colors hover:text-red-700 hover:underline"
                  >
                    Login with password
                  </Link>
                </p>
              </div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
