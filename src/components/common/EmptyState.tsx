"use client";

import { LucideShoppingBag } from "lucide-react";

export default function EmptyState({
  title = "موردی فعلا در دسترس نیست",
  description = "لیست در حال حاضر خالی است.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col w-full items-center justify-center col-span-12 gap-2 py-10 text-center text-muted-foreground">
      <div className="w-fit">
        <LucideShoppingBag className="w-24 h-24 opacity-30 mx-auto" />
        <h3 className="font-medium text-lg text-muted/80 mt-4">{title}</h3>
        {description && (
          <p className="text-sm text-muted/50 mt-2">{description}</p>
        )}
      </div>
    </div>
  );
}
