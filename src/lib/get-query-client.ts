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

  return encodeURI(`filter[attributes]=${result.filter.attributes}`);
}
