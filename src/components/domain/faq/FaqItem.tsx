import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Faq } from "@/types/home";
import React from "react";

type Props = {
  item: Faq;
};

export default function FaqItem({ item }: Props) {
  return (
    <>
      <AccordionItem value={String(item.id)}>
        <AccordionTrigger>{item.question}</AccordionTrigger>

        <AccordionContent>{item.answer}</AccordionContent>
      </AccordionItem>
    </>
  );
}
