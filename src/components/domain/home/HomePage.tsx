import React from "react";
import BrandsSection from "./BrandsSection";
import { getHomeSections } from "@/queries/home/home";
import HomeSections from "./HomeSections";
import FeaturedSection from "./FeaturedSection";
import CategoriesSection from "./CategoriesSection";
import PromoSection from "./PromoSection";
import PageLoading from "@/components/shared/asset/PageLoading";
import { getQueryClient } from "@/lib/utils/query-client";

export default async function HomePage() {
  const queryClient = getQueryClient();

  const data = await queryClient.fetchQuery(getHomeSections);

  if (!data) <div>خطا در دریافت اطلاعات</div>;

  /*  if (!data)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              خطا در دریافت اطلاعات
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              {"لطفا مجددا تلاش نمایید"}
            </p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
    ); */

  const homeSections = data?.sections ?? [];

  const featuredSection = homeSections.find(
    (s) => s.section_type === "promotion_based",
  );

  return !data ? (
    <PageLoading />
  ) : (
    <div
      className={`flex flex-col ${data.layout_type === "side_by_side" ? "space-y-4" : ""}`}
    >
      <PromoSection
        heroSliders={data.hero_sliders}
        sideBanners={data.side_banners}
        layoutType={data.layout_type}
      >
        {featuredSection && <FeaturedSection {...featuredSection} />}
      </PromoSection>

      <div className="bg-white !z-20 relative space-y-4 px-2">
        {featuredSection && data.layout_type === "side_by_side" && (
          <div className={data.layout_type === "side_by_side" ? "!-mx-2" : ""}>
            <FeaturedSection {...featuredSection} />
          </div>
        )}

        <CategoriesSection categories={data.categories} />

        <HomeSections sections={homeSections} />

        <BrandsSection brands={data.brands} />

        {/*    <BlogSection /> */}
      </div>
    </div>
  );
}
