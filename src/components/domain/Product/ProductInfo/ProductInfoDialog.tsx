"use client";

import dynamic from "next/dynamic";

const ProductInfoDialog = dynamic(() => import("./ProductInfo"), {
  ssr: false,
  loading: () => null,
});

export default ProductInfoDialog;
