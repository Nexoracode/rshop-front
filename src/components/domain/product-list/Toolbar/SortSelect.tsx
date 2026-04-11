"use client";
import Responsive from "@/components/common/Responsive";
import { Button } from "@/components/ui/button";
import { sortItems } from "@/data/assets";
import { ArrowDownWideNarrowIcon } from "lucide-react";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortSelect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const sortBy = searchParams.get("sortBy") || "newest";
  const handleSort = (sortItem: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sortBy", sortItem);

    router.replace(`${pathName}?${params}`);
  };
  return (
    <React.Fragment>
      <Responsive visible="desktop">
        <div className="flex items-center">
          <div className="flex items-center gap-1.5 text-sm text-[12.5px] pl-2">
            <ArrowDownWideNarrowIcon className="size-5" />
            <span>مرتب سازی:</span>
          </div>
          {sortItems.map((item) => (
            <Button
              size={"sm"}
              variant={"text-nohover"}
              onClick={() => handleSort(item.value)}
              key={item.label}
              className={`px-2 text-[12.5px] ${sortBy === item.value ? "text-primary-500" : "text-gray-500"}`}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </Responsive>
    </React.Fragment>
  );
}
