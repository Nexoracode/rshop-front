import { apiFetch } from "@/lib/api-fetch";
import { mutationOptions } from "@tanstack/react-query";

export const createPayment = mutationOptions({
  mutationFn: async (body: { order_id: number; callback: string }) =>
    await apiFetch("/payment/create", { method: "POST", body }),
});
