"use client";

import { Search } from "lucide-react";

export default function SearchPrompt({
  message = "برای مشاهده نتایج، یک عبارت جستجو وارد کنید",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 opacity-75">
      <div className="p-4 rounded-full bg-muted/40 mb-4">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground max-w-xs leading-6">
        {message}
      </p>
    </div>
  );
}
