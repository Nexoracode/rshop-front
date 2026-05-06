"use client";
import BaseDialog from "@/components/common/BaseDialog";
import React from "react";
import ProductReviewsList from "../ProductReviewsList";
import { PaginateData } from "@/types";
import { Review } from "@/types/user";
import { InfiniteData } from "@tanstack/react-query";
import { useProductPage } from "@/queries/products/product-page";
import { toFaDigits } from "@/lib/utils/price";
import ProductRating from "../ProductRating";

type Props = {
  isFetching: boolean;
  reviews: InfiniteData<
    PaginateData<
      Review,
      {
        averege_rating: number;
        count: number;
      }
    >
  >;
  displayPagination: boolean;
  currentPageMeta: PaginateData<Review>["meta"];
  isLastPage: boolean;
  isFetchingNextPage: boolean;
  onNextPage: () => void;
  onSetPage: (page: number) => void;
  showAll: boolean;
  onClose: () => void;
};

export default function DisplayAllReviewsModal({
  showAll,
  onClose,
  ...props
}: Props) {
  const { pageData, setPageData } = useProductPage();
  const handleClose = (open: boolean) => {
    if (!open) onClose();

    if (pageData.activeTab === "reviews") setPageData({ activeTab: null });
  };
  return (
    <BaseDialog
      open={showAll || pageData.activeTab === "reviews"}
      onOpenChange={handleClose}
      title="دیدگاه ها"
      content={
        <div>
          <div className="border-b px-4 pb-6 items-center">
            <span className="text-xl leading-0 font-bold">
              <span className="text-2xl font-extrabold">
                {toFaDigits(props.reviews?.pages[0]?.averege_rating ?? 0)}{" "}
              </span>
              از
              <span className="ps-2">{toFaDigits(5)}</span>
            </span>
            <div className="flex items-center">
              <ProductRating
                className="size-4.5 mt-2"
                rating={props.reviews?.pages[0]?.averege_rating}
              />

              <span className="text-xs pt-2 ps-1 text-slate-500 leading-0">
                از مجموع {toFaDigits(props.reviews?.pages[0]?.count ?? 0)}{" "}
                امتیاز
              </span>
            </div>
          </div>
          <ProductReviewsList {...props} />
        </div>
      }
      hiddenFooter
    />
  );
}
