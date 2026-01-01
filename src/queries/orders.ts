import { apiFetch } from "@/lib/api-fetch";
import { getQueryClient } from "@/lib/get-query-client";
import {
  GiftWrapping,
  Order,
  OrderMeta,
  ProfileOrderStatus,
  ShopCardInfo,
} from "@/types/order";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const queryClient = getQueryClient();

export const couponApply = mutationOptions<
  { discount: number; payable: number; coupon_code: string },
  { error: string; message: string },
  {
    code: string;
    user_id: number;
    total_amount: number;
  }
>({
  mutationKey: ["discount-code"],
  mutationFn: async (body) =>
    await apiFetch("/coupon/apply", { method: "POST", body }),
});

export const getOrderMeta = queryOptions({
  queryKey: ["order-meta"],
  queryFn: (): OrderMeta =>
    queryClient.getQueryData(["order-meta"]) ?? {
      address: null,
      promotion_code: "",
      note: "",
      payment_method: "online",
      discount_amount: 0,
    },
  initialData: {
    address: null,
    promotion_code: "",
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
export const createOrder = mutationOptions({
  mutationFn: async (body: {
    code?: string;
    note?: string;
    addressId: number;
    is_gift?: boolean;
    gift_message?: string;
    gift_wrapping_id?: number;
  }) => await apiFetch("/orders/from-card", { method: "POST", body }),
});

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
  orderStatus: ProfileOrderStatus | "awaiting-payment"
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

export const checkPromotion = mutationOptions({
  mutationKey: ["check-promotion"],
  mutationFn: async (body: {
    code: string;
    userId?: number;
    subtotal: number;
    shippingCost: number;
    isFirstOrder: boolean;
    items: Array<{
      productId: number;
      categoryId: number;
      variantId: number;
      quantity: number;
      unitPrice: number;
    }>;
  }): Promise<{ discount: number }> =>
    await apiFetch("/promotions/check", { method: "POST", body }),
});

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
  }) =>
    await apiFetch(`/card-to-card/${payment_id}/upload-receipt`, {
      hasFile: Boolean(body.files),
      method: "POST",
      body,
    }),
});
