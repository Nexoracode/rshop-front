"use client";

import RecentViewedCard from "./RecentViewdCard";
import { useQuery } from "@tanstack/react-query";
import { recentViewList } from "@/queries/profile/recent_views";
import { ListLayout } from "@/components/common/ListLayout";
import { RecentView } from "@/types/user";
import { Skeletons } from "@/components/ui/skeleton";
import ProfileSectionBox from "../ProfileSectionBox";

export default function RecentViewedPage() {
  const { data, isFetching } = useQuery(recentViewList);

  return (
    <ProfileSectionBox title="بازدیدهای اخیر">
      <ListLayout<RecentView>
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"
        items={data ?? []}
        renderItem={(item) => <RecentViewedCard key={item.id} {...item} />}
        skeleton={<Skeletons count={4} />}
        loading={isFetching}
      />
    </ProfileSectionBox>
  );
}
