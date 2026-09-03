import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, LockKeyhole, RotateCcw } from "lucide-react";

interface ForgotPasswordResetProps {
  newPassword: string;
  confirmPassword: string;
  isLoading: boolean;
  error: string;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onBack: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function ForgotPasswordReset({
  newPassword,
  confirmPassword,
  isLoading,
  error,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onBack,
  onSubmit,
}: ForgotPasswordResetProps) {
  const passwordsMismatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  return (
    <motion.div
      key="reset-step"
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div>
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Code</span>
        </button>

        <h3 className="text-lg font-semibold text-slate-900">
          Create New Password
        </h3>

        <p className="mt-1 text-sm leading-5 text-slate-500">
          Choose a strong password for your account.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700"
        >
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="new-password"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600"
          >
            New Password
          </label>

          <div className="relative">
            <LockKeyhole
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />

            <input
              id="new-password"
              name="newPassword"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => onNewPasswordChange(e.target.value)}
              disabled={isLoading}
              placeholder="Enter new password"
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-sm text-slate-950 placeholder-slate-400 transition-all focus:border-transparent focus:ring-2 focus:ring-slate-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <p className="mt-1.5 text-[11px] text-slate-400">
            Minimum 8 characters
          </p>
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600"
          >
            Confirm Password
          </label>

          <div className="relative">
            <RotateCcw
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />

            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => onConfirmPasswordChange(e.target.value)}
              disabled={isLoading}
              placeholder="Confirm new password"
              className={`block w-full rounded-xl border bg-slate-50/50 py-3 pl-10 pr-4 text-sm text-slate-950 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 ${
                passwordsMismatch
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-transparent focus:ring-slate-900"
              } disabled:cursor-not-allowed disabled:opacity-60`}
            />
          </div>

          {passwordsMismatch && (
            <p className="mt-1.5 text-xs text-red-600" role="alert">
              Passwords do not match.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={
            isLoading ||
            newPassword.length < 8 ||
            confirmPassword.length < 8 ||
            passwordsMismatch
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <LockKeyhole className="h-4 w-4" />
          <span>{isLoading ? "Updating..." : "Reset Password"}</span>
        </button>
      </form>
    </motion.div>
  );
}
