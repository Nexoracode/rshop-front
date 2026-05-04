import {
  parseQueryParams,
  serializeFilterQuery,
} from "@/lib/utils/serialize-filter";
import { BooleanFilter, BooleanFilterKey, ProductFilterQuery } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Filters = {
  filter: {
    attributes: Record<string, string[]>;
    brand: Array<string>;
    price_max: string | number;
    price_min: string | number;
    booleanFilters: Array<BooleanFilter>;
  };
};
export default function useFilters() {
  const [query, setQuery] = useState<Filters>({
    filter: {
      attributes: {},
      booleanFilters: [],
      brand: [],
      price_max: "",
      price_min: "",
    },
  });
  const params = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const queryString = params.get("query") ?? "";

  useEffect(() => {
    setQuery(parseQueryParams(queryString));
  }, []);

  function handleSetQuery<K extends keyof ProductFilterQuery>(
    key: K,
    value: ProductFilterQuery[K],
  ) {
    const newQuery = { ...query, [key]: value };

    setQuery(newQuery);

    router.push(
      `${pathName}?${serializeFilterQuery(newQuery as ProductFilterQuery)}`,
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
    router.replace(pathName);
  };
  return {
    query,
    handleClearFilters,
    handleSetAttributeQuery,
    handleSetBooleanQuery,
    handleSetFilter,
  };
}
