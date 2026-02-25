import React from "react";
import FilterSheet from "./FilterSheet";
import { ProductFilterQuery, ProductFilters } from "@/types";
import FilterPriceRange from "../../Filters/FilterPriceRange";

type Props = {
  filters: ProductFilters;
  query: Omit<ProductFilterQuery, "page" | "sort" | "limit" | "search">;
  handleSetFilter: <K extends keyof ProductFilterQuery["filter"]>(
    key: K,
    value: ProductFilterQuery["filter"][K],
  ) => void;
};

export default function PriceRangeFilter({
  filters,
  query,
  handleSetFilter,
}: Props) {
  return (
    <FilterSheet
      chevren
      isActive={Boolean(
        query?.filter.price_min !== "" || query?.filter.price_max !== "",
      )}
      content={
        <FilterPriceRange
          min={0}
          max={filters.generic.price_range.max}
          value={[
            Number(query?.filter.price_min) || 0,
            Number(query?.filter.price_max) || filters.generic.price_range.max,
          ]}
          onMaxChange={(price) => handleSetFilter("price_max", price)}
          onMinChange={(price) => handleSetFilter("price_min", price)}
        />
      }
      label="محدوده قیمت"
      modalLabel="جستجو بر اساس قیمت"
    />
  );
}
