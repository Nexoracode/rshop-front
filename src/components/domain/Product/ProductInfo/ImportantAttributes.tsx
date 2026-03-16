"use client";
import { ProductAttribute } from "@/types/product";
import React from "react";
import AttributeLinkButton from "../AttributeLinkButton";
import Responsive from "../../../common/Responsive";
import { Button } from "../../../ui/button";
import { ChevronLeft, ChevronLeftIcon } from "lucide-react";
import useProductInfoDialog from "@/hooks/product/useProductInfoDialog";
import useScrollToSection from "@/hooks/useScrollToSection";

type Props = {
  specifications: Array<ProductAttribute>;
};

export default function ImportantAttributes({ specifications }: Props) {
  const { openDialog } = useProductInfoDialog();
  const { handleScrollTo } = useScrollToSection();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm md:text-base font-semibold">ویژگی ها</p>
        <div className="flex justify-between items-center">
          {/* <Button
          variant={"text-nohover"}
          color="neutral"
          className="px-0"
          size={"sm"}
          onClick={() => openDialog("specifications")}
          endIcon={<ChevronLeft className="size-4" />}
        >
          مشاهده همه
        </Button> */}
          <div
            className="flex cursor-pointer gap-4 justify-between border bg-background border-muted-light/20 rounded-md p-2"
            onClick={() => handleScrollTo("specifications")}
          >
            <p className="text-sm text-muted ">مشاهده همه</p>
            <ChevronLeftIcon strokeWidth={2} className="size-4" />
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex md:grid md:w-full gap-2 md:grid-cols-3">
          {specifications.map((attr) => (
            <div
              key={attr.id}
              className="flex flex-col flex-1 gap-1 md:gap-2 border border-neutral-200 !h-[89.5px] md:bg-slate-50 min-w-fit md:min-w-[calc(33.333%)] rounded-lg p-3"
            >
              <p className="text-[13px] text-slate-800 -mb-1"> {attr.name}</p>

              <p className="text-[13px] leading-5 text-slate-600">
                {attr.values.map((i) => i.value).join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* <Responsive visible="desktop">
        <AttributeLinkButton />
      </Responsive> */}
    </div>
  );
}
