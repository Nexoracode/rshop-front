import React from "react";
import { Button } from "../ui/button";

type Props = {
  title: string;
  link?: string;
  linkLabel?: string;
};

export default function SectionTitle({
  title,
  link,
  linkLabel = "مشاهده همه",
}: Props) {
  return (
    <div className="flex mb-4 items-center gap-3">
      <h2 className="flex-1 text-[1rem] lg:text-xl font-bold text-gray-800 leading-tight">
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
