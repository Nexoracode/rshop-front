import React from "react";
import SectionTitle from "../common/SectionTitle";

import { cn } from "@/lib/utils";
import SpecialProductCart from "./SpecialProductCart";
import { HomeSection } from "@/types/home";
import HomeProductCard from "./HomeProductCard";
import ProductCarousel from "../common/ProductCarousel";

export default function SpecialCollection({
  products,
  display_style,
  title,
  show_view_all_button,
  slug,
}: HomeSection) {
  const ProductCard =
    display_style === "list" ? SpecialProductCart : HomeProductCard;
  return (
    <section>
      <div className="p-2 container-home border-b  relative">
        <SectionTitle
          title={title}
          link={show_view_all_button ? `/collection/${slug}` : undefined}
        />
        {display_style === "carousel" ? (
          <ProductCarousel items={products} renderItem={HomeProductCard} />
        ) : (
          <div className="flex flex-wrap flex-1 gap-2">
            {products.map((product, index) => (
              <div
                className={cn(
                  display_style === "grid"
                    ? "basis-[calc(50%-4px)] sm:basis-[calc(33.33%-8px)] lg:basis-[calc(20%-8px)] xl:basis-[calc(16.66%-8px)]"
                    : "basis-[100%] xl:basis-[calc(25%-8px)]"
                )}
                key={product.id}
              >
                <ProductCard
                  {...product}
                  {...(display_style === "list" ? { num: index + 1 } : {})}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
