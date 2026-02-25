import React from "react";
import FilterSheet from "./FilterSheet";
import { ProductFilterQuery, ProductFilters } from "@/types";
import SelectableFilter from "../../Filters/SelectableFilter";

type Props = {
  filters: ProductFilters;
  query: Omit<ProductFilterQuery, "page" | "sort" | "limit" | "search">;
  handleSetFilter: <K extends keyof ProductFilterQuery["filter"]>(
    key: K,
    value: ProductFilterQuery["filter"][K],
  ) => void;
};

export default function BrandFilters({
  filters,
  query,
  handleSetFilter,
}: Props) {
  return (
    <FilterSheet
      chevren
      isActive={Boolean(query?.filter.brand?.length)}
      content={
        <SelectableFilter
          items={filters.generic.brands.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          label={"برند"}
          search={filters.generic.brands.length > 10}
          value={query?.filter?.brand ?? []}
          onChange={(value) => handleSetFilter("brand", value)}
        />
      }
      label="برند"
      modalLabel="فیلتر بر اساس برند"
    />
  );
}
