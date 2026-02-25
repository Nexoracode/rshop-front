import React from "react";

type Props = {
  description: string;
};

export default function CategoryDescription({ description }: Props) {
  return (
    <section>
      <div dangerouslySetInnerHTML={{ __html: description }}></div>
    </section>
  );
}
