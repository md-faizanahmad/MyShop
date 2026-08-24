import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apiClient from "../lib/axios";

interface UpdateReviewParams {
  productId: string;
  rating: number;
  comment: string;
}

interface AddReviewParams {
  productId: string;
  rating: number;
  comment: string;
}

export function useReview(productId: string) {
  const qc = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async ({ productId, rating, comment }: AddReviewParams) => {
      await apiClient.post(`/v1/products/${productId}/review`, {
        rating,
        comment,
      });
    },
    onSuccess: () => {
      toast.success("Review added");
      qc.invalidateQueries({ queryKey: ["product"] });
    },
    onError: () => {
      toast.error("Failed to add review");
    },
  });

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
    addReview: addMutation.mutate,
    isAdding: addMutation.isPending,

    updateReview: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteReview: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}
