"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDetailedProfile } from "@/queries/profile/order";
import { ProfileOrderStatus } from "@/types/order";
import { useQuery } from "@tanstack/react-query";

type Props = {
  tabs: Record<ProfileOrderStatus, { label: string }>;
  value: string;
  onChange: (status: ProfileOrderStatus) => void;
};

export function OrdersTabs({ value, onChange, tabs }: Props) {
  const { data, isPending } = useQuery(getDetailedProfile);
  return (
    <Tabs
      value={value}
      onValueChange={(v) => onChange(v as ProfileOrderStatus)}
    >
      <TabsList className="flex flex-nowrap w-full border-b mt-2">
        {Object.keys(tabs).map((tab) => (
          <TabsTrigger className="p-1" key={tab} value={tab} asChild>
            <span className="cursor-pointer inline-block relative">
              {tabs[tab as ProfileOrderStatus].label}
              {isPending ? (
                <Skeleton className="size-5" />
              ) : data ? (
                <span className="bg-neutral-200  text-center rounded-sm w-5 h-5 inline-block max-[330px]:hidden">
                  {data.order_summary[tab as ProfileOrderStatus]}
                </span>
              ) : null}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
