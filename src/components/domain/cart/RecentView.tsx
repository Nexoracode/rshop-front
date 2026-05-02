"use client";

import { recentViewList } from "@/queries/profile/recent_views";
import { useQuery } from "@tanstack/react-query";
import React from "react";

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

  if (isPending)
    return (
      <div className="sm:border border-slate-200 w-full h-[345px] rounded-lg lg:mt-16 sm:p-6 pb-0 pr-0 flex flex-col justify-around sm:justify-between gap-4">
        <p className="text-[20px] mt-2 mr-6 bg-slate-100 h-[30px] w-46 rounded-md animate-pulse"></p>
        <div className="w-full h-[250px] flex items-center pr-2">
          <div className="w-[180px] h-full border-l-2 border-slate-200 animate-pulse rounded-r-lg flex flex-col justify-between p-4">
            <div className="bg-slate-100 rounded-md w-full h-[130px]"></div>
            <div className="bg-slate-100 rounded-md w-full h-[30px]"></div>
          </div>
          <div className="w-[180px] h-full min-[576px]:border-l-2 border-slate-200 animate-pulse flex flex-col justify-between p-4">
            <div className="bg-slate-100 rounded-md w-full h-[130px]"></div>
            <div className="bg-slate-100 rounded-md w-full h-[30px]"></div>
          </div>
          <div className="w-[180px] h-full animate-pulse p-4 hidden min-[576px]:!flex flex-col justify-between gap-4">
            <div className="bg-slate-100 rounded-md w-full h-[130px]"></div>
            <div className="bg-slate-100 rounded-md w-full h-[30px]"></div>
          </div>
        </div>
      </div>
    );

  if (!data?.length) {
    return null
  }

  const products = data?.map((p) => p.product);

  if (!products?.length) return null;

  return (
    <div className="lg:border rounded-lg relative overflow-hidden mb-[110px] lg:mb-0">
      <div className="pt-6 lg:p-6">
        <p className="text-lg font-bold mb-3">بازدیدهای اخیر</p>
      </div>
      <Carousel>
        <CarouselNext />
        <CarouselPrevious />
        <CarouselContent>
          {products.map((product, index: number) => (
            <CarouselItem
              key={index}
              className="border-l last:border-l-0 basis-[11rem] sm:basis-[12rem] !pr-0"
            >
              <RecentViewedCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
