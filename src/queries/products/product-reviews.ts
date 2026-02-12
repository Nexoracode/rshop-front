import { apiFetch } from "@/lib/api-fetch";
import { getQueryClient } from "@/lib/utils/query-client";
import { PaginateData } from "@/types";
import { Review } from "@/types/user";
import { infiniteQueryOptions, mutationOptions } from "@tanstack/react-query";

const queryClient = getQueryClient();

export const getProductReviews = (product_id: number, page: number | null) =>
  infiniteQueryOptions<
    PaginateData<Review, { averege_rating: number; count: number }>
  >({
    queryKey: ["get_reviews_by_product_id", product_id, page],
    queryFn: async ({ pageParam }) => {
      return await apiFetch(`/profile/reviews/products/${product_id}`, {
        params: { page: page || (pageParam as string) },
      });
    },
    getNextPageParam: ({ meta }) => meta.current_page + 1,
    enabled: Boolean(product_id),
    initialPageParam: 1,
  });

export const addProductReview = mutationOptions({
  mutationFn: async (body: {
    productId: number;
    rating: number;
    comment: string;
  }) =>
    await apiFetch("/profile/reviews", {
      method: "POST",
      body,
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["get-user-reviews"],
    });
    queryClient.invalidateQueries({
      queryKey: ["get-pending-reviews"],
    });
  },
});
