import { Star } from "lucide-react";

interface Props {
  average: number;
  count: number;
}

export default function ReviewSummary({ average, count }: Props) {
  const roundedRating = Math.round(average);

  const getConclusion = () => {
    if (count === 0) return "No customer feedback yet.";

    if (average >= 4.5) {
      return "Customers are highly satisfied with this product.";
    }

    if (average >= 4) {
      return "Customers are very satisfied with this product.";
    }

    if (average >= 3) {
      return "Customers have mixed but generally positive feedback.";
    }

    if (average >= 2) {
      return "Customer feedback is mixed for this product.";
    }

    return "Customer feedback is mostly negative.";
  };

  return (
    <section
      aria-labelledby="customer-feedback-heading"
      className="border-b border-gray-200 py-6"
    >
      <div className="text-center">
        <h3
          id="customer-feedback-heading"
          className="text-base font-semibold text-gray-900"
        >
          Customer Feedback
        </h3>

        {count > 0 ? (
          <>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-2xl font-semibold text-gray-900">
                {average.toFixed(1)}
              </span>

              <div
                className="flex items-center gap-0.5"
                aria-label={`${average.toFixed(1)} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    aria-hidden="true"
                    className={
                      index < roundedRating
                        ? "fill-sky-500 text-sky-500"
                        : "fill-gray-100 text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>

            <p className="mt-1 text-xs text-gray-500">
              Based on {count} {count === 1 ? "review" : "reviews"}
            </p>

            <p className="mx-auto mt-3 max-w-md text-sm text-gray-600">
              {getConclusion()}
            </p>
          </>
        ) : (
          <p className="mt-2 text-sm text-gray-500">
            Be the first customer to share your experience.
          </p>
        )}
      </div>
    </section>
  );
}
