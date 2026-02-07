import React from "react";
import ClientProductList from "./ClientProductList";

type Props = {
  categorySlug?: string;
  brandSlug?: string;
};

export default function ProductListWrapper({ categorySlug, brandSlug }: Props) {
  return (
    <ClientProductList categorySlug={categorySlug} brandSlug={brandSlug} />
  );
}
