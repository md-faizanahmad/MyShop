import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, AlertCircle } from "lucide-react";

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
    <motion.div
      key="email-step"
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 15 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Forgot Password?
        </h3>

        <p className="mt-1 text-sm leading-5 text-slate-500">
          Enter your email address and we'll send you a verification code.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="forgot-password-email"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600"
          >
            Email Address
          </label>

          <div className="relative">
            <Mail
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />

            <input
              id="forgot-password-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              placeholder="name@example.com"
              onChange={(e) => onEmailChange(e.target.value)}
              disabled={isLoading}
              aria-invalid={!!error}
              aria-describedby={
                error ? "forgot-password-email-error" : undefined
              }
              className={`block w-full rounded-xl border bg-slate-50/50 py-3 pl-10 pr-4 text-sm text-slate-950 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 ${
                error
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-transparent focus:ring-slate-900"
              } disabled:cursor-not-allowed disabled:opacity-60`}
            />
          </div>

          {error && (
            <div
              id="forgot-password-email-error"
              role="alert"
              className="mt-2 flex items-start gap-1.5 text-xs text-red-600"
            >
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span>{isLoading ? "Sending..." : "Send Verification Code"}</span>

          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>
    </motion.div>
  );
}
