"use client";
import { cn } from "@/lib/utils/classnames";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import SelectableFilter from "./SelectableFilter";

export default function TreeItem({
  label,
  children,
  slug,
  search,
  items,
  value = [],
  onChange = () => {},
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="py-4 border-b">
      <div className="flex justify-between text-sm text-neutral-600 hover:text-primary font-medium">
        {slug ? (
          <Link className="font-semibold" href={slug}>
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
            <span className="font-semibold inline-block flex-1 text-right">
              {label}
            </span>
          )}
          <ChevronLeft
            className={cn(
              open ? "rotate-90" : "-rotate-90",
              "transition-transform",
            )}
            width={22}
            height={22}
          />
        </button>
      </div>

      <div
        className={cn(
          "scale-y-0 h-0 origin-top overflow-y-auto scrollbar-custom max-h-[20rem] transition-all",
          open && "scale-y-100 h-auto mt-3",
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
