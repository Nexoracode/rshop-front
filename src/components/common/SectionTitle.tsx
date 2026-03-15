import React from "react";
import { Button } from "../ui/button";
import { LucideArrowUpLeft, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/classnames";

type Props = {
  title: string;
  link?: string;
  linkLabel?: string;
  center?: boolean;
  Icon?: LucideIcon;
};

export default function SectionTitle({
  title,
  link,
  linkLabel = "مشاهده همه",
  center = false,
  Icon,
}: Props) {
  return (
    <div className="flex mb-10 items-center gap-3">
      <h2
        className={cn(
          "flex-1 text-[1rem] lg:text-xl font-medium text-gray-800 leading-tight",
          center && "lg:text-center",
        )}
      >
        {Icon && <Icon />}
        {title}
      </h2>

      {link && (
        <Button
          color="primary"
          size="sm"
          variant="text-nohover"
          className="px-0 text-sm lg:text-base font-medium group"
          href={link}
          endIcon={<LucideArrowUpLeft/>}
        >
          {linkLabel}
        </Button>
      )}
    </div>
  );
}
