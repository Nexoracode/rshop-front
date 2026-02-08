import { ArrowRight, ChevronLeft } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import SelectableFilter from "../Filters/SelectableFilter";

type FilterOptionType = {
  label: string;
  value: string | number;
};
type Props = {
  label: string;
  items?: Array<FilterOptionType>;
  content?: React.ReactNode;
  attrId?: number;
};

export default function FilterItem({
  label,
  items,
  content,
  attrId = 0,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <div
        className="flex justify-between items-center py-3 border-b"
        role="button"
        onClick={() => setOpen(true)}
      >
        <span className="text-muted text-sm">{label}</span>

        <ChevronLeft className="size-5" />
      </div>
      {open && (
        <div className="fixed bg-white z-30 p-4 top-0 left-0 w-full h-full">
          <Button
            variant={"text-nohover"}
            color="neutral"
            size={"md"}
            onClick={() => setOpen(false)}
            className="px-0 justify-start"
            startIcon={<ArrowRight className="size-6 " />}
          >
            {label}
          </Button>
          <div className="h-full pb-[8rem] no-scrollbar overflow-auto">
            {content}
            {items && (
              <SelectableFilter
                items={items}
                label={label}
                search={items.length > 10}
                //    value={query?.filter?.attributes?.[attrId] ?? []}
                value={[]}
                onChange={() => {}}
              />
            )}
          </div>
        </div>
      )}{" "}
    </React.Fragment>
  );
}
