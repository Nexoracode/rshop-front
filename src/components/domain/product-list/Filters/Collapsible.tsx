"use client";
import React, { useState } from "react";
import SelectableFilter from "./SelectableFilter";
import { ChevronLeftIcon, DotIcon, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/classnames";
import { Badge } from "@/components/ui/badge";

type TreeItemType = {
  label: string;
  value: string | number;
};
type Props = {
  label: string;
  search?: boolean;
  children?: React.ReactNode;
  slug?: string;
  items?: Array<TreeItemType>;
  value?: Array<string>;
  defaultOpen?: boolean;
  onChange?: (value: Array<string>) => void;
  isSet?: boolean;
  text?: string;
};

export default function Collapsible({
  label,
  children,
  slug,
  search,
  items = [],
  value = [],
  onChange = () => {},
  defaultOpen = false,
  isSet = false,
  text = "",
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="py-4 border-b">
      <div className="flex justify-between text-sm text-neutral-600 hover:text-primary font-medium">
        {slug ? (
          <Link className="font-medium" href={slug}>
            {label}
          </Link>
        ) : null}
        <button
          className={cn(
            "flex cursor-pointer font-medium justify-between",
            !slug && "w-full",
          )}
          onClick={() => setOpen((prev) => !prev)}
        >
          {slug ? null : (
            <span className="font-medium  inline-block flex-1 text-right">
              {label}
              {value.length > 0 || isSet ? (
                <DotIcon className="inline-block" />
              ) : null}
            </span>
          )}
          <ChevronLeftIcon
            className={cn(
              open ? "rotate-90" : "-rotate-90",
              "transition-transform",
            )}
            width={22}
            height={22}
          />
        </button>
      </div>
      <div className="text-xs text-muted-light">{isSet && text}</div>
      {value.length > 0 && (
        <SelectedItems
          onChange={onChange}
          items={items.filter((i) => value.includes(String(i.value)))}
        />
      )}

      <div
        className={cn(
          "scale-y-0 h-0 origin-top overflow-y-auto scrollbar-custom max-h-[20rem] transition-all",
          open && "scale-y-100 py-2 h-auto mt-3",
        )}
      >
        {children}
        {items && (
          <SelectableFilter
            label={label}
            items={items}
            onChange={onChange}
            search={Boolean(search)}
            value={value}
          />
        )}
      </div>
    </div>
  );
}

function SelectedItems({
  items,
  onChange,
}: {
  items: Array<TreeItemType>;
  onChange: (value: Array<string>) => void;
}) {
  const handleDelete = (item: TreeItemType) => {
    const newItems = items
      .filter((i) => i.value !== item.value)
      .map((i) => String(i.value));
    onChange(newItems);
  };
  return (
    <div className="flex flex-wrap gap-0.5 my-2">
      {items.map((i) => (
        <Badge key={i.value} variant={"neutral"}>
          {i.label}

          <button onClick={() => handleDelete(i)}>
            <X className="size-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
}
