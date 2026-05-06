"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import SectionTitle from "../../../common/SectionTitle";
import ProductRating from "./ProductRating";
import SubmitReviewBtn from "./SubmitReviewBtn";
import { getProductReviews } from "@/queries/products/product-reviews";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductReviewsMobile from "./ProductReviewsMobile/ProductReviewsMobile";
import ProductReviewsList from "./ProductReviewsList";

type Props = {
  product_id: number;
  product_image: string;
  product_name: string;
};

export default function ProductReviewsClient({ ...props }: Props) {
  const [page, setPage] = useState<number | null>(null);
  const { data, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(getProductReviews(props.product_id, page));

  const isMobile = useIsMobile();
  const currentPage = data?.pages[data.pages.length - 1];

  if (!currentPage) return null;

  const currentPageMeta = currentPage.meta;
  const isLastPage =
    currentPageMeta?.current_page === currentPageMeta?.total_pages ||
    currentPageMeta?.total_pages === 0;
  const displayPagination =
    page !== null || Number(currentPageMeta?.current_page) > 1;

  return isMobile ? (
    <ProductReviewsMobile
      reviews={data}
      currentPageMeta={currentPageMeta}
      displayPagination={displayPagination}
      isFetching={isFetching}
      isFetchingNextPage={isFetchingNextPage}
      isLastPage={isLastPage}
      onNextPage={fetchNextPage}
      onSetPage={setPage}
      product={props}
    />
  ) : (
    <section id="reviews" className="space-y-8 py-1 scroll-target">
      <SectionTitle title="دیدگاه کاربران" />
      <div className="flex flex-col md:flex-row justify-start">
        <div className="space-y-5 lg:shadow rounded-lg h-fit p-5">
          <div className="flex items-center justify-between">
            <p className="text-center text-2xl font-medium">
              {data?.pages[0].averege_rating}{" "}
              <span className="text-sm font-normal">از 5</span>
            </p>
            <span className="text-muted text-xs ">
              از مجموع {data?.pages[0].count} امتیاز
            </span>
          </div>
          <div className="flex items-center justify-center">
            <ProductRating rating={data?.pages[0].averege_rating ?? 1} />{" "}
          </div>

          <p className="w-full text-center text-sm text-slate-600">
            {data?.pages[0].count === 0
              ? "اولین دیدگاه را در مورد این کالا ثبت کنید."
              : "شما هم در باره این کالا دیدگاه ثبت کنید"}
          </p>

          <SubmitReviewBtn {...props} />
        </div>

        <ProductReviewsList
          reviews={data}
          currentPageMeta={currentPageMeta}
          displayPagination={displayPagination}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          isLastPage={isLastPage}
          onNextPage={fetchNextPage}
          onSetPage={setPage}
        />
      </div>
    </section>
  );
}
