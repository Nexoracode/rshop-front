"use client";

import { Eye } from "lucide-react";
import RecentViewedCard from "./RecentViewdCard";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { recentViewList } from "@/queries/recent_views";
import { ListLayout } from "@/components/common/ListLayout";
import { RecentView } from "@/types/user";
import { Skeletons } from "@/components/ui/skeleton";

export default function RecentViewedPage() {
  const { data, isFetching } = useQuery(recentViewList);

  return (
    <Card>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          بازدیدهای اخیر
        </h1>
      </div>

      <ListLayout<RecentView>
        className="grid grid-cols-2 gap-2"
        items={data ?? []}
        renderItem={(item) => <RecentViewedCard {...item} />}
        skeleton={<Skeletons count={4} />}
        loading={isFetching}
      />
    </Card>
  );
}
