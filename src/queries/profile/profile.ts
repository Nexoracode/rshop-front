import { apiFetch } from "@/lib/api-fetch";
import { getQueryClient } from "@/lib/get-query-client";
import { User } from "@/types/user";
import { mutationOptions, useMutation } from "@tanstack/react-query";

const queryClient = getQueryClient();

export const editProfile = mutationOptions({
  mutationFn: async ({ id, ...body }: Partial<User>) => {
    apiFetch(`/users/${id}`, { body, method: "PATCH" });
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["get-me"] });
  },
});
