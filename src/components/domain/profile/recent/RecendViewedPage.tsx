"use client";

import { Eye } from "lucide-react";
import RecentViewedCard from "./RecentViewdCard";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { recentViewList } from "@/queries/profile/recent_views";
import { ListLayout } from "@/components/common/ListLayout";
import { RecentView } from "@/types/user";
import { Skeletons } from "@/components/ui/skeleton";

export default function RecentViewedPage() {
  const { data, isFetching } = useQuery(recentViewList);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          بازدیدهای اخیر
        </h1>
      </div>

      <Card>
        <ListLayout<RecentView>
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"
          items={data ?? []}
          renderItem={(item) => <RecentViewedCard key={item.id} {...item} />}
          skeleton={<Skeletons count={4} />}
          loading={isFetching}
        />
      </Card>
    </div>
  );
}
