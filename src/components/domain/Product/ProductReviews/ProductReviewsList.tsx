import { ListLayout } from "@/components/common/ListLayout";
import { Skeletons } from "@/components/ui/skeleton";
import { Review } from "@/types/user";
import React from "react";
import ProductReviewItem from "./ProductReviewItem";
import { PaginateData } from "@/types";
import { InfiniteData } from "@tanstack/react-query";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type Props = {
  isFetching: boolean;
  reviews: InfiniteData<PaginateData<Review>>;
  displayPagination: boolean;
  currentPageMeta: PaginateData<Review>["meta"];
  isLastPage: boolean;
  isFetchingNextPage: boolean;
  onNextPage: () => void;
  onSetPage: (page: number) => void;
};

export default function ProductReviewsList({
  isFetching,
  reviews,
  displayPagination,
  currentPageMeta,
  isLastPage,
  isFetchingNextPage,
  onNextPage,
  onSetPage,
}: Props) {
  return (
    <div className="md:ps-6 flex-1">
      <ListLayout<Review>
        loading={isFetching}
        className="space-y-3"
        skeleton={<Skeletons count={3} />}
        emptyDescription="هنوز دیدگاهی در مورد این محصول ثبت نشده است"
        emptyTitle="اولین دیدگاه را در مورد این محصول ثبت کنید"
        renderItem={(item) => <ProductReviewItem key={item.id} review={item} />}
        items={reviews.pages.map((p) => p.data).flat() ?? []}
      />

      {displayPagination && (
        <Pagination
          page={currentPageMeta?.current_page ?? 0}
          totalPages={currentPageMeta?.total_pages ?? 0}
          onChange={onSetPage}
        />
      )}

      {!displayPagination && !isLastPage && (
        <Button
          size={"sm"}
          color="info"
          variant={"text-nohover"}
          isLoading={isFetchingNextPage}
          onClick={onNextPage}
          endIcon={<ChevronDown className="size-4" />}
        >
          مشاهده دیدگاه های بیشتر
        </Button>
      )}
    </div>
  );
}
