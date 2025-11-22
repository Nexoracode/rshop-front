"use client";
import SubmitReviewBtn from "../modules/product/SubmitReviewBtn";
import ProductReviewItem from "./ProductReviewItem";
import ProductRating from "../modules/product/ProductRating";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductReviews } from "@/queries/products";
import React, { useState } from "react";
import SectionTitle from "../common/SectionTitle";
import { ListLayout } from "../common/ListLayout";
import { Review } from "@/types/user";
import { Skeletons } from "../ui/skeleton";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import Pagination from "../common/Pagination";

type Props = {
  product_id: number;
  product_image: string;
  product_name: string;
};

export default function ProductReviews({ ...props }: Props) {
  const [page, setPage] = useState<number | null>(null);
  const { data, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(getProductReviews(props.product_id, page));

  const currentPageMeta = data?.pages[data.pages.length - 1].meta;
  const isLastPage =
    currentPageMeta?.current_page === currentPageMeta?.total_pages;
  const displayPagination =
    page !== null || Number(currentPageMeta?.current_page) > 1;

  return (
    <section id="reviews" className="space-y-8">
      <SectionTitle title="دیدگاه کاربران" />
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
            {data?.pages[0].count === 0
              ? "اولین دیدگاه را در مورد این کالا ثبت کنید."
              : "شما هم در باره این کالا دیدگاه ثبت کنید"}
          </p>

          <SubmitReviewBtn {...props} />
        </div>
        <div className="md:ps-10 pt-10 flex-1 space-y-3">
          <ListLayout<Review>
            loading={isFetching}
            className="space-y-6"
            skeleton={<Skeletons count={3} />}
            emptyDescription="هنوز دیدگاهی در مورد این محصول ثبت نشده است"
            emptyTitle="اولین دیدگاه را در مورد این محصول ثبت کنید"
            renderItem={(item) => (
              <ProductReviewItem key={item.id} review={item} />
            )}
            items={data?.pages.map((p) => p.data).flat() ?? []}
          />

          {displayPagination && (
            <Pagination
              page={currentPageMeta?.current_page ?? 0}
              totalPages={currentPageMeta?.total_pages ?? 0}
              onChange={(p) => setPage(p)}
            />
          )}

          {!displayPagination && !isLastPage && (
            <Button
              size={"sm"}
              color="info"
              variant={"text-nohover"}
              isLoading={isFetchingNextPage}
              onClick={() => fetchNextPage()}
              endIcon={<ChevronDown className="size-4" />}
            >
              مشاهده دیدگاه های بیشتر
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
