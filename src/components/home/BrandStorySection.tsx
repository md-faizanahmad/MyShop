// import { motion } from "framer-motion";

// interface BrandStorySectionProps {
//   title?: string;
//   description?: string;
//   imageUrl?: string;
// }

// export default function BrandStorySection({
//   title = "Why MyAZStore?",
//   description = "We’re focused on making everyday shopping feel effortless. From handpicked collections to secure checkout and fast delivery, every part of MyAZStore is designed to give you a reliable and enjoyable experience — without overpaying for quality.",
//   imageUrl = "https://res.cloudinary.com/daqb5wglu/image/upload/v1765033486/category_placeholder_lxynt2.png",
// }: BrandStorySectionProps) {
//   return (
//     <section className="w-full py-12 md:py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
//           {/* TEXT SIDE */}
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.4 }}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//           >
//             {/* Small badge */}
//             <div className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-gray-500 mb-3">
//               Our Story
//             </div>

//             <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug">
//               {title}
//             </h2>

//             <p className="text-gray-600 mt-4 leading-relaxed text-[14px] md:text-[15px]">
//               {description}
//             </p>

//             {/* Highlights / stats */}
//             <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
//               <div className="rounded-xl border border-gray-200 bg-white/80 px-4 py-3">
//                 <p className="text-xs uppercase tracking-wide text-gray-500">
//                   Curated Products
//                 </p>
//                 <p className="mt-1 text-base font-semibold text-gray-900">
//                   Quality first
//                 </p>
//               </div>
//               <div className="rounded-xl border border-gray-200 bg-white/80 px-4 py-3">
//                 <p className="text-xs uppercase tracking-wide text-gray-500">
//                   Shopping Experience
//                 </p>
//                 <p className="mt-1 text-base font-semibold text-gray-900">
//                   Smooth & secure
//                 </p>
//               </div>
//             </div>
//           </motion.div>

//           {/* IMAGE SIDE */}
//           <motion.div
//             className="relative"
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
//           >
//             {/* subtle background shape */}
//             <div className="absolute -inset-4 md:-inset-6 rounded-3xl bg-gradient-to-tr from-purple-100/60 via-pink-100/40 to-transparent blur-2xl" />

//             <div className="relative rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
//               <img
//                 src={imageUrl}
//                 alt="About MyAZStore"
//                 className="w-full h-full max-h-80 md:max-h-96 object-cover"
//                 loading="lazy"
//               />

//               {/* bottom label */}
//               <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent px-4 pb-4 pt-10">
//                 <p className="text-xs uppercase tracking-wide text-gray-200">
//                   Built for everyday shopping
//                 </p>
//                 <p className="text-sm font-medium text-white">
//                   Fair pricing, fast delivery, simple experience.
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

///// updatyed
import { motion } from "framer-motion";

interface BrandStorySectionProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export default function BrandStorySection({
  title = "Why MyAZStore?",
  description = "We’re focused on making everyday shopping feel effortless. From handpicked collections to secure checkout and fast delivery, every part of MyAZStore is designed to give you a reliable and enjoyable experience — without overpaying for quality.",
  imageUrl = "https://res.cloudinary.com/daqb5wglu/image/upload/v1765033486/category_placeholder_lxynt2.png",
}: BrandStorySectionProps) {
  const PLACEHOLDER =
    "https://res.cloudinary.com/daqb5wglu/image/upload/v1765033486/category_placeholder_lxynt2.png";

  return (
    <section className="w-full py-12 md:py-16 bg-linear-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Small badge */}
            <div
              className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-gray-500 mb-3"
              aria-hidden="true"
            >
              Our Story
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug">
              {title}
            </h2>

            <p className="text-gray-600 mt-4 leading-relaxed text-[14px] md:text-[15px]">
              {description}
            </p>

            {/* Highlights / stats as a semantic definition list */}
            <dl
              className="mt-6 grid grid-cols-2 gap-4 text-sm"
              aria-hidden={false}
            >
              <div className="rounded-xl border border-gray-200 bg-white/80 px-4 py-3">
                <dt className="text-xs uppercase tracking-wide text-gray-500">
                  Curated Products
                </dt>
                <dd className="mt-1 text-base font-semibold text-gray-900">
                  Quality first
                </dd>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white/80 px-4 py-3">
                <dt className="text-xs uppercase tracking-wide text-gray-500">
                  Shopping Experience
                </dt>
                <dd className="mt-1 text-base font-semibold text-gray-900">
                  Smooth & secure
                </dd>
              </div>
            </dl>
          </motion.div>

          {/* IMAGE SIDE */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            {/* subtle background shape (decorative) */}
            <div
              className="absolute -inset-4 md:-inset-6 rounded-3xl bg-linear-to-tr from-purple-100/60 via-pink-100/40 to-transparent blur-2xl pointer-events-none -z-10"
              aria-hidden="true"
            />

            <div className="relative rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <img
                src={imageUrl}
                alt="About MyAZStore"
                className="w-full h-full max-h-80 md:max-h-96 object-cover"
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement & {
                    dataset: { fallback?: string };
                  };
                  if (!img.dataset.fallback) {
                    img.dataset.fallback = "1";
                    img.src = PLACEHOLDER;
                  }
                }}
                /* If you serve responsive sizes from your CDN, uncomment and populate:
                   srcSet="... 480w, ... 768w, ... 1200w"
                   sizes="(max-width: 768px) 100vw, 50vw"
                 */
              />

              {/* bottom label */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/65 via-black/20 to-transparent px-4 pb-4 pt-10">
                <p className="text-xs uppercase tracking-wide text-gray-200">
                  Built for everyday shopping
                </p>
                <p className="text-sm font-medium text-white">
                  Fair pricing, fast delivery, simple experience.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
