import React from "react";
import { HomeSection } from "@/types/home";
import HomeProductCard from "./HomeProductCard";
import SectionTitle from "../common/SectionTitle";
import ProductCarousel from "../common/ProductCarousel";

export default function SimpleCollection({
  products,
  display_style,
}: HomeSection) {
  return (
    <section>
      <div className="container-home relative">
        <SectionTitle
          title={"محبوب ترین ها"}
          link={"/products?sortBy=popular"}
        />

        {display_style === "carousel" ? (
          <ProductCarousel items={products} renderItem={HomeProductCard} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-col-4 lg:grid-cols-5 ">
            {products.map((product) => (
              <HomeProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
