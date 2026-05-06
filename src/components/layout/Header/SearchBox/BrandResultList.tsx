import { Brand } from "@/types/product";
import Link from "next/link";
import React from "react";

type Props = {
  brands: Array<Brand>;
};

const BrandResultList = React.forwardRef<HTMLDivElement, Props>(
  function ResultList({ brands }, ref) {
    return (
      <div ref={ref} className="flex flex-wrap gap-2">
        {brands.map((c) => (
          <Link
            className="inline-block hover:text-sky-600 transition-all hover:bg-sky-50 text-sm  bg-neutral-100 rounded-full p-1 px-3"
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
