"use client";

import { LucideBox } from "lucide-react";

export default function EmptyState({
  title = "هیچ موردی یافت نشد",
  description = "لیست در حال حاضر خالی است.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col w-full items-center justify-center col-span-12 gap-2 py-10 text-center text-muted-foreground">
      <div className="relative w-fit">
        <div className="absolute left-5 w-20 h-20 bg-green-200 rounded-full"></div>
        <LucideBox className="w-24 h-24 opacity-30 mx-auto" />
        <h3 className="font-medium text-lg text-muted/80">{title}</h3>
        {description && <p className="text-sm text-muted/50">{description}</p>}
      </div>
    </div>
  );
}
