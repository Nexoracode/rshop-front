"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBag, CheckCircle, Undo2, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getDetailedProfile } from "@/queries/orders";
import { Skeletons } from "@/components/ui/skeleton";

export default function DashboardOverview() {
  const { data, isFetching } = useQuery(getDetailedProfile);
  return (
    <div className="space-y-5">
      {/* --- سفارش‌ها --- */}
      <section className="space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold  md:text-lg">سفارش‌های من</h2>

          <Button
            size={"sm"}
            variant={"text"}
            color="info"
            href="/profile/orders"
            endIcon={<ChevronLeft className="size-4" />}
          >
            مشاهده همه
          </Button>
        </div>

        {/* <OrderStatCard
          icon={<Wallet className="w-5 h-5 text-primary" />}
          label="در انتظار پرداخت"
          value={stats.pendingPayment}
          highlight
          action={
            <Button variant={"text"} size="sm">
              پرداخت
            </Button>
          }
        /> */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {isFetching ? (
            <Skeletons className="h-14" count={3} />
          ) : (
            <>
              <OrderStatCard
                icon={<ShoppingBag className="w-10 h-10 text-info" />}
                label="در حال انجام"
                value={data?.order_summary.processing}
              />
              <OrderStatCard
                icon={<CheckCircle className="w-10 h-10 text-success" />}
                label="تکمیل شده"
                value={data?.order_summary.completed}
              />
              <OrderStatCard
                icon={<Undo2 className="w-10 h-10 text-warning" />}
                label="مرجوعی"
                value={data?.order_summary.returned}
              />
            </>
          )}
        </div>
      </section>
    </div>
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
        "p-3 md:p-4 flex items-center lg:flex-row relative justify-between gap-2 bg-transparent border border-border transition-all",
        highlight && "flex-row justify-start"
      )}
    >
      {Icon}
      <p className="text-sm flex-1 text-muted-foreground">{label}</p>
      <p className="md:text-xl text-base flex items-center justify-center leading-0 font-semibold lg:relative absolute -top-1 -left-1 lg:left-auto lg:top-auto text-primary rounded-full w-6 h-6 lg:h-8 lg:w-8">
        {value}
      </p>
      {action}
    </Card>
  );
}
