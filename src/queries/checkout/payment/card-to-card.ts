import { apiFetch } from "@/lib/api-fetch";
import { getQueryClient } from "@/lib/utils/query-client";
import { Order, ShopCardInfo } from "@/types/order";
import { mutationOptions } from "@tanstack/react-query";

const queryClient = getQueryClient();

export const createCardToCardPayment = mutationOptions({
  mutationKey: ["create_card_to_card_payment"],
  mutationFn: async (body: {
    order_id: number;
  }): Promise<{
    payment_id: number;
    order_id: number;
    amount: number;
    status: string;
    shop_card_info: ShopCardInfo;
  }> => await apiFetch("/card-to-card/initiate", { method: "POST", body }),
  onSuccess: async (_data, variables) => {
    await queryClient.invalidateQueries({
      queryKey: ["get-order-details", variables.order_id],
    });
  },
});

export const cardTocardPaymentLater = mutationOptions({
  mutationFn: async (body: { order_id: number }): Promise<Order> =>
    await apiFetch(`/orders/${body.order_id}/awaiting`, {
      method: "POST",
      body,
    }),
  onSuccess: async (_data, variables) => {
    await queryClient.invalidateQueries({
      queryKey: ["get-order-details", variables.order_id],
    });
  },
});
export const uploadReceipImage = mutationOptions({
  mutationFn: async ({
    payment_id,
    ...body
  }: {
    files?: [string];
    payment_id: number;
    sender_card_number?: string;
    tracking_code?: string;
    deposit_date?: string;
    has_receipt_image: boolean;
    order_id: number;
  }) =>
    await apiFetch(`/card-to-card/${payment_id}/upload-receipt`, {
      hasFile: Boolean(body.files),
      method: "POST",
      body,
    }),

  onSuccess: async (_data, variables) => {
    await queryClient.invalidateQueries({
      queryKey: ["get-order-details", variables.order_id],
    });
  },
});
