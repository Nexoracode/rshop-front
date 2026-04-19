"use client";

import { recentViewList } from "@/queries/profile/recent_views";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import SectionTitle from "@/components/common/SectionTitle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RecentViewedCard from "../profile/recent/RecentViewdCard";

export default function RecentView() {
  const { data, isPending } = useQuery(recentViewList);

  if (!data?.length || isPending)
    return (
      <div className="bg-slate-100 w-full h-[345px] rounded-lg animate-pulse mt-16 p-6 flex flex-col justify-between gap-4">
        <p className="text-[20px] mt-2">بازدید های اخیر شما</p>
        <div className="w-full h-[235px] flex items-center">
          <div className="w-[180px] h-full border-l-3 border-black/20 bg-slate-200 rounded-r-lg"></div>
          <div className="w-[180px] h-full border-l-3 border-black/20 bg-slate-200"></div>
          <div className="w-[180px] h-full bg-slate-200 rounded-r-lg"></div>
        </div>
      </div>
    );

  const products = data?.map((p) => p.product);

  if (!products?.length) return null;

  return (
    <div className="md:border rounded-lg relative overflow-hidden !mt-16">
      <div className="p-2 md:p-6">
        <SectionTitle title={"بازدیدهای اخیر شما"} />
      </div>
      <Carousel>
        <CarouselNext />
        <CarouselPrevious />
        <CarouselContent>
          {products.map((product, index: number) => (
            <CarouselItem
              key={index}
              className="basis-[10rem] border-l last:border-l-0 sm:basis-[12rem]"
            >
              <RecentViewedCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
