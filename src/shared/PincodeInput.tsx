// src/components/pincode/PincodeInput.tsx

export default function PincodeInput({
  value,
  onChange,
  loading,
  onCheck,
}: {
  value: string;
  onChange: (v: string) => void;
  loading: boolean;
  onCheck: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onCheck();
      }}
      className="flex items-center gap-2"
    >
      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value.replace(/\D/g, "").slice(0, 6))
        }
        placeholder="Pincode"
        maxLength={6}
        className="w-48 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:w-55 transition-all duration-300"
      />
      <button
        type="submit"
        disabled={loading || value.length !== 6}
        className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 disabled:text-gray-400 disabled:bg-gray-50 transition"
      >
        {loading ? "Checking..." : "Check"}
      </button>
    </form>
  );
}
