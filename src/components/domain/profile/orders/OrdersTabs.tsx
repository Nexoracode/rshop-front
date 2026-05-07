"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toFaDigits } from "@/lib/utils/price";
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
    <div className="w-full overflow-x-auto">
      <Tabs
        value={value}
        onValueChange={(v) => onChange(v as ProfileOrderStatus)}
      >
        <TabsList className="sm:grid  flex justify-start flex-nowrap grid-cols-4 gap-4 md:gap-0 md:flex overflow-x-auto border-0 md:border-b mt-2 w-full">
          {Object.keys(tabs).map((tab, index) => (
            <TabsTrigger className="p-1" key={tab} value={tab} asChild>
              <span className={`cursor-pointer w-fit`}>
                {tabs[tab as ProfileOrderStatus].label}
                {isPending ? (
                  <Skeleton className="size-5" />
                ) : data ? (
                  <span className="bg-neutral-200  text-center rounded-sm w-5 h-5 inline-block max-[330px]:hidden">
                    {toFaDigits(data.order_summary[tab as ProfileOrderStatus])}
                  </span>
                ) : null}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
