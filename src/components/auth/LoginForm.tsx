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

  // return (
  //   <main className="min-h-dvh flex justify-center px-4 pt-8 pb-6 sm:items-center sm:px-6 sm:py-8 lg:px-8">
  //     <section className="w-full max-w-md rounded-2xl border border-sky-50 bg-white px-5 py-6 shadow-xl sm:max-w-lg sm:px-8 sm:py-8">
  //       <div className="mb-6 text-center">
  //         <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
  //           Welcome back
  //         </h2>
  //         <p className="mt-1 text-sm text-gray-500">
  //           Login to continue to MyAZ Store
  //         </p>
  //       </div>

  //       {/* ERROR BOX */}
  //       <div>
  //         {error && (
  //           <p className="text-red-600 text-xs sm:text-sm text-center mb-4 bg-red-50 py-2 px-4 rounded-lg border border-red-100">
  //             {error}
  //           </p>
  //         )}
  //       </div>

  //       {/* EMAIL FIELD */}
  //       <div className="mb-5">
  //         <label className="block text-sm font-medium text-gray-700 mb-1">
  //           Email Address
  //         </label>
  //         <div className="relative">
  //           <span className="absolute left-3 top-2.5 text-gray-400">
  //             <Mail size={18} />
  //           </span>

  //           <input
  //             type="email"
  //             required
  //             className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
  //             placeholder="you@example.com"
  //             value={email}
  //             onChange={onEmailChange}
  //             disabled={isGlobalDisabled}
  //             autoComplete="email"
  //           />
  //         </div>
  //       </div>

  //       {/* PASSWORD LOGIN */}
  //       <form onSubmit={onSubmitPassword} className="space-y-4">
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-1">
  //             Password
  //           </label>

  //           <div className="relative">
  //             <span className="absolute left-3 top-2.5 text-gray-400">
  //               <Lock size={18} />
  //             </span>

  //             <input
  //               type={showPassword ? "text" : "password"}
  //               required
  //               className="w-full pl-10 pr-11 py-2.5 border rounded-lg focus:ring-2 focus:ring-sky-500"
  //               placeholder="••••••••"
  //               value={password}
  //               onChange={onPasswordChange}
  //               disabled={loading}
  //               autoComplete="current-password"
  //             />

  //             <button
  //               type="button"
  //               onClick={toggleShowPassword}
  //               className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
  //             >
  //               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  //             </button>
  //           </div>
  //         </div>

  //         <button
  //           type="submit"
  //           disabled={loading}
  //           className="w-full bg-sky-600 text-white font-medium py-2.5 rounded-lg hover:bg-sky-700 disabled:bg-gray-400"
  //         >
  //           {loading ? "Logging in..." : "Login with Password"}
  //         </button>
  //       </form>

  //       {/* OR */}
  //       <div className="my-5 flex items-center">
  //         <div className="flex-1 h-px bg-gray-200" />
  //         <span className="px-3 text-gray-400 text-xs">OR</span>
  //         <div className="flex-1 h-px bg-gray-200" />
  //       </div>
  //       <div className="text-center text-sm text-slate-500">
  //         Prefer a one-time code?{" "}
  //         <Link
  //           to="/login-otp"
  //           className="font-medium text-sky-600 hover:text-sky-700 hover:underline"
  //         >
  //           Login with OTP
  //         </Link>
  //       </div>

  //       <div className="text-center text-sm text-gray-600 mt-6">
  //         Don't have an account?{" "}
  //         <Link
  //           to="/signup"
  //           className="text-sky-600 font-semibold hover:underline"
  //         >
  //           Sign up
  //         </Link>
  //         <div className="text-sm mt-4">
  //           <Link to="/forgot-password">Forget Password ?</Link>
  //         </div>
  //       </div>
  //     </section>
  //   </main>
  // );

  /// update design and theme
  return (
    <main className="min-h-dvh bg-zinc-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <section className="mx-auto w-full max-w-md">
        {/* HEADER */}
        <header className="mb-7">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            Welcome back
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Login to continue to MyAZ Store.
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
        <div className="mb-5">
          <label
            htmlFor="login-email"
            className="mb-1.5 flex items-center gap-2 text-sm font-medium text-zinc-700"
          >
            <Mail size={16} className="text-red-600" />
            Email Address
          </label>

          <input
            id="login-email"
            type="email"
            required
            className="w-full border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-red-500"
            placeholder="you@example.com"
            value={email}
            onChange={onEmailChange}
            disabled={isGlobalDisabled}
            autoComplete="email"
          />
        </div>

        {/* PASSWORD */}
        <form onSubmit={onSubmitPassword} className="space-y-5">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="login-password"
                className="flex items-center gap-2 text-sm font-medium text-zinc-700"
              >
                <Lock size={16} className="text-red-600" />
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-xs font-medium text-red-600 hover:text-red-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full border border-zinc-300 bg-white px-3.5 py-2.5 pr-11 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-red-500"
                placeholder="Enter your password"
                value={password}
                onChange={onPasswordChange}
                disabled={loading}
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 transition hover:text-zinc-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* LOGIN */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Logging in...
              </>
            ) : (
              "Login with Password"
            )}
          </button>
        </form>

        {/* OR */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-zinc-200" />

          <span className="px-3 text-xs text-zinc-400">OR</span>

          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        {/* OTP LOGIN */}
        <p className="text-center text-sm text-zinc-500">
          Prefer a one-time code?{" "}
          <Link
            to="/login-otp"
            className="font-semibold text-red-600 hover:text-red-700 hover:underline"
          >
            Login with OTP
          </Link>
        </p>

        {/* SIGNUP */}
        <div className="mt-7 border-t border-zinc-200 pt-6 text-center">
          <p className="text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-red-600 hover:text-red-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
