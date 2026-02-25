import { Category } from "@/types/product";
import React from "react";
import Breadcrumb from "../../common/Breadcrumb";

type Props = {
  category: Category;
  parents: Array<Category>;
};

export default function ProductBreadcrump({ category, parents }: Props) {
  const sortedParents = parents.sort((a, b) => a.level - b.level);

  const breadcrumbItems = [...sortedParents, category].map((parent) => {
    const parents = sortedParents.filter((p) => p.level < parent.level);
    const slug =
      parents.length === 0 ? "" : "/" + parents.map((i) => i.slug).join("/");

    return { label: parent.title, href: `/products${slug}/${parent.slug}` };
  });

  return <Breadcrumb lastIsLink items={breadcrumbItems} />;
}
