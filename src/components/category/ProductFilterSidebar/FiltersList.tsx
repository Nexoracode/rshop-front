"use client";
import React from "react";
import TreeItem from "./TreeSection";
import { Button } from "@/components/ui/button";
import PriceRangeFilter from "./PriceRangeFilter";
import ColorFilter from "./ColorFilter";
import ToggleFilter from "./ToggleFilter";
import { useProductFilter } from "./ProductFilterProvider";
import FilterByCategory from "./FilterByCategory";

export default function FiltersList() {
  const {
    filters: {
      attributes,
      generic: { brands, price_range, boolean_filter },
    },
    query,
    handleSetAttributeQuery,
    handleSetFilter,
    handleClearFilters,
    handleSetBooleanQuery,
  } = useProductFilter();
  return (
    <section>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">فیلترها</h3>

        <Button
          onClick={handleClearFilters}
          variant={"text-nohover"}
          size={"sm"}
          className="px-0"
          color="danger"
        >
          حذف فیلترها
        </Button>
      </div>

      <TreeItem label="دسته بندی">
        <FilterByCategory />
      </TreeItem>

      {brands && (
        <TreeItem
          items={brands.map((i) => ({
            label: i.name,
            value: i.id,
          }))}
          search
          label="برند"
          value={query?.filter.brand}
          onChange={(v) => handleSetFilter("brand", v)}
        />
      )}

      <TreeItem label="قیمت">
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
      </TreeItem>
      {(Object.keys(boolean_filter) as Array<keyof typeof boolean_filter>).map(
        (key) => (
          <ToggleFilter
            checked={Boolean(
              query?.filter.booleanFilters?.find((i) => i.key === key),
            )}
            onCheckedChange={(check) => handleSetBooleanQuery(key, check)}
            key={key}
            toggleId={key}
            label={boolean_filter[key]["label"]}
          />
        ),
      )}

      {attributes &&
        attributes.map((attr) => {
          if (attr.type === "color")
            return (
              <TreeItem key={attr.id} label={attr.name}>
                <ColorFilter
                  value={query?.filter.attributes[attr.id] || []}
                  onChange={(colors) =>
                    handleSetAttributeQuery(String(attr.id), colors)
                  }
                  colors={attr.values}
                  multiple
                />
              </TreeItem>
            );

          return (
            <TreeItem
              key={attr.id}
              label={attr.name}
              items={attr.values.map((i) => ({ label: i.value, value: i.id }))}
              value={query?.filter?.attributes?.[attr.id]}
              onChange={(v) => handleSetAttributeQuery(String(attr.id), v)}
            />
          );
        })}
    </section>
  );
}
