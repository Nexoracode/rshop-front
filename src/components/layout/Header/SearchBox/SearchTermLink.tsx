import { LucideArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = { debouncedSearch: string };

export default function SearchTermLink({ debouncedSearch }: Props) {
  return (
    <Link
      href={{
        pathname: "/products",
        query: { search: debouncedSearch },
      }}
      className="border-t flex items-center gap-4 justify-between w-full pt-6 pb-2 text-sm hover:text-sky-600 transition-all mt-5"
    >
      <div className="flex items-center gap-4">
        <Search className="size-5.5 text-slate-500" />
        <span className="text-[13px] text-slate-600">
          {" "}
          جستجو برای {`"${debouncedSearch}"`}
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm rounded-lg text-primary-600">
        <span>مشاهده نتایج</span>
        <LucideArrowLeft className="size-4.5" />
      </div>
    </Link>
  );
}
