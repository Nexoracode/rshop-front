"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeletons } from "@/components/ui/skeleton";
import { getDetailedProfile } from "@/queries/profile/order";
import { ProfileSidebar } from "../ProfileSidebar";
import RecentViewedPage from "../recent/RecendViewedPage";
import ProfileSectionBox from "../ProfileSectionBox";
import OrderStatCard from "./OrderStatCard";

export default function DashboardOverview() {
  const { data, isFetching } = useQuery(getDetailedProfile);
  return (
    <>
      <ProfileSectionBox
        title="سفارش‌های من"
        navigateElem={
          <Button
            size={"md"}
            variant={"text-nohover"}
            color="info"
            href="/profile/orders"
            endIcon={<ChevronLeft className="size-4.5" />}
            className="!p-0 !text-[13px] md:!text-[13.5px]"
          >
            مشاهده همه
          </Button>
        }
        className="min-h-fit"
      >
        <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4">
          {isFetching ? (
            <Skeletons className="h-14" count={3} />
          ) : (
            <>
              <OrderStatCard
                iconSrc="/status-processing.svg" // masire image shopping bag
                label="در حال انجام"
                value={data?.order_summary.processing}
              />
              <OrderStatCard
                iconSrc="/status-delivered.svg" // masire image check circle
                label="تکمیل شده"
                value={data?.order_summary.completed}
              />
              <OrderStatCard
                iconSrc="/status-returned.svg" // masire image undo/return
                label="مرجوعی"
                value={data?.order_summary.returned}
              />
            </>
          )}
        </div>
        <div className="lg:hidden mt-6 pt-3 border-t-14 border-slate-100">
          <ProfileSidebar />
        </div>
        <div className="lg:hidden mt-3 pt-6 border-t-14 border-slate-100">
          <RecentViewedPage />
        </div>
      </ProfileSectionBox>

      <div className="hidden lg:flex">
        <RecentViewedPage />
      </div>
    </>
  );
}
