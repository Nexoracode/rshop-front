import { ProductFilterQuery } from "@/types";
import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
} from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 6 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;
export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();

    return browserQueryClient;
  }
}

export function serializeFliterQuery(
  queryObj: ProductFilterQuery | null
): string {
  const result = {
    filter: {
      attributes: "",
      brand: "",
      price_max: queryObj?.filter.price_max || "",
      price_min: queryObj?.filter.price_min || "",
      booleanFilters: queryObj?.filter.booleanFilters || [],
    },
  };

  const attributeQuery: Array<string> = [];
  if (queryObj?.filter?.attributes) {
    Object.keys(queryObj?.filter?.attributes).forEach((key) => {
      attributeQuery.push(
        `${key}:${queryObj?.filter.attributes[key].join(",")}`
      );
    });

    result.filter.attributes = attributeQuery.join("|");
  }

  result.filter.brand = queryObj?.filter.brand?.join(",") ?? "";

  const booleanFilters = result.filter.booleanFilters
    ?.filter((i) => i.value === true)
    .map((i) => ({ value: "1", label: `filter[${i.key}]` }));

  const filterStr = [
    { value: result.filter.attributes, label: "filter[attributes]" },
    { value: result.filter.brand, label: "filter[brand]" },
    { value: String(result.filter.price_min), label: "filter[price_min]" },
    { value: String(result.filter.price_max), label: "filter[price_max]" },
    ...booleanFilters,
  ]
    .filter((i) => i.value.trim().length > 0)
    .map((i) => `${i.label}=${i.value}`)
    .join("&");

  return encodeURI(filterStr);
}
