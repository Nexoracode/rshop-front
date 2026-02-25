import { HomeSection } from "@/types/home";
import React from "react";
import HomeSectionItem from "../HomeSectionItem";
import CategoryBasedSection from "../CategoryBasedSection";

type Props = {
  sections: Array<HomeSection>;
};

export default function HomeSections({ sections }: Props) {
  const categoryBasedSections = sections
    .filter((i) => i.section_type === "category_based")
    .sort((a, b) => a.sort_order - b.sort_order);

  const mostPopular = sections.find((s) => s.section_type === "most_popular");

  const specialProducts = sections
    .filter((s) => s.section_type === "special_products")
    .sort((a, b) => a.sort_order - b.sort_order);
  return (
    <>
      {mostPopular && (
        <HomeSectionItem {...mostPopular} display_style="carousel" />
      )}

      {categoryBasedSections.length > 0 && (
        <CategoryBasedSection sections={categoryBasedSections} />
      )}

      {specialProducts.map((section) => (
        <HomeSectionItem key={section.id} {...section} />
      ))}
    </>
  );
}
