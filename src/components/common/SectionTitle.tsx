import React from "react";
import { Button } from "../ui/button";
import { LucideArrowLeft, LucideIcon } from "lucide-react";
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
    <div className="w-full flex items-center justify-between md:mb-10 gap-3">
      <h2
        className={cn(
          "text-[1rem] lg:text-[18px] flex items-center gap-2 font-medium text-gray-800",
          center && "justify-center flex-1",
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
          className="px-0 !text-sm lg:text-base font-medium group"
          href={link}
          endIcon={<LucideArrowLeft size={16} />}
        >
          {linkLabel}
        </Button>
      )}
    </div>
  );
}
