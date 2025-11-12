import { Brand } from "@/types/product";
import Link from "next/link";
import React from "react";

type Props = {
  brands: Array<Brand>;
  debouncedSearch: string;
};

export default function BrandResultList({ brands, debouncedSearch }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {brands.map((c) => (
        <Link
          className="inline-block hover:text-secondary text-sm  bg-neutral-100 rounded-full p-1 px-2"
          key={c.id}
          href={{
            pathname: `/brands/${c.id}`,
            query: { search: debouncedSearch },
          }}
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}
