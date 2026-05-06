"use client";

import { Search } from "lucide-react";

export default function SearchPrompt({
  message = "برای مشاهده نتایج، یک عبارت جستجو وارد کنید",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Search className="size-20 text-gray-300 mb-2.5" />
      <p className="text-gray-500">جستجوی محصولات</p>
      <p className="text-gray-400 text-sm mt-1">{message}</p>
    </div>
  );
}
