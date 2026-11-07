import { type FormEvent, type RefObject } from "react";
import { Link } from "react-router-dom";

interface OTPEmailStepProps {
  email: string;
  setEmail: (value: string) => void;
  sending: boolean;
  remaining: number;
  emailRef: RefObject<HTMLInputElement | null>;
  onSendOTP: (e?: FormEvent) => void;
}

export default function OTPEmailStep({
  email,
  setEmail,
  sending,
  remaining,
  emailRef,
  onSendOTP,
}: OTPEmailStepProps) {
  return (
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
          onChange={(e) => setEmail(e.target.value)}
          disabled={sending}
          required
          className="w-full border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-red-500"
          placeholder="you@example.com"
        />
      </div>

      <button
        type="submit"
        disabled={sending || remaining > 0}
        className="flex w-full items-center justify-center bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
      >
        {sending
          ? "Sending code..."
          : remaining > 0
            ? `Resend in ${remaining}s`
            : "Send Login OTP"}
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
  );
}
