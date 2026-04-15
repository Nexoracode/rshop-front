import { apiFetch } from "@/lib/api-fetch";
import { mutationOptions } from "@tanstack/react-query";

export const checkPromotion = mutationOptions({
  mutationKey: ["check-promotion"],
  mutationFn: async (body: {
    code: string;
    userId?: number;
    subtotal: number;
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

export const createOrder = mutationOptions({
  mutationFn: async (body: {
    code?: string | null;
    note?: string;
    addressId: number;
    is_gift?: boolean;
    gift_message?: string;
    gift_wrapping_id?: number;
  }) => await apiFetch("/orders/from-card", { method: "POST", body }),
});
