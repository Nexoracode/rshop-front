"use client";
import React from "react";
import ProductSortSheet from "./ProductSortSheet";
import MobileFilterSheet from "../../MobileFilters/MobileFilterSheet";
import { ProductFilters } from "@/types";
import FilterSheet from "./FilterSheet";
import CategoryFiltersList from "../../MobileFilters/CategoryFiltersList";
import useFilters from "../../hooks/useFilters";
import AttributeFilters from "./AttributeFilters";
import BooleanFilters from "./BooleanFilters";
import PriceRangeFilter from "./PriceRangeFilter";
import BrandFilters from "./BrandFilters";

type Props = {
  filters: ProductFilters;
  totalCount: number;
};

export default function MobileToolbar({ filters, totalCount }: Props) {
  const {
    handleSetFilter,
    handleSetAttributeQuery,
    handleSetBooleanQuery,
    query,
  } = useFilters();
  return (
    <div className="sticky z-40 bg-white py-2 pt-3.5 top-[60px]  w-full flex items-end max-w-full no-scrollbar overflow-x-auto">
      <div className="flex gap-2">
        <ProductSortSheet />

        <MobileFilterSheet filters={filters} totalCount={totalCount} />

        <BrandFilters
          filters={filters}
          handleSetFilter={handleSetFilter}
          query={query}
        />
        <FilterSheet
          chevren
          content={
            <CategoryFiltersList categories={filters.generic.categories} />
          }
          label="دسته بندی"
          modalLabel="جستجو بر اساس دسته بندی"
        />

        <PriceRangeFilter
          filters={filters}
          handleSetFilter={handleSetFilter}
          query={query}
        />

        <AttributeFilters
          filters={filters}
          handleSetAttributeQuery={handleSetAttributeQuery}
          query={query}
        />

        <BooleanFilters
          filters={filters}
          handleSetBooleanQuery={handleSetBooleanQuery}
          query={query}
        />
      </div>
    </div>
  );
}
