"use client";
import SubmitReviewBtn from "../modules/product/SubmitReviewBtn";
import ProductReviewItem from "./ProductReviewItem";
import ProductRating from "../modules/product/ProductRating";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductReviews } from "@/queries/products";
import React from "react";

type Props = {
  product_id: number;
  product_image: string;
  product_name: string;
};

export default function ProductReviews({ ...props }: Props) {
  const { data } = useInfiniteQuery(getProductReviews(props.product_id));

  return (
    <section id="reviews" className="space-y-8">
      <h4 className="text-primary text-3xl font-semibold">دیدگاه کاربران</h4>
      <div className="flex flex-col md:flex-row justify-start">
        <div className="space-y-5">
          <p className="text-center text-2xl font-semibold">
            {data?.pages[0].averege_rating}{" "}
            <span className="text-sm font-normal">از 5</span>
          </p>

          <div className="flex items-center">
            <ProductRating rating={data?.pages[0].averege_rating ?? 1} />{" "}
            <span className="text-muted text-xs ">
              از مجموع {data?.pages[0].count} امتیاز
            </span>
          </div>

          <p className="text-sm text-muted">
            شما هم در باره این کالا دیدگاه ثبت کنید
          </p>

          <SubmitReviewBtn {...props} />
        </div>

        <div className="space-y-6 ps-10 flex-1">
          {data?.pages.map((group, i) => (
            <React.Fragment key={i + 1}>
              {group.data.map((item) => (
                <ProductReviewItem key={item.id} review={item} />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
