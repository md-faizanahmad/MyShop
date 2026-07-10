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
        className="w-full bg-neutral-900 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 "
      >
        {loading ? "Authenticating..." : "Continue with Password"}
      </button>
    </form>
  );
}
