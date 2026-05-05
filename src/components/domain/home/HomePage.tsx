import React from "react";
import BrandsSection from "./BrandsSection";
import { getHomeSections } from "@/queries/home/home";
import { getQueryClient } from "@/lib/utils/query-client";
import HomeSections from "./HomeSections";
import FeaturedSection from "./FeaturedSection";
import CategoriesSection from "./CategoriesSection";
import PromoSection from "./PromoSection";
import PageLoading from "@/components/shared/asset/PageLoading";

export default async function HomePage() {
  const queryClient = getQueryClient();

  const data = await queryClient.fetchQuery(getHomeSections);

  const featuredSection = data.sections.find(
    (s) => s.section_type === "promotion_based",
  );

  return !data ? (
    <PageLoading />
  ) : (
    <div className="flex flex-col">
      <PromoSection
        heroSliders={data.hero_sliders}
        sideBanners={data.side_banners}
        layoutType={data.layout_type}
      >
        {featuredSection && <FeaturedSection {...featuredSection} />}
      </PromoSection>

      <div className="bg-white !z-20 relative space-y-4 px-2 md:px-0">
        {featuredSection && data.layout_type === "side_by_side" && (
          <FeaturedSection {...featuredSection} />
        )}

        <CategoriesSection categories={data.categories} />

        <HomeSections sections={data.sections} />

        <BrandsSection brands={data.brands} />

        {/*    <BlogSection /> */}
      </div>
    </div>
  );
}
