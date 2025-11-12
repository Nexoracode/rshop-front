import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = { debouncedSearch: string };

export default function SearchTermLink({ debouncedSearch }: Props) {
  return (
    <Link
      href={{
        pathname: "/collection",
        query: { search: debouncedSearch },
      }}
      className="bg-background  flex justify-between w-full  p-2 text-sm hover:text-secondary mt-2"
    >
      جستجو برای {`"${debouncedSearch}"`}
      <ArrowLeft className="text-primary" />
    </Link>
  );
}
