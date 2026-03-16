import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import ProductCard from "./ProductCard";
import SectionTitle from "../../common/SectionTitle";
import { getQueryClient } from "@/lib/utils/query-client";
import { getSimilarProducts } from "@/queries/products/product-details";

export default async function RelatedProducts({
  productId,
}: {
  productId: number;
}) {
  const queryClient = getQueryClient();

  const data = await queryClient.fetchQuery(getSimilarProducts(productId));

  if (data.length === 0) return null;
  return (
    <div className="space-y-3">
      <div className="pr-6">
        <SectionTitle title="محصولات مشابه" />
      </div>
      <Carousel>
        <CarouselNext />
        <CarouselPrevious />

        <CarouselContent>
          {data.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-[12rem] sm:basis-[14rem] last:[&>div]:border-l-0"
            >
              <div className="bg-card h-full overflow-hidden border-l">
                <ProductCard {...product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
