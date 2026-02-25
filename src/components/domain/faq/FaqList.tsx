import { Faq } from "@/types/home";
import React from "react";
import FaqItem from "./FaqItem";
import { Accordion } from "@/components/ui/accordion";

type Props = {
  items: Array<Faq>;
};

export default function FaqList({ items }: Props) {
  return (
    <div>
      <Accordion type="single">
        {items.map((item) => (
          <FaqItem key={item.id} item={item} />
        ))}
      </Accordion>
    </div>
  );
}
