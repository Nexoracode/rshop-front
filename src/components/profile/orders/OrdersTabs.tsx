"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusOrder } from "@/types/order";

type Props = {
  tabs: Record<string, { label: string; status: Array<StatusOrder> }>;
  value: string;
  onChange: (status: StatusOrder) => void;
};

export function OrdersTabs({ value, onChange, tabs }: Props) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as StatusOrder)}>
      <TabsList className="flex flex-wrap gap-2 bg-muted/30 p-2 rounded-lg">
        {Object.keys(tabs).map((tab) => (
          <TabsTrigger key={tab} value={tab}>
            {tabs[tab].label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
