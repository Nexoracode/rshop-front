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
import { ArrowDownWideNarrow } from "lucide-react";
import React from "react";

export default function ProductSortSheet() {
  return (
    <Sheet>
      <SheetTrigger>
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
            <SheetClose key={item.key} asChild>
              <div className="py-3 text-sm font-semibold text-neutral-500 border-b last:border-b-0">
                {item.label}
              </div>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
