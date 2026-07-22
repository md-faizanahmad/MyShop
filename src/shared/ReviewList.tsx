import { useState } from "react";
import { Star, Trash2, Pencil, CheckCircle, X, Save } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { Review } from "../types/product";
import apiClient from "../lib/axios";
import { ReviewSkeleton } from "../skeleton/ReviewSkeleton";

interface Props {
  productId: string;
  reviews: Review[];
  currentUserId?: string;
  isLoading?: boolean; // New prop for loading state
}

export default function ReviewList({
  productId,
  reviews = [],
  currentUserId,
  isLoading,
}: Props) {
  const qc = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState<number>(5);
  const [editComment, setEditComment] = useState<string>("");

  const updateMutation = useMutation({
    mutationFn: async () => {
      await apiClient.put(`/v1/products/${productId}/review`, {
        rating: editRating,
        comment: editComment,
      });
    },
    onSuccess: () => {
      toast.success("Review updated");
      setEditingId(null);
      qc.invalidateQueries({ queryKey: ["product"] });
    },
    onError: () => toast.error("Failed to update review"),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiClient.delete(`/v1/products/${productId}/review`);
    },
    onSuccess: () => {
      toast.success("Review deleted");
      qc.invalidateQueries({ queryKey: ["product"] });
    },
    onError: () => toast.error("Failed to delete review"),
  });

  if (isLoading) return <ReviewSkeleton />;

  if (!reviews.length) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-2xl border-gray-100 bg-gray-50/50">
        <p className="text-gray-500 font-medium">No reviews yet</p>
        <p className="text-xs text-gray-400 mt-1">
          Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-4">
      {reviews.map((r) => {
        // const isOwner = r.user?._id === currentUserId;
        const isLoggedIn = Boolean(currentUserId);

        const isOwner = isLoggedIn && r.user?._id === currentUserId;

        const isEditing = editingId === r._id;

        return (
          <li
            key={r._id}
            className={`group relative w-70 rounded-lg border p-4 transition-all ${
              isEditing
                ? "border-sky-500 bg-blue-50/20"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            {/* Header: User Info & Actions */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-700 text-sm">
                  {r.user.name?.charAt(0).toUpperCase() || "U"}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 text-sm">
                      {r.user.name}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
                      <CheckCircle size={12} className="text-emerald-600" />
                      Verified Purchase
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(r.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Owner Actions */}
              {isOwner && !isEditing && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setEditingId(r._id);
                      setEditRating(r.rating);
                      setEditComment(r.comment);
                    }}
                    className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    title="Edit Review"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate()}
                    className="rounded p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              )}
            </div>

            {/* Rating Stars */}
            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`transition-colors ${
                    isEditing ? "cursor-pointer" : ""
                  } ${
                    i < (isEditing ? editRating : r.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-100 text-gray-300"
                  }`}
                  onClick={isEditing ? () => setEditRating(i + 1) : undefined}
                />
              ))}
            </div>

            {/* Content / Edit Mode */}
            {!isEditing ? (
              <p className="mt-2.5 text-sm text-gray-800 leading-relaxed">
                {r.comment}
              </p>
            ) : (
              <div className="mt-3 space-y-3">
                <textarea
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Update your review..."
                />

                <div className="flex items-center gap-2">
                  <button
                    disabled={updateMutation.isPending}
                    onClick={() => updateMutation.mutate()}
                    className="inline-flex items-center gap-1.5 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    <Save size={13} />
                    {updateMutation.isPending ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <X size={13} /> Cancel
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
