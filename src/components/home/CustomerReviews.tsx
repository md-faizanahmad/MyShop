// ////////////////////// Update 20-08
// import { Star, CheckCircle2, Quote, ArrowLeft, ArrowRight } from "lucide-react";
// import { useRef } from "react";
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
//   totalReviewsLabel = "Verified Reviews",
//   title = "Customer Feedback",
//   subtitle = "See what customers are saying about their MyAZStore experience.",
// }) => {
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   const avgRating =
//     reviews.length > 0
//       ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
//       : 0;

//   const scroll = (direction: "left" | "right") => {
//     if (!scrollContainerRef.current) return;

//     scrollContainerRef.current.scrollBy({
//       left: direction === "left" ? -320 : 320,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="w-full overflow-hidden py-8 sm:py-10 lg:py-12">
//       <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 lg:px-8">
//         {/* -----------------------------------------------------------------
//             Header
//         ----------------------------------------------------------------- */}

//         <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//           <div className="min-w-0">
//             <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-600 sm:text-xs">
//               Customer Reviews
//             </span>

//             <h2 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
//               {title}
//             </h2>

//             <p className="mt-1.5 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
//               {subtitle}
//             </p>
//           </div>

//           {/* Rating + Navigation */}
//           {reviews.length > 0 && (
//             <div className="flex items-center justify-between gap-3 sm:justify-end">
//               {/* Rating Summary */}
//               <div className="flex items-center gap-3  px-3 py-2.5 ">
//                 <div className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
//                   {avgRating.toFixed(1)}
//                 </div>

//                 <div className="border-l border-slate-200 pl-3">
//                   <div className="flex gap-0.5">
//                     {[...Array(5)].map((_, index) => (
//                       <Star
//                         key={index}
//                         className={`h-3 w-3 ${
//                           index < Math.round(avgRating)
//                             ? "fill-amber-400 text-amber-400"
//                             : "text-slate-200"
//                         }`}
//                       />
//                     ))}
//                   </div>

//                   <p className="mt-0.5 text-[10px] font-medium text-slate-500 sm:text-xs">
//                     {reviews.length} {totalReviewsLabel}
//                   </p>
//                 </div>
//               </div>

//               {/* Desktop / Tablet arrows */}
//               <div className="flex items-center gap-1.5">
//                 <button
//                   type="button"
//                   onClick={() => scroll("left")}
//                   aria-label="Previous reviews"
//                   className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 active:scale-95"
//                 >
//                   <ArrowLeft className="h-4 w-4" />
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => scroll("right")}
//                   aria-label="Next reviews"
//                   className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 active:scale-95"
//                 >
//                   <ArrowRight className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* -----------------------------------------------------------------
//             Reviews
//         ----------------------------------------------------------------- */}

//         <div className="mt-5 sm:mt-6">
//           {reviews.length === 0 ? (
//             <div className="flex items-center gap-3  px-4 py-8">
//               <div className="flex h-9 w-9 shrink-0 items-center justify-center  text-slate-400">
//                 <Quote className="h-4 w-4" />
//               </div>

//               <div>
//                 <p className="text-sm font-semibold text-slate-800">
//                   No reviews yet
//                 </p>

//                 <p className="mt-0.5 text-xs text-slate-500">
//                   Customer feedback will appear here after purchases.
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <div
//               ref={scrollContainerRef}
//               className="-mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2 scrollbar-none sm:mx-0 sm:px-0 sm:gap-4"
//               style={{
//                 scrollbarWidth: "none",
//                 msOverflowStyle: "none",
//               }}
//             >
//               {reviews.map((review) => (
//                 <article
//                   key={review.id}
//                   className="flex w-[calc(100vw-42px)] shrink-0 snap-start flex-col justify-between border border-slate-200 bg-white p-4 shadow-sm sm:w-[360px] sm:p-5 lg:w-[380px]"
//                 >
//                   <div>
//                     {/* User */}
//                     <div className="flex items-start justify-between gap-3">
//                       <div className="flex min-w-0 items-center gap-2.5">
//                         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
//                           {review.name.charAt(0).toUpperCase()}
//                         </div>

//                         <div className="min-w-0">
//                           <div className="flex items-center gap-1">
//                             <h3 className="truncate text-xs font-semibold text-slate-900 sm:text-sm">
//                               {review.name}
//                             </h3>

