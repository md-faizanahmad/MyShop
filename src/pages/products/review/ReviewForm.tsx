import { useState } from "react";
import { Loader2, Star, X } from "lucide-react";

import { useReview } from "@/hooks/useReview";

interface Props {
  productId: string;
  hasReviews?: boolean;
}

export default function ReviewForm({ productId, hasReviews = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { addReview, isAdding } = useReview(productId);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addReview(
      {
        productId,
        rating,
        comment: comment.trim(),
      },
      {
        onSuccess: () => {
          setRating(5);
          setComment("");
          setIsOpen(false);
        },
      },
    );
  };

  if (!isOpen) {
    return (
      <section className="border-b border-gray-200 pb-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {hasReviews ? "Share your experience" : "Be the first to review"}
            </h3>

            {!hasReviews && (
              <p className="mt-1 text-sm text-gray-500">
                Your feedback helps other customers make better decisions.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 sm:w-auto"
          >
            Write a Review
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-gray-200 pb-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Write a Review
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Share your experience with this product.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="shrink-0 rounded-md p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          aria-label="Close review form"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <fieldset disabled={isAdding} className="space-y-5">
          <legend className="sr-only">Product review</legend>

          <div>
            <span className="block text-sm font-medium text-gray-900">
              Your rating
            </span>

            <div
              className="mt-2 flex items-center gap-1"
              role="radiogroup"
              aria-label="Product rating"
            >
              {Array.from({ length: 5 }).map((_, index) => {
                const value = index + 1;
                const selected = value <= rating;

                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={`${value} star${value > 1 ? "s" : ""}`}
                    onClick={() => setRating(value)}
                    className="rounded p-1 transition hover:bg-amber-50"
                  >
                    <Star
                      size={22}
                      className={
                        selected
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-100 text-gray-300"
                      }
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label
              htmlFor="review-comment"
              className="block text-sm font-medium text-gray-900"
            >
              Your review
            </label>

            <textarea
              id="review-comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              rows={4}
              required
              maxLength={1000}
              placeholder="What did you like or dislike about this product?"
              className="mt-2 block w-full resize-y rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
            />

            <p className="mt-1 text-right text-xs text-gray-400">
              {comment.length}/1000
            </p>
          </div>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isAdding || !comment.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAdding && <Loader2 size={16} className="animate-spin" />}
              {isAdding ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}
