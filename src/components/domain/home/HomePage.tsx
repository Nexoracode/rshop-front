import React from "react";
import BrandsSection from "./BrandsSection";
import { getHomeSections } from "@/queries/home/home";
import { getQueryClient } from "@/lib/utils/query-client";
import HomeSections from "./HomeSections";
import FeaturedSection from "./FeaturedSection";
import CategoriesSection from "./CategoriesSection";
import PromoSection from "./PromoSection";
import PageLoading from "@/components/shared/asset/PageLoading";
import { AlertCircle, RefreshCw, WifiOff } from "lucide-react";

export default async function HomePage() {
  const queryClient = getQueryClient();

  const data = await queryClient.fetchQuery(getHomeSections);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 animate-fadeIn">
          {/* Header with animated icon */}
          <div className="relative bg-gradient-to-r from-red-500 to-orange-500 px-6 py-8 flex justify-center">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative animate-bounce-slow">
              <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                <WifiOff className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-2">
                <AlertCircle className="w-6 h-6 text-red-500 dark:text-red-400" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              خطا در دریافت اطلاعات
            </h3>

            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              {
                "متأسفانه امکان ارتباط با سرور وجود ندارد. لطفاً بعداً دوباره تلاش کنید."
              }
            </p>

            <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
              <RefreshCw className="w-4 h-4" />
              <span>تلاش مجدد</span>
            </button>
          </div>

          {/* Decorative footer */}
          <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-3 text-center border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              کد خطا: ERR_DATA_FETCH
            </p>
          </div>
        </div>
      </div>
    );

  const featuredSection = data.sections.find(
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

        <HomeSections sections={data.sections} />

        <BrandsSection brands={data.brands} />

        {/*    <BlogSection /> */}
      </div>
    </div>
  );
}