//                             {review.verified && (
//                               <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
//                             )}
//                           </div>

//                           {review.city && (
//                             <p className="mt-0.5 truncate text-[10px] text-slate-400 sm:text-xs">
//                               {review.city}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <time
//                         dateTime={review.dateISO}
//                         className="shrink-0 text-[10px] text-slate-400"
//                       >
//                         {review.date}
//                       </time>
//                     </div>

//                     {/* Rating */}
//                     <div className="mt-4 flex items-center gap-0.5">
//                       {[...Array(5)].map((_, index) => (
//                         <Star
//                           key={index}
//                           className={`h-3.5 w-3.5 ${
//                             index < review.rating
//                               ? "fill-amber-400 text-amber-400"
//                               : "text-slate-200"
//                           }`}
//                         />
//                       ))}
//                     </div>

//                     {/* Review */}
//                     <blockquote className="mt-3 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
//                       “{review.comment}”
//                     </blockquote>
//                   </div>

//                   {/* Verified footer */}
//                   {review.verified && (
//                     <div className="mt-5 flex items-center gap-1.5 border-t border-slate-100 pt-3">
//                       <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />

//                       <span className="text-[10px] font-medium text-slate-500 sm:text-xs">
//                         Verified purchase
//                       </span>
//                     </div>
//                   )}
//                 </article>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CustomerReviews;
////////////////////////////////////////25-08-2026
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

const formatRelativeDate = (dateISO: string) => {
  const date = new Date(dateISO);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  }

  const years = Math.floor(diffDays / 365);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
};

const CustomerReviews: FC<CustomerReviewsProps> = ({
  reviews,
  totalReviewsLabel = "Verified Reviews",
  title = "Customer Feedback",
  subtitle = "See what customers are saying about their MyAZStore experience.",
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full overflow-hidden py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-600 sm:text-xs">
              Customer Reviews
            </span>

            <h2 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
              {title}
            </h2>

            <p className="mt-1.5 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
              {subtitle}
            </p>
          </div>

          {/* Rating + Navigation */}
          {reviews.length > 0 && (
            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <div className="flex items-center gap-3 px-3 py-2.5">
                <div className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  {avgRating.toFixed(1)}
                </div>

                <div className="border-l border-slate-200 pl-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-3 w-3 ${
                          index < Math.round(avgRating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="mt-0.5 text-[10px] font-medium text-slate-500 sm:text-xs">
                    {reviews.length} {totalReviewsLabel}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  aria-label="Previous reviews"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 active:scale-95"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scroll("right")}
                  aria-label="Next reviews"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 active:scale-95"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Reviews */}
        <div className="mt-5 sm:mt-6">
          {reviews.length === 0 ? (
            <div className="flex items-center gap-3 px-4 py-8">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center text-slate-400">
                <Quote className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  No reviews yet
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Customer feedback will appear here after purchases.
                </p>
              </div>
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="-mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2 scrollbar-none sm:mx-0 sm:gap-4 sm:px-0"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="
                    flex
                    w-[280px]
                    shrink-0
                    snap-start
                    flex-col
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                    shadow-sm
                    sm:w-[310px]
                    sm:p-4.5
                    lg:w-[320px]
                  "
                >
                  {/* Card Content */}
                  <div className="min-w-0">
                    {/* User */}
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                        {review.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 items-center gap-1">
                          <h3 className="min-w-0 truncate text-xs font-semibold text-slate-900 sm:text-sm">
                            {review.name}
                          </h3>

                          {review.verified && (
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                          )}
                        </div>

                        {review.city && (
                          <p className="mt-0.5 truncate text-[10px] text-slate-400 sm:text-xs">
                            {review.city}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="mt-3 flex items-center gap-0.5">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-3.5 w-3.5 ${
                            index < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Review */}
                    <blockquote className="mt-3 line-clamp-4 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                      “{review.comment}”
                    </blockquote>
                  </div>

                  {/* Card Footer */}
                  <footer className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-[10px] font-medium text-slate-400 sm:text-xs">
                      Customer review
                    </span>

                    <time
                      dateTime={review.dateISO}
                      className="shrink-0 text-[10px] font-medium text-slate-400 sm:text-xs"
                    >
                      {formatRelativeDate(review.dateISO)}
                    </time>
                  </footer>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
