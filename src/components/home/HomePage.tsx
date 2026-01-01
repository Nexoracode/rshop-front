"use client";
import React from "react";
import BannerSection from "./BannerSection";
import TopCategoriesSection from "./TopCategories";
import FeaturedCollection from "./FeaturedCollection";
import SpecialCollection from "./SpecialCollection";
import ProductByCategory from "./ProductByCategory";
import BrandsSection from "./BrandsSection";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getHomeSections } from "@/queries/home";
import PageLoader from "../common/PageLoader";
import SimpleCollection from "./SimpleCollection";

export default function HomePage() {
  const { data, isFetching } = useSuspenseQuery(getHomeSections);

  const categoryBasedSections = data?.sections
    .filter((i) => i.section_type === "category_based")
    .sort((a, b) => a.sort_order - b.sort_order);
  const noneCtegoryBasedSections = data?.sections
    .filter((i) => i.section_type !== "category_based")
    .sort((a, b) => a.sort_order - b.sort_order);
  return isFetching ? (
    <PageLoader />
  ) : (
    <div>
      <BannerSection
        heroSliders={data.hero_sliders}
        sideBanners={data.side_banners}
        layoutType={data.layout_type}
      />

      {/*  <ServiceSection /> */}

      <TopCategoriesSection categories={data.categories} />

      {noneCtegoryBasedSections.map((section) => {
        if (section.section_type === "featured")
          return <FeaturedCollection key={section.id} {...section} />;
        if (section.section_type === "most_popular")
          return <SimpleCollection key={section.id} {...section} />;

        if (section.section_type === "special_products")
          return <SpecialCollection key={section.id} {...section} />;

        return null;
      })}

      {categoryBasedSections.length > 0 && (
        <ProductByCategory sections={categoryBasedSections} />
      )}

      <BrandsSection brands={data.brands} />

      {/*    <BlogSection /> */}
    </div>
  );
}
