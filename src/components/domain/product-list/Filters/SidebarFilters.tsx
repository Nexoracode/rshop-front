"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BooleanFilterKey, ProductFilterQuery, ProductFilters } from "@/types";
import React, { useState } from "react";
import Collapsible from "./Collapsible";
import FilterCategories from "./FilterCategories";
import FilterPriceRange from "./FilterPriceRange";
import FilterSwitches from "./FilterSwitches";
import FilterColor from "./FilterColors";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { serializeQuery } from "@/lib/utils/serialize-general";
import { serializeFilterQuery } from "@/lib/utils/serialize-filter";

type Props = {
  filters: ProductFilters;
};

const initialQuery = {
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
};
export default function SidebarFilters({
  filters: {
    attributes,
    generic: { boolean_filter, brands, categories, price_range, special_offer },
  },
}: Props) {
  const [query, setQuery] = useState<ProductFilterQuery>(initialQuery);

  const router = useRouter();
  const pathName = usePathname();

  function handleSetQuery<K extends keyof ProductFilterQuery>(
    key: K,
    value: ProductFilterQuery[K],
  ) {
    const newQuery = { ...query, [key]: value };
    console.log({ newQuery });
    setQuery(newQuery as ProductFilterQuery);
    router.push(
      `${pathName}?${serializeFilterQuery(newQuery as ProductFilterQuery)}`,
    );
  }

  function handleSetFilter<K extends keyof ProductFilterQuery["filter"]>(
    key: K,
    value: ProductFilterQuery["filter"][K],
  ) {
    console.log({ key, value });
    handleSetQuery("filter", { ...query?.filter, [key]: value });
  }

  const handleSetAttributeQuery = (key: string, value: Array<string>) => {
    const attributes = { ...query?.filter.attributes, [key]: value };
    handleSetFilter("attributes", attributes);
  };

  const handleSetBooleanQuery = (key: BooleanFilterKey, value: boolean) => {
    const booleanFilters =
      value === true
        ? [...(query?.filter.booleanFilters ?? []), { key, value: true }]
        : (query?.filter.booleanFilters.filter((b) => b.key !== key) ?? []);
    handleSetFilter("booleanFilters", booleanFilters);
  };

  const handleClearFilters = () => {
    setQuery(initialQuery);
    router.replace(pathName);
  };
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

        <Collapsible label="قیمت">
          <FilterPriceRange
            min={0}
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
