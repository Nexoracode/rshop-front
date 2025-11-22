"use client";
import React from "react";
import { useProductFilter } from "../ProductFilterSidebar/ProductFilterProvider";
import { Switch } from "@/components/ui/switch";
import FilterItem from "./FilterItem";
import CategoryFiltersList from "./CategoryFiltersList";
import PriceRangeFilter from "../ProductFilterSidebar/PriceRangeFilter";
import ColorFilter from "../ProductFilterSidebar/ColorFilter";

export default function FiltersSheetContent() {
  const {
    filters: {
      attributes,
      generic: { boolean_filter, brands, categories, price_range },
    },
    query,
    handleSetBooleanQuery,
    handleSetFilter,
    handleSetAttributeQuery,
  } = useProductFilter();
  return (
    <div>
      <FilterItem
        label="دسته بندی"
        content={<CategoryFiltersList categories={categories} />}
      />

      <FilterItem
        label="برند"
        items={brands.map((b) => ({ label: b.name, value: b.id }))}
      />

      <FilterItem
        label="محدوده قیمت"
        content={
          <PriceRangeFilter
            min={0}
            max={price_range.max}
            value={[
              Number(query?.filter.price_min) || 0,
              Number(query?.filter.price_max) || price_range.max,
            ]}
            onMaxChange={(price) => handleSetFilter("price_max", price)}
            onMinChange={(price) => handleSetFilter("price_min", price)}
          />
        }
      />
      {attributes.map((filter) =>
        filter.type === "color" ? (
          <FilterItem
            label={filter.name}
            key={filter.id}
            content={
              <ColorFilter
                value={query?.filter.attributes[filter.id] || []}
                onChange={(colors) =>
                  handleSetAttributeQuery(String(filter.id), colors)
                }
                colors={filter.values}
                multiple
              />
            }
          />
        ) : (
          <FilterItem
            key={filter.id}
            label={filter.name}
            attrId={filter.id}
            items={filter.values.map((v) => ({ label: v.value, value: v.id }))}
          />
        )
      )}
      {(Object.keys(boolean_filter) as Array<keyof typeof boolean_filter>).map(
        (filter) => (
          <div
            key={filter}
            className="flex justify-between items-center py-3 border-b"
            role="button"
          >
            <span className="text-muted text-sm">
              {boolean_filter[filter].label}
            </span>
            <Switch
              checked={Boolean(
                query?.filter.booleanFilters?.find((i) => i.key === filter)
              )}
              onCheckedChange={(check) => handleSetBooleanQuery(filter, check)}
              id={`toggle-filter-${filter}`}
            />
          </div>
        )
      )}
    </div>
  );
}
