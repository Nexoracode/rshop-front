import { apiFetch } from "@/lib/api-fetch";
import { getQueryClient } from "@/lib/utils/query-client";
import { GiftWrapping, OrderMeta } from "@/types/order";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const queryClient = getQueryClient();

export const getGiftWrappings = queryOptions({
  queryKey: ["get-gift-wrappings"],
  queryFn: async (): Promise<Array<GiftWrapping>> => {
    return await apiFetch("/gift-wrappings/active");
  },
});

export const getShopCardInfo = queryOptions({
  queryKey: ["shop-card-info"],
  queryFn: async (): Promise<{
    card_number: string;
    card_holder: string;
    bank_name: string;
    iban: string;
  }> => {
    return await apiFetch("/card-to-card/shop-card-info");
  },
});

export const getOrderMeta = queryOptions({
  queryKey: ["order-meta"],
  queryFn: (): OrderMeta =>
    queryClient.getQueryData(["order-meta"]) ?? {
      address: null,
      promotion_code: null,
      note: "",
      payment_method: "online",
      discount_amount: 0,
    },
  initialData: {
    address: null,
    promotion_code: null,
    note: "",
    payment_method: "online",
    discount_amount: 0,
  },
});
export const setOrderMeta = mutationOptions({
  mutationFn: async (orderMeta: OrderMeta) => orderMeta,
  onSuccess(data) {
    queryClient.setQueryData(["order-meta"], data);
  },
});
