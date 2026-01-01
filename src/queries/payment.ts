import { apiFetch } from "@/lib/api-fetch";
import { Payment, VerifyOrder } from "@/types/order";
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
    order: VerifyOrder;
    payment: Payment;
    message: string;
    status: string;
    success: boolean;
    ref_id: string;
    invoice_date: string;
    code: number;
  }> => apiFetch("/payment/verify", { method: "POST", params: body }),
});
