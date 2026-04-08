"use client";
import React, { useMemo } from "react";

import { HomeSection as HomeSectionType } from "@/types/home";

import SectionTitle from "@/components/common/SectionTitle";
import ProductCartItem from "../ProductCartItem";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductListCarousel from "./ProductListCarousel";
import ProductGridCarousel from "./ProductGridCarousel";
import ProductCarousel from "@/components/shared/product/ProductCarousel";
import ListItemsGrid from "./ListItemsGrid";
import CartItemsGrid from "./CartItemsGrid";

export default function HomeSectionItem({
  products,
  display_style,
  title,
  show_view_all_button,
  slug,
}: HomeSectionType) {
  const isMobile = useIsMobile();

  const productList = useMemo(() => {
    if (isMobile && display_style === "list")
      return <ProductListCarousel products={products} />;
    if (isMobile && display_style === "grid")
      return <ProductGridCarousel products={products} />;

    if (display_style === "carousel")
      return <ProductCarousel items={products} renderItem={ProductCartItem} />;

    if (display_style === "grid") return <CartItemsGrid products={products} />;
    return <ListItemsGrid products={products} />;
  }, [products, display_style, isMobile]);
  return (
    <section>
      <div className="container-home border rounded-lg relative overflow-hidden">
        <div className="p-4">
          <SectionTitle
            title={title}
            link={show_view_all_button ? `/collection/${slug}` : undefined}
          />
        </div>
        {productList}
      </div>
    </section>
  );
}
