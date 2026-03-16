"use client";
import { ProductAttribute } from "@/types/product";
import React from "react";
import AttributeLinkButton from "../AttributeLinkButton";
import Responsive from "../../../common/Responsive";
import { Button } from "../../../ui/button";
import { ChevronLeft } from "lucide-react";
import useProductInfoDialog from "@/hooks/product/useProductInfoDialog";

type Props = {
  specifications: Array<ProductAttribute>;
};

export default function ImportantAttributes({ specifications }: Props) {
  const { openDialog } = useProductInfoDialog();
  return (
    <div className="space-y-4">
      <p className="text-sm md:text-base font-semibold">ویژگی ها</p>
      <div className="flex justify-between items-center md:hidden py-7">
        <Button
          variant={"text-nohover"}
          color="neutral"
          className="px-0"
          size={"sm"}
          onClick={() => openDialog("specifications")}
          endIcon={<ChevronLeft className="size-4" />}
        >
          مشاهده همه
        </Button>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex md:grid md:w-full gap-2 md:grid-cols-3">
          {specifications.map((attr) => (
            <div
              key={attr.id}
              className="flex flex-col flex-1 gap-1 md:gap-2 border border-neutral-200 md:bg-slate-50 min-w-fit md:min-w-[calc(33.333%)] rounded-lg p-3"
            >
              <p className="text-[13px] text-slate-800 -mb-1"> {attr.name}</p>

              <p className="text-[13px] leading-5 text-slate-600">
                {attr.values.map((i) => i.value).join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Responsive visible="desktop">
        <AttributeLinkButton />
      </Responsive>
    </div>
  );
}
