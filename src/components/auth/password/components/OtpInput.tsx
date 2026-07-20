import { useRef } from "react";

interface OtpInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function OtpInput({ value, onChange }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (input: string, index: number) => {
    if (!/^\d?$/.test(input)) return;

    const nextValue = [...value];
    nextValue[index] = input;
    onChange(nextValue);

    if (input && index < value.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-between gap-2">
      {value.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={(e) => e.target.select()}
          className="h-14 w-12 rounded-xl border border-slate-200 bg-slate-50 text-center text-xl font-bold text-slate-900 transition-all focus:border-transparent focus:ring-2 focus:ring-slate-900 focus:outline-none"
        />
      ))}
    </div>
  );
}
