// src/features/auth/components/Divider.tsx

interface DividerProps {
  text?: string;
}

export default function Divider({ text = "OR" }: DividerProps) {
  return (
    <div className="my-5 flex items-center">
      <div className="h-px flex-1 bg-gray-200" />

      <span className="px-3 text-xs text-gray-400">{text}</span>

      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}
