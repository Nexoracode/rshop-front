"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { memo } from "react";
import Collapsible from "./Collapsible";
import FilterCategories from "./FilterCategories";
import FilterPriceRange from "./FilterPriceRange";
import FilterSwitches from "./FilterSwitches";
import FilterColor from "./FilterColors";
import { ProductFilters } from "@/types";
import useFilters from "../hooks/useFilters";
import { formatToman } from "@/lib/utils/price";

type Props = {
  filters: ProductFilters;
};

function SidebarFiltersComponent({
  filters: {
    attributes,
    generic: { boolean_filter, brands, categories, price_range, special_offer },
  },
}: Props) {
  const {
    handleClearFilters,
    handleSetAttributeQuery,
    handleSetBooleanQuery,
    handleSetFilter,
    query,
  } = useFilters();

  return (
    <Card>
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

        <Collapsible label="دسته بندی">
          <FilterCategories categories={categories} />
        </Collapsible>

        {brands && (
          <Collapsible
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

        <Collapsible
          isSet={!!query.filter.price_max || !!query.filter.price_min}
          text={`از ${formatToman(+query.filter.price_min || price_range.min)} تا ${formatToman(+query.filter.price_max || price_range.max)}`}
          label="محدوده قیمت"
        >
          <FilterPriceRange
            min={price_range.min}
            max={price_range.max}
            value={[
              Number(query?.filter.price_min) || 0,
              Number(query?.filter.price_max) || price_range.max,
            ]}
            onMaxChange={(price) => handleSetFilter("price_max", price)}
            onMinChange={(price) => handleSetFilter("price_min", price)}
          />
        </Collapsible>
        {(
          Object.keys(boolean_filter) as Array<keyof typeof boolean_filter>
        ).map((key) => (
          <FilterSwitches
            checked={Boolean(
              query?.filter.booleanFilters?.find((i) => i.key === key),
            )}
            onCheckedChange={(check) => handleSetBooleanQuery(key, check)}
            key={key}
            toggleId={key}
            label={boolean_filter[key]["label"]}
          />
        ))}

        {attributes &&
          attributes.map((attr) => {
            if (attr.type === "color")
              return (
                <Collapsible key={attr.id} label={attr.name}>
                  <FilterColor
                    value={query?.filter.attributes[attr.id] || []}
                    onChange={(colors) =>
                      handleSetAttributeQuery(String(attr.id), colors)
                    }
                    colors={attr.values}
                    multiple
                  />
                </Collapsible>
              );

            return (
              <Collapsible
                key={attr.id}
                label={attr.name}
                items={attr.values.map((i) => ({
                  label: i.value,
                  value: i.id,
                }))}
                value={query?.filter?.attributes?.[attr.id]}
                onChange={(v) => handleSetAttributeQuery(String(attr.id), v)}
              />
            );
          })}
      </section>
    </Card>
  );
}

const SidebarFilters = memo(SidebarFiltersComponent);

export default SidebarFilters;
