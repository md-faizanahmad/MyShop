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
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-neutral-600  tracking-wide">
        {label}
      </label>

      <div className="relative flex items-center">
        {hasIcon && (
          <span className="absolute left-3 text-neutral-400  pointer-events-none">
            {icon}
          </span>
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
          className={`w-full bg-neutral-50 text-sm text-neutral-900 border border-neutral-200 px-3 py-2 transition-colors placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white  ${
            hasIcon ? "pl-9" : ""
          } ${className}`}
        />
      </div>
    </div>
  );
}
