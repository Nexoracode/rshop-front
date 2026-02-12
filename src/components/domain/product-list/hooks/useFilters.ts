import {
  parseQueryParams,
  serializeFilterQuery,
} from "@/lib/utils/serialize-filter";
import { BooleanFilterKey, ProductFilterQuery } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useFilters() {
  const params = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const queryString = params.get("query") ?? "";

  const query = parseQueryParams(queryString);

  function handleSetQuery<K extends keyof ProductFilterQuery>(
    key: K,
    value: ProductFilterQuery[K],
  ) {
    const newQuery = { ...query, [key]: value };
    router.push(
      `${pathName}?${serializeFilterQuery(newQuery as ProductFilterQuery)}`,
    );
  }

  function handleSetFilter<K extends keyof ProductFilterQuery["filter"]>(
    key: K,
    value: ProductFilterQuery["filter"][K],
  ) {
    console.log({ key, value });
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
