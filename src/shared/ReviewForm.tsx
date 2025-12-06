import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { toast } from "react-toastify";

import type { Review } from "../types/product";

const API = import.meta.env.VITE_API_URL;

interface Props {
  productId: string;
  slug?: string;
}

export default function ReviewForm({ productId, slug }: Props) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (): Promise<Review> => {
      const res = await axios.post(`${API}/v1/products/${productId}/review`, {
        rating,
        comment,
      });
      return res.data.review as Review;
    },
    onSuccess: () => {
      toast.success("Review posted");
      qc.invalidateQueries({ queryKey: ["product", slug] });
      setComment("");
      setRating(5);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (comment.trim().length < 5)
          return toast.error("Minimum 5 characters");
        mutation.mutate();
      }}
      className="space-y-4"
    >
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setRating(i + 1)}
            className={i < rating ? "text-amber-400" : "text-gray-300"}
          >
            <Star size={24} />
          </button>
        ))}
      </div>

      <textarea
        className="w-full border rounded-md p-2"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Post Review
      </button>
    </form>
  );
}
