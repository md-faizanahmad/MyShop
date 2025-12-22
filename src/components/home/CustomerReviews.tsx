// src/components/home/CustomerReviews.tsx
import { Star } from "lucide-react";
import type { FC } from "react";

export interface Review {
  id: string; // unique id for UI
  name: string;
  rating: number;
  comment: string;
  date: string; // human readable
  dateISO: string; // exact ISO for <time>
  verified: boolean;
  city?: string; // optional, component handles missing
}

interface CustomerReviewsProps {
  reviews: Review[]; // REQUIRED dynamic reviews
  totalReviewsLabel?: string; // optional summary text
  title?: string; // customizable title
  subtitle?: string; // customizable subtitle
}

const CustomerReviews: FC<CustomerReviewsProps> = ({
  reviews,
  totalReviewsLabel = "Customer Reviews",
  title = "What Customers Say",
  subtitle = "Authentic feedback from recent buyers",
}) => {
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm md:text-base text-gray-600">
              {subtitle}
            </p>
          )}

          {/* Rating summary */}
          {reviews.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <div aria-hidden="true" className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      i < Math.round(avgRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <span className="text-base md:text-lg font-semibold ml-1">
                {avgRating.toFixed(1)}/5
              </span>

              <span className="text-xs md:text-sm text-gray-500">
                · {totalReviewsLabel}
              </span>
            </div>
          )}
        </div>

        {/* No reviews fallback */}
        {reviews.length === 0 && (
          <p className="text-center text-gray-600 text-sm">
            No reviews yet. Be the first to write one!
          </p>
        )}

        {/* Reviews Grid */}
        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reviews.map((review) => (
            <li key={review.id}>
              <article
                aria-label={`Review by ${review.name}`}
                className="bg-white rounded-2xl shadow-sm p-5 border border-purple-100 hover:shadow-md hover:-translate-y-1 transition"
              >
                {/* User header */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    aria-hidden="true"
                    className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-blue-300 to-sky-300 rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base"
                  >
                    {review.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm md:text-base text-gray-900">
                      {review.name}
                    </h4>

                    <div className="flex items-center gap-2">
                      {review.city && (
                        <>
                          <p className="text-[11px] md:text-xs text-gray-500 truncate">
                            {review.city}
                          </p>
                          <span className="text-[11px] md:text-xs text-gray-400">
                            •
                          </span>
                        </>
                      )}

                      <time
                        dateTime={review.dateISO}
                        className="text-[11px] md:text-xs text-gray-500"
                      >
                        {review.date}
                      </time>
                    </div>

                    {review.verified && (
                      <div className="mt-0.5">
                        <span className="inline-block text-[10px] md:text-[11px] text-green-600 font-medium">
                          Verified Buyer
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div aria-hidden="true" className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                  “{review.comment}”
                </p>
              </article>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {reviews.length > 6 && (
          <div className="text-center mt-8">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-sky-600 text-white px-6 py-2.5 text-sm font-semibold hover:shadow-lg hover:scale-[1.02] transition"
            >
              Read More Reviews
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerReviews;
