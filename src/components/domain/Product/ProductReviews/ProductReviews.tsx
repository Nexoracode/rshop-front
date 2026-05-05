"use client";
import dynamic from "next/dynamic";
import React from "react";
import ProductReviewsSkeleton from "./ProductReviewsSkeleton";

const ProductReviewsClient = dynamic(() => import("./ProductReviewsClient"), {
  ssr: false,
  loading: () => <ProductReviewsSkeleton />,
});

export default ProductReviewsClient;
