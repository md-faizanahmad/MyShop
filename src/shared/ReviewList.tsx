import { Star } from "lucide-react";
import type { Review } from "../types/product";

export default function ReviewList({ reviews = [] }: { reviews: Review[] }) {
  if (!reviews.length)
    return (
      <div className="text-sm text-gray-600">
        No reviews yet — be the first to review.
      </div>
    );

  return (
    <ul className="space-y-4">
      {reviews.map((r) => (
        <li key={r._id} className="border rounded-lg p-3">
          <div className="flex justify-between">
            <b>{r.user?.name}</b>
            <span className="text-xs text-gray-500">
              {new Date(r.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < r.rating ? "text-amber-400" : "text-gray-300"}
              />
            ))}
          </div>

          <p className="text-sm mt-2">{r.comment}</p>
        </li>
      ))}
    </ul>
  );
}
