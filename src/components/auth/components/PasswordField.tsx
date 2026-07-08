// src/features/auth/components/PasswordField.tsx

import type { ChangeEvent } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
  disabled?: boolean;
}

export default function PasswordField({
  value,
  onChange,
  showPassword,
  onTogglePassword,
  disabled = false,
}: PasswordFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Password
      </label>

      <div className="relative">
        <span className="absolute left-3 top-2.5 text-gray-400">
          <Lock size={18} />
        </span>

        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          required
          disabled={disabled}
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-11 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
