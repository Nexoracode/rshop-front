import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/classnames";
import { Button } from "@/components/ui/button";

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
  Icon,
}: Props) {
  return (
    <div className="flex mb-4 items-center gap-3">
      <h2
        className={cn(
          "flex-1 text-[1rem] lg:text-xl font-bold text-gray-800 leading-tight",
        )}
      >
        {Icon && <Icon />}
        {title}
      </h2>

      {link && (
        <Button
          color="primary"
          size="md"
          variant="text-nohover"
          className="px-0 text-sm lg:text-base font-medium group"
          href={link}
        >
          {linkLabel}
        </Button>
      )}
    </div>
  );
}
