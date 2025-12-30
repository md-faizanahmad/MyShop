import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import type { Review } from "../types/product";
import apiClient from "../lib/axios";

interface Props {
  productId: string;
  slug?: string;
}

interface ApiError {
  message: string;
}

export default function ReviewForm({ productId, slug }: Props) {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  const qc = useQueryClient();

  const mutation = useMutation<Review, AxiosError<ApiError>, void>({
    mutationFn: async () => {
      const res = await apiClient.post(`/v1/products/${productId}/review`, {
        rating,
        comment,
      });
      return res.data.review;
    },
    onSuccess: () => {
      toast.success("Review submitted successfully");
      qc.invalidateQueries({ queryKey: ["product", slug] });
      setComment("");
      setRating(5);
    },
    onError: (error) => {
      const msg =
        error.response?.data?.message ??
        "Unable to submit review. Please try again.";
      toast.error(msg);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (comment.trim().length < 5) {
      toast.warn("Review must be at least 5 characters");
      return;
    }

    mutation.mutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg space-y-4 rounded-xl border border-gray-200 bg-white p-4 sm:p-5"
    >
      {/* Rating */}
      <div className="flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => {
          const value = i + 1;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              aria-label={`Rate ${value}`}
              className="focus:outline-none"
            >
              <Star
                size={22}
                className={
                  value <= rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300"
                }
              />
            </button>
          );
        })}
      </div>

      {/* Comment */}
      <textarea
        rows={3}
        className="w-full resize-none rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
        placeholder="Share your experience with this product"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {mutation.isPending ? "Posting review..." : "Post Review"}
      </button>
    </form>
  );
}
