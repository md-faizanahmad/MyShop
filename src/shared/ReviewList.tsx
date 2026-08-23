import { useState } from "react";
import { Star, Trash2, Pencil, CheckCircle, X, Save } from "lucide-react";

import type { Review } from "../types/product";
import { ReviewSkeleton } from "../skeleton/ReviewSkeleton";
import { useReview } from "@/hooks/useReview";

interface Props {
  productId: string;
  reviews: Review[];
  currentUserId?: string;
  isLoading?: boolean;
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

  const { updateReview, isUpdating, deleteReview } = useReview(productId);

  if (isLoading) return <ReviewSkeleton />;

  if (!reviews.length) {
    return (
      <div className="border border-dashed border-gray-200 bg-gray-50/50 py-10 text-center">
        <p className="font-medium text-gray-500">No reviews yet</p>
        <p className="mt-1 text-xs text-gray-400">
          Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-4">
      {reviews.map((review) => {
        const isOwner =
          Boolean(currentUserId) && review.user?._id === currentUserId;

        const isEditing = editingId === review._id;

        return (
          <li
            key={review._id}
            className={`group relative rounded-lg border p-4 transition ${
              isEditing
                ? "border-blue-500 bg-blue-50/20"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                  {review.user.name?.charAt(0).toUpperCase() || "U"}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {review.user.name}
                    </span>

                    {review.verified && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                        <CheckCircle size={12} />
                        Verified Purchase
                      </span>
                    )}
                  </div>

                  <p className="mt-0.5 text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {isOwner && !isEditing && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(review._id);
                      setEditRating(review.rating);
                      setEditComment(review.comment);
                    }}
                    className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    aria-label="Edit review"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteReview()}
                    className="rounded p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600"
                    aria-label="Delete review"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  onClick={
                    isEditing ? () => setEditRating(index + 1) : undefined
                  }
                  className={`${isEditing ? "cursor-pointer" : ""} ${
                    index < (isEditing ? editRating : review.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-100 text-gray-300"
                  }`}
                />
              ))}
            </div>

            {!isEditing ? (
              <p className="mt-2.5 text-sm leading-relaxed text-gray-800">
                {review.comment}
              </p>
            ) : (
              <div className="mt-3 space-y-3">
                <textarea
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Update your review..."
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() =>
                      updateReview({
                        productId,
                        rating: editRating,
                        comment: editComment,
                      })
                    }
                    className="inline-flex items-center gap-1.5 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
                  >
                    <Save size={13} />
                    {isUpdating ? "Saving..." : "Save"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700"
                  >
                    <X size={13} />
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
