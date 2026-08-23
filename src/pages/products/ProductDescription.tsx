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
interface ProductDescriptionProps {
  description: string;
}

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  if (!description || description.trim().length === 0) return null;

  return (
    <section className="w-full py-4 sm:py-6">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">Description</h2>

      <p className="max-w-2xl whitespace-pre-line text-sm leading-relaxed text-gray-600">
        {description}
      </p>
    </section>
  );
}
