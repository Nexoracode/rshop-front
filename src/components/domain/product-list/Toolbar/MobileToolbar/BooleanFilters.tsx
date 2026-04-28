import React from "react";
import TriggerButton from "./TriggerButton";
import { BooleanFilterKey, ProductFilterQuery, ProductFilters } from "@/types";

type Props = {
  filters: ProductFilters;
  query: Omit<ProductFilterQuery, "page" | "sort" | "limit" | "search">;
  handleSetBooleanQuery: (key: BooleanFilterKey, value: boolean) => void;
};

export default function BooleanFilters({
  query,
  filters,
  handleSetBooleanQuery,
}: Props) {
  return (
    Object.keys(filters.generic.boolean_filter) as Array<
      keyof typeof filters.generic.boolean_filter
    >
  ).map((filter) => (
    <TriggerButton
      key={filter}
      isActive={Boolean(
        query?.filter.booleanFilters?.find((i) => i.key === filter),
      )}
      onClick={() => {
        handleSetBooleanQuery(
          filter,
          Boolean(!query?.filter.booleanFilters?.find((i) => i.key === filter)),
        );
      }}
      label={filters.generic.boolean_filter[filter].label}
    />
  ));
}
