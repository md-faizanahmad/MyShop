import type { FormEvent } from "react";
import { ArrowLeft, Lock, RotateCcw } from "lucide-react";

interface ForgotPasswordResetProps {
  newPassword: string;
  confirmPassword: string;
  isLoading: boolean;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onBack: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function ForgotPasswordReset({
  newPassword,
  confirmPassword,
  isLoading,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onBack,
  onSubmit,
}: ForgotPasswordResetProps) {
  const passwordsMismatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  return (
    <section aria-labelledby="reset-password-title" className="w-full">
      {/* HEADER */}
      <header className="mb-7">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Code
        </button>

        <h1
          id="reset-password-title"
          className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
        >
          Create new password
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Choose a new password for your MyAZ Store account.
        </p>
      </header>

      {/* FORM */}
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        {/* NEW PASSWORD */}
        <div>
          <label
            htmlFor="new-password"
            className="mb-1.5 flex items-center gap-2 text-sm font-medium text-zinc-700"
          >
            <Lock size={16} className="text-red-600" aria-hidden="true" />
            New Password
          </label>

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
            placeholder="Enter your new password"
            className="w-full border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-red-500 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-400"
          />

          <p className="mt-1.5 text-xs text-zinc-400">Minimum 8 characters</p>
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label
            htmlFor="confirm-password"
            className="mb-1.5 flex items-center gap-2 text-sm font-medium text-zinc-700"
          >
            <RotateCcw size={16} className="text-red-600" aria-hidden="true" />
            Confirm Password
          </label>

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
            placeholder="Confirm your new password"
            aria-invalid={passwordsMismatch}
            aria-describedby={
              passwordsMismatch ? "password-mismatch" : undefined
            }
            className={`w-full border bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-400 ${
              passwordsMismatch
                ? "border-red-400 focus:border-red-500"
                : "border-zinc-300 focus:border-red-500"
            }`}
          />

          {passwordsMismatch && (
            <p
              id="password-mismatch"
              role="alert"
              className="mt-1.5 text-xs text-red-600"
            >
              Passwords do not match.
            </p>
          )}
        </div>

        {/* RESET */}
        <button
          type="submit"
          disabled={
            isLoading ||
            newPassword.length < 8 ||
            confirmPassword.length < 8 ||
            passwordsMismatch
          }
          className="flex w-full items-center justify-center gap-2 bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Updating...
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>

      {/* EXIT */}
      <div className="mt-7 border-t border-zinc-200 pt-6 text-center">
        <p className="text-sm text-zinc-500">
          Don't want to reset your password?{" "}
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="font-semibold text-red-600 hover:text-red-700 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          >
            Go back
          </button>
        </p>
      </div>
    </section>
  );
}
