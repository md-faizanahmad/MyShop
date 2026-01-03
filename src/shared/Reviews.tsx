// src/components/Reviews.tsx
import type { Review } from "../types/product";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

interface Props {
  productId: string;
  reviews?: Review[];
  canPost?: boolean;
}

export default function Reviews({
  productId,
  reviews = [],
  canPost = true,
}: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">Customer reviews</h3>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="text-3xl font-bold">Reviews</div>
          <div className="text-sm text-gray-600 mt-1">
            {reviews.length} review(s)
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {canPost && <ReviewForm productId={productId} />}
          <div>
            <ReviewList productId={productId} reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
