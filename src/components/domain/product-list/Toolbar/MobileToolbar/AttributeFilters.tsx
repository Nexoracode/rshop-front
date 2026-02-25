import { ProductFilterQuery, ProductFilters } from "@/types";
import React from "react";
import FilterSheet from "./FilterSheet";
import SelectableFilter from "../../Filters/SelectableFilter";
import FilterColor from "../../Filters/FilterColors";

type Props = {
  filters: ProductFilters;
  query: Omit<ProductFilterQuery, "page" | "sort" | "limit" | "search">;
  handleSetAttributeQuery: (attributeId: string, value: string[]) => void;
};

export default function AttributeFilters({
  filters,
  query,
  handleSetAttributeQuery,
}: Props) {
  return filters.attributes?.map((attr) => (
    <FilterSheet
      chevren
      label={attr.name}
      modalLabel={`فیلتر بر اساس ${attr.name}`}
      key={attr.id}
      isActive={Boolean(query?.filter.attributes?.[attr.id]?.length)}
      content={
        attr.type === "color" ? (
          <FilterColor
            value={query?.filter.attributes[attr.id] || []}
            onChange={(colors) =>
              handleSetAttributeQuery(String(attr.id), colors)
            }
            colors={attr.values}
            multiple
          />
        ) : (
          <SelectableFilter
            search={attr.values.length > 10}
            key={attr.id}
            label={attr.name}
            items={attr.values.map((v) => ({
              label: v.value,
              value: v.id,
            }))}
            value={query?.filter?.attributes?.[attr.id]}
            onChange={(v) => handleSetAttributeQuery(String(attr.id), v)}
          />
        )
      }
    />
  ));
}
