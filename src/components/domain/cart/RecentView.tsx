"use client";
import { recentViewList } from "@/queries/profile/recent_views";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import RecentViewedCard from "../profile/recent/RecentViewdCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

export default function RecentView() {
  const { data } = useQuery(recentViewList);

  return (
    <section className="w-full">
      <h2 className="font-medium text-lg mb-4">بازدیدهای اخیر شما</h2>
      <Card>
        <Carousel>
          <CarouselNext />
          <CarouselPrevious />

          <CarouselContent>
            {data?.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-[10rem] md:basis-[15rem] border-l"
              >
                <RecentViewedCard {...product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Card>
    </section>
  );
}
