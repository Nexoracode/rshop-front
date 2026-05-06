import BaseDialog from "@/components/common/BaseDialog";
import React from "react";
import ProductReviewsList from "../ProductReviewsList";
import { PaginateData } from "@/types";
import { Review } from "@/types/user";
import { InfiniteData } from "@tanstack/react-query";

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
  const handleClose = (open: boolean) => {
    console.log({ open });
    if (!open) onClose();
  };
  return (
    <BaseDialog
      open={showAll}
      onOpenChange={handleClose}
      content={<ProductReviewsList {...props} />}
      hiddenFooter
    />
  );
}
