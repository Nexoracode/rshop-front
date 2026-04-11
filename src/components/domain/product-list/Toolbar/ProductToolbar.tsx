import React from "react";
import SortSelect from "./SortSelect";

type Props = {
  total_items: number;
};

export default function ProductToolbar({ total_items }: Props) {
  return (
    <div className="flex items-center justify-between border-b pb-2 gap-2">
      <div className="flex gap-2">
        <SortSelect />
      </div>

      <p className="text-[13px] text-muted">
        {total_items.toLocaleString("fa-IR")} کالا
      </p>
    </div>
  );
}
