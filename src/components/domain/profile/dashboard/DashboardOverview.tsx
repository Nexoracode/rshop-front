"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBag, CheckCircle, Undo2, ChevronLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeletons } from "@/components/ui/skeleton";
import { getDetailedProfile } from "@/queries/profile/order";
import { cn } from "@/lib/utils/classnames";
import { toFaDigits } from "@/lib/utils/price";
import { ProfileSidebar } from "../ProfileSidebar";
import RecentViewedPage from "../recent/RecendViewedPage";
import ProfileSectionBox from "../ProfileSectionBox";

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
                icon={<ShoppingBag className="size-7 md:size-10 text-info" />}
                label="در حال انجام"
                value={data?.order_summary.processing}
              />
              <OrderStatCard
                icon={
                  <CheckCircle className="size-7 md:size-10 text-success" />
                }
                label="تکمیل شده"
                value={data?.order_summary.completed}
              />
              <OrderStatCard
                icon={<Undo2 className="size-7 md:size-10 text-warning" />}
                label="مرجوعی"
                value={data?.order_summary.returned}
              />
            </>
          )}
        </div>
        <div className="lg:hidden">
          <ProfileSidebar />
        </div>
        <div className="lg:hidden">
          <RecentViewedPage />
        </div>
      </ProfileSectionBox>

      <div className="hidden lg:flex">
        <RecentViewedPage />
      </div>
    </>
  );
}

function OrderStatCard({
  icon: Icon,
  label,
  value,
  highlight,
  action,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | undefined;
  highlight?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <Card
      className={cn(
        "p-3 md:p-4 flex items-center lg:flex-row relative justify-between gap-2 transition-all bg-white rounded-lg",
        highlight && "flex-row justify-start",
      )}
    >
      {Icon}
      <p className="text-[13px] flex-1 text-slate-700">{label}</p>
      <p className="md:text-xl text-base flex items-center justify-center leading-0 font-medium lg:relative absolute top-1 left-1 lg:left-auto lg:top-auto text-primary rounded-full w-6 h-6 lg:h-8 lg:w-8">
        {toFaDigits(value ?? 0)}
      </p>
      {action}
    </Card>
  );
}
