import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ProductCard from "./ProductCard";
import SectionTitle from "../common/SectionTitle";
import { getQueryClient } from "@/lib/get-query-client";
import { getSimilarProducts } from "@/queries/products";

export default async function RelatedProducts({
  productId,
}: {
  productId: number;
}) {
  const queryClient = getQueryClient();

  const data = await queryClient.fetchQuery(getSimilarProducts(productId));
  return (
    <div className="space-y-3">
      <SectionTitle title="محصولات مشابه" />
      <Carousel>
        <CarouselNext />
        <CarouselPrevious />

        <CarouselContent>
          {data.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-[14rem] sm:basis-[16rem] h-[350px]"
            >
              <ProductCard {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
