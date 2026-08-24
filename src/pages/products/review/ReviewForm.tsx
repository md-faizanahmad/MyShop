// import { useState, type FormEvent } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Star } from "lucide-react";
// import { toast } from "react-toastify";
// import { AxiosError } from "axios";

// import type { Review } from "../../../types/product";
// import apiClient from "../../../lib/axios";
// import { useAuthStore } from "../../../store/useAuthStore";
// import { Link } from "react-router-dom";

// interface Props {
//   productId: string;
//   slug?: string;
//   hasReviews?: boolean;
// }

// interface ApiError {
//   message: string;
// }

// export default function ReviewForm({ productId, slug }: Props) {
//   const [rating, setRating] = useState<number>(5);
//   const [comment, setComment] = useState<string>("");
//   const { status } = useAuthStore();
//   const qc = useQueryClient();

//   const mutation = useMutation<Review, AxiosError<ApiError>, void>({
//     mutationFn: async () => {
//       const res = await apiClient.post(`/v1/products/${productId}/review`, {
//         rating,
//         comment,
//       });
//       return res.data.review;
//     },
//     onSuccess: () => {
//       toast.success("Review submitted successfully");
//       qc.invalidateQueries({ queryKey: ["product", slug] });
//       setComment("");
//       setRating(5);
//     },
//     onError: (error) => {
//       const msg =
//         error.response?.data?.message ??
//         "Unable to submit review. Please try again.";
//       toast.error(msg);
//     },
//   });

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();

//     if (comment.trim().length < 5) {
//       toast.warn("Review must be at least 5 characters");
//       return;
//     }

//     mutation.mutate();
//   };
//   /* =========================
//      GUEST VIEW
//   ========================= */
//   if (status !== "authenticated") {
//     return (
//       <div className="w-full m-auto max-w-lg rounded-xl  p-4 sm:p-5 text-center">
//         <p className="text-sm text-gray-700">
//           Please log in to write a review.
//         </p>

//         <Link
//           to="/login"
//           className="mt-3 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
//         >
//           Login to review
//         </Link>
//       </div>
//     );
//   }
//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="w-full max-w-lg space-y-4 rounded-xl border border-gray-200 bg-white p-4 sm:p-5"
//     >
//       {/* Rating */}
//       <div className="flex items-center gap-2">
//         {Array.from({ length: 5 }).map((_, i) => {
//           const value = i + 1;
//           return (
//             <button
//               key={value}
//               type="button"
//               onClick={() => setRating(value)}
//               aria-label={`Rate ${value}`}
//               className="focus:outline-none"
//             >
//               <Star
//                 size={22}
//                 className={
//                   value <= rating
//                     ? "fill-amber-400 text-amber-400"
//                     : "text-gray-300"
//                 }
//               />
//             </button>
//           );
//         })}
//       </div>

//       {/* Comment */}
//       <textarea
//         rows={3}
//         className="w-full resize-none rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
//         placeholder="Share your experience with this product"
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//       />

//       {/* Submit */}
//       <button
//         type="submit"
//         disabled={mutation.isPending}
//         className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
//       >
//         {mutation.isPending ? "Posting review..." : "Post Review"}
//       </button>
//     </form>
//   );
// }
/////////////////////////////////////// 25-08-2026
import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star, X } from "lucide-react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import type { Review } from "../../../types/product";
import apiClient from "../../../lib/axios";
import { useAuthStore } from "../../../store/useAuthStore";
import { Link } from "react-router-dom";

interface Props {
  productId: string;
  slug?: string;
  hasReviews?: boolean;
}

interface ApiError {
  message: string;
}

export default function ReviewForm({ productId, slug }: Props) {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const { status } = useAuthStore();
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

  const handleCancel = () => {
    setComment("");
    setRating(5);
  };

  /* =========================
     GUEST VIEW
  ========================= */
  if (status !== "authenticated") {
    return (
      <section className="w-full  pb-8 text-center">
        <h3 className="text-base font-semibold text-gray-900">
          Have you used this product?
        </h3>

        <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
          Log in to share your experience with other shoppers.
        </p>

        <Link
          to="/login"
          className="mt-4 inline-flex items-center justify-center rounded-md bg-sky-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-600"
        >
          Login to review
        </Link>
      </section>
    );
  }

  return (
    <section className="w-full border-b border-gray-200 pb-7 text-center">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-900">
          Write a review
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Share your experience with this product.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-2xl space-y-5"
      >
        {/* Rating */}
        <fieldset>
          <legend className="text-sm font-medium text-gray-900">
            Your rating
          </legend>

          <div
            className="mt-2 flex items-center justify-center gap-1"
            role="radiogroup"
            aria-label="Product rating"
          >
            {Array.from({ length: 5 }).map((_, i) => {
              const value = i + 1;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  aria-label={`Rate ${value}`}
                  aria-pressed={value === rating}
                  disabled={mutation.isPending}
                  className="rounded-md p-1 transition hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Star
                    size={24}
                    strokeWidth={1.8}
                    className={
                      value <= rating
                        ? "fill-sky-500 text-sky-500"
                        : "text-gray-300"
                    }
                  />
                </button>
              );
            })}

            <span className="ml-2 text-sm text-gray-500">{rating}/5</span>
          </div>
        </fieldset>

        {/* Comment */}
        <div className="text-left">
          <label
            htmlFor="product-review"
            className="text-sm font-medium text-gray-900"
          >
            Your review
          </label>

          <textarea
            id="product-review"
            rows={4}
            maxLength={1000}
            required
            className="mt-2 block w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:cursor-not-allowed disabled:bg-gray-50"
            placeholder="What did you like or dislike about this product?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={mutation.isPending}
          />

          <div className="mt-1 text-right">
            <span className="text-xs text-gray-400">{comment.length}/1000</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
          <button
            type="button"
            onClick={handleCancel}
            disabled={mutation.isPending || !comment}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <X size={15} />
            Cancel
          </button>

          <button
            type="submit"
            disabled={mutation.isPending || !comment.trim()}
            className="inline-flex w-full items-center justify-center rounded-md bg-sky-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {mutation.isPending ? "Posting review..." : "Post Review"}
          </button>
        </div>
      </form>
    </section>
  );
}
