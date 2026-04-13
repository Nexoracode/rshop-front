"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useEffect } from "react";
import Collapsible from "./Collapsible";
import FilterCategories from "./FilterCategories";
import FilterPriceRange from "./FilterPriceRange";
import FilterSwitches from "./FilterSwitches";
import FilterColor from "./FilterColors";
import { ProductFilters } from "@/types";
import useFilters from "../hooks/useFilters";
import { formatToman } from "@/lib/utils/price";
import { usePathname } from "next/navigation";

type Props = {
  filters: ProductFilters;
};

function SidebarFiltersComponent({
  filters: {
    attributes,
    generic: { boolean_filter, brands, categories, price_range },
  },
}: Props) {
  const pathName = usePathname();
  const {
    handleClearFilters,
    handleSetAttributeQuery,
    handleSetBooleanQuery,
    handleSetFilter,
    query,
  } = useFilters();

  const {
    attributes: attr,
    booleanFilters,
    brand,
    price_max,
    price_min,
  } = query.filter;

  const hasFilter =
    Object.keys(attr).length > 0 ||
    booleanFilters.length ||
    brand.length ||
    String(price_max).length ||
    String(price_min).length
      ? true
      : false;

  return (
    <Card>
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">فیلترها</h3>
          {hasFilter ? (
            <Button
              onClick={handleClearFilters}
              variant={"text-nohover"}
              size={"sm"}
              className="px-0 text-sm"
              color="info"
            >
              حذف فیلترها
            </Button>
          ) : (
            ""
          )}
        </div>

        <Collapsible label="دسته بندی" activeSeprator defaultOpen={categories.map((cat) => pathName.includes(cat.slug)).length ? true : false}>
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
            defaultOpen={brand.length ? true : false}
          />
        )}

        <Collapsible
          isSet={!!query.filter.price_max || !!query.filter.price_min}
          text={`از ${formatToman(+query.filter.price_min || price_range.min)} تا ${formatToman(+query.filter.price_max || price_range.max)}`}
          label="محدوده قیمت"
          defaultOpen={
            String(price_max).length || String(price_min).length ? true : false
          }
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
        ).map((key, index) => (
          <FilterSwitches
            checked={Boolean(
              query?.filter.booleanFilters?.find((i) => i.key === key),
            )}
            onCheckedChange={(check) => handleSetBooleanQuery(key, check)}
            key={key}
            toggleId={key}
            label={boolean_filter[key]["label"]}
            className={
              !attributes.length &&
              index + 1 === Object.keys(boolean_filter).length
                ? "!border-b-0 !pb-0"
                : ""
            }
          />
        ))}

        {attributes && (
          <>
            {attributes
              .filter((attr) => attr.type === "color")
              .map((attr) => (
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
              ))}
            {attributes
              .filter((attr) => attr.type !== "color")
              .map((attr, index) => {
                const attrLength = attributes.filter(
                  (attr) => attr.type !== "color",
                ).length;
                return (
                  <Collapsible
                    key={attr.id}
                    label={attr.name}
                    items={attr.values.map((i) => ({
                      label: i.value,
                      value: i.id,
                    }))}
                    value={query?.filter?.attributes?.[attr.id]}
                    onChange={(v) =>
                      handleSetAttributeQuery(String(attr.id), v)
                    }
                    activeSeprator={index + 1 === attrLength ? false : true}
                    className={index + 1 === attrLength ? " pt-3" : ""}
                  />
                );
              })}
          </>
        )}
      </section>
    </Card>
  );
}

const SidebarFilters = SidebarFiltersComponent;

export default SidebarFilters;
