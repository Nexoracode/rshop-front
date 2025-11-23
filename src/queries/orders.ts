import useCurrentUser from "@/hooks/useCurrentUser";
import { apiFetch } from "@/lib/api-fetch";
import { getQueryClient } from "@/lib/get-query-client";
import { PaymentMethod } from "@/types";
import { Order } from "@/types/order";
import { UserAddress } from "@/types/user";
import {
  mutationOptions,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { getCart } from "./cart";

const queryClient = getQueryClient();

type OrderMeta = {
  address: UserAddress | null;
  payment_method: PaymentMethod;
  note: string;
  code: string;
};
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
      code: "",
      note: "",
      payment_method: "zarinpal",
    },
  initialData: {
    address: null,
    code: "",
    note: "",
    payment_method: "zarinpal",
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
  }) => await apiFetch("/orders/from-card", { method: "POST", body }),
});

export const getOrders = queryOptions({
  queryKey: ["get-orders"],
  queryFn: async (): Promise<Array<Order>> => {
    return await apiFetch("/orders/all/me", { method: "POST" });
  },
});

export const getOrderDetails = (orderId: number) =>
  queryOptions({
    queryKey: ["get-order-details", orderId],
    queryFn: async ({ queryKey }): Promise<Order> => {
      const [, orderId] = queryKey;
      return await apiFetch(`/orders/${orderId}`);
    },
    enabled: Boolean(orderId),
  });

export const checkPromotion = mutationOptions({
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
  }) => await apiFetch("/promotions/check", { method: "POST", body }),
});
export function useCheckout() {
  const { mutate } = useMutation(setOrderMeta);
  const { data: orderMeta } = useQuery(getOrderMeta);

  const handleSetOrderMeta = (meta: Partial<OrderMeta>) => {
    mutate({
      ...orderMeta,
      ...meta,
    });
  };

  return {
    orderMeta,
    handleSetOrderMeta,
  };
}

export function useCheckPromotion() {
  const { mutate, isPending } = useMutation(checkPromotion);
  const currentUser = useCurrentUser();
  const { data } = useQuery(getCart);
  const handleCheck = (code = "") => {
    mutate({
      code,
      userId: currentUser.user?.id || 0,
      items:
        data?.items.map((item) => ({
          categoryId: item.product.category_id,
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: Number(item.unit_price),
          variantId: item.variant?.id ?? 0,
        })) ?? [],
      subtotal: data?.subtotal || 0,
      shippingCost: 0,
      isFirstOrder: true,
    });
  };

  return { handleCheck, isPending };
}
