import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  loading: boolean;
  label: string;
}

export const SubmitButton = ({ loading, label }: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={loading}
    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
  >
    {loading ? (
      <>
        <Loader2 className="animate-spin h-4 w-4" />
        {label}...
      </>
    ) : (
      label
    )}
  </button>
);
