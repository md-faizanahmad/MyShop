// src/features/auth/components/PasswordLoginForm.tsx
import type { ChangeEvent, FormEvent } from "react";

import PasswordField from "./PasswordField";

interface PasswordLoginFormProps {
  password: string;
  showPassword: boolean;
  loading: boolean;

  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onTogglePassword: () => void;
}

export default function PasswordLoginForm({
  password,
  showPassword,
  loading,
  onPasswordChange,
  onSubmit,
  onTogglePassword,
}: PasswordLoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <PasswordField
        value={password}
        onChange={onPasswordChange}
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-sky-600 py-2.5 font-medium text-white transition-colors hover:bg-sky-700 disabled:bg-gray-400"
      >
        {loading ? "Logging in..." : "Login with Password"}
      </button>
    </form>
  );
}
