// // src/components/home/CustomerReviews.tsx
// import { Star } from "lucide-react";
// import type { FC } from "react";

// export interface Review {
//   id: string; // unique id for UI
//   name: string;
//   rating: number;
//   comment: string;
//   date: string; // human readable
//   dateISO: string; // exact ISO for <time>
//   verified: boolean;
//   city?: string; // optional, component handles missing
// }

// interface CustomerReviewsProps {
//   reviews: Review[]; // REQUIRED dynamic reviews
//   totalReviewsLabel?: string; // optional summary text
//   title?: string; // customizable title
//   subtitle?: string; // customizable subtitle
// }

// const CustomerReviews: FC<CustomerReviewsProps> = ({
//   reviews,
//   totalReviewsLabel = "Customer Reviews",
//   title = "What Customers Say",
//   subtitle = "Authentic feedback from recent buyers",
// }) => {
//   const avgRating =
//     reviews.length > 0
//       ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
//       : 0;

//   return (
//     <section className="py-12">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
//             {title}
//           </h2>

//           {subtitle && (
//             <p className="mt-2 text-sm md:text-base text-gray-600">
//               {subtitle}
//             </p>
//           )}

//           {/* Rating summary */}
//           {reviews.length > 0 && (
//             <div className="flex items-center justify-center gap-2 mt-4">
//               <div aria-hidden="true" className="flex gap-0.5">
//                 {Array.from({ length: 5 }, (_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-5 h-5 md:w-6 md:h-6 ${
//                       i < Math.round(avgRating)
//                         ? "fill-yellow-400 text-yellow-400"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>

//               <span className="text-base md:text-lg font-semibold ml-1">
//                 {avgRating.toFixed(1)}/5
//               </span>

//               <span className="text-xs md:text-sm text-gray-500">
//                 · {totalReviewsLabel}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* No reviews fallback */}
//         {reviews.length === 0 && (
//           <p className="text-center text-gray-600 text-sm">
//             No reviews yet. Be the first to write one!
//           </p>
//         )}

//         {/* Reviews Grid */}
//         <ul
//           role="list"
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//         >
//           {reviews.map((review) => (
//             <li key={review.id}>
//               <article
//                 aria-label={`Review by ${review.name}`}
//                 className="bg-white rounded-2xl shadow-sm p-5 border border-purple-100 hover:shadow-md hover:-translate-y-1 transition"
//               >
//                 {/* User header */}
//                 <div className="flex items-center gap-3 mb-3">
//                   <div
//                     aria-hidden="true"
//                     className="w-10 h-10 md:w-11 md:h-11 bg-linear-to-br from-blue-300 to-sky-300 rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base"
//                   >
//                     {review.name.charAt(0)}
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <h4 className="font-semibold text-sm md:text-base text-gray-900">
//                       {review.name}
//                     </h4>

//                     <div className="flex items-center gap-2">
//                       {review.city && (
//                         <>
//                           <p className="text-[11px] md:text-xs text-gray-500 truncate">
//                             {review.city}
//                           </p>
//                           <span className="text-[11px] md:text-xs text-gray-400">
//                             •
//                           </span>
//                         </>
//                       )}

//                       <time
//                         dateTime={review.dateISO}
//                         className="text-[11px] md:text-xs text-gray-500"
//                       >
//                         {review.date}
//                       </time>
//                     </div>

//                     {review.verified && (
//                       <div className="mt-0.5">
//                         <span className="inline-block text-[10px] md:text-[11px] text-green-600 font-medium">
//                           Verified Buyer
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Rating */}
//                 <div className="flex items-center gap-2 mb-2">
//                   <div aria-hidden="true" className="flex gap-1">
//                     {Array.from({ length: 5 }, (_, i) => (
//                       <Star
//                         key={i}
//                         className={`w-4 h-4 ${
//                           i < review.rating
//                             ? "fill-yellow-400 text-yellow-400"
//                             : "text-gray-300"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Comment */}
//                 <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
//                   “{review.comment}”
//                 </p>
//               </article>
//             </li>
//           ))}
//         </ul>

//         {/* CTA */}
//         {reviews.length > 6 && (
//           <div className="text-center mt-8">
//             <button
//               type="button"
//               className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-sky-600 text-white px-6 py-2.5 text-sm font-semibold hover:shadow-lg hover:scale-[1.02] transition"
//             >
//               Read More Reviews
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default CustomerReviews;

