"use client";

import RecentViewedCard from "./RecentViewdCard";
import { useQuery } from "@tanstack/react-query";
import { recentViewList } from "@/queries/profile/recent_views";
import { ListLayout } from "@/components/common/ListLayout";
import { RecentView } from "@/types/user";
import { Skeleton, Skeletons } from "@/components/ui/skeleton";
import ProfileSectionBox from "../ProfileSectionBox";
import { EyeOff, ShoppingBag } from "lucide-react";
import Link from "@/components/shared/Link";

function EmptyRecentViews() {
  return (
    <div className="flex flex-col items-center justify-center pt-4 px-4 text-center">
      <div className="bg-gray-100 rounded-full p-4 mb-4">
        <EyeOff className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        هنوز محصولی مشاهده نکردید
      </h3>
      <p className="text-sm text-gray-500 max-w-sm">
        با مشاهده محصولات، آن‌ها را اینجا خواهید دید. می‌توانید فروشگاه را مرور
        کنید.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        <ShoppingBag className="w-4 h-4" />
        شروع خرید
      </Link>
    </div>
  );
}

export default function RecentViewedPage() {
  const { data, isPending } = useQuery(recentViewList);

  // Skeleton while fetching
  if (isPending) {
    return (
      <ProfileSectionBox title="بازدیدهای اخیر">
        <div className="grid grid-cols-1 min-[375px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Skeleton className="min-w-[170px] w-full h-[220px]" />
          <Skeleton className="min-w-[170px] w-full h-[220px]" />
          <Skeleton className="min-w-[170px] w-full h-[220px]" />
          <Skeleton className="min-w-[170px] w-full h-[220px]" />
        </div>
      </ProfileSectionBox>
    );
  }

  // Empty state if no data
  if (!data || data.length === 0) {
    return (
      <ProfileSectionBox title="بازدیدهای اخیر">
        <EmptyRecentViews />
      </ProfileSectionBox>
    );
  }

  // Show actual data
  return (
    <ProfileSectionBox title="بازدیدهای اخیر">
      <ListLayout<RecentView>
        className="grid grid-cols-1 min-[375px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2"
        items={data}
        renderItem={(item) => <RecentViewedCard key={item.id} {...item} />}
        skeleton={<Skeletons count={4} />}
        loading={false} // chon isFetching false ast va data vojood darad
      />
    </ProfileSectionBox>
  );
}
