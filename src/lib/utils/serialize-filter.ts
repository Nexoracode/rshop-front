import type { ProductFilterQuery } from "@/types";

export function serializeFilterQuery(
  queryObj: ProductFilterQuery | null | undefined,
): string {
  if (!queryObj?.filter) return "";

  const filter = queryObj.filter;

  // attributes → color:red,blue|size:XL,XXL
  const attributeParts: string[] = [];
  if (filter.attributes) {
    Object.entries(filter.attributes).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        attributeParts.push(`${key}:${values.join(",")}`);
      }
    });
  }
  const attributesStr = attributeParts.join("|");

  // brands
  const brandStr = filter.brand?.filter(Boolean).join(",") ?? "";

  // boolean filters (فقط true)
  const booleanParts = (filter.booleanFilters || [])
    .filter((f) => f.value === true)
    .map((f) => `filter[${f.key}]=1`);

  // price range
  const priceParts: string[] = [];
  if (filter.price_min !== "") {
    priceParts.push(`filter[price_min]=${filter.price_min}`);
  }
  if (filter.price_max !== "") {
    priceParts.push(`filter[price_max]=${filter.price_max}`);
  }

  const allParts = [
    attributesStr && `filter[attributes]=${attributesStr}`,
    brandStr && `filter[brand]=${brandStr}`,
    ...priceParts,
    ...booleanParts,
  ].filter(Boolean);

  if (allParts.length === 0) return "";

  const queryString = allParts.join("&");
  return `query=${encodeURIComponent(queryString)}`;
}

export const parseQueryParams = (query: string) => {
  const queryParts = query.split("&");
  const filter: ProductFilterQuery["filter"] = {
    attributes: {},
    brand: [],
    price_max: "",
    price_min: "",
    booleanFilters: [],
  };

  queryParts.forEach((part) => {
    const [key, value] = part.split("=");
    if (key.startsWith("filter[attributes]")) {
      const attrs = value.split("|");
      attrs.forEach((attr) => {
        const [attrKey, attrValues] = attr.split(":");
        if (attrKey && attrValues) {
          filter.attributes[attrKey] = attrValues.split(",");
        }
      });
    }

    if (key === "filter[brand]") {
      filter.brand = value.split(",");
    }

    if (key === "filter[price_min]") {
      filter.price_min = value;
    }
    if (key === "filter[price_max]") {
      filter.price_max = value;
    }

    if (key === "filter[special_offer]") {
      filter.booleanFilters.push({
        key: "special_offer",
        value: Boolean(Number(value)),
      });
    }
    if (key === "filter[discounted]") {
      filter.booleanFilters.push({
        key: "discounted",
        value: Boolean(Number(value)),
      });
    }
    if (key === "filter[in_stock]") {
      filter.booleanFilters.push({
        key: "in_stock",
        value: Boolean(Number(value)),
      });
    }
    if (key === "filter[same_day_shipping]") {
      filter.booleanFilters.push({
        key: "same_day_shipping",
        value: Boolean(Number(value)),
      });
    }
  });

  return { filter };
};
