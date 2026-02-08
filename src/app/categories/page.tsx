import CategoriesMenu from "@/components/categories/CategoriesMenu";
import Header from "@/components/layout/Header";
import BannerPadding from "@/components/layout/Header/BannerPadding";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { getQueryClient } from "@/lib/utils/query-client";
import { getCategoreis } from "@/queries/products/category";

import React from "react";

export default async function CategoriesPage() {
  const queryClient = getQueryClient();

  const data = await queryClient.fetchQuery(getCategoreis);

  return (
    <div className="md:pt-28 pt-10">
      <Header />
      <main className="px-2 md:px-0 min-h-[100dvh]">
        <BannerPadding />
        <CategoriesMenu categories={data} />
      </main>
      <MobileBottomNav />
    </div>
  );
}
