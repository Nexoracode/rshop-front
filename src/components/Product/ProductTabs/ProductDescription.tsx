import React from "react";
import SectionTitle from "../../common/SectionTitle";
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
    <section className="py-5" id="description">
      <SectionTitle title="توضیحات" />
      <article
        dangerouslySetInnerHTML={{ __html: description }}
        className={cn(
          "!leading-8 content text-muted text-sm",
          showMore && "line-clamp-4 md:line-clamp-none ",
        )}
      ></article>

      {showMore && <DisplayFurtherDescription />}
    </section>
  );
}
