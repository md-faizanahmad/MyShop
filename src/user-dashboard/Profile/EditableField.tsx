// import { motion } from "framer-motion";
// import { Loader2, Check } from "lucide-react";

// interface Props {
//   label: string;
//   value: string;
//   changed: boolean;
//   saving: boolean;
//   onChange: (v: string) => void;
//   onSave: () => void;
//   showButton: boolean;
// }

// export default function EditableField({
//   label,
//   value,
//   changed,
//   saving,
//   onChange,
//   onSave,
//   showButton,
// }: Props) {
//   return (
//     <div className="space-y-2">
//       <label className="text-sm font-medium text-gray-700">{label}</label>

//       <div className="relative flex items-center gap-3">
//         <input
//           type="text"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
//           placeholder={`Enter ${label.toLowerCase()}`}
//         />

//         {/* Save Button - Only when needed */}
//         {showButton && changed && (
//           <motion.button
//             whileTap={{ scale: 0.96 }}
//             onClick={onSave}
//             disabled={saving}
//             className="absolute right-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center gap-2"
//           >
//             {saving ? (
//               <Loader2 size={16} className="animate-spin" />
//             ) : (
//               <>
//                 <Check size={16} />
//                 Save
//               </>
//             )}
//           </motion.button>
//         )}

//         {/* Subtle changed indicator when button is hidden */}
//         {!showButton && changed && (
//           <div className="absolute right-3 top-1/2 -translate-y-1/2">
//             <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
////////////////////// Refcator 27-08
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
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-zinc-800">{label}</label>

        {changed && (
          <span className="text-[11px] font-medium text-sky-600">
            Unsaved changes
          </span>
        )}
      </div>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border bg-white px-3.5 py-3 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 ${
            showButton && changed
              ? "border-sky-300 pr-24 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              : "border-zinc-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          }`}
          placeholder={`Enter ${label.toLowerCase()}`}
        />

        {/* Save Button - Only when needed */}
        {showButton && changed && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={onSave}
            disabled={saving}
            className="absolute right-1.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-1.5 rounded-md bg-sky-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <>
                <Check size={14} />
                Save
              </>
            )}
          </motion.button>
        )}

        {/* Subtle changed indicator when button is hidden */}
        {!showButton && changed && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <span className="block h-2 w-2 animate-pulse rounded-full bg-sky-600" />
          </div>
        )}
      </div>
    </div>
  );
}
