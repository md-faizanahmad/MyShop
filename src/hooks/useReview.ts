import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apiClient from "../lib/axios";

interface UpdateReviewParams {
  productId: string;
  rating: number;
  comment: string;
}

export function useReview(productId: string) {
  const qc = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async ({ rating, comment }: UpdateReviewParams) => {
      await apiClient.put(`/v1/products/${productId}/review`, {
        rating,
        comment,
      });
    },
    onSuccess: () => {
      toast.success("Review updated");
      qc.invalidateQueries({ queryKey: ["product"] });
    },
    onError: () => {
      toast.error("Failed to update review");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiClient.delete(`/v1/products/${productId}/review`);
    },
    onSuccess: () => {
      toast.success("Review deleted");
      qc.invalidateQueries({ queryKey: ["product"] });
    },
    onError: () => {
      toast.error("Failed to delete review");
    },
  });

  return {
    updateReview: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteReview: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}
