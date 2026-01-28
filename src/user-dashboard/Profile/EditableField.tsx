import { motion } from "framer-motion";
import { Loader2, Check } from "lucide-react";

interface Props {
  label: string;
  value: string;
  changed: boolean;
  saving: boolean;
  onChange: (v: string) => void;
  onSave: () => void;
  showButton: boolean;
}

export default function EditableField({
  label,
  value,
  changed,
  saving,
  onChange,
  onSave,
  showButton,
}: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="relative flex items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
          placeholder={`Enter ${label.toLowerCase()}`}
        />

        {/* Save Button - Only when needed */}
        {showButton && changed && (
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onSave}
            disabled={saving}
            className="absolute right-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <Check size={16} />
                Save
              </>
            )}
          </motion.button>
        )}

        {/* Subtle changed indicator when button is hidden */}
        {!showButton && changed && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
