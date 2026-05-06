import React from "react";
import DisplayFurtherDescription from "./DisplayFurtherDescription";
import { cn } from "@/lib/utils/classnames";

type Props = {
  description: string;
  showMore?: boolean;
};

export default function ProductDescription({
  description,
  showMore = false,
}: Props) {
  return (
    <section className="pb-5" id="description">
      {showMore && <h4 className="pb-2 font-bold">توضیحات </h4>}
      <article
        dangerouslySetInnerHTML={{ __html: description }}
        className={cn(
          "!leading-8 content text-muted text-sm",
          showMore && "line-clamp-4 md:line-clamp-none ",
        )}
      ></article>

      {showMore && description && <DisplayFurtherDescription />}
    </section>
  );
}
