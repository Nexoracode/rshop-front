"use client";

import { serializeFliterQuery } from "@/lib/get-query-client";
import { BooleanFilterKey, ProductFilterQuery, ProductFilters } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type ListView = "list" | "grid";
type ProductListContextType = {
  filters: ProductFilters;
  query: ProductFilterQuery | null;
  view: ListView;
  setView: (view: ListView) => void;
  handleSetFilter: <K extends keyof ProductFilterQuery["filter"]>(
    key: K,
    value: ProductFilterQuery["filter"][K]
  ) => void;
  handleSetAttributeQuery: (key: string, value: Array<string>) => void;
  handleSetBooleanQuery: (key: BooleanFilterKey, value: boolean) => void;
  handleClearFilters: () => void;
};
const ProductListContext = createContext<ProductListContextType | null>(null);

export const useProductList = () => {
  const ctx = useContext(ProductListContext);

  if (!ctx)
    throw new Error("useProductList must be used within ProductListProvider");

  return ctx;
};
type ProductListProviderProps = {
  filters: ProductFilters;
};

export default function ProductListProvider({
  filters,
  children,
}: PropsWithChildren<ProductListProviderProps>) {
  const [view, setView] = useState<ListView>("grid");
  const [query, setQuery] = useState<ProductFilterQuery | null>(null);
  const router = useRouter();
  const pathName = usePathname();

  function handleSetQuery<T = Array<number>>(key: string, value: T) {
    const newQuery = { ...query, [key]: value };
    console.log({ newQuery });
    setQuery(newQuery as ProductFilterQuery);
    router.push(
      `${pathName}?query=${serializeFliterQuery(
        newQuery as ProductFilterQuery
      )}`
    );
  }

  function handleSetFilter<K extends keyof ProductFilterQuery["filter"]>(
    key: K,
    value: ProductFilterQuery["filter"][K]
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
        : query?.filter.booleanFilters.filter((b) => b.key !== key) ?? [];
    console.log(booleanFilters);
    handleSetFilter("booleanFilters", booleanFilters);
  };

  const handleClearFilters = () => {
    setQuery(null);
    router.push(pathName);
  };

  return (
    <ProductListContext.Provider
      value={{
        filters,
        view,
        setView,
        query,
        handleSetAttributeQuery,
        handleSetFilter,
        handleClearFilters,
        handleSetBooleanQuery,
      }}
    >
      {children}
    </ProductListContext.Provider>
  );
}
