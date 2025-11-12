"use client";

import { FileX } from "lucide-react";

export default function EmptyState({
  title = "هیچ موردی یافت نشد",
  description = "لیست در حال حاضر خالی است.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col w-full items-center justify-center col-span-12 gap-2 py-10 text-center text-muted-foreground">
      <FileX className="w-20 h-20 opacity-30" />
      <h3 className="font-medium text-lg text-muted/80">{title}</h3>
      {description && <p className="text-sm text-muted/50">{description}</p>}
    </div>
  );
}
