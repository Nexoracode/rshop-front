"use client";

import { recentViewList } from "@/queries/profile/recent_views";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import SectionTitle from "@/components/common/SectionTitle";
import ProductCartItem from "../home/ProductCartItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HomeSectionProduct } from "@/types/home";
import RecentViewedCard from "../profile/recent/RecentViewdCard";

export default function RecentView() {
  const { data } = useQuery(recentViewList);

  const products = data?.map((p) => p.product);

  if (!products?.length) return null;

  return (
    <div className="md:border rounded-lg relative overflow-hidden">
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
