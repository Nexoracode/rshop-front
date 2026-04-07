import React from "react";
import { HomeSection } from "@/types/home";
import Promotion from "./Promotion";
import ProductCarousel from "@/components/shared/product/ProductCarousel";
import ProductCartItem from "../ProductCartItem";

export default function FeaturedSection({
  products,
  display_style,
  show_view_all_button,
  view_all_link,
}: HomeSection) {
  return (
    <div className="container-home relative">
      <div className="bg-[rgb(214,45,78)] flex-col md:flex-row w-full overflow-hidden flex rounded-2xl p-2 md:p-5">
        <div className="md:w-[10rem]">
          <Promotion
            show_view_all_button={show_view_all_button}
            view_all_link={view_all_link}
          />
        </div>
        {display_style === "carousel" ? (
          <div className="w-full mr-4">
            <ProductCarousel
              renderItem={ProductCartItem}
              items={products}
              hiddenSeparator
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-col-4 lg:grid-cols-5">
            {products.map((product) => (
              <ProductCartItem key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
