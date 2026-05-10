"use client";

import React, { useState } from "react";
import SelectableFilter from "./SelectableFilter";
import { ChevronLeftIcon, DotIcon, X } from "lucide-react";
import Link from "@/components/shared/Link";
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
  activeSeprator?: boolean;
  className?: string;
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
  activeSeprator = true,
  className,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`${activeSeprator ? "border-b border-[#f2f2f2] py-4" : ""} ${className}`}
    >
      <div className="flex justify-between text-sm text-neutral-600 font-medium">
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
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          {slug ? null : (
            <span className="text-gray-800 text-[15px] inline-block flex-1 text-right">
              {label}
              {value.length > 0 || isSet ? (
                <DotIcon className="inline-block" />
              ) : null}
            </span>
          )}

          <ChevronLeftIcon
            className={cn(
              open ? "rotate-90" : "-rotate-90",
              "transition-transform text-slate-500",
            )}
            width={18}
            height={18}
          />
        </button>
      </div>
      {isSet ? (
        <div className="text-xs text-muted-light mt-1.5">{text}</div>
      ) : (
        ""
      )}
      {value.length > 0 && (
        <SelectedItems
          onChange={onChange}
          items={items.filter((i) => value.includes(String(i.value)))}
        />
      )}

      <div
        className={cn(
          "h-0 scale-y-0 origin-top flex flex-col transition-all",
          open && "h-full scale-y-100",
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
    <div className="flex flex-wrap gap-2 my-2">
      {items.map((i) => (
        <Badge
          key={i.value}
          className="flex items-center gap-3 bg-slate-100 p-1 px-2"
        >
          <span>{i.label}</span>

          <button onClick={() => handleDelete(i)}>
            <X className="size-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
}
