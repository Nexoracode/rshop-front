"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusOrder } from "@/types/order";

type Props = {
  value: StatusOrder;
  onChange: (status: StatusOrder) => void;
};

export function OrdersTabs({ value, onChange }: Props) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as StatusOrder)}>
      <TabsList className="flex flex-wrap gap-2 bg-muted/30 p-2 rounded-lg">
        <TabsTrigger value="shipping">جاری</TabsTrigger>
        <TabsTrigger value="delivered">تحویل شده</TabsTrigger>
        <TabsTrigger value="rejected">مرجوع‌شده</TabsTrigger>
        <TabsTrigger value="expired">لغوشده</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
