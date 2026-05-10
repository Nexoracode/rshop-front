"use client";

import { sortItems } from "@/data/assets";
import { ArrowDownWideNarrow, CheckCircle2 } from "lucide-react";
import Link from "@/components/shared/Link";
import { useSearchParams } from "next/navigation";
import React from "react";
import TriggerButton from "./TriggerButton";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function ProductSortSheet() {
  const query = useSearchParams().get("query");
  const sortBy = useSearchParams().get("sortBy");
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <TriggerButton label="مرتب سازی" Icon={ArrowDownWideNarrow} />
        </DrawerTrigger>
        <DrawerContent className="px-0" title="مرتب سازی بر اساس">
          <div className="">
            {sortItems.map((item) => (
              <Link
                key={item.value}
                href={{ query: { query, sortBy: item.value } }}
                role="button"
                className="py-3 flex justify-between items-center text-sm  border-b last:border-b-0"
              >
                {item.label}

                {sortBy === item.value && (
                  <CheckCircle2 className="text-primary size-5" />
                )}
              </Link>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
