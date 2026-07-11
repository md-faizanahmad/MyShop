// import { motion } from "framer-motion";

// interface ProductDescriptionProps {
//   description: string;
// }

// export default function ProductDescription({
//   description,
// }: ProductDescriptionProps) {
//   if (!description || description.trim().length === 0) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-8"
//     >
//       <h2 className="text-lg font-semibold text-gray-900 mb-4">
//         Product Description
//       </h2>

//       <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
//         {description}
//       </p>
//     </motion.div>
//   );
// }

////////////////////// update design 11072026
import { motion } from "framer-motion";

interface ProductDescriptionProps {
  description: string;
}

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  if (!description || description.trim().length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-transparent py-6 antialiased"
    >
      {/* Structural technical header line */}
      <div className="border-b border-zinc-200 pb-2 mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
          Product Specifications & Description
        </h2>
      </div>

      {/* Clean lookbook typography block */}
      <p className="text-xs text-zinc-600 leading-relaxed whitespace-pre-line font-normal max-w-2xl">
        {description}
      </p>
    </motion.div>
  );
}
