"use client";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { ProductFilters } from "@/types";
import FilterItem from "./FilterItem";
import CategoryFiltersList from "./CategoryFiltersList";
import FilterPriceRange from "../Filters/FilterPriceRange";
import FilterColor from "../Filters/FilterColors";
import BaseDialog from "@/components/common/BaseDialog";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import useFilters from "../hooks/useFilters";
import { SlidersHorizontalIcon } from "lucide-react";
import TriggerButton from "../Toolbar/MobileToolbar/TriggerButton";

type Props = { filters: ProductFilters; totalCount: number };
export default function MobileFilterSheet({ filters, totalCount }: Props) {
  const [open, setOpen] = useState(false);
  const {
    attributes,
    generic: { boolean_filter, brands, categories, price_range },
  } = filters ?? { attributes: {} };

  const {
    handleClearFilters,
    handleSetAttributeQuery,
    handleSetBooleanQuery,
    handleSetFilter,
    query,
  } = useFilters();
  const hasAnyFilter =
    Object.keys(query.filter.attributes).length +
    query.filter.brand.length +
    query.filter.booleanFilters.length +
    (query.filter.price_min !== "" || query.filter.price_max !== "" ? 1 : 0);
  return (
    <div>
      <TriggerButton
        isActive={!!hasAnyFilter}
        displayBadge={hasAnyFilter}
        label="فیلتر ها"
        Icon={SlidersHorizontalIcon}
        onClick={() => setOpen(true)}
      />
      <BaseDialog
        open={open}
        onOpenChange={setOpen}
        title="فیلترها"
        content={
          <div>
            <FilterItem
              label="دسته بندی"
              content={<CategoryFiltersList categories={categories} />}
            />

            {brands ? (
              <FilterItem
                label="برند"
                items={brands.map((b) => ({ label: b.name, value: b.id }))}
                value={query.filter.brand}
                onChange={(v) => handleSetFilter("brand", v)}
              />
            ) : (
              ""
            )}

            <FilterItem
              label="محدوده قیمت"
              isActive={
                Boolean(query?.filter.price_min) ||
                Boolean(query?.filter.price_max)
              }
              content={
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
              }
            />
            {attributes?.map((attr) =>
              attr.type === "color" ? (
                <FilterItem
                  label={attr.name}
                  key={attr.id}
                  isActive={Boolean(
                    query?.filter.attributes?.[attr.id]?.length,
                  )}
                  content={
                    <FilterColor
                      value={query?.filter.attributes[attr.id] || []}
                      onChange={(colors) =>
                        handleSetAttributeQuery(String(attr.id), colors)
                      }
                      colors={attr.values}
                      multiple
                    />
                  }
                />
              ) : (
                <FilterItem
                  key={attr.id}
                  label={attr.name}
                  attrId={attr.id}
                  items={attr.values.map((v) => ({
                    label: v.value,
                    value: v.id,
                  }))}
                  value={query?.filter?.attributes?.[attr.id]}
                  onChange={(v) => handleSetAttributeQuery(String(attr.id), v)}
                />
              ),
            )}
            {(
              Object.keys(boolean_filter) as Array<keyof typeof boolean_filter>
            ).map((filter) => (
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
                  onCheckedChange={(check) =>
                    handleSetBooleanQuery(filter, check)
                  }
                  id={`toggle-filter-${filter}`}
                />
              </div>
            ))}

            <div className="absolute z-40 bg-white items-center flex gap-4 bottom-0 border-t shadow-2xl left-0 right-0 p-4">
              <SheetClose asChild>
                <Button className="w-full flex-1">
                  مشاهده {totalCount.toLocaleString("fa-IR")} کالا
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  onClick={handleClearFilters}
                  variant={"text-nohover"}
                  color="danger"
                  size={"sm"}
                >
                  حذف فیلتر ها
                </Button>
              </SheetClose>
            </div>
          </div>
        }
      />
    </div>
  );
}
