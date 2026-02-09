import React from "react";
import BannerSection from "./BannerSection";
import TopCategoriesSection from "./TopCategories";
import FeaturedCollection from "./FeaturedCollection";
import SpecialCollection from "./SpecialCollection";
import ProductByCategory from "./ProductByCategory";
import BrandsSection from "./BrandsSection";
import { getHomeSections } from "@/queries/home/home";
import PageLoader from "../common/PageLoader";
import SimpleCollection from "./SimpleCollection";
import { getQueryClient } from "@/lib/utils/query-client";

export default async function HomePage() {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery(getHomeSections);

  const categoryBasedSections = data?.sections
    .filter((i) => i.section_type === "category_based")
    .sort((a, b) => a.sort_order - b.sort_order);

  const featuredSections = data?.sections.find(
    (s) => s.section_type === "featured",
  );

  const mostPopular = data.sections.find(
    (s) => s.section_type === "most_popular",
  );

  const specialProducts = data.sections
    .filter((s) => s.section_type === "special_products")
    .sort((a, b) => a.sort_order - b.sort_order);

  return !data ? (
    <PageLoader />
  ) : (
    <div className="space-y-4 md:space-y-24">
      <BannerSection
        heroSliders={data.hero_sliders}
        sideBanners={data.side_banners}
        layoutType={data.layout_type}
      />

      {/*  <ServiceSection /> */}
      {featuredSections && <FeaturedCollection {...featuredSections} />}

      <TopCategoriesSection categories={data.categories} />

      {mostPopular && <SimpleCollection {...mostPopular} />}

      {categoryBasedSections.length > 0 && (
        <ProductByCategory sections={categoryBasedSections} />
      )}

      {specialProducts.map((section) => (
        <SpecialCollection key={section.id} {...section} />
      ))}

      <BrandsSection brands={data.brands} />

      {/*    <BlogSection /> */}
    </div>
  );
}
