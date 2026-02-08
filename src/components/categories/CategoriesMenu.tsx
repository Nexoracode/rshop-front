"use client";
import React, { useState } from "react";
import Image from "../common/Image";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ChevronLeft } from "lucide-react";
import { Category } from "@/types/product";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { cn } from "@/lib/utils/classnames";

type Props = {
  categories: Array<Category>;
};

export default function CategoriesMenu({ categories }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedCategory =
    categories.find((c) => c.id === selectedId) ?? categories?.[0];

  return (
    <div className="overflow-hidden">
      <div className="relative w-full">
        <div className="w-[7.5rem] pb-20 max-h-full overflow-y-auto absolute top-0 right-0 no-scrollbar">
          {categories.map((cat) => (
            <div
              role="button"
              className={cn(
                "flex border-b border-l bg-neutral-100 p-2 gap-1 flex-col items-center",
                selectedCategory?.id === cat.id && "bg-white border-0",
              )}
              key={cat.id}
              onClick={() => setSelectedId(cat.id)}
            >
              <Image
                width={35}
                height={35}
                alt=""
                src={cat.media?.url || PRODUCT_PLACEHOLDER}
                className="border rounded-md p-0.5"
              />
              <span className="text-xs font-light text-center inline-block">
                {cat.title}
              </span>
            </div>
          ))}
        </div>
        <div className="ps-[8.5rem] pb-20 h-[768px] overflow-auto no-scrollbar p-2 px-4">
          <Button
            size={"sm"}
            color="info"
            className="px-0 text-xs font-semibold"
            variant={"text-nohover"}
            endIcon={<ChevronLeft className="size-4" />}
            href={`/products/${selectedCategory?.slug}`}
          >
            همه محصولات {selectedCategory?.title}
          </Button>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            {selectedCategory?.children?.map((item) => (
              <AccordionItem key={`${item.id}`} value={`item-${item.id}`}>
                <AccordionTrigger className="text-xs font-semibold">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <div className="flex flex-col items-start flex-grow">
                    {" "}
                    {/* Make this div flexible */}
                    <Button
                      size={"sm"}
                      color="info"
                      className="px-0 text-xs font-semibold text-right"
                      variant={"text-nohover"}
                      endIcon={<ChevronLeft className="size-4" />}
                      href={`/products/${selectedCategory.slug}/${item.slug}`}
                    >
                      همه محصولات دسته {item.title}
                    </Button>
                    {item.children?.map((subItem) => (
                      <Button
                        key={subItem.id}
                        variant={"text-nohover"}
                        size={"sm"}
                        color="neutral"
                        fullWidth
                        endIcon={<ChevronLeft className="size-4" />}
                        className="border-b text-muted text-xs rounded-none flex justify-between !py-5 font-semibold last:border-b-0"
                        href={`/products/${selectedCategory.slug}/${item.slug}/${subItem.slug}`}
                      >
                        {subItem.title}
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
