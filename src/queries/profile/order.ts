import { apiFetch } from "@/lib/api-fetch";
import { Order, ProfileOrderStatus } from "@/types/order";
import { queryOptions } from "@tanstack/react-query";

export const getDetailedProfile = queryOptions({
  queryKey: ["get-detailed-profile"],
  queryFn: async (): Promise<{
    order_summary: {
      processing: number;
      shipping: number;
      completed: number;
      returned: number;
      cancelled: number;
      total: 1;
    };
  }> => {
    return await apiFetch(`/profile/detailed`);
  },
});
export const getOrders = (
  orderStatus: ProfileOrderStatus | "awaiting-payment",
) =>
  queryOptions({
    queryKey: ["get-profile-orders", orderStatus],
    queryFn: async (): Promise<Array<Order>> => {
      return await apiFetch(`/profile/orders/${orderStatus}`);
    },
  });

export const getOrderDetails = (orderId: number) =>
  queryOptions({
    queryKey: ["get-order-details", orderId],
    queryFn: async (): Promise<Order> => {
      return await apiFetch(`/orders/${orderId}/me`);
    },
    enabled: Boolean(orderId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