////////////////////////////////// UPDATE 16-02-2026

// import { Star, CheckCircle2, Quote, ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";
// import type { FC } from "react";

// export interface Review {
//   id: string;
//   name: string;
//   rating: number;
//   comment: string;
//   date: string;
//   dateISO: string;
//   verified: boolean;
//   city?: string;
// }

// interface CustomerReviewsProps {
//   reviews: Review[];
//   totalReviewsLabel?: string;
//   title?: string;
//   subtitle?: string;
// }

// const CustomerReviews: FC<CustomerReviewsProps> = ({
//   reviews,
//   totalReviewsLabel = "Customer Reviews",
//   title = "Voices of our Community",
//   subtitle = "Real stories from people who shop with us every day.",
// }) => {
//   const avgRating =
//     reviews.length > 0
//       ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
//       : 0;

//   return (
//     <section className="py-20  overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 lg:px-12">
//         {/* --- HEADER: COMPACT & ANALYTICAL --- */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
//           <div className="space-y-3">
//             <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight">
//               {title}
//             </h2>
//             <p className="text-zinc-500 text-base md:text-lg max-w-xl font-medium">
//               {subtitle}
//             </p>
//           </div>

//           <div className="flex flex-col items-center md:items-end gap-2 bg-zinc-50 p-6 rounded-4xl border border-zinc-100 shadow-sm">
//             <div className="flex items-center gap-2">
//               <span className="text-4xl font-black text-zinc-900">
//                 {avgRating.toFixed(1)}
//               </span>
//               <div className="flex flex-col">
//                 <div className="flex gap-0.5">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       size={14}
//                       className={
//                         i < Math.round(avgRating)
//                           ? "fill-yellow-400 text-yellow-400"
//                           : "text-zinc-200"
//                       }
//                     />
//                   ))}
//                 </div>
//                 <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 mt-1">
//                   Average Rating
//                 </span>
//               </div>
//             </div>
//             <p className="text-xs font-bold text-zinc-500">
//               Based on {reviews.length} {totalReviewsLabel}
//             </p>
//           </div>
//         </div>

//         {/* --- REVIEWS MASONRY-STYLE GRID --- */}
//         {reviews.length === 0 ? (
//           <div className="text-center py-20 bg-zinc-50 rounded-[3rem] border-2 border-dashed border-zinc-200">
//             <Quote className="mx-auto text-zinc-200 mb-4" size={48} />
//             <p className="text-zinc-500 font-bold">
//               No feedback yet. Share your experience!
//             </p>
//           </div>
//         ) : (
//           <motion.ul
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, margin: "-100px" }}
//             variants={{
//               hidden: { opacity: 0 },
//               show: { opacity: 1, transition: { staggerChildren: 0.1 } },
//             }}
//             className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
//           >
//             {reviews.map((review) => (
//               <motion.li
//                 key={review.id}
//                 variants={{
//                   hidden: { opacity: 0, y: 20 },
//                   show: { opacity: 1, y: 0 },
//                 }}
//                 className="break-inside-avoid"
//               >
//                 <article className="group bg-zinc-50 hover:bg-white rounded-4xl p-8 border border-zinc-100 hover:border-blue-100 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5">
//                   {/* User Info */}
//                   <div className="flex items-center gap-4 mb-6">
//                     <div className="relative">
//                       <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-zinc-200 to-zinc-100 flex items-center justify-center font-black text-zinc-500 group-hover:from-blue-600 group-hover:to-indigo-500 group-hover:text-white transition-all duration-500">
//                         {review.name.charAt(0)}
//                       </div>
//                       {review.verified && (
//                         <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
//                           <CheckCircle2
//                             size={16}
//                             className="text-blue-500 fill-blue-50"
//                           />
//                         </div>
//                       )}
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
//                         {review.name}
//                       </h4>
//                       <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-400 uppercase tracking-tighter">
//                         <span>{review.city}</span>
//                         <span>•</span>
//                         <time dateTime={review.dateISO}>{review.date}</time>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Rating Icons */}
//                   <div className="flex gap-1 mb-4">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         size={12}
//                         className={
//                           i < review.rating
//                             ? "fill-yellow-400 text-yellow-400"
//                             : "text-zinc-200"
//                         }
//                       />
//                     ))}
//                   </div>

