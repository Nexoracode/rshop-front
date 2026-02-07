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
} from "../ui/carousel";
import RecentViewedCard from "../profile/recent/RecentViewdCard";

export default function RecentView() {
  const { data } = useQuery(recentViewList);

  return (
    <section className="w-full">
      <h2 className="font-semibold text-lg mb-3">بازدیدهای اخیر شما</h2>
      <Carousel>
        <CarouselNext />
        <CarouselPrevious />

        <CarouselContent>
          {data?.map((product) => (
            <CarouselItem key={product.id} className="basis-[15rem]">
              <RecentViewedCard {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
