import { apiFetch } from "@/lib/api-fetch";
import { getQueryClient } from "@/lib/utils/query-client";
import { Review } from "@/types/user";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const queryClient = getQueryClient();

export const getMyReviews = queryOptions({
  queryKey: ["get-user-reviews"],
  queryFn: async (): Promise<Array<Review>> => {
    return await apiFetch("/profile/reviews");
  },
});

export const getPendingReviews = queryOptions({
  queryKey: ["get-pending-reviews"],
  queryFn: async (): Promise<Array<Review["product"]>> => {
    return await apiFetch("/profile/reviews/pending");
  },
});

export const updateReview = mutationOptions({
  mutationFn: async ({
    id,
    ...body
  }: {
    id: number;
    productId: number;
    rating: number;
    comment: string;
  }) => await apiFetch(`/profile/reviews/${id}`, { method: "PATCH", body }),

  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: ["get-user-reviews"],
    });
  },
});

export const deleteReview = mutationOptions({
  mutationFn: async ({ id }: { id: number }) =>
    await apiFetch(`/profile/reviews/${id}`, { method: "DELETE" }),

  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: ["get-user-reviews"],
    });
  },
});
