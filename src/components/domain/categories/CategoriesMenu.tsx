"use client";
import React, { useState } from "react";

import { ChevronLeft } from "lucide-react";
import { Category } from "@/types/product";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { cn } from "@/lib/utils/classnames";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  categories: Array<Category>;
};

export default function CategoriesMenu({ categories }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedCategory =
    categories.find((c) => c.id === selectedId) ?? categories?.[0];

  return (
    <div className="overflow-hidden">
      <div className="relative">
        <div className="w-[90px] pb-20 max-h-full overflow-y-auto absolute top-0 right-0 no-scrollbar">
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
              {cat?.icon?.svg ? (
                <div className="w-full flex items-center justify-center mb-1.5">
                  <div
                    className="[&>svg]:w-6 [&>svg]:h-auto [&>svg]:max-h-6"
                    dangerouslySetInnerHTML={{ __html: cat?.icon?.svg }}
                  />
                </div>
              ) : (
                <Image
                  width={35}
                  height={35}
                  alt=""
                  src={PRODUCT_PLACEHOLDER}
                  className="border rounded-md p-0.5 mb-1.5"
                />
              )}
              <span className="text-xs font-normal text-center inline-block">
                {cat.title}
              </span>
            </div>
          ))}
        </div>
        <div className="ps-[105px] pb-20 h-[768px] overflow-auto no-scrollbar mt-4">
          <Button
            size={"sm"}
            color="info"
            className="px-0 text-xs font-medium"
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
                <AccordionTrigger className="text-xs font-medium">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <div className="flex flex-col items-start flex-grow">
                    {" "}
                    {/* Make this div flexible */}
                    <Button
                      size={"sm"}
                      color="info"
                      className="px-0 text-xs font-medium text-right"
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
                        className="border-b text-muted text-xs rounded-none flex justify-between !py-5 font-medium last:border-b-0"
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
