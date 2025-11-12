import { apiFetch } from "@/lib/api-fetch";
import { Order } from "@/types/order";
import { mutationOptions } from "@tanstack/react-query";

export const createPayment = mutationOptions({
  mutationFn: async (body: { order_id: number; callback: string }) =>
    await apiFetch("/payment/create", { method: "POST", body }),
});

export const verifyPayment = mutationOptions({
  mutationFn: async (body: {
    Authority: string;
    Status: string;
  }): Promise<{
    order: Order;
    message: string;
    status: string;
    success: boolean;
  }> => apiFetch("/payment/verify", { method: "POST", params: body }),
});
