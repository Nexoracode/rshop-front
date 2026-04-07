import React from "react";
import BrandsSection from "./BrandsSection";
import { getHomeSections } from "@/queries/home/home";
import PageLoader from "../../common/PageLoader";
import { getQueryClient } from "@/lib/utils/query-client";
import HomeSections from "./HomeSections";
import FeaturedSection from "./FeaturedSection";
import CategoriesSection from "./CategoriesSection";
import PromoSection from "./PromoSection";

export default async function HomePage() {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery(getHomeSections);

  if (!data) return <PageLoader />;

  const featuredSection = data.sections.find(
    (s) => s.section_type === "featured",
  );

  return !data ? (
    <PageLoader />
  ) : (
    <div className="pb-8 space-y-4">
      <PromoSection
        heroSliders={data.hero_sliders}
        sideBanners={data.side_banners}
        layoutType={data.layout_type}
      >
        {featuredSection && <FeaturedSection {...featuredSection} />}
      </PromoSection>

        {featuredSection && data.layout_type === "side_by_side" && <FeaturedSection {...featuredSection} />}

      <CategoriesSection categories={data.categories} />

      <HomeSections sections={data.sections} />

      <BrandsSection brands={data.brands} />

      {/*    <BlogSection /> */}
    </div>
  );
}
