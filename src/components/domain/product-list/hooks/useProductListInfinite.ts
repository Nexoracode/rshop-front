import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";

type Props = {
  type: "all" | "category" | "slug";
  slug?: string;
};

export default function useProductListInfinite({ type, slug }: Props) {
  const queryKey = useMemo(() => ["product-list"], [type, slug]);
  const query = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      // TODO : fetch products with page param
    },
  });
}
