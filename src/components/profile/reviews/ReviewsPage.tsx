"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import ReviewPendingCard from "./ReviewPendingCard";
import ReviewItemCard from "./ReviewItemCard";
import ReviewFormModal from "./ReviewFormModal";
import ReviewDeleteModal from "./ReviewDeleteModal";
import { useQuery } from "@tanstack/react-query";
import { getMyReviews, getPendingReviews } from "@/queries/reviews";
import { Skeletons } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { ListLayout } from "@/components/common/ListLayout";
import { Review } from "@/types/user";

export default function ReviewsPage() {
  const { data, isFetching } = useQuery(getMyReviews);
  const { data: pendingReviews, isFetching: pendingFetching } =
    useQuery(getPendingReviews);
  const [tab, setTab] = useState("pending");
  const [openForm, setOpenForm] = useState<"edit" | "delete" | "new" | null>(
    null
  );

  const [selected, setSelected] = useState<Review>();
  const [product, setProduct] = useState<Review["product"]>();

  return (
    <Card>
      <h1 className="text-lg font-semibold">دیدگاه‌های من</h1>

      <Tabs dir="rtl" value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="pending">در انتظار دیدگاه</TabsTrigger>
          <TabsTrigger value="my-reviews">دیدگاه‌های من</TabsTrigger>
        </TabsList>

        {/* تب در انتظار دیدگاه */}
        <TabsContent value="pending" className="space-y-3 mt-4">
          <ListLayout<Review["product"]>
            items={pendingReviews ?? []}
            loading={pendingFetching}
            skeleton={<Skeletons count={4} className="h-32" />}
            className="grid gap-2 grid-cols-1 md:grid-cols-2"
            renderItem={(product) => (
              <ReviewPendingCard
                key={product.id}
                product={product}
                onReview={() => {
                  setProduct(product);
                  setOpenForm("new");
                }}
              />
            )}
          />
        </TabsContent>

        {/* تب دیدگاه‌های من */}
        <TabsContent value="my-reviews" className="space-y-3 mt-4">
          <ListLayout<Review>
            items={data ?? []}
            loading={isFetching}
            className="space-y-3"
            skeleton={<Skeletons count={3} className="h-24" />}
            renderItem={(review) => (
              <ReviewItemCard
                key={review.id}
                {...review}
                onEdit={() => {
                  setOpenForm("edit");
                  setSelected(review);
                  setProduct(review.product);
                }}
                onDelete={() => {
                  setOpenForm("delete");
                  setSelected(review);
                }}
              />
            )}
          />
        </TabsContent>
      </Tabs>

      {/* مودال ثبت یا ویرایش */}
      {product && (
        <ReviewFormModal
          open={openForm === "edit" || openForm === "new"}
          onClose={() => setOpenForm(null)}
          editData={selected}
          product={product}
        />
      )}

      {/* مودال حذف */}
      <ReviewDeleteModal
        id={selected?.id ?? 0}
        open={openForm === "delete"}
        onClose={() => setOpenForm(null)}
      />
    </Card>
  );
}
