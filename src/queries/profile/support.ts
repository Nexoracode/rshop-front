import { apiFetch } from "@/lib/api-fetch";
import { getQueryClient } from "@/lib/utils/query-client";
import { Ticket } from "@/types/user";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const queryClient = getQueryClient();

export const getSupportTickets = queryOptions({
  queryKey: ["get-support-tickets"],
  queryFn: async (): Promise<Array<Ticket>> => {
    return await apiFetch("/profile/support");
  },
});

export const createSupportTicket = mutationOptions({
  mutationFn: async (body: {
    subject: string;
    content: string;
  }): Promise<Ticket> => {
    return await apiFetch("/profile/support", {
      method: "POST",
      body,
    });
  },
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ["get-support-tickets"] });
  },
});

export const createProductSupportTicket = mutationOptions({
  mutationFn: async (body: {
    productId: number;
    subject: string;
    message: string;
  }): Promise<Ticket> => {
    return await apiFetch("/profile/support/product", {
      method: "POST",
      body,
    });
  },
  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: ["get-support-tickets"],
    });
  },
});

export const getSupportTicket = (ticketId: number | string | null) =>
  queryOptions({
    queryKey: ["get-support-ticket", Number(ticketId)],
    queryFn: async (): Promise<Ticket> => {
      return await apiFetch(`/profile/support/${ticketId}`);
    },
    enabled: Boolean(ticketId),
  });

export const replyToSupportTicket = mutationOptions({
  mutationFn: async (body: { supportId: number; content: string }) => {
    return await apiFetch(`/profile/support/message`, {
      method: "POST",
      body,
    });
  },
  onSuccess: async (_data, { supportId }) => {
    await queryClient.invalidateQueries({
      queryKey: ["get-support-ticket", supportId],
    });
  },
});

export const closeSupportTicket = mutationOptions({
  mutationFn: async (ticketId: number) => {
    return await apiFetch(`/profile/support/${ticketId}/close`, {
      method: "POST",
    });
  },
  onSuccess: async (_data, supportId) => {
    await queryClient.invalidateQueries({
      queryKey: ["get-support-ticket", supportId],
    });
  },
});
