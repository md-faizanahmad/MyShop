import type { FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";

interface ForgotPasswordEmailStepProps {
  email: string;
  isLoading: boolean;
  error: string;
  onEmailChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function ForgotPasswordEmail({
  email,
  isLoading,
  error,
  onEmailChange,
  onSubmit,
}: ForgotPasswordEmailStepProps) {
  return (
    <section aria-labelledby="forgot-password-title" className="w-full">
      {/* HEADER */}
      <header className="mb-7">
        <h1
          id="forgot-password-title"
          className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
        >
          Forgot password?
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Enter your email to receive a verification code.
        </p>
      </header>

      {/* ERROR */}
      {error && (
        <div
          role="alert"
          className="mb-5 border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs text-red-600 sm:text-sm"
        >
          {error}
        </div>
      )}

      {/* EMAIL */}
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div>
          <label
            htmlFor="forgot-password-email"
            className="mb-1.5 flex items-center gap-2 text-sm font-medium text-zinc-700"
          >
            <Mail size={16} className="text-red-600" />
            Email Address
          </label>

          <input
            id="forgot-password-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => onEmailChange(e.target.value)}
            disabled={isLoading}
            aria-invalid={Boolean(error)}
            className="w-full border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-red-500 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-400"
          />
        </div>

        {/* SEND CODE */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Sending...
            </>
          ) : (
            <>
              Send Verification Code
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* BACK TO LOGIN */}
      <div className="mt-7 border-t border-zinc-200 pt-6 text-center">
        <p className="text-sm text-zinc-500">
          Remember your password?{" "}
          <a
            href="/login"
            className="font-semibold text-red-600 hover:text-red-700 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </section>
  );
}
