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
      <div className="border border-slate-200 w-full h-[345px] rounded-lg mt-16 p-6 flex flex-col justify-between gap-4">
        <p className="text-[20px] mt-2">بازدید های اخیر شما</p>
        <div className="w-full h-[235px] flex items-center">
          <div className="w-[180px] h-full border-l-2 animate-pulse border-black/10 rounded-r-lg flex flex-col justify-between p-4">
            <div className="bg-slate-100 rounded-md w-full h-[130px]"></div>
            <div className="bg-slate-100 rounded-md w-full h-[30px]"></div>
          </div>
          <div className="w-[180px] h-full border-l-2 animate-pulse border-black/10 flex flex-col justify-between p-4">
            <div className="bg-slate-100 rounded-md w-full h-[130px]"></div>
            <div className="bg-slate-100 rounded-md w-full h-[30px]"></div>
          </div>
          <div className="w-[180px] h-full animate-pulse p-4 flex flex-col justify-between gap-4">
            <div className="bg-slate-100 rounded-md w-full h-[130px]"></div>
            <div className="bg-slate-100 rounded-md w-full h-[30px]"></div>
          </div>
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
