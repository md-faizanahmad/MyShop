import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

interface ForgotPasswordEmailStepProps {
  email: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function ForgotPasswordEmail({
  email,
  isLoading,
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

        <p className="mt-1 text-sm text-slate-500">
          Enter your email address below and we'll send you a 6-digit
          verification code.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-600"
          >
            Email Address
          </label>

          <div className="relative rounded-xl shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Mail className="h-4 w-4" />
            </div>

            <input
              id="email"
              type="email"
              required
              value={email}
              placeholder="name@example.com"
              onChange={(e) => onEmailChange(e.target.value)}
              className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pr-4 pl-10 text-sm text-slate-950 placeholder-slate-400 transition-all focus:border-transparent focus:ring-2 focus:ring-slate-900 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center space-x-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition-all duration-150 hover:bg-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span>{isLoading ? "Sending..." : "Send Verification Code"}</span>

          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>
    </motion.div>
  );
}
