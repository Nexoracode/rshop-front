import { apiFetch } from "@/lib/api-fetch";
import { Category } from "@/types/product";
import { queryOptions } from "@tanstack/react-query";

export const getCategoreis = queryOptions({
  queryKey: ["get-categories"],
  queryFn: async (): Promise<Array<Category>> => {
    return await apiFetch("/category/site");
  },
});
//rdit
