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
      {value.map((character, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          value={character}
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={(e) => e.target.select()}
          className="h-14 w-12 rounded-xl border border-slate-200 bg-slate-50 text-center text-xl font-bold text-slate-900 focus:border-transparent focus:ring-2 focus:ring-slate-900 focus:outline-none"
        />
      ))}
    </div>
  );
}
