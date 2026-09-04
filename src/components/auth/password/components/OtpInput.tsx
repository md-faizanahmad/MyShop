import { useRef } from "react";

interface OtpInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function OtpInput({ value, onChange }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (input: string, index: number) => {
    const character = input.slice(-1);

    const nextValue = [...value];
    nextValue[index] = character;
    onChange(nextValue);

    if (character && index < value.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData.getData("text").trim();

    if (!pasted) return;

    const nextValue = [...value];

    pasted
      .slice(0, value.length)
      .split("")
      .forEach((character, index) => {
        nextValue[index] = character;
      });

    onChange(nextValue);

    const focusIndex = Math.min(pasted.length, value.length) - 1;

    if (focusIndex >= 0) {
      inputRefs.current[focusIndex]?.focus();
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
    <div className="flex w-full justify-between gap-1.5 sm:gap-2">
      {value.map((character, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          value={character}
          maxLength={1}
          aria-label={`Verification code ${index + 1}`}
          onChange={(e) => handleChange(e.target.value, index)}
          onPaste={handlePaste}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={(e) => e.target.select()}
          className="h-12 min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 text-center text-lg font-bold text-slate-900 transition focus:border-transparent focus:ring-2 focus:ring-slate-900 focus:outline-none sm:h-14 sm:text-xl"
        />
      ))}
    </div>
  );
}
