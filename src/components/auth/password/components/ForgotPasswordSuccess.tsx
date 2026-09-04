import { CheckCircle2, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordSuccess() {
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby="password-reset-success-title"
      className="w-full text-center"
    >
      {/* SUCCESS ICON */}
      <div className="mb-6 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center border border-green-200 bg-green-50 text-green-600">
          <CheckCircle2 aria-hidden="true" size={30} strokeWidth={1.8} />
        </div>
      </div>

      {/* MESSAGE */}
      <header>
        <h1
          id="password-reset-success-title"
          className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
        >
          Password reset successful
        </h1>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-5 text-zinc-500">
          Your password has been updated successfully. You can now log in with
          your new password.
        </p>
      </header>

      {/* LOGIN */}
      <div className="mt-7">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="flex w-full items-center justify-center gap-2 bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 active:bg-red-800"
        >
          <LogIn size={16} />
          Continue to Login
        </button>
      </div>

      {/* SUPPORTING TEXT */}
      <p className="mt-5 text-xs text-zinc-400">
        You can use your new password to access your account.
      </p>
    </section>
  );
}
