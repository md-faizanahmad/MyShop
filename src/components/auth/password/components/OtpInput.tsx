import { useRef } from "react";

interface OtpInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const OTP_LENGTH = 6;
const OTP_PATTERN = /^[a-z0-9]$/i;

export default function OtpInput({ value, onChange }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (input: string, index: number) => {
    // const character = input.slice(-1).toLowerCase();
    const character = input.slice(-1);

    if (character && !OTP_PATTERN.test(character)) return;

    const nextValue = [...value];
    nextValue[index] = character;
    onChange(nextValue);

    if (character && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .trim()
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    const nextValue = Array(OTP_LENGTH).fill("");

    pasted.split("").forEach((character, index) => {
      nextValue[index] = character;
    });

    onChange(nextValue);

    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
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
    <div className="flex w-full justify-between gap-1.5 sm:gap-2">
      {value.map((character, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="text"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          autoCapitalize="none"
          spellCheck={false}
          maxLength={1}
          value={character}
          aria-label={`Verification code character ${index + 1}`}
          onChange={(e) => handleChange(e.target.value, index)}
          onPaste={handlePaste}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={(e) => e.target.select()}
          className="h-12 min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 text-center text-lg font-bold text-slate-900 transition-all focus:border-transparent focus:ring-2 focus:ring-slate-900 focus:outline-none sm:h-14 sm:text-xl"
        />
      ))}
    </div>
  );
}
