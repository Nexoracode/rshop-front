import React from "react";

type Props = {
  description: string;
};

export default function ProductDescription({ description }: Props) {
  return (
    <section id="description">
      <h4 className="text-primary text-3xl font-semibold mb-1">توضیحات</h4>
      <article
        dangerouslySetInnerHTML={{ __html: description }}
        className="leading-8 text-accent-foreground"
      ></article>
    </section>
  );
}
