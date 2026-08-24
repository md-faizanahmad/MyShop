import { useState } from "react";
import { Star, Trash2, Pencil, CheckCircle, X, Save } from "lucide-react";

import { useReview } from "@/hooks/useReview";
import type { Review } from "@/types/product";
import { ReviewSkeleton } from "@/skeleton/ReviewSkeleton";

interface Props {
  productId: string;
  reviews: Review[];
  currentUserId?: string;
  isLoading?: boolean;
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ReviewList({
  productId,
  reviews = [],
  currentUserId,
  isLoading,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");

  const { updateReview, isUpdating, deleteReview, isDeleting } =
    useReview(productId);

  if (isLoading) return <ReviewSkeleton />;

  return (
    <ul className="grid gap-4">
      {reviews.map((review) => {
        const isOwner =
          Boolean(currentUserId) && review.user?._id === currentUserId;

        const isEditing = editingId === review._id;

        return (
          <li
            key={review._id}
            className={`relative w-full border-b pb-4 transition last:border-b-0 ${
              isEditing ? "border-blue-200" : "border-gray-200"
            }`}
          >
            {/* Header */}
            <header className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                {/* Avatar */}
                <div
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700"
                >
                  {getInitials(review.user.name)}
                </div>

                {/* Reviewer information */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm font-semibold text-gray-900">
                      {review.user.name}
                    </span>

                    {review.verified && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                        <CheckCircle size={12} aria-hidden="true" />
                        Verified Purchase
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div
                    className="mt-1 flex items-center gap-0.5"
                    aria-label={`${isEditing ? editRating : review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, index) => {
                      const value = index + 1;
                      const currentRating = isEditing
                        ? editRating
                        : review.rating;

                      return (
                        <button
                          key={value}
                          type="button"
                          disabled={!isEditing || isUpdating}
                          onClick={() => setEditRating(value)}
                          aria-label={
                            isEditing
                              ? `Set rating to ${value} star${
                                  value > 1 ? "s" : ""
                                }`
                              : undefined
                          }
                          className={`rounded-sm ${
                            isEditing
                              ? "cursor-pointer hover:bg-amber-50"
                              : "cursor-default"
                          }`}
                        >
                          <Star
                            size={14}
                            aria-hidden="true"
                            className={
                              value <= currentRating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-gray-100 text-gray-300"
                            }
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Owner actions */}
              {isOwner && !isEditing && (
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(review._id);
                      setEditRating(review.rating);
                      setEditComment(review.comment);
                    }}
                    className="rounded-md p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                    aria-label="Edit review"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteReview()}
                    disabled={isDeleting}
                    className="rounded-md p-1.5 text-gray-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Delete review"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              )}
            </header>

            {/* Review content */}
            {!isEditing ? (
              <article className="mt-3">
                <p className="text-sm leading-relaxed text-gray-800">
                  {review.comment}
                </p>

                <time
                  dateTime={review.createdAt}
                  className="mt-2 block text-xs text-gray-400"
                >
                  {new Date(review.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </article>
            ) : (
              <form
                className="mt-3 space-y-3"
                onSubmit={(event) => {
                  event.preventDefault();

                  updateReview(
                    {
                      productId,
                      rating: editRating,
                      comment: editComment.trim(),
                    },
                    {
                      onSuccess: () => {
                        setEditingId(null);
                      },
                    },
                  );
                }}
              >
                <label htmlFor={`review-${review._id}`} className="sr-only">
                  Update your review
                </label>

                <textarea
                  id={`review-${review._id}`}
                  value={editComment}
                  onChange={(event) => setEditComment(event.target.value)}
                  rows={3}
                  required
                  maxLength={1000}
                  disabled={isUpdating}
                  className="w-full resize-y rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
                  placeholder="Update your review..."
                />

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    disabled={isUpdating}
                    className="inline-flex items-center justify-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                  >
                    <X size={13} aria-hidden="true" />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isUpdating || !editComment.trim()}
                    className="inline-flex items-center justify-center gap-1.5 rounded-md bg-gray-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Save size={13} aria-hidden="true" />
                    {isUpdating ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            )}
          </li>
        );
      })}
    </ul>
  );
}
