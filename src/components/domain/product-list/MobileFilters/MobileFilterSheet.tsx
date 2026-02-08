"use client";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { ProductFilterQuery, ProductFilters } from "@/types";
import FilterItem from "./FilterItem";
import CategoryFiltersList from "./CategoryFiltersList";
import FilterPriceRange from "../Filters/FilterPriceRange";
import FilterColor from "../Filters/FilterColors";

type Props = { filters: ProductFilters };
export default function FiltersSheetContent({
  filters: {
    attributes,
    generic: { boolean_filter, brands, categories, price_range, special_offer },
  },
}: Props) {
  const [query, setQuery] = useState<ProductFilterQuery>({
    filter: {
      attributes: {},
      brand: [],
      price_max: "",
      price_min: "",
      booleanFilters: [],
    },
    page: null,
    limit: null,
    sort: null,
    search: "",
  });
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
          <FilterPriceRange
            min={0}
            max={price_range.max}
            value={[
              Number(query?.filter.price_min) || 0,
              Number(query?.filter.price_max) || price_range.max,
            ]}
            onMaxChange={(price) => {}}
            onMinChange={(price) => {}}
          />
        }
      />
      {attributes.map((filter) =>
        filter.type === "color" ? (
          <FilterItem
            label={filter.name}
            key={filter.id}
            content={
              <FilterColor
                value={query?.filter.attributes[filter.id] || []}
                onChange={(colors) => {}}
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
        ),
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
                query?.filter.booleanFilters?.find((i) => i.key === filter),
              )}
              onCheckedChange={(check) => {}}
              id={`toggle-filter-${filter}`}
            />
          </div>
        ),
      )}
    </div>
  );
}