//                   {/* Comment */}
//                   <blockquote className="text-zinc-700 leading-relaxed font-medium italic">
//                     &ldquo;{review.comment}&rdquo;
//                   </blockquote>
//                 </article>
//               </motion.li>
//             ))}
//           </motion.ul>
//         )}

//         {/* --- FOOTER CTA --- */}
//         {reviews.length > 6 && (
//           <div className="flex justify-center mt-16">
//             <button className="group flex items-center gap-3 bg-zinc-950 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-blue-600 transition-all active:scale-95">
//               Explore All Reviews
//               <ArrowRight
//                 size={18}
//                 className="group-hover:translate-x-1 transition-transform"
//               />
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default CustomerReviews;
////////////////////////////////////////////////////////////////////////// update design 11-07-2026
import { Star, CheckCircle2, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import type { FC } from "react";

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  dateISO: string;
  verified: boolean;
  city?: string;
}

interface CustomerReviewsProps {
  reviews: Review[];
  totalReviewsLabel?: string;
  title?: string;
  subtitle?: string;
}

const CustomerReviews: FC<CustomerReviewsProps> = ({
  reviews,
  totalReviewsLabel = "Verified Reviews",
  title = "Customer Feedback",
  subtitle = "What buyers are saying about our tech and setup essentials.",
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 bg-gray-50  overflow-hidden antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200  pb-5 mb-8 gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600  font-semibold">
              Live Customer Feedback
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-gray-950 ">
              {title}
            </h2>
            <p className="text-sm text-gray-600  max-w-md">{subtitle}</p>
          </div>

          {/* Rating Summary Card & Navigation Controls */}
          <div className="flex items-center gap-4 self-start md:self-auto">
            <div className="flex items-center gap-4 px-4 py-2.5 bg-white  border border-gray-200  rounded-md shadow-xs">
              <span className="text-2xl font-black tracking-tight text-gray-950 ">
                {avgRating.toFixed(1)}
              </span>
              <div className="flex flex-col border-l border-gray-200  pl-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={
                        i < Math.round(avgRating)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-100 text-gray-300  "
                      }
                    />
                  ))}
                </div>
                <p className="text-xs font-mono text-gray-500  mt-0.5">
                  {reviews.length} {totalReviewsLabel}
                </p>
              </div>
            </div>

            {/* Carousel Arrow Controls */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => scroll("left")}
                  className="p-2.5 rounded-md border border-gray-200  bg-white  text-gray-700  hover:bg-gray-100  transition-colors"
                  aria-label="Previous reviews"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="p-2.5 rounded-md border border-gray-200  bg-white text-gray-700  hover:bg-gray-100  transition-colors"
                  aria-label="Next reviews"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- CAROUSEL CONTAINER (ONLY ORIGINAL ITEMS) --- */}
        {reviews.length === 0 ? (
          <div className="py-8 px-4 border border-dashed border-gray-300  bg-white  flex items-center gap-3">
            <Quote className="text-gray-400 shrink-0" size={16} />
            <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">
              No customer logs registered.
            </p>
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((review) => (
              <article
                key={review.id}
                className="w-80 sm:w-96 shrink-0 snap-start flex flex-col justify-between border border-gray-200  bg-white  p-5 rounded-lg shadow-xs hover:border-gray-300  transition-colors"
              >
                <div>
                  {/* User Header */}
                  <div className="flex items-start justify-between border-b border-gray-100  pb-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-gray-900  text-white  flex items-center justify-center font-mono text-xs font-bold rounded">
                        {review.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-xs font-bold tracking-tight text-gray-900  flex items-center gap-1">
                          <span>{review.name}</span>
                          {review.verified && (
                            <CheckCircle2
                              size={12}
                              className="text-emerald-600 fill-emerald-50 "
                            />
                          )}
                        </h4>
                        {review.city && (
                          <span className="text-[10px] font-mono text-gray-400 uppercase">
                            {review.city}
                          </span>
                        )}
                      </div>
                    </div>

                    <time
                      className="text-[10px] font-mono text-gray-400"
                      dateTime={review.dateISO}
                    >
                      {review.date}
                    </time>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-0.5 mb-2.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        className={
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-100 text-gray-200 "
                        }
                      />
                    ))}
                  </div>

                  {/* Comment Body */}
                  <blockquote className="text-xs text-gray-700  leading-relaxed font-normal">
                    &ldquo;{review.comment}&rdquo;
                  </blockquote>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerReviews;
