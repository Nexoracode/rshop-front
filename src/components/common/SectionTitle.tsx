import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

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
    <div className="flex justify-between items-center">
      <h2 className="text-[1rem] lg:text-xl font-bold text-gray-800">
        {title}
      </h2>

      {link && (
        <Button
          color="primary"
          size={"md"}
          variant={"text-nohover"}
          className="px-0 text-sm lg:text-base"
          endIcon={<ChevronLeft className="size-4 lg:size-5" />}
          href={link}
        >
          {linkLabel}
        </Button>
      )}
    </div>
  );
}
