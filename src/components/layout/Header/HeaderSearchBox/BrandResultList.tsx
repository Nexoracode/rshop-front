import { Brand } from "@/types/product";
import Link from "next/link";
import React from "react";

type Props = {
  brands: Array<Brand>;
};

const BrandResultList = React.forwardRef<HTMLDivElement, Props>(
  function ResultList({ brands }, ref) {
    return (
      <div ref={ref} className="flex flex-wrap gap-2 mt-2">
        {brands.map((c) => (
          <Link
            className="inline-block hover:text-secondary text-sm  bg-neutral-100 rounded-full p-1 px-2"
            key={c.id}
            href={`/brand/${c.slug}`}
          >
            {c.name}
          </Link>
        ))}
      </div>
    );
  }
);

export default BrandResultList;
