import React from "react";
import SectionTitle from "../common/SectionTitle";

type Props = {
  description: string;
};

export default function ProductDescription({ description }: Props) {
  return (
    <section id="description">
      <SectionTitle title="توضیحات" />
      <article
        dangerouslySetInnerHTML={{ __html: description }}
        className="leading-8 content text-muted text-sm"
      ></article>
    </section>
  );
}
