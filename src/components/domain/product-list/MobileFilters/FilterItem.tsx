import { ArrowRight, ChevronLeft } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import SelectableFilter from "../Filters/SelectableFilter";
import { cn } from "@/lib/utils/classnames";

type FilterOptionType = {
  label: string;
  value: string | number;
};
type Props = {
  label: string;
  items?: Array<FilterOptionType>;
  content?: React.ReactNode;
  attrId?: number;
  value?: Array<string>;
  onChange?: (value: Array<string>) => void;
  isActive?: boolean;
};

export default function FilterItem({
  label,
  items,
  content,
  value = [],
  onChange = () => {},
  isActive = false,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <div
        className={cn(
          "flex justify-between relative items-center py-3 border-b",
          (isActive || value.length > 0) && "bg-primary-100/50",
        )}
        role="button"
        onClick={() => setOpen(true)}
      >
        <span className="text-muted text-sm">{label}</span>

        {(isActive || value.length > 0) && (
          <span className="w-2 h-2 absolute left-3 top-3 bg-primary rounded-full inline-block ms-1"></span>
        )}
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
                value={value}
                onChange={onChange}
              />
            )}
          </div>
        </div>
      )}{" "}
    </React.Fragment>
  );
}
