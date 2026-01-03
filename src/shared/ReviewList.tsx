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
        const isOwner = r.user?._id === currentUserId;

        const isEditing = editingId === r._id;

        return (
          <li
            key={r._id}
            className={`group relative rounded-xl border p-5 transition-all duration-200 ${
              isEditing
                ? "border-blue-200 bg-blue-50/30 ring-2 ring-blue-50"
                : "border-gray-100 bg-white hover:shadow-md"
            }`}
          >
            {/* Top Bar: User & Actions */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-3">
              <div className="flex gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-linear-to-tr from-gray-100 to-gray-200 flex items-center justify-center font-bold text-gray-500 text-sm">
                  {r.user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 leading-none">
                      {r.user.name}
                    </span>

                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                      <CheckCircle size={10} /> Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1 font-medium italic">
                    {new Date(r.createdAt).toLocaleDateString(undefined, {
                      dateStyle: "medium",
                    })}
                  </p>
                </div>
              </div>

              {isOwner && !isEditing && (
                <div className="absolute top-4 right-4 sm:static flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setEditingId(r._id);
                      setEditRating(r.rating);
                      setEditComment(r.comment);
                    }}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg shadow-sm sm:shadow-none border border-transparent hover:border-blue-100 transition-all"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate()}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded-lg shadow-sm sm:shadow-none border border-transparent hover:border-red-100 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Rating Stars */}
            <div className="mt-3 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`transition-colors ${
                    isEditing ? "cursor-pointer" : ""
                  } ${
                    i < (isEditing ? editRating : r.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-200"
                  }`}
                  onClick={isEditing ? () => setEditRating(i + 1) : undefined}
                />
              ))}
            </div>

            {/* Comment Section */}
            {!isEditing ? (
              <p className="mt-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                {r.comment}
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                <textarea
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-blue-200 p-3 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all shadow-sm"
                  placeholder="Share your thoughts..."
                />

                <div className="flex gap-2">
                  <button
                    disabled={updateMutation.isPending}
                    onClick={() => updateMutation.mutate()}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <Save size={14} />{" "}
                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <X size={14} /> Cancel
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
