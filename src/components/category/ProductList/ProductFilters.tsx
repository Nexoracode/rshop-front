import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal, X } from "lucide-react";
import React from "react";
import FiltersSheetContent from "./FiltersSheetContent";
import { useProductFilter } from "../ProductFilterSidebar/ProductFilterProvider";

export default function ProductFilters({
  total_items,
}: {
  total_items: number;
}) {
  const { handleClearFilters } = useProductFilter();
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size={"sm"}
            variant={"outline"}
            color="neutral"
            rounded={"full"}
            startIcon={<SlidersHorizontal size={14} />}
          >
            فیلتر
          </Button>
        </SheetTrigger>

        <SheetContent className="h-[100dvh]" side="bottom" hiddenClose>
          <SheetTitle className="hidden"></SheetTitle>
          <SheetClose asChild className="w-fit">
            <Button startIcon={<X />} variant={"text"} color="neutral">
              فیلترها
            </Button>
          </SheetClose>

          <div className="h-full relative overflow-hidden">
            <div className="overflow-hidden h-full pb-[5rem]">
              <div className="h-full p-3 overflow-y-auto">
                <FiltersSheetContent />
              </div>
            </div>

            <div className="absolute z-40 bg-white items-center flex gap-4 bottom-0 border-t shadow-2xl left-0 right-0 p-4">
              <SheetClose asChild>
                <Button className="w-full flex-1">
                  مشاهده {total_items.toLocaleString("fa-IR")} کالا
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
        </SheetContent>
      </Sheet>
    </div>
  );
}
