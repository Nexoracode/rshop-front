import { apiFetch } from "@/lib/api-fetch";
import { RecentView } from "@/types/user";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export const addRecentView = mutationOptions({
  mutationFn: async ({ product_id }: { product_id: number }) =>
    await apiFetch("/profile/recent-views", {
      method: "POST",
      body: { product_id },
      showErrorToast: false,
    }),
});
export const recentViewList = queryOptions({
  queryKey: ["get-user-recent-views"],
  queryFn: async (): Promise<Array<RecentView>> => {
    return await apiFetch("/profile/recent-views", { showErrorToast: false });
  },
});
