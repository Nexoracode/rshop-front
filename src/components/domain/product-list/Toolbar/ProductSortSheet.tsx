"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sortItems } from "@/data/assets";
import { ArrowDownWideNarrow, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function ProductSortSheet() {
  const query = useSearchParams().get("query");
  const sortBy = useSearchParams().get("sortBy");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          color="neutral"
          className="px-2"
          rounded={"full"}
          startIcon={<ArrowDownWideNarrow className="size-5" />}
        >
          مرتب سازی
        </Button>
      </SheetTrigger>

      <SheetContent className="gap-0" side="bottom">
        <SheetHeader>
          <SheetTitle>مرتب سازی</SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-6">
          {sortItems.map((item) => (
            <SheetClose key={item.label} asChild>
              <Link
                href={{ query: { query, sortBy: item.value } }}
                role="button"
                className="py-3 flex justify-between items-center text-sm font-semibold text-neutral-500 border-b last:border-b-0"
              >
                {item.label}

                {sortBy === item.value && (
                  <CheckCircle2 className="text-primary size-5" />
                )}
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
