"use client";

import { serializeFliterQuery } from "@/lib/get-query-client";
import { BooleanFilterKey, ProductFilterQuery, ProductFilters } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext, useState } from "react";

const initialQuery: ProductFilterQuery = {
  filter: {
    attributes: {},
    brand: [],
    price_max: "",
    price_min: "",
    booleanFilters: [],
  },
  page: null,
  limit: null,
  sort: null,
  search: "",
};
type ProductListContextType = {
  filters: ProductFilters;
  query: ProductFilterQuery | null;
  handleSetFilter: <K extends keyof ProductFilterQuery["filter"]>(
    key: K,
    value: ProductFilterQuery["filter"][K],
  ) => void;
  handleSetAttributeQuery: (key: string, value: Array<string>) => void;
  handleSetQuery: <K extends keyof ProductFilterQuery>(
    key: K,
    value: ProductFilterQuery[K],
  ) => void;
  handleSetBooleanQuery: (key: BooleanFilterKey, value: boolean) => void;
  handleClearFilters: () => void;
};
const ProductListContext = createContext<ProductListContextType | null>(null);

export const useProductFilter = () => {
  const ctx = useContext(ProductListContext);

  if (!ctx)
    throw new Error("useProductList must be used within ProductListProvider");

  return ctx;
};
type ProductListProviderProps = {
  filters: ProductFilters;
};

export default function ProductFilterProvider({
  filters,
  children,
}: PropsWithChildren<ProductListProviderProps>) {
  const [query, setQuery] = useState<ProductFilterQuery>(initialQuery);
  const router = useRouter();
  const pathName = usePathname();

  function handleSetQuery<K extends keyof ProductFilterQuery>(
    key: K,
    value: ProductFilterQuery[K],
  ) {
    const newQuery = { ...query, [key]: value };
    setQuery(newQuery as ProductFilterQuery);
    router.push(
      `${pathName}?${serializeFliterQuery(newQuery as ProductFilterQuery)}`,
    );
  }

  function handleSetFilter<K extends keyof ProductFilterQuery["filter"]>(
    key: K,
    value: ProductFilterQuery["filter"][K],
  ) {
    handleSetQuery("filter", { ...query?.filter, [key]: value });
  }

  const handleSetAttributeQuery = (key: string, value: Array<string>) => {
    const attributes = { ...query?.filter.attributes, [key]: value };
    handleSetFilter("attributes", attributes);
  };

  const handleSetBooleanQuery = (key: BooleanFilterKey, value: boolean) => {
    const booleanFilters =
      value === true
        ? [...(query?.filter.booleanFilters ?? []), { key, value: true }]
        : (query?.filter.booleanFilters.filter((b) => b.key !== key) ?? []);
    handleSetFilter("booleanFilters", booleanFilters);
  };

  const handleClearFilters = () => {
    setQuery(initialQuery);
    router.push(pathName);
  };

  return (
    <ProductListContext.Provider
      value={{
        filters,
        query,
        handleSetAttributeQuery,
        handleSetFilter,
        handleClearFilters,
        handleSetBooleanQuery,
        handleSetQuery,
      }}
    >
      {children}
    </ProductListContext.Provider>
  );
}
