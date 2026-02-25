import { SearchIcon } from "lucide-react";
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
      className="bg-background items-center  flex w-full p-2 text-sm hover:text-secondary mt-2"
    >
      <SearchIcon className="text-muted-light size-6 me-2" />
      جستجو برای {`"${debouncedSearch}"`}
    </Link>
  );
}
