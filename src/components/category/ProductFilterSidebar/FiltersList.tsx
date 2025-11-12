import React from "react";
import TreeItem from "./TreeSection";
import { Button } from "@/components/ui/button";
import PriceRangeFilter from "./PriceRangeFilter";
import ColorFilter from "./ColorFilter";
import ToggleFilter from "./ToggleFilter";
import { useProductList } from "../ProductListProvider";

export default function FiltersList() {
  const {
    filters: {
      attributes,
      generic: { brands, special_offer, price_range },
    },
    query,
    handleSetAttributeQuery,
  } = useProductList();
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-primary font-semibold">فیلترها</h3>

        <Button variant={"text"} size={"sm"} className="px-0" color="danger">
          حذف فیلترها
        </Button>
      </div>
      <TreeItem
        items={brands.map((i) => ({
          label: i.name,
          value: i.id,
        }))}
        search
        label="برند"
      />

      <TreeItem label="قیمت">
        <PriceRangeFilter min={price_range.min} max={price_range.max} />
      </TreeItem>
      {special_offer && <ToggleFilter label={special_offer.label} />}

      {attributes.map((attr) => {
        if (attr.type === "color")
          return (
            <TreeItem key={attr.id} label={attr.name}>
              <ColorFilter colors={attr.values} multiple />
            </TreeItem>
          );

        return (
          <TreeItem
            key={attr.id}
            label={attr.name}
            items={attr.values.map((i) => ({ label: i.value, value: i.id }))}
            value={query?.filter.attributes[attr.id]}
            onChange={(v) => handleSetAttributeQuery(String(attr.id), v)}
          />
        );
      })}
    </section>
  );
}
