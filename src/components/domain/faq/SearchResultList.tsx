import { Faq } from "@/types/home";
import React from "react";
import FaqList from "./FaqList";

type Props = {
  items: Array<Faq>;
};

export default function SearchResultList({ items }: Props) {
  return <div>{items.length > 0 ? <FaqList items={items} /> : null}</div>;
}
