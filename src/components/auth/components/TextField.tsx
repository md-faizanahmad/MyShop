// src/features/auth/components/TextField.tsx

import type { ChangeEvent, ReactNode } from "react";

interface TextFieldProps {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  icon?: ReactNode;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  className?: string;
}

export default function TextField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  autoComplete,
  icon,
  inputMode,
  maxLength,
  className = "",
}: TextFieldProps) {
  const hasIcon = Boolean(icon);

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        {hasIcon && (
          <span className="absolute left-3 top-2.5 text-gray-400">{icon}</span>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          className={`w-full rounded-lg border border-gray-300 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
            hasIcon ? "pl-10 pr-3.5" : "px-4"
          } ${className}`}
        />
      </div>
    </div>
  );
}
