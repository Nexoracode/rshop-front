"use client";
import { categories } from "@/__MOCK__/catalog";
import PageLoader from "@/components/common/PageLoader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PRODUCT_PLACEHOLDER } from "@/data/assets";
import { cn } from "@/lib/utils";
import { getCategoreis } from "@/queries/categoreis";
import { Category } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function CategoriesPage() {
  const { data, isFetching } = useQuery(getCategoreis);
  const [category, setCategory] = useState<Category | null>(null);

  const selectedCategory = category || data?.[1];
  return isFetching ? (
    <PageLoader />
  ) : (
    <div className="flex fixed top-0 right-0 w-full h-full bg-white z-40 pt-18">
      <div className="w-[120px] h-full overflow-y-auto pb-16 no-scrollbar">
        {categories.map((cat) => (
          <div
            role="button"
            className={cn(
              "flex border-b border-l  bg-neutral-100 p-2 gap-1 flex-col items-center",
              selectedCategory?.id === cat.id && "bg-white border-0"
            )}
            key={cat.id}
            onClick={() => setCategory(cat)}
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
      <div className="flex-1 p-2 px-4">
        <Button
          size={"sm"}
          color="info"
          className="px-0"
          variant={"text-nohover"}
          endIcon={<ChevronLeft className="size-4" />}
          href={`/collection/${selectedCategory?.slug}`}
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
            <AccordionItem key={item.id} value={`item-${item.id}`}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <div>
                  <Button
                    size={"sm"}
                    color="info"
                    className="px-0"
                    variant={"text-nohover"}
                    endIcon={<ChevronLeft className="size-4" />}
                    href={`/collection/${selectedCategory.slug}/${item.slug}`}
                  >
                    همه محصولات دسته {item.title}
                  </Button>
                  {item.children?.map((subItem) => (
                    <Button
                      key={subItem.id}
                      variant={"text-nohover"}
                      size={"sm"}
                      fullWidth
                      endIcon={<ChevronLeft className="size-4" />}
                      className="border-b rounded-none flex justify-between !py-6 last:border-b-0"
                      href={`/collection/${selectedCategory.slug}/${item.slug}/${subItem.slug}`}
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
  );
}
