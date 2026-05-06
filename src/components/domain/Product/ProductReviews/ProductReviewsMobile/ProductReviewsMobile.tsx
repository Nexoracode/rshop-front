"use client";
import { PaginateData } from "@/types";
import { Review } from "@/types/user";
import React, { useState } from "react";
import ProductReviewItemMobile from "./ProductReviewItemMobile";
import DisplayAllReviews from "./DisplayAllReviews";
import { InfiniteData } from "@tanstack/react-query";
import ProductReviewsMobileHeader from "./ProductReviewsMobileHeader";
import DisplayAllReviewsModal from "./DisplayAllReviewsModal";
import SubmitReviewBtn from "../SubmitReviewBtn";
import { ChevronLeft, MessageCircle } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";

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
  product: {
    product_id: number;
    product_image: string;
    product_name: string;
  };
};

export default function ProductReviewsMobile(props: Props) {
  const [showAll, setShowAll] = useState(false);
  const { reviews } = props;
  const firstPage = reviews.pages[reviews.pages.length - 1];
  return (
    <section>
      <ProductReviewsMobileHeader
        averege_rating={firstPage.averege_rating}
        count={firstPage.count}
        onShowAll={() => setShowAll(true)}
      />
      {firstPage.count > 0 ? (
        <>
          <div className="max-w-full overflow-x-scroll">
            <div className="flex gap-2 flex-nowrap">
              {firstPage.data.map((review) => (
                <ProductReviewItemMobile {...review} key={review.id} />
              ))}

              <DisplayAllReviews setShowAll={() => setShowAll(true)} />
            </div>
          </div>

          <DisplayAllReviewsModal
            showAll={showAll}
            onClose={() => setShowAll(false)}
            {...props}
          />
        </>
      ) : (
        <EmptyState
          title=""
          description="اولین دیدگاه را در مورد این کالا ثبت کنید."
        />
      )}
      <div className="border-t mt-4 w-full">
        <SubmitReviewBtn
          {...props.product}
          Trigger={
            <button className="flex pt-2 items-center w-full">
              <span className="flex w-8 h-8 bg-slate-200 rounded-full items-center justify-center">
                <MessageCircle strokeWidth={2} size={16} />
              </span>
              <span className="flex-1 ps-2 text-right text-xs font-medium">
                دیدگاه خود را درباره این محصول بنویسید
              </span>
              <span>
                <ChevronLeft size={18} strokeWidth={2} />
              </span>
            </button>
          }
        />
      </div>
    </section>
  );
}
