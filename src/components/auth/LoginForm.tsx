// // src/pages/auth/LoginForm.tsx
import type { FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export interface LoginFormProps {
  email: string;
  password: string;

  showPassword: boolean;

  loading: boolean;

  error: string;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;

  onSubmitPassword: (e: FormEvent<HTMLFormElement>) => void;

  toggleShowPassword: () => void;
}

export default function LoginForm({
  email,
  password,
  showPassword,
  loading,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmitPassword,
  toggleShowPassword,
}: LoginFormProps) {
  const isGlobalDisabled = loading;

  return (
    <main className="min-h-dvh flex justify-center px-4 pt-8 pb-6 sm:items-center sm:px-6 sm:py-8 lg:px-8">
      <section className="w-full max-w-md rounded-2xl border border-sky-50 bg-white px-5 py-6 shadow-xl sm:max-w-lg sm:px-8 sm:py-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Login to continue to MyAZ Store
          </p>
        </div>

        {/* ERROR BOX */}
        <div>
          {error && (
            <p className="text-red-600 text-xs sm:text-sm text-center mb-4 bg-red-50 py-2 px-4 rounded-lg border border-red-100">
              {error}
            </p>
          )}
        </div>

        {/* EMAIL FIELD */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <Mail size={18} />
            </span>

            <input
              type="email"
              required
              className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={onEmailChange}
              disabled={isGlobalDisabled}
              autoComplete="email"
            />
          </div>
        </div>

        {/* PASSWORD LOGIN */}
        <form onSubmit={onSubmitPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Lock size={18} />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full pl-10 pr-11 py-2.5 border rounded-lg focus:ring-2 focus:ring-sky-500"
                placeholder="••••••••"
                value={password}
                onChange={onPasswordChange}
                disabled={loading}
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 text-white font-medium py-2.5 rounded-lg hover:bg-sky-700 disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login with Password"}
          </button>
        </form>

        {/* OR */}
        <div className="my-5 flex items-center">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-gray-400 text-xs">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="text-center text-sm text-slate-500">
          Prefer a one-time code?{" "}
          <Link
            to="/login-otp"
            className="font-medium text-sky-600 hover:text-sky-700 hover:underline"
          >
            Login with OTP
          </Link>
        </div>

        <div className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-sky-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
          <div className="text-sm mt-4">
            <Link to="/forgot-password">Forget Password ?</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
